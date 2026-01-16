import React, { useState } from 'react';
import { Download, HelpCircle, ArrowRight } from 'lucide-react';
import { DOWNLOAD_LINKS } from '@/constants/downloads';
import { InstallGuideModal, PatchGuideModal } from './GuideModals';

const quickStartSteps = [
  { step: 1, text: '下载客户端' },
  { step: 2, text: '安装并启动' },
  { step: 3, text: '点击快速连接' },
];

export const DownloadSection: React.FC = () => {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showPatchGuide, setShowPatchGuide] = useState(false);

  const primaryDownload = DOWNLOAD_LINKS.find((d) => d.isPrimary) || DOWNLOAD_LINKS[0];
  const backupDownload = DOWNLOAD_LINKS.find((d) => !d.isPrimary);

  return (
    <div className="lg:col-span-1">
      <div className="theme-card p-6 h-full flex flex-col">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-fresh-text">客户端下载</h3>
          <button
            onClick={() => setShowInstallGuide(true)}
            className="p-1.5 rounded-lg transition-all text-fresh-text-muted hover:text-fresh-primary hover:bg-fresh-primary/10"
          >
            <HelpCircle size={18} />
          </button>
        </div>

        <p className="text-sm mb-4 text-fresh-text-muted">
          推荐版本 <span className="font-bold text-fresh-text">{primaryDownload.version}</span>
        </p>

        {/* Main Download */}
        <a
          href={primaryDownload.url}
          target="_blank"
          rel="noopener noreferrer"
          className="download-item flex items-center gap-3 p-4 group"
        >
          <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-fresh-primary text-white"
               style={{ border: '2px solid #1F2937' }}>
            <Download size={20} />
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm text-fresh-text">Windows 64-bit</div>
            <div className="text-xs text-fresh-text-muted">官方下载</div>
          </div>
          <ArrowRight size={18} className="text-fresh-text-muted group-hover:text-fresh-primary transition-colors" />
        </a>
        {/* Bottom Links */}
        <div className="text-sm flex items-center gap-4 mt-auto pt-4 border-t-2 border-fresh-text/10 text-fresh-text-muted">
          {backupDownload && (
            <a
              href={backupDownload.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium transition-colors hover:text-fresh-text"
            >
              备用下载
            </a>
          )}
          <span className="text-fresh-text/20">|</span>
          <button
            onClick={() => setShowPatchGuide(true)}
            className="font-medium transition-colors text-fresh-accent hover:text-fresh-accent-deep"
          >
            汉化包
          </button>
        </div>
      </div>

      <InstallGuideModal isOpen={showInstallGuide} onClose={() => setShowInstallGuide(false)} />
      <PatchGuideModal isOpen={showPatchGuide} onClose={() => setShowPatchGuide(false)} />
    </div>
  );
};
