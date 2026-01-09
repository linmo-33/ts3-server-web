import React from 'react';
import { Download, Zap, Check } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { CHINESE_PATCH_URL } from '@/constants/downloads';

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="TeamSpeak 3 安装指南">
      <div className="space-y-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 flex items-center justify-center font-bold">
            1
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">下载客户端</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              点击右侧的下载按钮，根据你的操作系统选择对应版本（通常为 Windows 64-bit）。
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 flex items-center justify-center font-bold">
            2
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">运行安装程序</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              双击下载的 .exe 文件，一路点击 "Next" 直至完成。首次启动时会要求你接受许可协议。
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-200 flex items-center justify-center font-bold">
            3
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white">创建身份</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              设置你的昵称和安全等级（Security Level），建议提升至 25 级以上以进入更多服务器。
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

interface PatchGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatchGuideModal: React.FC<PatchGuideModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="中文汉化包使用教程">
      <div className="space-y-6">
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 p-3 rounded-lg text-sm text-orange-800 dark:text-orange-200">
          ⚠️ 注意：安装汉化包前请彻底关闭 TeamSpeak 客户端。
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Download size={16} /> 步骤 1: 获取文件
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              前往{' '}
              <a
                href={CHINESE_PATCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 underline"
              >
                Github 发布页
              </a>{' '}
              下载最新的 `.ts3_plugin` 或压缩包文件。
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Zap size={16} /> 步骤 2: 一键安装
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              直接双击运行，点击 "Install" 即可。
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Check size={16} /> 步骤 3: 切换语言
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              启动 TS3，如果未自动切换，请前往 <code>Tools</code> -&gt; <code>Options</code>{' '}
              -&gt; <code>Application</code>，在 Language 下拉菜单中选择 "Chinese"。
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
