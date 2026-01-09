import React, { useState } from 'react';
import { Download, HelpCircle } from 'lucide-react';
import { DOWNLOAD_LINKS } from '@/constants/downloads';
import { InstallGuideModal, PatchGuideModal } from './GuideModals';

export const DownloadSection: React.FC = () => {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showPatchGuide, setShowPatchGuide] = useState(false);

  const primaryDownload = DOWNLOAD_LINKS.find((d) => d.isPrimary) || DOWNLOAD_LINKS[0];
  const backupDownload = DOWNLOAD_LINKS.find((d) => !d.isPrimary);

  return (
    <div className="lg:col-span-1">
      <div className="gaming-card rounded-xl p-5 h-full flex flex-col">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-white">客户端下载</h3>
          <button
            onClick={() => setShowInstallGuide(true)}
            className="text-zinc-600 hover:text-red-400 transition-colors"
          >
            <HelpCircle size={16} />
          </button>
        </div>

        <p className="text-zinc-500 text-xs mb-4">
          推荐版本 {primaryDownload.version}
        </p>

        {/* Main Download */}
        <a
          href={primaryDownload.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-black/30 hover:bg-red-500/5 border border-white/5 hover:border-red-500/20 rounded-xl transition-all group"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-600 to-rose-500 flex items-center justify-center">
            <Download size={18} className="text-white" />
          </div>
          <div className="flex-1">
            <div className="font-medium text-white text-sm">Windows 64-bit</div>
            <div className="text-xs text-zinc-600">官方下载</div>
          </div>
          <span className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
        </a>

        {/* Bottom Links */}
        <div className="text-xs text-zinc-600 flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
          {backupDownload && (
            <a
              href={backupDownload.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-400 transition-colors"
            >
              备用下载
            </a>
          )}
          <span className="text-zinc-700">|</span>
          <button
            onClick={() => setShowPatchGuide(true)}
            className="text-red-400 hover:text-red-300 transition-colors"
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
