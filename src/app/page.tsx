'use client';

import { useTS3Data } from '@/hooks/useTS3Data';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { StatsChart } from '@/components/sections/StatsChart';
import { UserList } from '@/components/sections/UserList';
import { Footer } from '@/components/sections/Footer';

export default function HomePage() {
  const { loading, error, stats, users } = useTS3Data(30000);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0f0f0f]"></div>

      {/* Red glow decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-60 h-60 bg-red-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 bg-rose-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Header
            loading={loading}
            onlineCount={stats.onlineCount}
            serverOnline={!error}
          />

          {/* Hero + Download */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <HeroSection />
            <DownloadSection />
          </section>

          {/* Stats + Users */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsChart loading={loading} stats={stats} />
            <UserList loading={loading} users={users} stats={stats} />
          </section>

          <Footer />
        </div>
      </div>
    </div>
  );
}
