import React from 'react';
import { Zap, Gamepad2 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { SERVER_CONFIG } from '@/constants/server';

export const HeroSection: React.FC = () => {
  const handleConnect = () => {
    window.location.href = `ts3server://${SERVER_CONFIG.address}`;
  };

  return (
    <div className="lg:col-span-2 flex">
      <Card className="flex-1 overflow-hidden relative">
        {/* Background glow effect */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl"></div>

        <div className="p-6 h-full flex justify-between gap-4 relative">
          {/* Left Content */}
          <div className="flex-1">
            {/* JOIN NOW Tag */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 text-purple-500 text-xs font-bold mb-4">
              <Gamepad2 size={12} />
              开黑集结
            </div>

            {/* Main Title */}
            <h2 className="text-xl md:text-2xl font-black leading-tight mb-3">
              <span className="text-slate-900 dark:text-white">黑暗降临，</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-purple-500">该你登场了</span>
            </h2>

            {/* Server Address */}
            <div className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              服务器地址
              <code className="ml-2 px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono font-semibold text-slate-900 dark:text-white">
                {SERVER_CONFIG.address}
              </code>
            </div>
          </div>

          {/* Right - Connect Button */}
          <button
            onClick={handleConnect}
            className="shrink-0 self-center bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 text-white rounded-xl px-5 py-3 flex items-center gap-3 shadow-lg shadow-purple-500/25 transition-all hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105"
          >
            <Zap size={18} fill="currentColor" />
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-white/70 font-medium">Quick Connect</div>
              <div className="text-sm font-bold">一键连接</div>
            </div>
          </button>
        </div>
      </Card>
    </div>
  );
};
