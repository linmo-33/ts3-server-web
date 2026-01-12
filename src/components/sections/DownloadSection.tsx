import React, { useState } from 'react';
import { Download, HelpCircle } from 'lucide-react';
import { DOWNLOAD_LINKS } from '@/constants/downloads';
import { InstallGuideModal, PatchGuideModal } from './GuideModals';

interface DownloadSectionProps {
  isDark: boolean;
}

export const DownloadSection: React.FC<DownloadSectionProps> = ({ isDark }) => {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showPatchGuide, setShowPatchGuide] = useState(false);

  const primaryDownload = DOWNLOAD_LINKS.find((d) => d.isPrimary) || DOWNLOAD_LINKS[0];
  const backupDownload = DOWNLOAD_LINKS.find((d) => !d.isPrimary);

  return (
    <div className="lg:col-span-1">
      <div className="theme-card rounded-xl p-5 h-full flex flex-col">
        {/* Title */}
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-cream-text'}`}>客户端下载</h3>
          <button
            onClick={() => setShowInstallGuide(true)}
            className={`transition-colors ${
              isDark
                ? 'text-cyber-text-muted hover:text-cyber-cyan'
                : 'text-cream-text-muted hover:text-cream-primary'
            }`}
          >
            <HelpCircle size={16} />
          </button>
        </div>

        <p className={`text-xs mb-4 ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
          推荐版本 {primaryDownload.version}
        </p>

        {/* Main Download */}
        <a
          href={primaryDownload.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 p-3 rounded-xl transition-all group ${
            isDark
              ? 'bg-cyber-bg-deep/40 hover:bg-cyber-cyan/5 border border-cyber-border hover:border-cyber-cyan/30'
              : 'bg-cream-bg-deep hover:bg-cream-primary/5 border border-cream-border hover:border-cream-primary/30'
          }`}
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-lg ${
            isDark
              ? 'bg-gradient-to-br from-cyber-cyan to-cyber-purple shadow-cyber-cyan/20'
              : 'bg-gradient-to-br from-cream-primary to-cream-secondary shadow-cream-primary/20'
          }`}>
            <Download size={18} className={isDark ? 'text-cyber-bg' : 'text-white'} />
          </div>
          <div className="flex-1">
            <div className={`font-medium text-sm ${isDark ? 'text-white' : 'text-cream-text'}`}>Windows 64-bit</div>
            <div className={`text-xs ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>官方下载</div>
          </div>
          <span className={`opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-cyber-cyan' : 'text-cream-primary'}`}>→</span>
        </a>

        {/* Bottom Links */}
        <div className={`text-xs flex items-center gap-3 mt-auto pt-4 border-t ${
          isDark ? 'text-cyber-text-muted border-cyber-border' : 'text-cream-text-muted border-cream-border'
        }`}>
          {backupDownload && (
            <a
              href={backupDownload.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-colors ${isDark ? 'hover:text-cyber-text-secondary' : 'hover:text-cream-text-secondary'}`}
            >
              备用下载
            </a>
          )}
          <span className="opacity-50">|</span>
          <button
            onClick={() => setShowPatchGuide(true)}
            className={`transition-colors ${isDark ? 'text-cyber-purple hover:text-cyber-pink' : 'text-cream-secondary hover:text-cream-primary'}`}
          >
            汉化包
          </button>
        </div>
      </div>

      <InstallGuideModal isOpen={showInstallGuide} onClose={() => setShowInstallGuide(false)} isDark={isDark} />
      <PatchGuideModal isOpen={showPatchGuide} onClose={() => setShowPatchGuide(false)} isDark={isDark} />
    </div>
  );
};
