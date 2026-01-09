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
import { Card } from '@/components/ui/Card';
import type { ServerStats } from '@/types';

interface StatsChartProps {
  loading: boolean;
  stats: ServerStats;
}

export const StatsChart: React.FC<StatsChartProps> = ({ loading, stats }) => {
  const hasHistory = stats.history && stats.history.length > 0;

  return (
    <div className="lg:col-span-2">
      <Card className="h-[380px] flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-50 dark:bg-purple-900/20 rounded-xl text-purple-600 dark:text-purple-400">
              <Activity size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">服务器状态</h3>
              <p className="text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                Server Status
              </p>
            </div>
          </div>
        </div>

        {/* 状态指标卡片 */}
        <div className="grid grid-cols-3 gap-4 mb-5">
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-4 text-center border border-purple-100 dark:border-purple-800/30">
            <Users size={18} className="mx-auto mb-2 text-purple-500" />
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {loading ? '-' : stats.onlineCount}
              <span className="text-xs font-normal text-slate-500">/{stats.maxSlots}</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">在线人数</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 text-center border border-blue-100 dark:border-blue-800/30">
            <Clock size={18} className="mx-auto mb-2 text-blue-500" />
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {loading ? '-' : stats.uptime}
            </div>
            <div className="text-xs text-slate-500 mt-1">运行时间</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl p-4 text-center border border-emerald-100 dark:border-emerald-800/30">
            <Wifi size={18} className="mx-auto mb-2 text-emerald-500" />
            <div className="text-xl font-bold text-slate-900 dark:text-white">
              {loading ? '-' : `${stats.ping}ms`}
            </div>
            <div className="text-xs text-slate-500 mt-1">延迟</div>
          </div>
        </div>

        {/* 趋势图 */}
        <div className="flex-1 w-full min-h-0">
          {!hasHistory ? (
            <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-500">
              <div className="text-center">
                <Activity size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">数据收集中...</p>
                <p className="text-xs">每30秒更新一次</p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.history}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                  className="dark:opacity-10"
                />
                <XAxis
                  dataKey="time"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  dy={5}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: '#94a3b8' }}
                  allowDecimals={false}
                  domain={[0, 'auto']}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '12px',
                    border: 'none',
                    boxShadow: '0 4px 20px -1px rgb(0 0 0 / 0.15)',
                    fontSize: '12px',
                    background: 'white',
                  }}
                  formatter={(value: number) => [`${value} 人`, '在线']}
                  cursor={{ stroke: '#a855f7', strokeWidth: 1, strokeDasharray: '4 4' }}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="#a855f7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorCount)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
};
