import React from 'react';
import { Mic, MicOff, Coffee, Gamepad2, Hash } from 'lucide-react';
import type { User, ServerStats } from '@/types';

interface UserListProps {
  loading: boolean;
  users: User[];
  stats: ServerStats;
}

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'away':
      return <Coffee size={12} className="text-amber-400" />;
    case 'mic-muted':
      return <MicOff size={12} className="text-zinc-600" />;
    default:
      return <Mic size={12} className="text-emerald-400" />;
  }
};

const avatarColors = [
  'from-red-500 to-rose-600',
  'from-orange-500 to-red-600',
  'from-pink-500 to-rose-600',
  'from-amber-500 to-orange-600',
  'from-red-600 to-pink-600',
];

export const UserList: React.FC<UserListProps> = ({ loading, users, stats }) => {
  return (
    <div className="lg:col-span-1">
      <div className="gaming-card rounded-xl p-6 h-[380px] flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            <h3 className="font-bold text-white">在线玩家</h3>
            <span className="text-sm text-zinc-600">({users.length})</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-600">
              <div className="w-6 h-6 border-2 border-zinc-800 border-t-red-500 rounded-full animate-spin mb-3"></div>
              <span className="text-sm">加载中...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-zinc-600">
              <Gamepad2 size={36} className="mb-3 opacity-40" />
              <span className="text-sm">暂无玩家在线</span>
              <span className="text-xs mt-1 text-zinc-700">快来成为第一个吧</span>
            </div>
          ) : (
            users.map((user, index) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2.5 hover:bg-red-500/5 rounded-lg transition-colors"
              >
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center text-white font-bold text-xs shadow-sm`}
                >
                  {user.nickname.substring(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-white text-sm truncate">
                    {user.nickname}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Hash size={10} />
                    <span className="truncate">{user.channel}</span>
                  </div>
                </div>
                <StatusIcon status={user.status} />
              </div>
            ))
          )}
        </div>

        <div className="pt-4 mt-3 border-t border-white/5 flex justify-between text-xs text-zinc-600">
          <span>延迟: {stats.ping}ms</span>
          <span>丢包: {stats.packetLoss}%</span>
        </div>
      </div>
    </div>
  );
};
