import type { OnlineTrendPoint } from '@/types/api';

const HISTORY_WINDOW_MS = 24 * 60 * 60 * 1000;
const HISTORY_BUCKET_MS = 60 * 1000;

const globalForTs3History = globalThis as typeof globalThis & {
  ts3OnlineTrendHistory?: OnlineTrendPoint[];
};

globalForTs3History.ts3OnlineTrendHistory = globalForTs3History.ts3OnlineTrendHistory ?? [];

function getHistoryStore(): OnlineTrendPoint[] {
  if (!globalForTs3History.ts3OnlineTrendHistory) {
    globalForTs3History.ts3OnlineTrendHistory = [];
  }

  return globalForTs3History.ts3OnlineTrendHistory;
}

function pruneHistory(now: number) {
  const cutoff = now - HISTORY_WINDOW_MS;
  globalForTs3History.ts3OnlineTrendHistory = getHistoryStore().filter((point) => point.timestamp >= cutoff);
}

export function recordOnlineTrendPoint(point: OnlineTrendPoint) {
  const bucketTimestamp = Math.floor(point.timestamp / HISTORY_BUCKET_MS) * HISTORY_BUCKET_MS;
  const normalizedPoint: OnlineTrendPoint = {
    ...point,
    timestamp: bucketTimestamp,
  };

  pruneHistory(bucketTimestamp);

  const history = getHistoryStore();
  const lastPoint = history.at(-1);

  if (lastPoint && lastPoint.timestamp === bucketTimestamp) {
    history[history.length - 1] = normalizedPoint;
    return;
  }

  history.push(normalizedPoint);
}

export function getOnlineTrendHistory() {
  pruneHistory(Date.now());
  return [...getHistoryStore()];
}
