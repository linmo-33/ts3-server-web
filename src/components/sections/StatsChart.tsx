import React from 'react';
import { Activity } from 'lucide-react';
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
}

export const StatsChart: React.FC<StatsChartProps> = ({ stats }) => {
  const hasHistory = stats.history && stats.history.length > 0;

  // Theme colors
  const chartColors = {
    primary: '#22C55E',
    secondary: '#16A34A',
    grid: 'rgba(31, 41, 55, 0.1)',
    tick: '#6B7280',
    tooltipBg: '#FFFFFF',
    tooltipBorder: '#1F2937',
  };

  return (
    <div className="lg:col-span-2">
      <div className="theme-card p-6 h-[280px] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-fresh-primary text-white"
               style={{ border: '2px solid #1F2937', boxShadow: '2px 2px 0px #1F2937' }}>
            <Activity size={16} />
          </div>
          <div>
            <h3 className="font-bold text-fresh-text">在线趋势</h3>
            <span className="text-xs text-fresh-text-muted">实时更新</span>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 w-full min-h-0 rounded-xl p-3"
             style={{ background: '#FAFAF9', border: '2px solid #1F2937' }}>
          {!hasHistory ? (
            <div className="h-full flex items-center justify-center text-fresh-text-muted">
              <div className="text-center">
                <Activity size={28} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">数据收集中...</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.history}>
                <defs>
                  <linearGradient id="colorCount-fresh" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={chartColors.primary} stopOpacity={0.4} />
                    <stop offset="95%" stopColor={chartColors.primary} stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={chartColors.grid} />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: chartColors.tick, fontWeight: 500 }}
                  dy={5}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: chartColors.tick, fontWeight: 500 }}
                  allowDecimals={false}
                  domain={[0, 'auto']}
                  width={30}
                />
                <Tooltip
                  contentStyle={{
                    background: chartColors.tooltipBg,
                    border: `2px solid ${chartColors.tooltipBorder}`,
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#1F2937',
                    boxShadow: '4px 4px 0px #1F2937',
                  }}
                  formatter={(value: number) => [`${value} 人`, '在线']}
                  cursor={{ stroke: chartColors.primary, strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke={chartColors.primary}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorCount-fresh)"
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
