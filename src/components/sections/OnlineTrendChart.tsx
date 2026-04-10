'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { OnlineTrendPoint } from '@/types/api';

type RangeKey = '30m' | '6h' | '24h';

interface OnlineTrendChartProps {
  loading: boolean;
  history: OnlineTrendPoint[];
  maxSlots: number;
}

const RANGE_OPTIONS: { key: RangeKey; label: string; durationMs: number }[] = [
  { key: '30m', label: '30分钟', durationMs: 30 * 60 * 1000 },
  { key: '6h', label: '6小时', durationMs: 6 * 60 * 60 * 1000 },
  { key: '24h', label: '24小时', durationMs: 24 * 60 * 60 * 1000 },
];

function formatTimeLabel(timestamp: number, range: RangeKey) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    ...(range === '24h' ? { month: 'numeric', day: 'numeric' } : {}),
  }).format(new Date(timestamp));
}

function formatTooltipLabel(timestamp: number) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

export function OnlineTrendChart({
  loading,
  history,
  maxSlots,
}: OnlineTrendChartProps) {
  const [range, setRange] = useState<RangeKey>('6h');
  const selectedRange = RANGE_OPTIONS.find((option) => option.key === range) ?? RANGE_OPTIONS[1];
  const cutoff = Date.now() - selectedRange.durationMs;
  const filteredHistory = history.filter((point) => point.timestamp >= cutoff);
  const chartData = filteredHistory.map((point) => ({
    ...point,
    label: formatTimeLabel(point.timestamp, range),
    utilization: point.maxSlots > 0 ? Math.round((point.onlineCount / point.maxSlots) * 100) : 0,
  }));

  const peakOnline = filteredHistory.reduce(
    (peak, point) => Math.max(peak, point.onlineCount),
    0
  );
  const lowestOnline = filteredHistory.length
    ? filteredHistory.reduce((lowest, point) => Math.min(lowest, point.onlineCount), filteredHistory[0].onlineCount)
    : 0;
  const averageOnline = filteredHistory.length
    ? Math.round(
        filteredHistory.reduce((sum, point) => sum + point.onlineCount, 0) / filteredHistory.length
      )
    : 0;
  const fluctuation = Math.max(peakOnline - lowestOnline, 0);
  const latestPoint = filteredHistory.at(-1) ?? history.at(-1) ?? null;
  const latestUpdateText = latestPoint
    ? new Intl.DateTimeFormat('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(latestPoint.timestamp))
    : '--:--';
  const summaryText = `峰值 ${peakOnline} · 平均 ${averageOnline} · 波动 ${fluctuation}`;

  return (
    <section className="w-full trend-panel">
      <div className="theme-card p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between mb-6">
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-lg bg-fresh-primary text-white"
              style={{
                border: '2px solid var(--theme-ink)',
                boxShadow: '2px 2px 0px var(--theme-ink)',
              }}
            >
              <TrendingUp size={16} />
            </div>
            <div>
              <h3 className="font-bold text-fresh-text">在线人数趋势</h3>
              <span className="text-xs text-fresh-text-muted">Online Trend</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {RANGE_OPTIONS.map((option) => {
              const active = option.key === range;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setRange(option.key)}
                  className="theme-btn-secondary px-3 py-1.5 text-xs font-bold"
                  style={{
                    background: active ? '#DCFCE7' : 'var(--theme-card)',
                    color: active ? '#166534' : 'var(--theme-text)',
                    borderColor: 'var(--theme-ink)',
                  }}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="rounded-[1.25rem] p-4 md:p-5"
          style={{
            background: 'linear-gradient(180deg, rgba(34, 197, 94, 0.08) 0%, rgba(255, 255, 255, 0.16) 100%)',
            border: '2px solid var(--theme-ink)',
          }}
        >
          {loading ? (
            <div className="h-[260px] flex items-center justify-center text-fresh-text-muted">
              <div className="text-center">
                <div className="w-8 h-8 theme-spinner mx-auto mb-3"></div>
                <p className="text-sm font-medium">趋势数据加载中...</p>
              </div>
            </div>
          ) : chartData.length < 2 ? (
            <div className="h-[260px] flex items-center justify-center text-fresh-text-muted">
              <div className="text-center">
                <TrendingUp size={28} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">趋势数据积累中</p>
                <p className="text-xs mt-1">至少需要两个采样点才能绘制曲线</p>
              </div>
            </div>
          ) : (
            <div className="h-[260px] md:h-[300px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-medium text-fresh-text-muted">
                  按分钟聚合，保留最近 24 小时
                </span>
                <span className="text-xs font-medium text-fresh-text-muted">
                  更新于 {latestUpdateText}
                </span>
              </div>
              <div className="mb-3 px-1 text-xs font-medium text-fresh-text-muted">
                {summaryText}
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="onlineTrendFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.05} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    stroke="var(--theme-grid-dot)"
                    strokeDasharray="4 4"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tickLine={false}
                    axisLine={false}
                    minTickGap={20}
                    tick={{ fill: 'var(--theme-text-muted)', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    width={34}
                    domain={[0, (dataMax: number) => Math.max(maxSlots, dataMax, 1)]}
                    tick={{ fill: 'var(--theme-text-muted)', fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip
                    cursor={{ stroke: '#16A34A', strokeWidth: 1.5, strokeDasharray: '4 4' }}
                    contentStyle={{
                      background: 'var(--theme-card)',
                      border: '2px solid var(--theme-ink)',
                      borderRadius: '1rem',
                      boxShadow: '4px 4px 0px var(--theme-ink)',
                      padding: '0.75rem',
                    }}
                    labelFormatter={(_label, payload) => {
                      const current = payload?.[0]?.payload;
                      return current ? formatTooltipLabel(current.timestamp) : '';
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="onlineCount"
                    name="在线人数"
                    stroke="#16A34A"
                    strokeWidth={3}
                    fill="url(#onlineTrendFill)"
                    activeDot={{
                      r: 5,
                      stroke: 'var(--theme-ink)',
                      strokeWidth: 2,
                      fill: '#22C55E',
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
