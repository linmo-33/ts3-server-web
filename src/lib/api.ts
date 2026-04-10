// ==========================================
// TeamSpeak API Client
// ==========================================

import type { TS3AllDataResponse } from '@/types/api';

const API_BASE = '/api';

class TS3ApiClient {
  async getAllData(): Promise<TS3AllDataResponse> {
    const response = await fetch(`${API_BASE}/ts3?type=all`);
    if (!response.ok) {
      throw new Error('Failed to fetch TS3 data');
    }
    return response.json();
  }
}

export const ts3Api = new TS3ApiClient();
