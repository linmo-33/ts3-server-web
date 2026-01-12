import React from 'react';
import { Activity, Users, Clock, Wifi } from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { ServerStats } from '@/types';

interface StatsChartProps {
  loading: boolean;
  stats: ServerStats;
  isDark: boolean;
}

export const StatsChart: React.FC<StatsChartProps> = ({ loading, stats, isDark }) => {
  const hasHistory = stats.history && stats.history.length > 0;

  // Theme-aware colors
  const chartColors = isDark
    ? {
        primary: '#00F5FF',
        secondary: '#BF00FF',
        grid: 'rgba(0, 245, 255, 0.05)',
        tick: '#6B6B8A',
        tooltipBg: 'rgba(20, 20, 40, 0.95)',
        tooltipBorder: 'rgba(0, 245, 255, 0.3)',
      }
    : {
        primary: '#FF8A65',
        secondary: '#B39DDB',
        grid: 'rgba(93, 78, 55, 0.08)',
        tick: '#8B7355',
        tooltipBg: 'rgba(255, 255, 255, 0.98)',
        tooltipBorder: 'rgba(255, 138, 101, 0.3)',
      };

  return (
    <div className="lg:col-span-2">
      <div className="theme-card rounded-xl p-6 h-[380px] flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <div className={`p-2 rounded-lg border ${
            isDark
              ? 'bg-cyber-cyan/10 border-cyber-cyan/20'
              : 'bg-cream-primary/10 border-cream-primary/20'
          }`}>
            <Activity size={18} className={isDark ? 'text-cyber-cyan' : 'text-cream-primary'} />
          </div>
          <h3 className={`font-bold ${isDark ? 'text-white' : 'text-cream-text'}`}>服务器状态</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className={`rounded-xl p-4 text-center transition-colors ${
            isDark
              ? 'bg-cyber-bg-deep/40 border border-cyber-border hover:border-cyber-cyan/30'
              : 'bg-cream-bg-deep border border-cream-border hover:border-cream-primary/30'
          }`}>
            <Users size={18} className={`mx-auto mb-2 ${isDark ? 'text-cyber-cyan' : 'text-cream-primary'}`} />
            <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-cream-text'}`}>
              {loading ? '-' : stats.onlineCount}
              <span className={`text-sm font-normal ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>/{stats.maxSlots}</span>
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>在线人数</div>
          </div>
          <div className={`rounded-xl p-4 text-center transition-colors ${
            isDark
              ? 'bg-cyber-bg-deep/40 border border-cyber-border hover:border-cyber-purple/30'
              : 'bg-cream-bg-deep border border-cream-border hover:border-cream-secondary/30'
          }`}>
            <Clock size={18} className={`mx-auto mb-2 ${isDark ? 'text-cyber-purple' : 'text-cream-secondary'}`} />
            <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-cream-text'}`}>
              {loading ? '-' : stats.uptime}
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>运行时间</div>
          </div>
          <div className={`rounded-xl p-4 text-center transition-colors ${
            isDark
              ? 'bg-cyber-bg-deep/40 border border-cyber-border hover:border-cyber-success/30'
              : 'bg-cream-bg-deep border border-cream-border hover:border-cream-success/30'
          }`}>
            <Wifi size={18} className={`mx-auto mb-2 ${isDark ? 'text-cyber-success' : 'text-cream-success'}`} />
            <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-cream-text'}`}>
              {loading ? '-' : `${stats.ping}ms`}
            </div>
            <div className={`text-xs mt-1 ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>延迟</div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 w-full min-h-0">
          {!hasHistory ? (
            <div className={`h-full flex items-center justify-center ${isDark ? 'text-cyber-text-muted' : 'text-cream-text-muted'}`}>
              <div className="text-center">
                <Activity size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">数据收集中...</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.history}>
                <defs>
                  <linearGradient id={`colorCount-${isDark ? 'dark' : 'light'}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.3} />
                    <stop offset="50%" stopColor={chartColors.secondary} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: chartColors.tick }}
                  dy={5}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: chartColors.tick }}
                  allowDecimals={false}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  contentStyle={{
                    background: chartColors.tooltipBg,
                    border: `1px solid ${chartColors.tooltipBorder}`,
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: isDark ? '#fff' : '#5D4E37',
                    boxShadow: isDark ? '0 0 20px rgba(0, 245, 255, 0.2)' : '0 4px 20px rgba(93, 78, 55, 0.1)',
                  }}
                  formatter={(value: number) => [`${value} 人`, '在线']}
                  cursor={{ stroke: chartColors.primary, strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke={chartColors.primary}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill={`url(#colorCount-${isDark ? 'dark' : 'light'})`}
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};
