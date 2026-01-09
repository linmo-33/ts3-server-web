import React from 'react';
import { Zap, Copy, Check } from 'lucide-react';
import { SERVER_CONFIG } from '@/constants/server';

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = React.useState(false);

  const handleConnect = () => {
    window.location.href = `ts3server://${SERVER_CONFIG.address}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(SERVER_CONFIG.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="lg:col-span-2">
      <div className="gaming-card rounded-xl p-6 h-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium mb-4">
              <Zap size={12} />
              开黑集结
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              黑暗降临，
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">该你登场了</span>
            </h2>

            <p className="text-zinc-500 text-sm mb-5">
              加入我们的语音服务器，与队友实时沟通
            </p>

            {/* Server Address */}
            <div className="flex items-center gap-2">
              <code className="px-4 py-2 bg-black/40 border border-white/5 rounded-lg text-red-400 font-mono text-sm">
                {SERVER_CONFIG.address}
              </code>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-500 hover:text-red-400"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
          </div>

          {/* Connect Button */}
          <button
            onClick={handleConnect}
            className="gaming-btn text-white rounded-xl px-6 py-3 font-medium flex items-center justify-center gap-2"
          >
            <Zap size={18} />
            一键连接
          </button>
        </div>
      </div>
    </div>
  );
};
