import React from "react";
import { Download, Zap, Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { CHINESE_PATCH_URL } from "@/constants/downloads";

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="TeamSpeak 3 安装指南"
    >
      <div className="space-y-5">
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm bg-fresh-primary text-white"
               style={{ border: '2px solid #1F2937', boxShadow: '2px 2px 0px #1F2937' }}>
            1
          </div>
          <div>
            <h4 className="font-bold text-fresh-text">
              下载客户端
            </h4>
            <p className="text-sm mt-1 text-fresh-text-muted">
              点击下载按钮，下载客户端（备用链接中点击&quot;Continue without logging in&quot;进入下载页面）
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm bg-fresh-accent text-white"
               style={{ border: '2px solid #1F2937', boxShadow: '2px 2px 0px #1F2937' }}>
            2
          </div>
          <div>
            <h4 className="font-bold text-fresh-text">
              运行安装程序
            </h4>
            <p className="text-sm mt-1 text-fresh-text-muted">
              双击下载的 .exe 文件，一路点击 &quot;Next&quot;
              直至完成。首次启动时会要求你接受许可协议。
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-white"
               style={{ background: '#60A5FA', border: '2px solid #1F2937', boxShadow: '2px 2px 0px #1F2937' }}>
            3
          </div>
          <div>
            <h4 className="font-bold text-fresh-text">
              创建身份
            </h4>
            <p className="text-sm mt-1 text-fresh-text-muted">
              设置你的昵称和安全等级（Security Level），建议提升至 25
              级以上以进入更多服务器。
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

export const PatchGuideModal: React.FC<PatchGuideModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="中文汉化包使用教程"
    >
      <div className="space-y-6">
        <div className="p-4 rounded-xl text-sm font-medium"
             style={{ background: '#FEF3C7', border: '2px solid #1F2937', boxShadow: '3px 3px 0px #1F2937' }}>
          ⚠️ 注意：安装汉化包前请彻底关闭 TeamSpeak 客户端。
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-bold flex items-center gap-2 text-fresh-text">
              <Download size={18} className="text-fresh-primary" />{" "}
              步骤 1: 获取文件
            </h4>
            <p className="text-sm mt-2 text-fresh-text-muted">
              点击{" "}
              <a
                href={CHINESE_PATCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline transition-colors text-fresh-primary hover:text-fresh-accent"
              >
                下载汉化包
              </a>{" "}
              下载最新的{" "}
              <code className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ background: '#DCFCE7', border: '1px solid #1F2937' }}>
                .ts3_plugin
              </code>{" "}
              或压缩包文件。
            </p>
          </div>

          <div>
            <h4 className="font-bold flex items-center gap-2 text-fresh-text">
              <Zap size={18} className="text-fresh-accent" />{" "}
              步骤 2: 一键安装
            </h4>
            <p className="text-sm mt-2 text-fresh-text-muted">
              直接双击运行，点击 &quot;Install&quot; 即可。
            </p>
          </div>

          <div>
            <h4 className="font-bold flex items-center gap-2 text-fresh-text">
              <Check size={18} className="text-fresh-success" />{" "}
              步骤 3: 切换语言
            </h4>
            <p className="text-sm mt-2 text-fresh-text-muted">
              启动 TS3，如果未自动切换，请前往{" "}
              <code className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ background: '#DBEAFE', border: '1px solid #1F2937' }}>
                Tools
              </code>{" "}
              →{" "}
              <code className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ background: '#DBEAFE', border: '1px solid #1F2937' }}>
                Options
              </code>{" "}
              →{" "}
              <code className="px-2 py-1 rounded-lg text-xs font-bold"
                    style={{ background: '#DBEAFE', border: '1px solid #1F2937' }}>
                Application
              </code>
              ，在 Language 下拉菜单中选择 &quot;Chinese&quot;。
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
