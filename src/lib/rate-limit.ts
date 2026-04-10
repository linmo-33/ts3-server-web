type RequestRecord = {
  count: number;
  lastSeen: number;
  resetTime: number;
};

const requests = new Map<string, RequestRecord>();

function getWindowMs(): number {
  return parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');
}

function getMaxRequests(): number {
  return parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30');
}

function getMaxTrackedKeys(): number {
  return parseInt(process.env.RATE_LIMIT_MAX_KEYS || '5000');
}

function pruneExpiredRequests(now: number) {
  for (const [key, record] of requests.entries()) {
    if (now > record.resetTime) {
      requests.delete(key);
    }
  }
}

function touchRequest(key: string, record: RequestRecord) {
  requests.delete(key);
  requests.set(key, record);
}

function trimTrackedKeys() {
  const maxTrackedKeys = getMaxTrackedKeys();

  while (requests.size > maxTrackedKeys) {
    const oldestKey = requests.keys().next().value as string | undefined;

    if (!oldestKey) {
      break;
    }

    requests.delete(oldestKey);
  }
}

export function checkRateLimit(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowMs = getWindowMs();
  const maxRequests = getMaxRequests();

  pruneExpiredRequests(now);

  const record = requests.get(key);

  if (!record || now > record.resetTime) {
    touchRequest(key, { count: 1, lastSeen: now, resetTime: now + windowMs });
    trimTrackedKeys();
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    touchRequest(key, { ...record, lastSeen: now });
    return { allowed: false, remaining: 0 };
  }

  const nextRecord = {
    ...record,
    count: record.count + 1,
    lastSeen: now,
  };

  touchRequest(key, nextRecord);
  return { allowed: true, remaining: maxRequests - nextRecord.count };
}
