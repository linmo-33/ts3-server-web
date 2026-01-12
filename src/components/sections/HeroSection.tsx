import React from 'react';
import { Zap, Copy, Check } from 'lucide-react';
import { SERVER_CONFIG } from '@/constants/server';

interface HeroSectionProps {
  isDark: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ isDark }) => {
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
      <div className="theme-card rounded-xl p-6 h-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
              isDark
                ? 'bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan'
                : 'bg-cream-primary/10 border border-cream-primary/30 text-cream-primary'
            }`}>
              <Zap size={12} className="animate-pulse" />
              开黑集结
            </div>

            <h2 className={`text-2xl md:text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-cream-text'}`}>
              黑暗降临，
              <span className="gradient-text">该你登场了</span>
            </h2>

            <p className={`text-sm mb-5 ${isDark ? 'text-cyber-text-secondary' : 'text-cream-text-secondary'}`}>
              加入我们的语音服务器，与队友实时沟通
            </p>

            {/* Server Address */}
            <div className="flex items-center gap-2">
              <code className={`px-4 py-2 rounded-lg font-mono text-sm backdrop-blur-sm ${
                isDark
                  ? 'bg-cyber-bg-deep/60 border border-cyber-border text-cyber-cyan'
                  : 'bg-cream-bg-deep border border-cream-border text-cream-primary'
              }`}>
                {SERVER_CONFIG.address}
              </code>
              <button
                onClick={handleCopy}
                className={`p-2 rounded-lg transition-all duration-200 border border-transparent ${
                  isDark
                    ? 'hover:bg-cyber-cyan/10 text-cyber-text-muted hover:text-cyber-cyan hover:border-cyber-cyan/30'
                    : 'hover:bg-cream-primary/10 text-cream-text-muted hover:text-cream-primary hover:border-cream-primary/30'
                }`}
              >
                {copied ? (
                  <Check size={16} className={isDark ? 'text-cyber-success' : 'text-cream-success'} />
                ) : (
                  <Copy size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Connect Button */}
          <button
            onClick={handleConnect}
            className="theme-btn font-bold rounded-xl px-6 py-3 flex items-center justify-center gap-2"
          >
            <Zap size={18} />
            一键连接
          </button>
        </div>
      </div>
    </div>
  );
};
