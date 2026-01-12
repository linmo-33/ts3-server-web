import React from "react";
import { Download, Zap, Check } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { CHINESE_PATCH_URL } from "@/constants/downloads";

interface InstallGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export const InstallGuideModal: React.FC<InstallGuideModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="TeamSpeak 3 安装指南"
      isDark={isDark}
    >
      <div className="space-y-4">
        <div className="flex gap-4">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
              isDark
                ? "bg-gradient-to-br from-cyber-cyan to-cyber-purple text-cyber-bg shadow-cyber-cyan/20"
                : "bg-gradient-to-br from-cream-primary to-cream-secondary text-white shadow-cream-primary/20"
            }`}
          >
            1
          </div>
          <div>
            <h4
              className={`font-bold ${
                isDark ? "text-white" : "text-cream-text"
              }`}
            >
              下载客户端
            </h4>
            <p
              className={`text-sm mt-1 ${
                isDark
                  ? "text-cyber-text-secondary"
                  : "text-cream-text-secondary"
              }`}
            >
              点击右侧的下载按钮，根据你的操作系统选择对应版本（通常为 Windows
              64-bit）。
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
              isDark
                ? "bg-gradient-to-br from-cyber-purple to-cyber-pink text-white shadow-cyber-purple/20"
                : "bg-gradient-to-br from-cream-secondary to-cream-primary text-white shadow-cream-secondary/20"
            }`}
          >
            2
          </div>
          <div>
            <h4
              className={`font-bold ${
                isDark ? "text-white" : "text-cream-text"
              }`}
            >
              运行安装程序
            </h4>
            <p
              className={`text-sm mt-1 ${
                isDark
                  ? "text-cyber-text-secondary"
                  : "text-cream-text-secondary"
              }`}
            >
              双击下载的 .exe 文件，一路点击 &quot;Next&quot;
              直至完成。首次启动时会要求你接受许可协议。
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-lg ${
              isDark
                ? "bg-gradient-to-br from-cyber-pink to-cyber-cyan text-cyber-bg shadow-cyber-pink/20"
                : "bg-gradient-to-br from-cream-primary-light to-cream-secondary-light text-cream-text shadow-cream-primary/20"
            }`}
          >
            3
          </div>
          <div>
            <h4
              className={`font-bold ${
                isDark ? "text-white" : "text-cream-text"
              }`}
            >
              创建身份
            </h4>
            <p
              className={`text-sm mt-1 ${
                isDark
                  ? "text-cyber-text-secondary"
                  : "text-cream-text-secondary"
              }`}
            >
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
  isDark: boolean;
}

export const PatchGuideModal: React.FC<PatchGuideModalProps> = ({
  isOpen,
  onClose,
  isDark,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="中文汉化包使用教程"
      isDark={isDark}
    >
      <div className="space-y-6">
        <div
          className={`p-3 rounded-lg text-sm ${
            isDark
              ? "bg-cyber-warning/10 border border-cyber-warning/30 text-cyber-warning"
              : "bg-cream-warning/10 border border-cream-warning/30 text-cream-warning"
          }`}
        >
          ⚠️ 注意：安装汉化包前请彻底关闭 TeamSpeak 客户端。
        </div>

        <div className="space-y-4">
          <div>
            <h4
              className={`font-bold flex items-center gap-2 ${
                isDark ? "text-white" : "text-cream-text"
              }`}
            >
              <Download
                size={16}
                className={isDark ? "text-cyber-cyan" : "text-cream-primary"}
              />{" "}
              步骤 1: 获取文件
            </h4>
            <p
              className={`text-sm mt-1 ${
                isDark
                  ? "text-cyber-text-secondary"
                  : "text-cream-text-secondary"
              }`}
            >
              点击{" "}
              <a
                href={CHINESE_PATCH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={`underline transition-colors ${
                  isDark
                    ? "text-cyber-cyan hover:text-cyber-pink"
                    : "text-cream-primary hover:text-cream-secondary"
                }`}
              >
                下载汉化包
              </a>{" "}
              下载最新的{" "}
              <code
                className={`px-1.5 py-0.5 rounded text-xs ${
                  isDark
                    ? "bg-cyber-bg-deep text-cyber-purple"
                    : "bg-cream-bg-deep text-cream-secondary"
                }`}
              >
                .ts3_plugin
              </code>{" "}
              或压缩包文件。
            </p>
          </div>

          <div>
            <h4
              className={`font-bold flex items-center gap-2 ${
                isDark ? "text-white" : "text-cream-text"
              }`}
            >
              <Zap
                size={16}
                className={
                  isDark ? "text-cyber-purple" : "text-cream-secondary"
                }
              />{" "}
              步骤 2: 一键安装
            </h4>
            <p
              className={`text-sm mt-1 ${
                isDark
                  ? "text-cyber-text-secondary"
                  : "text-cream-text-secondary"
              }`}
            >
              直接双击运行，点击 &quot;Install&quot; 即可。
            </p>
          </div>

          <div>
            <h4
              className={`font-bold flex items-center gap-2 ${
                isDark ? "text-white" : "text-cream-text"
              }`}
            >
              <Check
                size={16}
                className={isDark ? "text-cyber-success" : "text-cream-success"}
              />{" "}
              步骤 3: 切换语言
            </h4>
            <p
              className={`text-sm mt-1 ${
                isDark
                  ? "text-cyber-text-secondary"
                  : "text-cream-text-secondary"
              }`}
            >
              启动 TS3，如果未自动切换，请前往{" "}
              <code
                className={`px-1.5 py-0.5 rounded text-xs ${
                  isDark
                    ? "bg-cyber-bg-deep text-cyber-cyan"
                    : "bg-cream-bg-deep text-cream-primary"
                }`}
              >
                Tools
              </code>{" "}
              →{" "}
              <code
                className={`px-1.5 py-0.5 rounded text-xs ${
                  isDark
                    ? "bg-cyber-bg-deep text-cyber-cyan"
                    : "bg-cream-bg-deep text-cream-primary"
                }`}
              >
                Options
              </code>{" "}
              →{" "}
              <code
                className={`px-1.5 py-0.5 rounded text-xs ${
                  isDark
                    ? "bg-cyber-bg-deep text-cyber-cyan"
                    : "bg-cream-bg-deep text-cream-primary"
                }`}
              >
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
