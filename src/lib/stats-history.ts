// 服务端历史数据存储（内存存储，适用于 serverless 环境）

interface DailyStats {
    date: string;      // 格式: MM-DD
    count: number;     // 当日峰值在线人数
    timestamp: number; // 记录时间戳
}

const MAX_DAYS = 7; // 保留最近7天

// 使用 globalThis 在热重载时保持数据
const globalForStats = globalThis as unknown as {
    statsHistory: DailyStats[];
    todayMax: number;
};

globalForStats.statsHistory = globalForStats.statsHistory ?? [];
globalForStats.todayMax = globalForStats.todayMax ?? 0;

class StatsHistory {
    private get history(): DailyStats[] {
        return globalForStats.statsHistory;
    }

    private set history(value: DailyStats[]) {
        globalForStats.statsHistory = value;
    }

    private cleanup() {
        const cutoff = Date.now() - MAX_DAYS * 24 * 60 * 60 * 1000;
        this.history = this.history.filter(item => item.timestamp > cutoff);
    }

    private getDateString(date: Date): string {
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    }

    add(count: number) {
        const now = new Date();
        const today = this.getDateString(now);

        // 更新今日峰值
        globalForStats.todayMax = Math.max(globalForStats.todayMax, count);

        // 查找今日记录
        const todayIndex = this.history.findIndex(item => item.date === today);

        if (todayIndex >= 0) {
            // 更新今日峰值
            if (count > this.history[todayIndex].count) {
                this.history[todayIndex].count = count;
                this.history[todayIndex].timestamp = Date.now();
            }
        } else {
            // 新的一天，重置今日峰值
            globalForStats.todayMax = count;
            this.history.push({ date: today, count, timestamp: Date.now() });
            this.cleanup();
        }
    }

    getHistory(): { time: string; count: number }[] {
        // 返回最近7天的数据，按日期排序
        return this.history
            .sort((a, b) => a.timestamp - b.timestamp)
            .slice(-MAX_DAYS)
            .map(({ date, count }) => ({ time: date, count }));
    }

    clear() {
        this.history = [];
        globalForStats.todayMax = 0;
    }
}

// 单例
export const statsHistory = new StatsHistory();
