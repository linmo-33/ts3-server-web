import React from 'react';
import { Mic, MicOff, Coffee, Gamepad2, Hash } from 'lucide-react';
import type { User, ServerStats } from '@/types';

interface UserListProps {
  loading: boolean;
  users: User[];
  stats: ServerStats;
  isDark: boolean;
}

const StatusIcon: React.FC<{ status: string; isDark: boolean }> = ({ status, isDark }) => {
  switch (status) {
    case 'away':
      return <Coffee size={12} className={isDark ? 'text-cyber-warning' : 'text-cream-warning'} />;
    case 'mic-muted':
      return <MicOff size={12} className={isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'} />;
    default:
      return <Mic size={12} className={isDark ? 'text-cyber-success' : 'text-cream-success'} />;
  }
};

const darkAvatarColors = [
  'from-cyber-cyan to-cyber-purple',
  'from-cyber-purple to-cyber-pink',
  'from-cyber-pink to-cyber-cyan',
  'from-cyber-cyan to-cyber-success',
  'from-cyber-purple to-cyber-cyan',
];

const lightAvatarColors = [
  'from-cream-primary to-cream-secondary',
  'from-cream-secondary to-cream-primary-light',
  'from-cream-primary-light to-cream-secondary-light',
  'from-cream-primary to-cream-success',
  'from-cream-secondary to-cream-primary',
];

export const UserList: React.FC<UserListProps> = ({ loading, users, stats, isDark }) => {
  const avatarColors = isDark ? darkAvatarColors : lightAvatarColors;

  return (
    <div className="lg:col-span-1">
      <div className="theme-card rounded-xl p-6 h-[380px] flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isDark ? 'bg-cyber-cyan' : 'bg-cream-primary'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-cyber-cyan' : 'bg-cream-primary'}`}></span>
            </span>
            <h3 className={`font-bold ${isDark ? 'text-white' : 'text-cream-text'}`}>在线玩家</h3>
            <span className={`text-sm ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>({users.length})</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          {loading ? (
            <div className={`flex flex-col items-center justify-center h-full ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
              <div className={`w-6 h-6 border-2 rounded-full animate-spin mb-3 ${isDark ? 'border-cyber-card border-t-cyber-cyan' : 'border-cream-card border-t-cream-primary'}`}></div>
              <span className="text-sm">加载中...</span>
            </div>
          ) : users.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-full ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
              <Gamepad2 size={36} className="mb-3 opacity-40" />
              <span className="text-sm">暂无玩家在线</span>
              <span className="text-xs mt-1 opacity-70">快来成为第一个吧</span>
            </div>
          ) : (
            users.map((user, index) => (
              <div
                key={user.id}
                className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors border border-transparent ${
                  isDark
                    ? 'hover:bg-cyber-cyan/5 hover:border-cyber-cyan/20'
                    : 'hover:bg-cream-primary/5 hover:border-cream-primary/20'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg bg-gradient-to-br ${avatarColors[index % avatarColors.length]} flex items-center justify-center font-bold text-xs shadow-lg ${isDark ? 'text-cyber-bg' : 'text-white'}`}
                >
                  {user.nickname.substring(0, 1).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-medium text-sm truncate ${isDark ? 'text-white' : 'text-cream-text'}`}>
                    {user.nickname}
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
                    <Hash size={10} />
                    <span className="truncate">{user.channel}</span>
                  </div>
                </div>
                <StatusIcon status={user.status} isDark={isDark} />
              </div>
            ))
          )}
        </div>

        <div className={`pt-4 mt-3 border-t flex justify-between text-xs ${
          isDark ? 'border-cyber-border text-cyber-text-muted' : 'border-cream-border text-cream-text-muted'
        }`}>
          <span>延迟: <span className={isDark ? 'text-cyber-cyan' : 'text-cream-primary'}>{stats.ping}ms</span></span>
          <span>丢包: <span className={isDark ? 'text-cyber-purple' : 'text-cream-secondary'}>{stats.packetLoss}%</span></span>
        </div>
      </div>
    </div>
  );
};
