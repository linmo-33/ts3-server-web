import React from 'react';
import { Gamepad2, Wifi, WifiOff } from 'lucide-react';
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
        <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-rose-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-500/20">
          <Gamepad2 size={24} />
        </div>

        {/* Server Info */}
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            {SERVER_CONFIG.name}
          </h1>
          <p className="text-sm text-zinc-500">
            {SERVER_CONFIG.description}
          </p>
        </div>
      </div>

      {/* Status Badge */}
      <div className="flex items-center gap-3">
        {serverOnline ? (
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
            <Wifi size={14} className="text-emerald-400" />
            <span className="text-sm font-medium text-emerald-400">在线</span>
            <span className="w-px h-4 bg-emerald-500/30"></span>
            <span className="text-sm font-bold text-emerald-400">
              {loading ? '-' : onlineCount}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
            <WifiOff size={14} className="text-red-400" />
            <span className="text-sm font-medium text-red-400">离线</span>
          </div>
        )}
      </div>
    </header>
  );
};
