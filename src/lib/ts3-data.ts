import { getChannelList, getClientList, getServerInfo } from '@/lib/ts3-query';
import { getOnlineTrendHistory, recordOnlineTrendPoint } from '@/lib/ts3-history';
import type {
  ChannelInfo,
  ClientInfo,
  ServerInfo,
  TS3AllDataResponse,
} from '@/types/api';

interface CachedTS3Data {
  data: TS3AllDataResponse;
  timestamp: number;
}

interface TS3DataRuntime {
  cache: CachedTS3Data | null;
  refreshPromise: Promise<TS3AllDataResponse> | null;
  samplerIntervalMs: number | null;
  samplerTimer: ReturnType<typeof setInterval> | null;
}

const DEFAULT_CACHE_TTL_MS = 10000;
const DEFAULT_SAMPLE_INTERVAL_MS = 60000;
const MIN_SAMPLE_INTERVAL_MS = 10000;

const globalForTs3Data = globalThis as typeof globalThis & {
  ts3DataRuntime?: TS3DataRuntime;
};

globalForTs3Data.ts3DataRuntime = globalForTs3Data.ts3DataRuntime ?? {
  cache: null,
  refreshPromise: null,
  samplerIntervalMs: null,
  samplerTimer: null,
};

function getRuntime(): TS3DataRuntime {
  if (!globalForTs3Data.ts3DataRuntime) {
    globalForTs3Data.ts3DataRuntime = {
      cache: null,
      refreshPromise: null,
      samplerIntervalMs: null,
      samplerTimer: null,
    };
  }

  return globalForTs3Data.ts3DataRuntime;
}

function parseNumber(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getCacheTTL(): number {
  return parseNumber(process.env.TS_CACHE_TTL || process.env.TS3_CACHE_TTL, DEFAULT_CACHE_TTL_MS);
}

function isCacheValid() {
  const runtime = getRuntime();
  return runtime.cache ? Date.now() - runtime.cache.timestamp < getCacheTTL() : false;
}

async function queryAllData(): Promise<TS3AllDataResponse> {
  // 串行获取数据，避免复用 Query 连接时的并发问题。
  const serverInfoRaw = await getServerInfo();
  const clientsRaw = await getClientList();
  const channelsRaw = await getChannelList();

  const server: ServerInfo = {
    virtualserver_name: serverInfoRaw.virtualserver_name,
    virtualserver_clientsonline: serverInfoRaw.virtualserver_clientsonline,
    virtualserver_maxclients: serverInfoRaw.virtualserver_maxclients,
    virtualserver_uptime: Number(serverInfoRaw.virtualserver_uptime) || 0,
    virtualserver_ping: Number(serverInfoRaw.virtualserver_ping) || 0,
    virtualserver_packetloss_speech: Number(serverInfoRaw.virtualserver_packetloss_speech) || 0,
  };

  const clients: ClientInfo[] = clientsRaw.map((client) => ({
    clid: client.clid,
    client_nickname: client.client_nickname,
    connection_client_ip: '',
    client_channel_id: client.client_channel_id,
    client_type: client.client_type,
    client_away: client.client_away,
    client_output_muted: client.client_output_muted,
  }));

  const channels: ChannelInfo[] = channelsRaw.map((channel) => ({
    cid: channel.cid,
    channel_name: channel.channel_name,
    channel_is_spacer: channel.channel_is_spacer,
    channel_maxclients: channel.channel_maxclients,
    total_clients: channel.total_clients,
    channel_order: channel.channel_order,
  }));

  recordOnlineTrendPoint({
    timestamp: Date.now(),
    onlineCount: clients.length,
    maxSlots: server.virtualserver_maxclients,
    ping: server.virtualserver_ping,
    packetLoss: server.virtualserver_packetloss_speech,
  });

  return {
    server,
    clients,
    channels,
    history: getOnlineTrendHistory(),
  };
}

export async function refreshTS3Data(force = false): Promise<TS3AllDataResponse> {
  const runtime = getRuntime();

  if (!force && isCacheValid() && runtime.cache) {
    return runtime.cache.data;
  }

  if (runtime.refreshPromise) {
    return runtime.refreshPromise;
  }

  runtime.refreshPromise = (async () => {
    const data = await queryAllData();
    runtime.cache = { data, timestamp: Date.now() };
    return data;
  })();

  try {
    return await runtime.refreshPromise;
  } finally {
    runtime.refreshPromise = null;
  }
}

export function ensureTS3SamplerStarted() {
  const runtime = getRuntime();
  const intervalMs = Math.max(DEFAULT_SAMPLE_INTERVAL_MS, MIN_SAMPLE_INTERVAL_MS);

  if (runtime.samplerTimer && runtime.samplerIntervalMs === intervalMs) {
    return;
  }

  if (runtime.samplerTimer) {
    clearInterval(runtime.samplerTimer);
  }

  const timer = setInterval(() => {
    void refreshTS3Data(true).catch((error) => {
      console.error('TS3 sampler refresh failed:', error);
    });
  }, intervalMs);

  timer.unref?.();

  runtime.samplerTimer = timer;
  runtime.samplerIntervalMs = intervalMs;

  if (!runtime.cache) {
    void refreshTS3Data(true).catch((error) => {
      console.error('TS3 sampler bootstrap failed:', error);
    });
  }
}
