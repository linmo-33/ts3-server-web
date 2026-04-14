import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import Database from 'better-sqlite3';
import type { OnlineTrendHistory, OnlineTrendPoint, TrendRangeKey } from '@/types/api';

const SAMPLE_BUCKET_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const HISTORY_RETENTION_MS = 8 * DAY_MS;
const DB_FILENAME = 'ts3-history.db';
const DB_DIR_CANDIDATES = [
  path.join(process.cwd(), 'data'),
  path.join(os.tmpdir(), 'ts3-server-hub'),
];

const HISTORY_RANGES: Record<
  TrendRangeKey,
  { bucketMs: number; durationMs: number; onlineCountMode: 'last' | 'peak' }
> = {
  '24h': {
    bucketMs: 60 * 60 * 1000,
    durationMs: DAY_MS,
    onlineCountMode: 'last',
  },
  '7d': {
    bucketMs: DAY_MS,
    durationMs: 7 * DAY_MS,
    onlineCountMode: 'peak',
  },
};

type HistoryRow = {
  bucket_timestamp: number;
  online_count: number;
  max_slots: number;
  ping: number;
  packet_loss: number;
};

const globalForTs3History = globalThis as typeof globalThis & {
  ts3HistoryDb?: Database.Database;
  ts3HistoryDbPath?: string;
};

function ensureDatabase(): Database.Database {
  if (globalForTs3History.ts3HistoryDb) {
    return globalForTs3History.ts3HistoryDb;
  }

  let lastError: unknown;

  for (const dbDir of DB_DIR_CANDIDATES) {
    const dbPath = path.join(dbDir, DB_FILENAME);

    try {
      fs.mkdirSync(dbDir, { recursive: true });

      const db = new Database(dbPath);
      db.pragma('journal_mode = WAL');
      db.pragma('synchronous = NORMAL');
      db.exec(`
        CREATE TABLE IF NOT EXISTS ts3_online_trend (
          timestamp INTEGER PRIMARY KEY,
          online_count INTEGER NOT NULL,
          max_slots INTEGER NOT NULL,
          ping REAL NOT NULL,
          packet_loss REAL NOT NULL
        );
      `);
      db.exec(`
        CREATE INDEX IF NOT EXISTS idx_ts3_online_trend_timestamp
        ON ts3_online_trend(timestamp);
      `);

      globalForTs3History.ts3HistoryDb = db;
      globalForTs3History.ts3HistoryDbPath = dbPath;

      if (dbDir !== DB_DIR_CANDIDATES[0]) {
        console.warn(
          `TS3 trend storage fell back to temporary directory: ${dbPath}`
        );
      }

      return db;
    } catch (error) {
      lastError = error;
      console.warn(
        `TS3 trend storage unavailable at ${dbPath}, trying next location.`,
        error
      );
    }
  }

  throw lastError;
}

function getBucketOffsetMs(bucketMs: number) {
  if (bucketMs < DAY_MS) {
    return 0;
  }

  return -new Date().getTimezoneOffset() * 60 * 1000;
}

function alignToBucketStart(
  timestamp: number,
  bucketMs: number,
  bucketOffsetMs: number
) {
  return Math.floor((timestamp + bucketOffsetMs) / bucketMs) * bucketMs - bucketOffsetMs;
}

function mapHistoryRow(row: HistoryRow): OnlineTrendPoint {
  return {
    timestamp: row.bucket_timestamp,
    onlineCount: row.online_count,
    maxSlots: row.max_slots,
    ping: row.ping,
    packetLoss: row.packet_loss,
  };
}

export function recordOnlineTrendPoint(point: OnlineTrendPoint) {
  const db = ensureDatabase();
  const bucketTimestamp = Math.floor(point.timestamp / SAMPLE_BUCKET_MS) * SAMPLE_BUCKET_MS;
  const cutoff = bucketTimestamp - HISTORY_RETENTION_MS;

  db.prepare(`
    INSERT INTO ts3_online_trend (timestamp, online_count, max_slots, ping, packet_loss)
    VALUES (@timestamp, @onlineCount, @maxSlots, @ping, @packetLoss)
    ON CONFLICT(timestamp) DO UPDATE SET
      online_count = excluded.online_count,
      max_slots = excluded.max_slots,
      ping = excluded.ping,
      packet_loss = excluded.packet_loss
  `).run({
    timestamp: bucketTimestamp,
    onlineCount: point.onlineCount,
    maxSlots: point.maxSlots,
    ping: point.ping,
    packetLoss: point.packetLoss,
  });

  db.prepare('DELETE FROM ts3_online_trend WHERE timestamp < ?').run(cutoff);
}

function getHistoryForRange(range: TrendRangeKey): OnlineTrendPoint[] {
  const db = ensureDatabase();
  const { bucketMs, durationMs, onlineCountMode } = HISTORY_RANGES[range];
  const bucketOffsetMs = getBucketOffsetMs(bucketMs);
  const cutoff = alignToBucketStart(Date.now() - durationMs, bucketMs, bucketOffsetMs);
  const rows: HistoryRow[] = onlineCountMode === 'last'
    ? db.prepare(`
        WITH bucketed AS (
          SELECT
            timestamp,
            online_count,
            max_slots,
            ping,
            packet_loss,
            CAST(((timestamp + @bucketOffsetMs) / @bucketMs) AS INTEGER) * @bucketMs - @bucketOffsetMs AS bucket_timestamp
          FROM ts3_online_trend
          WHERE timestamp >= @cutoff
        ),
        latest_per_bucket AS (
          SELECT
            bucket_timestamp,
            MAX(timestamp) AS latest_timestamp
          FROM bucketed
          GROUP BY bucket_timestamp
        )
        SELECT
          bucketed.bucket_timestamp,
          bucketed.online_count,
          bucketed.max_slots,
          bucketed.ping,
          bucketed.packet_loss
        FROM bucketed
        INNER JOIN latest_per_bucket
          ON bucketed.bucket_timestamp = latest_per_bucket.bucket_timestamp
         AND bucketed.timestamp = latest_per_bucket.latest_timestamp
        ORDER BY bucketed.bucket_timestamp ASC
      `).all({
        bucketMs,
        bucketOffsetMs,
        cutoff,
      }) as HistoryRow[]
    : db.prepare(`
        SELECT
          CAST(((timestamp + @bucketOffsetMs) / @bucketMs) AS INTEGER) * @bucketMs - @bucketOffsetMs AS bucket_timestamp,
          CAST(MAX(online_count) AS INTEGER) AS online_count,
          CAST(MAX(max_slots) AS INTEGER) AS max_slots,
          ROUND(AVG(ping), 2) AS ping,
          ROUND(AVG(packet_loss), 2) AS packet_loss
        FROM ts3_online_trend
        WHERE timestamp >= @cutoff
        GROUP BY bucket_timestamp
        ORDER BY bucket_timestamp ASC
      `).all({
        bucketMs,
        bucketOffsetMs,
        cutoff,
      }) as HistoryRow[];

  return rows.map(mapHistoryRow);
}

export function getOnlineTrendHistory(): OnlineTrendHistory {
  return {
    '24h': getHistoryForRange('24h'),
    '7d': getHistoryForRange('7d'),
  };
}
