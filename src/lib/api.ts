// ==========================================
// TeamSpeak 3 API Client
// ==========================================

import type { ServerInfo, ClientInfo, ChannelInfo } from '@/types/api';

const API_BASE = '/api';

interface AllData {
  server: ServerInfo;
  clients: ClientInfo[];
  channels: ChannelInfo[];
  history: { time: string; count: number }[];
}

class TS3ApiClient {
  async getAllData(): Promise<AllData> {
    const response = await fetch(`${API_BASE}/ts3?type=all`);
    if (!response.ok) {
      throw new Error('Failed to fetch TS3 data');
    }
    return response.json();
  }
}

export const ts3Api = new TS3ApiClient();
