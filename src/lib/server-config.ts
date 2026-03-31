import 'server-only';

import type { ServerConfig } from '@/types';

const DEFAULT_SERVER_CONFIG: ServerConfig = {
  name: '米奇妙妙屋',
  description: '欢迎来到我们的游戏语音社区。',
  address: 'ts.example.com',
  displayChannelNames: [],
};

function readEnv(key: string): string | undefined {
  const value = process.env[key];

  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue === '' ? undefined : trimmedValue;
}

function readEnvList(...keys: string[]): string[] {
  for (const key of keys) {
    const value = readEnv(key);

    if (!value) {
      continue;
    }

    return value
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

export function getServerConfig(): ServerConfig {
  return {
    name: readEnv('SERVER_NAME') ?? readEnv('NEXT_PUBLIC_SERVER_NAME') ?? DEFAULT_SERVER_CONFIG.name,
    description: readEnv('SERVER_DESCRIPTION') ?? readEnv('NEXT_PUBLIC_SERVER_DESCRIPTION') ?? DEFAULT_SERVER_CONFIG.description,
    address: readEnv('SERVER_ADDRESS') ?? readEnv('NEXT_PUBLIC_SERVER_ADDRESS') ?? DEFAULT_SERVER_CONFIG.address,
    displayChannelNames: readEnvList('DISPLAY_CHANNEL_NAMES', 'NEXT_PUBLIC_DISPLAY_CHANNEL_NAMES'),
  };
}
