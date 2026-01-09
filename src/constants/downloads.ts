import type { DownloadLink } from '@/types';
import { OS } from '@/types';

/** TeamSpeak 客户端下载链接 */
export const DOWNLOAD_LINKS: DownloadLink[] = [
  {
    os: OS.WINDOWS,
    url: 'https://files.teamspeak-services.com/releases/client/3.6.2/TeamSpeak3-Client-win64-3.6.2.exe',
    version: 'v3.6.2 稳定版',
    isPrimary: true,
  },
  {
    os: OS.WINDOWS,
    url: 'https://github.com/TeamSpeak-Systems/TeamSpeak-3-Client/releases',
    version: 'GitHub 备用',
  },
];

/** 中文汉化包下载地址 */
export const CHINESE_PATCH_URL =
  'https://github.com/VigorousPro/TS3-Translation_zh-CN/releases';

