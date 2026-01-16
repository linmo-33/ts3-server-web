'use client';

import { useEffect, useState } from 'react';
import { Gamepad2, Headphones, Star, Zap, Music, Heart, Sparkles, Trophy } from 'lucide-react';

interface MousePosition {
  x: number;
  y: number;
}

export function FloatingIcons() {
  const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // 计算鼠标相对于窗口中心的偏移量
      const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
      const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 右侧图标配置
  const rightIcons = [
    { Icon: Gamepad2, color: 'text-red-500', bg: 'floating-icon-coral', top: '12%', right: '6%', parallax: 15 },
    { Icon: Star, color: 'text-yellow-600', bg: 'floating-icon-yellow', top: '40%', right: '4%', parallax: 20 },
    { Icon: Trophy, color: 'text-purple-500', bg: 'floating-icon-purple', top: '65%', right: '7%', parallax: 12 },
    { Icon: Heart, color: 'text-pink-500', bg: 'floating-icon-pink', top: '85%', right: '5%', parallax: 18 },
  ];

  // 左侧图标配置
  const leftIcons = [
    { Icon: Headphones, color: 'text-green-600', bg: 'floating-icon-green', top: '18%', left: '5%', parallax: 18 },
    { Icon: Zap, color: 'text-blue-500', bg: 'floating-icon-blue', top: '45%', left: '4%', parallax: 14 },
    { Icon: Music, color: 'text-orange-500', bg: 'floating-icon-orange', top: '70%', left: '6%', parallax: 22 },
    { Icon: Sparkles, color: 'text-cyan-500', bg: 'floating-icon-cyan', top: '90%', left: '5%', parallax: 16 },
  ];

  return (
    <div className="hidden lg:block">
      {/* 右侧图标 */}
      {rightIcons.map((icon, index) => (
        <div
          key={`right-${index}`}
          className={`floating-icon ${icon.bg}`}
          style={{
            top: icon.top,
            right: icon.right,
            transform: `translate(${mousePos.x * icon.parallax}px, ${mousePos.y * icon.parallax}px)`,
          }}
        >
          <icon.Icon size={24} className={icon.color} />
        </div>
      ))}

      {/* 左侧图标 */}
      {leftIcons.map((icon, index) => (
        <div
          key={`left-${index}`}
          className={`floating-icon ${icon.bg}`}
          style={{
            top: icon.top,
            left: icon.left,
            transform: `translate(${mousePos.x * icon.parallax}px, ${mousePos.y * icon.parallax}px)`,
          }}
        >
          <icon.Icon size={24} className={icon.color} />
        </div>
      ))}
    </div>
  );
}
