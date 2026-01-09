import React, { useState } from 'react';
import { Download, Grid3X3, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { DOWNLOAD_LINKS } from '@/constants/downloads';
import { InstallGuideModal, PatchGuideModal } from './GuideModals';

export const DownloadSection: React.FC = () => {
  const [showInstallGuide, setShowInstallGuide] = useState(false);
  const [showPatchGuide, setShowPatchGuide] = useState(false);

  const primaryDownload = DOWNLOAD_LINKS.find((d) => d.isPrimary) || DOWNLOAD_LINKS[0];
  const backupDownload = DOWNLOAD_LINKS.find((d) => !d.isPrimary);

  return (
    <div className="lg:col-span-1 flex">
      <Card className="flex-1 flex flex-col">
        <div className="p-5 flex-1 flex flex-col">
          {/* Title */}
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <Grid3X3 size={14} className="text-purple-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">客户端下载</h3>
            </div>
            <button
              onClick={() => setShowInstallGuide(true)}
              className="text-slate-400 hover:text-purple-500 transition-colors"
              title="安装指南"
            >
              <HelpCircle size={14} />
            </button>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-xs mb-3">
            推荐使用 {primaryDownload.version}
          </p>

          {/* Main Download */}
          <a
            href={primaryDownload.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-purple-50 dark:hover:bg-purple-900/20 border border-transparent hover:border-purple-200 dark:hover:border-purple-800 transition-all group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Download size={18} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white text-sm">Windows 64-bit</div>
                <div className="text-xs text-slate-400">官方下载</div>
              </div>
            </div>
            <div className="text-purple-500 group-hover:translate-x-1 transition-transform">
              →
            </div>
          </a>

          {/* Bottom Links */}
          <div className="text-xs text-slate-400 flex items-center gap-3 mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
            {backupDownload && (
              <a
                href={backupDownload.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-500 transition-colors"
              >
                备用下载
              </a>
            )}
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <button
              onClick={() => setShowPatchGuide(true)}
              className="text-purple-500 hover:text-purple-600 transition-colors"
            >
              汉化包
            </button>
          </div>
        </div>
      </Card>

      {/* Modals */}
      <InstallGuideModal isOpen={showInstallGuide} onClose={() => setShowInstallGuide(false)} />
      <PatchGuideModal isOpen={showPatchGuide} onClose={() => setShowPatchGuide(false)} />
    </div>
  );
};
