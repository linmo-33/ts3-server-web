import React from "react";
import { Copy, Check, ArrowRight } from "lucide-react";
import { SERVER_CONFIG } from "@/constants/server";

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
    <section className="w-full">
      <div className="theme-card p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Left Content */}
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 mb-4 theme-badge-green"
              style={{
                border: "2px solid #1F2937",
                boxShadow: "2px 2px 0px #1F2937",
              }}
            >
              <span
                className="decoration-dot"
                style={{ width: "6px", height: "6px", border: "none" }}
              ></span>
              <span className="text-xs font-bold">开黑集结</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-black mb-3 text-fresh-text leading-tight">
              黑夜降临，
              <span className="gradient-text">该你登场了!</span>
            </h2>

            <p className="text-base mb-6 text-fresh-text-secondary">
              加入我们的语音服务器，与队友实时沟通
            </p>

            {/* Server Features */}
            <div className="flex flex-wrap gap-2 mb-6">
              {['低延迟', '高音质', '全天候在线', '免费使用'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-bold rounded-full bg-white text-fresh-text"
                  style={{
                    border: '2px solid #1F2937',
                    boxShadow: '2px 2px 0px #1F2937',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Server Address */}
            <div className="flex items-center gap-3">
              <code
                className="theme-input px-4 py-2.5 text-sm font-bold"
                style={{ fontFamily: 'var(--font-fredoka), Fredoka, sans-serif' }}
              >
                {SERVER_CONFIG.address}
              </code>
              <button
                onClick={handleCopy}
                className="p-2.5 rounded-lg transition-all duration-150 bg-white text-fresh-text-muted hover:text-fresh-primary"
                style={{
                  border: "2px solid #1F2937",
                  boxShadow: "2px 2px 0px #1F2937",
                }}
              >
                {copied ? (
                  <Check size={18} className="text-fresh-success" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>

          {/* Connect Button */}
          <button
            onClick={handleConnect}
            className="theme-btn px-8 py-4 flex items-center justify-center gap-2 text-lg"
          >
            Quck Connect
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};
