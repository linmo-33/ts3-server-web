import type { ServerStats, User } from '@/types';

/**
 * Mock 数据
 * 用于开发和演示，生产环境应替换为真实 API 数据
 */

/** 模拟服务器统计数据 */
export const MOCK_STATS: ServerStats = {
  onlineCount: 24,
  maxSlots: 100,
  uptime: '12天 4小时',
  ping: 18,
  packetLoss: 0.0,
  history: [
    { time: '12:00', count: 12 },
    { time: '13:00', count: 15 },
    { time: '14:00', count: 18 },
    { time: '15:00', count: 24 },
    { time: '16:00', count: 20 },
    { time: '17:00', count: 32 },
    { time: '18:00', count: 45 },
    { time: '19:00', count: 38 },
  ],
};

/** 模拟在线用户列表 */
export const MOCK_USERS: User[] = [
  { id: 1, nickname: 'Ayame#1', badge: '黑铁', channel: '大厅', status: 'online' },
  { id: 2, nickname: 'CSGO#1', badge: '龙王', channel: 'CS2 竞技', status: 'online' },
  { id: 3, nickname: 'Kuro', badge: '管理员', channel: '挂机室', status: 'mic-muted' },
  { id: 4, nickname: 'Guest_992', badge: '白银', channel: '音乐大厅', status: 'online' },
  { id: 5, nickname: 'Tako', badge: 'VIP', channel: 'APEX', status: 'away' },
];
