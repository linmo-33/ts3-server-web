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
    url: 'https://domi.teracloud.jp/share/1231d525ce8cde54',
    version: '备用地址',
  },
];

/** 中文汉化包下载地址 */
export const CHINESE_PATCH_URL =
  'https://dl.tmspk.wiki/https:/github.com/VigorousPro/TS3-Translation_zh-CN/releases/download/snapshot/Chinese_Translation_zh-CN.ts3_translation';

