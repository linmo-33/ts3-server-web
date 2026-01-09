// 简单的内存 Rate Limiter
const requests = new Map<string, { count: number; resetTime: number }>();

function getWindowMs(): number {
    return parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000');
}

function getMaxRequests(): number {
    return parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '30');
}

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const windowMs = getWindowMs();
    const maxRequests = getMaxRequests();
    const record = requests.get(ip);

    if (!record || now > record.resetTime) {
        requests.set(ip, { count: 1, resetTime: now + windowMs });
        return { allowed: true, remaining: maxRequests - 1 };
    }

    if (record.count >= maxRequests) {
        return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: maxRequests - record.count };
}

// 定期清理过期记录
setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of requests.entries()) {
        if (now > record.resetTime) {
            requests.delete(ip);
        }
    }
}, 60 * 1000);
