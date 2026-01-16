'use client';

import { useTS3Data } from '@/hooks/useTS3Data';
import { Header } from '@/components/sections/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { DownloadSection } from '@/components/sections/DownloadSection';
import { StatsChart } from '@/components/sections/StatsChart';
import { UserList } from '@/components/sections/UserList';
import { Footer } from '@/components/sections/Footer';
import { FloatingIcons } from '@/components/FloatingIcons';
import { ParticleBackground } from '@/components/ParticleBackground';
import { Users, Clock, Wifi, Signal } from 'lucide-react';

export default function HomePage() {
  const { loading, error, stats, users } = useTS3Data(30000);

  return (
    <div className="min-h-screen relative overflow-hidden bg-fresh-bg">
      {/* Grid background */}
      <div className="absolute inset-0 theme-grid"></div>

      {/* Particle background */}
      <ParticleBackground />

      {/* Floating decorative icons with parallax */}
      <FloatingIcons />

      <div className="relative z-10 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <Header
            loading={loading}
            onlineCount={stats.onlineCount}
            serverOnline={!error}
          />

          {/* Hero - Full Width */}
          <HeroSection />

          {/* Stats Row - 4 Cards */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card p-4 text-center">
              <Users size={20} className="mx-auto mb-2 text-fresh-primary" />
              <div className="text-xl font-black text-fresh-text">
                {loading ? '-' : stats.onlineCount}
                <span className="text-xs font-normal text-fresh-text-muted">/{stats.maxSlots}</span>
              </div>
              <div className="text-xs mt-1 font-medium text-fresh-text-muted">在线人数</div>
            </div>
            <div className="stat-card p-4 text-center">
              <Clock size={20} className="mx-auto mb-2 text-fresh-accent" />
              <div className="text-xl font-black text-fresh-text">
                {loading ? '-' : stats.uptime}
              </div>
              <div className="text-xs mt-1 font-medium text-fresh-text-muted">运行时间</div>
            </div>
            <div className="stat-card p-4 text-center">
              <Wifi size={20} className="mx-auto mb-2 text-blue-500" />
              <div className="text-xl font-black text-fresh-text">
                {loading ? '-' : `${stats.ping}ms`}
              </div>
              <div className="text-xs mt-1 font-medium text-fresh-text-muted">延迟</div>
            </div>
            <div className="stat-card p-4 text-center">
              <Signal size={20} className="mx-auto mb-2 text-purple-500" />
              <div className="text-xl font-black text-fresh-text">
                {loading ? '-' : `${stats.packetLoss}%`}
              </div>
              <div className="text-xs mt-1 font-medium text-fresh-text-muted">丢包率</div>
            </div>
          </section>

          {/* Chart + Download - Bento Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <StatsChart loading={loading} stats={stats} />
            <DownloadSection />
          </section>

          {/* Users - Full Width */}
          <UserList loading={loading} users={users} />

          <Footer />
        </div>
      </div>
    </div>
  );
}
