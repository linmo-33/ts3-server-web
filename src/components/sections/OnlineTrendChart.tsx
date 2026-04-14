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
import type { OnlineTrendHistory, TrendRangeKey } from '@/types/api';

interface OnlineTrendChartProps {
  loading: boolean;
  history: OnlineTrendHistory;
  maxSlots: number;
}

const RANGE_OPTIONS: {
  key: TrendRangeKey;
  label: string;
  bucketLabel: string;
  bucketMs: number;
}[] = [
  { key: '24h', label: '24小时', bucketLabel: '按小时聚合', bucketMs: 60 * 60 * 1000 },
  { key: '7d', label: '最近7天', bucketLabel: '按天聚合', bucketMs: 24 * 60 * 60 * 1000 },
];

function formatTimeLabel(timestamp: number, range: TrendRangeKey) {
  return new Intl.DateTimeFormat('zh-CN', {
    ...(range === '24h'
      ? {
          hour: '2-digit',
          minute: '2-digit',
        }
      : {
          month: 'numeric',
          day: 'numeric',
        }),
  }).format(new Date(timestamp));
}

function formatTooltipLabel(timestamp: number, range: TrendRangeKey) {
  return new Intl.DateTimeFormat('zh-CN', {
    ...(range === '24h'
      ? {
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      : {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
  }).format(new Date(timestamp));
}

function formatLatestUpdate(timestamp: number, range: TrendRangeKey) {
  return new Intl.DateTimeFormat('zh-CN', {
    ...(range === '24h'
      ? {
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }
      : {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
        }),
  }).format(new Date(timestamp));
}

function getYAxisMax(peakOnline: number, maxSlots: number) {
  const paddedPeak = peakOnline <= 0
    ? 5
    : peakOnline <= 4
      ? peakOnline + 2
      : Math.ceil(peakOnline * 1.2);

  if (maxSlots > 0) {
    return Math.max(1, Math.min(maxSlots, paddedPeak));
  }

  return Math.max(1, paddedPeak);
}

export function OnlineTrendChart({
  loading,
  history,
  maxSlots,
}: OnlineTrendChartProps) {
  const [range, setRange] = useState<TrendRangeKey>('24h');
  const selectedRange = RANGE_OPTIONS.find((option) => option.key === range) ?? RANGE_OPTIONS[0];
  const selectedHistory = history[range] ?? [];
  const filteredHistory = [...selectedHistory]
    .sort((left, right) => left.timestamp - right.timestamp);
  const chartData = filteredHistory.map((point) => ({
    ...point,
    utilization: point.maxSlots > 0 ? Math.round((point.onlineCount / point.maxSlots) * 100) : 0,
  }));
  const singlePointPadding = selectedRange.bucketMs / 2;
  const startTimestamp = filteredHistory.length === 1
    ? filteredHistory[0].timestamp - singlePointPadding
    : filteredHistory[0]?.timestamp ?? Date.now();
  const endTimestamp = filteredHistory.length === 1
    ? filteredHistory[0].timestamp + singlePointPadding
    : filteredHistory.at(-1)?.timestamp ?? Date.now();

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
  const latestPoint = filteredHistory.at(-1) ?? null;
  const yAxisMax = getYAxisMax(peakOnline, maxSlots);
  const latestUpdateText = latestPoint
    ? formatLatestUpdate(latestPoint.timestamp, range)
    : '--:--';
  const summaryPrefix = range === '24h' ? '小时' : '日';
  const latestUpdatePrefix = range === '24h' ? '更新于' : '统计至';
  const summaryText = `${summaryPrefix}峰值 ${peakOnline} · ${summaryPrefix}均值 ${averageOnline} · 波动 ${fluctuation}`;

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
          ) : filteredHistory.length === 0 ? (
            <div className="h-[260px] flex items-center justify-center text-fresh-text-muted">
              <div className="text-center">
                <TrendingUp size={28} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm font-medium">趋势数据积累中</p>
                <p className="text-xs mt-1">当前时间范围内还没有可展示的采样数据</p>
              </div>
            </div>
          ) : (
            <div className="h-[260px] md:h-[300px]">
              <div className="flex items-center justify-between mb-3 px-1">
                <span className="text-xs font-medium text-fresh-text-muted">
                  {selectedRange.bucketLabel}
                </span>
                <span className="text-xs font-medium text-fresh-text-muted">
                  {latestUpdatePrefix} {latestUpdateText}
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
                    dataKey="timestamp"
                    type="number"
                    scale="time"
                    domain={[startTimestamp, endTimestamp]}
                    tickLine={false}
                    axisLine={false}
                    minTickGap={20}
                    tickFormatter={(value) => formatTimeLabel(Number(value), range)}
                    tick={{ fill: 'var(--theme-text-muted)', fontSize: 12, fontWeight: 600 }}
                  />
                  <YAxis
                    allowDecimals={false}
                    tickLine={false}
                    axisLine={false}
                    width={34}
                    domain={[0, yAxisMax]}
                    padding={{ top: 8, bottom: 12 }}
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
                    labelFormatter={(value) => formatTooltipLabel(Number(value), range)}
                  />
                  <Area
                    type="monotone"
                    dataKey="onlineCount"
                    name="在线人数"
                    stroke="#16A34A"
                    strokeWidth={3}
                    fill="url(#onlineTrendFill)"
                    connectNulls
                    dot={chartData.length === 1 ? {
                      r: 5,
                      stroke: '#22C55E',
                      strokeWidth: 0,
                      fill: '#22C55E',
                    } : false}
                    activeDot={{
                      r: 5,
                      stroke: '#22C55E',
                      strokeWidth: 0,
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
