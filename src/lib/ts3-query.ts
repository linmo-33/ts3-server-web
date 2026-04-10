import { Events, Query } from 'teamspeak.js';

type QueryProtocol = 'tcp' | 'ssh';
type TeamSpeakQuery = Query;
type RawServerInfo = Awaited<ReturnType<TeamSpeakQuery['commands']['serverinfo']>>;
type RawClientEntry = Awaited<ReturnType<TeamSpeakQuery['commands']['clientinfo']>>;
type RawChannelEntry = Awaited<ReturnType<TeamSpeakQuery['commands']['channellist']>>[number] & {
  channel_maxclients?: string;
};

interface QueryRuntimeConfig {
  connectionTimeout: number;
  host: string;
  nickname: string;
  password: string;
  port: number;
  protocol: QueryProtocol;
  serverId: number | null;
  username: string;
  virtualPort: number;
}

// 使用 globalThis 在热重载时保持连接状态
const globalForTs3 = globalThis as typeof globalThis & {
  connectionKey?: string | null;
  connectionPromise?: Promise<Query> | null;
  teamspeakQuery?: Query | null;
  lastActivity?: number;
};

globalForTs3.teamspeakQuery = globalForTs3.teamspeakQuery ?? null;
globalForTs3.connectionPromise = globalForTs3.connectionPromise ?? null;
globalForTs3.connectionKey = globalForTs3.connectionKey ?? null;
globalForTs3.lastActivity = globalForTs3.lastActivity ?? 0;

const CHANNEL_SPACER_PREFIX_REGEX = /^(?:\[(?:(?:c|l|r|\*)?spacer)\d*\]\s*)+/i;

function getEnv(names: string[], fallback = ''): string {
  for (const name of names) {
    const value = process.env[name];
    if (typeof value === 'string' && value.trim() !== '') {
      return value;
    }
  }

  return fallback;
}

function parseNumber(value: string | undefined, fallback = 0): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function parseOptionalNumber(value: string | undefined): number | null {
  if (!value || value.trim() === '') {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

function getProtocol(): QueryProtocol {
  return getEnv(['TS_QUERY_PROTOCOL', 'TS3_QUERY_PROTOCOL'], 'tcp').toLowerCase() === 'ssh'
    ? 'ssh'
    : 'tcp';
}

function readConfig(): QueryRuntimeConfig {
  const protocol = getProtocol();

  return {
    connectionTimeout: parseNumber(
      getEnv(['TS_CONNECTION_TIMEOUT', 'TS3_CONNECTION_TIMEOUT'], '30000'),
      30000
    ),
    host: getEnv(['TS_SERVER_HOST', 'TS3_SERVER_HOST'], 'localhost'),
    nickname: getEnv(['TS_QUERY_NICKNAME', 'TS3_QUERY_NICKNAME'], 'WebQuery'),
    password: getEnv(['TS_QUERY_PASSWORD', 'TS3_QUERY_PASSWORD']),
    port: parseNumber(
      getEnv(['TS_QUERY_PORT', 'TS3_QUERY_PORT'], protocol === 'ssh' ? '10022' : '10011'),
      protocol === 'ssh' ? 10022 : 10011
    ),
    protocol,
    serverId: parseOptionalNumber(getEnv(['TS_SERVER_ID', 'TS3_SERVER_ID'])),
    username: getEnv(['TS_QUERY_USERNAME', 'TS3_QUERY_USERNAME'], 'serveradmin'),
    virtualPort: parseNumber(getEnv(['TS_VIRTUAL_PORT', 'TS3_VIRTUAL_PORT'], '9987'), 9987),
  };
}

function getConnectionKey(config: QueryRuntimeConfig): string {
  return JSON.stringify({
    host: config.host,
    nickname: config.nickname,
    port: config.port,
    protocol: config.protocol,
    serverId: config.serverId,
    username: config.username,
    virtualPort: config.virtualPort,
  });
}

function isSpacerChannelName(rawChannelName: string): boolean {
  return CHANNEL_SPACER_PREFIX_REGEX.test(rawChannelName);
}

function normalizeChannelDisplayName(rawChannelName: string): string {
  return rawChannelName.replace(CHANNEL_SPACER_PREFIX_REGEX, '').trim();
}

function destroyConnection(query: Query | null) {
  if (!query) {
    return;
  }

  try {
    query.destroy();
  } catch {
    // 忽略销毁错误
  }
}

async function createConnection(config: QueryRuntimeConfig): Promise<Query> {
  const query = new Query({
    host: config.host,
    port: config.port,
    protocol: config.protocol,
    ssh:
      config.protocol === 'ssh'
        ? {
            username: config.username,
            password: config.password,
          }
        : undefined,
  });

  const invalidateConnection = () => {
    if (globalForTs3.teamspeakQuery === query) {
      globalForTs3.teamspeakQuery = null;
      globalForTs3.connectionKey = null;
      globalForTs3.lastActivity = 0;
    }
  };

  query.on(Events.Close, invalidateConnection);
  query.on(Events.Error, invalidateConnection);

  try {
    await query.connect(config.connectionTimeout);

    if (config.protocol === 'tcp') {
      await query.login(config.username, config.password);

      if (config.serverId !== null) {
        await query.virtualServers.use({
          id: config.serverId,
          nickname: config.nickname,
        });
      } else {
        await query.virtualServers.use({
          nickname: config.nickname,
          port: config.virtualPort,
        });
      }
    }

    return query;
  } catch (error) {
    destroyConnection(query);
    throw error;
  }
}

async function getConnection(): Promise<Query> {
  const config = readConfig();
  const connectionKey = getConnectionKey(config);
  const now = Date.now();

  if (globalForTs3.connectionPromise) {
    return globalForTs3.connectionPromise;
  }

  if (
    globalForTs3.teamspeakQuery &&
    globalForTs3.connectionKey === connectionKey &&
    now - (globalForTs3.lastActivity ?? 0) < config.connectionTimeout
  ) {
    try {
      await globalForTs3.teamspeakQuery.fetchServerVersion();
      globalForTs3.lastActivity = now;
      return globalForTs3.teamspeakQuery;
    } catch {
      destroyConnection(globalForTs3.teamspeakQuery);
      globalForTs3.teamspeakQuery = null;
      globalForTs3.connectionKey = null;
    }
  }

  if (globalForTs3.teamspeakQuery) {
    destroyConnection(globalForTs3.teamspeakQuery);
    globalForTs3.teamspeakQuery = null;
    globalForTs3.connectionKey = null;
  }

  globalForTs3.connectionPromise = createConnection(config);

  try {
    globalForTs3.teamspeakQuery = await globalForTs3.connectionPromise;
    globalForTs3.connectionKey = connectionKey;
    globalForTs3.lastActivity = now;
    return globalForTs3.teamspeakQuery;
  } catch (error) {
    globalForTs3.teamspeakQuery = null;
    globalForTs3.connectionKey = null;
    throw error;
  } finally {
    globalForTs3.connectionPromise = null;
  }
}

function mapServerInfo(info: RawServerInfo) {
  return {
    virtualserver_unique_identifier: info.virtualserver_unique_identifier,
    virtualserver_name: info.virtualserver_name,
    virtualserver_clientsonline: parseNumber(info.virtualserver_clientsonline),
    virtualserver_maxclients: parseNumber(info.virtualserver_maxclients),
    virtualserver_uptime: parseNumber(info.virtualserver_uptime),
    virtualserver_ping: parseNumber(info.virtualserver_total_ping),
    virtualserver_packetloss_speech: parseNumber(info.virtualserver_total_packetloss_speech),
  };
}

export async function getServerInfo() {
  const ts = await getConnection();
  globalForTs3.lastActivity = Date.now();
  const info = await ts.commands.serverinfo();
  return mapServerInfo(info);
}

export async function getClientList() {
  const ts = await getConnection();
  globalForTs3.lastActivity = Date.now();
  const clients = toArray(
    await ts.commands.clientlist({
      _away: true,
      _uid: true,
      _voice: true,
    })
  );

  return clients
    .filter((client): client is RawClientEntry => client.client_type === '0')
    .map((client) => ({
      clid: client.clid,
      client_unique_identifier: client.client_unique_identifier,
      client_nickname: client.client_nickname,
      client_channel_id: client.cid,
      client_type: client.client_type,
      client_away: client.client_away ?? '0',
      client_output_muted: client.client_output_muted ?? '0',
    }));
}

export async function getChannelList() {
  const ts = await getConnection();
  globalForTs3.lastActivity = Date.now();
  const channels = (await ts.commands.channellist({
    _limits: true,
  })) as RawChannelEntry[];

  return channels.map((channel) => ({
    cid: channel.cid,
    channel_name: normalizeChannelDisplayName(channel.channel_name),
    channel_is_spacer: isSpacerChannelName(channel.channel_name),
    channel_maxclients: parseNumber(channel.channel_maxclients, -1),
    total_clients: parseNumber(channel.total_clients),
    channel_order: channel.channel_order ?? '0',
  }));
}
