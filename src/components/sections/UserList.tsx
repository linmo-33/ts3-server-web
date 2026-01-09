import React from 'react';
import { Server, Mic, MicOff, Coffee, Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import type { User, ServerStats } from '@/types';

interface UserListProps {
  loading: boolean;
  users: User[];
  stats: ServerStats;
}

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'away':
      return <Coffee size={12} className="text-amber-500" />;
    case 'mic-muted':
      return <MicOff size={12} className="text-slate-400" />;
    default:
      return <Mic size={12} className="text-emerald-500" />;
  }
};

export const UserList: React.FC<UserListProps> = ({ loading, users, stats }) => {
  return (
    <div className="lg:col-span-1">
      <Card className="h-[380px] flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              实时在线
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500"></span>
              </span>
            </h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">
              {users.length} 位玩家在线
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <div className="w-8 h-8 border-2 border-slate-200 border-t-purple-500 rounded-full animate-spin mb-3"></div>
              <span className="text-sm">加载中...</span>
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <Gamepad2 size={40} className="mb-3 opacity-30" />
              <span className="text-sm font-medium">暂无玩家在线</span>
              <span className="text-xs mt-1">快来成为第一个吧！</span>
            </div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2.5 hover:bg-purple-50 dark:hover:bg-purple-900/10 rounded-xl transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm ${user.id % 3 === 0
                    ? 'bg-gradient-to-br from-violet-500 to-purple-600'
                    : user.id % 3 === 1
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      : 'bg-gradient-to-br from-fuchsia-500 to-pink-600'
                    }`}
                >
                  {user.nickname.substring(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate text-sm">
                      {user.nickname}
                    </span>
                    {user.badge && <Badge color="purple">{user.badge}</Badge>}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <Server size={10} />
                    <span className="truncate">{user.channel}</span>
                  </div>
                </div>
                <StatusIcon status={user.status} />
              </div>
            ))
          )}
        </div>

        <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
          <span>延迟: {stats.ping}ms</span>
          <span>丢包: {stats.packetLoss}%</span>
        </div>
      </Card>
    </div>
  );
};
