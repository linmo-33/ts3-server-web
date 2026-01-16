import type { ServerConfig } from '@/types';

/** 服务器配置 - 从环境变量读取 */
export const SERVER_CONFIG: ServerConfig = {
  name: process.env.NEXT_PUBLIC_SERVER_NAME || '米奇妙妙屋',
  description: process.env.NEXT_PUBLIC_SERVER_DESCRIPTION || '欢迎来到我们的游戏语音社区。',
  address: process.env.NEXT_PUBLIC_SERVER_ADDRESS || 'ts.example.com',
};
