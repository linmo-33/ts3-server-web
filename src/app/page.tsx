'use client';

import { useTS3Data } from '@/hooks/useTS3Data';
import { useTheme } from '@/hooks/useTheme';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { StatsChart } from '@/components/sections/StatsChart';
import { UserList } from '@/components/sections/UserList';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  const { loading, error, stats, users } = useTS3Data(30000);
  const { isDark, toggleTheme, mounted } = useTheme();

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-cyber-bg' : 'bg-cream-bg'}`}>
      {/* Grid background */}
      <div className="absolute inset-0 theme-grid"></div>

      {/* Background gradient */}
      <div className={`absolute inset-0 opacity-80 ${isDark ? 'bg-gradient-to-b from-cyber-bg via-cyber-card to-cyber-bg' : 'bg-gradient-to-b from-cream-bg via-cream-bg-deep to-cream-bg'}`}></div>

      {/* Glow decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {isDark ? (
          <>
            {/* Dark theme: Cyan/Purple glows */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyber-cyan/20 rounded-full blur-[100px] animate-pulse-glow"></div>
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-cyber-purple/15 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-cyber-pink/10 rounded-full blur-[60px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyber-cyan/5 rounded-full blur-[120px]"></div>
          </>
        ) : (
          <>
            {/* Light theme: Warm/Soft glows */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-cream-primary/10 rounded-full blur-[100px]"></div>
            <div className="absolute top-1/4 -right-20 w-80 h-80 bg-cream-secondary/10 rounded-full blur-[80px]"></div>
            <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-cream-primary-light/15 rounded-full blur-[60px]"></div>
          </>
        )}
      </div>

      <div className="relative z-10 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Header
            loading={loading}
            onlineCount={stats.onlineCount}
            serverOnline={!error}
            isDark={isDark}
            onToggleTheme={toggleTheme}
          />

          {/* Hero + Download */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HeroSection isDark={isDark} />
            <DownloadSection isDark={isDark} />
          </section>

          {/* Stats + Users */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsChart loading={loading} stats={stats} isDark={isDark} />
            <UserList loading={loading} users={users} stats={stats} isDark={isDark} />
          </section>

          <Footer isDark={isDark} />
        </div>
      </div>
    </div>
  );
}
