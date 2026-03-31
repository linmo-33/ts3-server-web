// ==========================================
// 🏷️ TYPE DEFINITIONS
// ==========================================

import type { ReactNode, ElementType } from 'react'

/** 服务器配置 */
export interface ServerConfig {
  name: string;
  description: string;
  address: string;
  displayChannelNames: string[];
}

/** 用户信息 */
export interface User {
  id: number;
  nickname: string;
  badge?: string;
  avatar?: string;
  channel: string;
  status: UserStatus;
}

/** 用户状态 */
export type UserStatus = 'online' | 'away' | 'mic-muted';

/** 服务器统计数据 */
export interface ServerStats {
  onlineCount: number;
  maxSlots: number;
  uptime: string;
  ping: number;
  packetLoss: number;
}

/** 操作系统类型 */
export enum OS {
  WINDOWS = 'Windows',
  MAC = 'macOS',
  LINUX = 'Linux',
  ANDROID = 'Android',
  IOS = 'iOS',
}

/** 下载链接 */
export interface DownloadLink {
  os: OS;
  url: string;
  version: string;
  isPrimary?: boolean;
}

/** 指导模态框类型 */
export type GuideType = 'install' | 'patch' | null;

/** UI 组件 Props 类型 */
export interface ButtonProps {
  children?: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  icon?: ElementType;
}

export interface CardProps {
  children?: ReactNode;
  className?: string;
}

export interface BadgeProps {
  children?: ReactNode;
  color?: 'gray' | 'green' | 'red' | 'teal' | 'indigo';
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: ReactNode;
}
