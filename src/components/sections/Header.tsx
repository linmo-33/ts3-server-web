import React from 'react';
import { Zap, Users } from 'lucide-react';
import { SERVER_CONFIG } from '@/constants/server';

interface HeaderProps {
  loading: boolean;
  onlineCount: number;
  serverOnline: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  loading,
  onlineCount,
  serverOnline,
}) => {
  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Server Avatar */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-fresh-primary border-3 border-fresh-text text-white"
             style={{ border: '3px solid #1F2937', boxShadow: '4px 4px 0px #1F2937' }}>
          <Zap size={24} />
        </div>

        {/* Server Info */}
        <div>
          <h1 className="text-xl font-bold tracking-tight text-fresh-text">
            {SERVER_CONFIG.name}
          </h1>
          <p className="text-sm text-fresh-text-muted">
            {SERVER_CONFIG.description}
          </p>
        </div>
      </div>

      {/* Right Side: Status */}
      <div className="flex items-center gap-3">
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
