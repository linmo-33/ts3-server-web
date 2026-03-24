import React from 'react';
import { Zap, Users, Moon, Sun } from 'lucide-react';
import type { ServerConfig } from '@/types';

interface HeaderProps {
  loading: boolean;
  onlineCount: number;
  serverOnline: boolean;
  serverConfig: ServerConfig;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  loading,
  onlineCount,
  serverOnline,
  serverConfig,
  isDarkMode,
  onToggleTheme,
}) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Server Avatar */}
           <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-fresh-primary border-3 border-fresh-text text-white"
             style={{ border: '3px solid var(--theme-ink)', boxShadow: '4px 4px 0px var(--theme-ink)' }}>
          <Zap size={24} />
        </div>

        {/* Server Info */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-fresh-text">
            {serverConfig.name}
          </h1>
          <p className="text-sm text-fresh-text-muted">
            {serverConfig.description}
          </p>
        </div>
      </div>

      {/* Right Side: Status */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleTheme}
          className="theme-toggle-btn"
          aria-label={isDarkMode ? '切换为浅色模式' : '切换为深色模式'}
          title={isDarkMode ? '切换为浅色模式' : '切换为深色模式'}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* 在线状态 */}
        <div className="status-pill flex items-center">
          {/* 左侧：状态 */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 border-r-2 border-fresh-text">
            <span className="decoration-dot" style={{
              background: serverOnline ? '#22C55E' : '#EF4444',
              width: '8px',
              height: '8px'
            }}></span>
            <span className={`text-sm font-bold ${
              serverOnline ? 'text-fresh-success' : 'text-fresh-error'
            }`}>
              {serverOnline ? 'Online' : 'Offline'}
            </span>
          </div>

          {/* 右侧：人数 */}
          {serverOnline && (
            <div className="flex items-center gap-1.5 px-3 py-1.5">
              <Users size={14} className="text-fresh-primary" />
              <span className="text-sm font-bold tabular-nums text-fresh-text">
                {loading ? '-' : onlineCount}
              </span>
              <span className="text-sm text-fresh-text-muted">
                在线
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
