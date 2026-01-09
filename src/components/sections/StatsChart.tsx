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
}

export const StatsChart: React.FC<StatsChartProps> = ({ loading, stats }) => {
  const hasHistory = stats.history && stats.history.length > 0;

  return (
    <div className="lg:col-span-2">
      <div className="gaming-card rounded-xl p-6 h-[380px] flex flex-col">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-red-500/10 rounded-lg">
            <Activity size={18} className="text-red-400" />
          </div>
          <h3 className="font-bold text-white">服务器状态</h3>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
            <Users size={18} className="mx-auto mb-2 text-red-400" />
            <div className="text-xl font-bold text-white">
              {loading ? '-' : stats.onlineCount}
              <span className="text-sm font-normal text-zinc-600">/{stats.maxSlots}</span>
            </div>
            <div className="text-xs text-zinc-600 mt-1">在线人数</div>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
            <Clock size={18} className="mx-auto mb-2 text-blue-400" />
            <div className="text-xl font-bold text-white">
              {loading ? '-' : stats.uptime}
            </div>
            <div className="text-xs text-zinc-600 mt-1">运行时间</div>
          </div>
          <div className="bg-black/30 border border-white/5 rounded-xl p-4 text-center">
            <Wifi size={18} className="mx-auto mb-2 text-emerald-400" />
            <div className="text-xl font-bold text-white">
              {loading ? '-' : `${stats.ping}ms`}
            </div>
            <div className="text-xs text-zinc-600 mt-1">延迟</div>
          </div>
        </div>

        {/* Chart */}
        <div className="flex-1 w-full min-h-0">
          {!hasHistory ? (
            <div className="h-full flex items-center justify-center text-zinc-600">
              <div className="text-center">
                <Activity size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">数据收集中...</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.history}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255, 255, 255, 0.05)" />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  dy={5}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#71717a' }}
                  allowDecimals={false}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  contentStyle={{
                    background: '#141414',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: '#fff',
                  }}
                  formatter={(value: number) => [`${value} 人`, '在线']}
                  cursor={{ stroke: '#ef4444', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCount)"
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
