import type { Metadata } from 'next';
import { Fredoka, Noto_Sans_SC } from 'next/font/google';
import './globals.css';

const fredoka = Fredoka({
  variable: '--font-fredoka',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const notoSansSC = Noto_Sans_SC({
  variable: '--font-noto-sc',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_SERVER_NAME || 'TeamSpeak Server Hub',
  description: process.env.NEXT_PUBLIC_SERVER_DESCRIPTION || '欢迎来到我们的游戏语音社区，与队友实时沟通。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={`${fredoka.className} ${fredoka.variable} ${notoSansSC.variable} bg-fresh-bg text-fresh-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
