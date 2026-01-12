import React from 'react';
import { Zap, Sun, Moon, Users } from 'lucide-react';
import { SERVER_CONFIG } from '@/constants/server';

interface HeaderProps {
  loading: boolean;
  onlineCount: number;
  serverOnline: boolean;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  loading,
  onlineCount,
  serverOnline,
  isDark,
  onToggleTheme,
}) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Server Avatar */}
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg theme-border-animated ${
          isDark
            ? 'bg-gradient-to-br from-cyber-cyan to-cyber-purple text-cyber-bg shadow-cyber-cyan/30'
            : 'bg-gradient-to-br from-cream-primary to-cream-secondary text-white shadow-cream-primary/30'
        }`}>
          <Zap size={24} />
        </div>

        {/* Server Info */}
        <div>
          <h1 className={`text-xl font-bold tracking-tight neon-text ${isDark ? 'text-white' : 'text-cream-text'}`}>
            {SERVER_CONFIG.name}
          </h1>
          <p className={`text-sm ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
            {SERVER_CONFIG.description}
          </p>
        </div>
      </div>

      {/* Right Side: Status + Theme Toggle */}
      <div className="flex items-center gap-3">
        {/* 在线状态 */}
        <div className={`flex items-center rounded-full overflow-hidden ${
          isDark
            ? 'bg-cyber-card/60 border border-cyber-border'
            : 'bg-white border border-cream-border shadow-sm'
        }`}>
          {/* 左侧：状态 */}
          <div className={`flex items-center gap-1.5 px-3 py-1.5 ${
            isDark ? 'border-r border-cyber-border' : 'border-r border-cream-border'
          }`}>
            <span className={`w-2 h-2 rounded-full ${
              serverOnline
                ? (isDark ? 'bg-cyber-success' : 'bg-cream-success')
                : (isDark ? 'bg-cyber-error' : 'bg-cream-error')
            }`}></span>
            <span className={`text-sm font-medium ${
              serverOnline
                ? (isDark ? 'text-cyber-success' : 'text-cream-success')
                : (isDark ? 'text-cyber-error' : 'text-cream-error')
            }`}>
              {serverOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* 右侧：人数 */}
          {serverOnline && (
            <div className="flex items-center gap-1.5 px-3 py-1.5">
              <Users size={14} className={isDark ? 'text-cyber-cyan' : 'text-cream-primary'} />
              <span className={`text-sm font-bold tabular-nums ${isDark ? 'text-white' : 'text-cream-text'}`}>
                {loading ? '-' : onlineCount}
              </span>
              <span className={`text-sm ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
                在线
              </span>
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleTheme}
          className={`p-2 rounded-full transition-all duration-200 ${
            isDark
              ? 'bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan/20'
              : 'bg-cream-primary/10 text-cream-primary hover:bg-cream-primary/20'
          }`}
          title={isDark ? '切换到浅色模式' : '切换到深色模式'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};
