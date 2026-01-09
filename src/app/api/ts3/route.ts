import { NextRequest, NextResponse } from 'next/server';
import { getServerInfo, getClientList, getChannelList } from '@/lib/ts3-query';
import { statsHistory } from '@/lib/stats-history';
import { checkRateLimit } from '@/lib/rate-limit';
import type { ServerInfo, ClientInfo, ChannelInfo } from '@/types/api';

// 统一缓存
interface AllData {
  server: ServerInfo;
  clients: ClientInfo[];
  channels: ChannelInfo[];
  history: { time: string; count: number }[];
}

let allDataCache: { data: AllData; timestamp: number } | null = null;

function getCacheTTL(): number {
  return parseInt(process.env.TS3_CACHE_TTL || '10000');
}

function isCacheValid(): boolean {
  return allDataCache ? Date.now() - allDataCache.timestamp < getCacheTTL() : false;
}

function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip')
    || 'unknown';
}

async function fetchAllData(): Promise<AllData> {
  // 如果缓存有效，直接返回
  if (isCacheValid() && allDataCache) {
    return allDataCache.data;
  }

  // 串行获取数据（避免并发连接问题）
  const serverInfoRaw = await getServerInfo();
  const clientsRaw = await getClientList();
  const channelsRaw = await getChannelList();

  const server: ServerInfo = {
    virtualserver_unique_identifier: serverInfoRaw.virtualserver_unique_identifier,
    virtualserver_name: serverInfoRaw.virtualserver_name,
    virtualserver_clientsonline: serverInfoRaw.virtualserver_clientsonline,
    virtualserver_maxclients: serverInfoRaw.virtualserver_maxclients,
    virtualserver_uptime: Number(serverInfoRaw.virtualserver_uptime) || 0,
    virtualserver_ping: Number(serverInfoRaw.virtualserver_ping) || 0,
    virtualserver_packetloss_speech: Number(serverInfoRaw.virtualserver_packetloss_speech) || 0,
  };

  const clients: ClientInfo[] = clientsRaw.map((c) => ({
    clid: c.clid,
    client_unique_identifier: c.client_unique_identifier,
    client_nickname: c.client_nickname,
    connection_client_ip: '',
    client_channel_id: c.client_channel_id,
    client_type: c.client_type,
    client_away: c.client_away,
    client_output_muted: c.client_output_muted,
  }));

  const channels: ChannelInfo[] = channelsRaw.map((c) => ({
    cid: c.cid,
    channel_name: c.channel_name,
    channel_maxclients: c.channel_maxclients,
    total_clients: c.total_clients,
    channel_order: c.channel_order,
  }));

  // 记录历史
  statsHistory.add(clients.length);

  const data: AllData = {
    server,
    clients,
    channels,
    history: statsHistory.getHistory(),
  };

  allDataCache = { data, timestamp: Date.now() };
  return data;
}

export async function GET(request: NextRequest) {
  const ip = getClientIP(request);
  const { allowed, remaining } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'X-RateLimit-Remaining': '0' } }
    );
  }

  const jsonResponse = (data: unknown, status = 200) => {
    return NextResponse.json(data, {
      status,
      headers: { 'X-RateLimit-Remaining': String(remaining) }
    });
  };

  try {
    const allData = await fetchAllData();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    switch (type) {
      case 'serverinfo':
        return jsonResponse(allData.server);
      case 'clientlist':
        return jsonResponse(allData.clients);
      case 'channellist':
        return jsonResponse(allData.channels);
      case 'history':
        return jsonResponse(allData.history);
      case 'all':
        return jsonResponse(allData);
      default:
        return jsonResponse({ error: 'Invalid type parameter' }, 400);
    }
  } catch (error) {
    console.error('TS3 Query Error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return jsonResponse({ error: 'TS3 Query failed', message }, 500);
  }
}
