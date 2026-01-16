// 服务端历史数据存储（按日统计，文件持久化）

import fs from 'fs';
import path from 'path';

interface DailyStats {
    date: string;      // 格式: MM-DD
    count: number;     // 当日峰值在线人数
    timestamp: number; // 记录时间戳
}

const DATA_FILE = path.join(process.cwd(), 'data', 'stats-history.json');
const MAX_DAYS = 7; // 保留最近7天

class StatsHistory {
    private history: DailyStats[] = [];
    private todayMax = 0; // 今日峰值

    constructor() {
        this.load();
    }

    private load() {
        try {
            if (fs.existsSync(DATA_FILE)) {
                const data = fs.readFileSync(DATA_FILE, 'utf-8');
                this.history = JSON.parse(data);
                // 清理超过7天的旧数据
                this.cleanup();
            }
        } catch {
            this.history = [];
        }
    }

    private save() {
        try {
            const dir = path.dirname(DATA_FILE);
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
            fs.writeFileSync(DATA_FILE, JSON.stringify(this.history, null, 2));
        } catch (err) {
            console.error('Failed to save stats history:', err);
        }
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
        this.todayMax = Math.max(this.todayMax, count);

        // 查找今日记录
        const todayIndex = this.history.findIndex(item => item.date === today);

        if (todayIndex >= 0) {
            // 更新今日峰值
            if (count > this.history[todayIndex].count) {
                this.history[todayIndex].count = count;
                this.history[todayIndex].timestamp = Date.now();
                this.save();
            }
        } else {
            // 新的一天，重置今日峰值
            this.todayMax = count;
            this.history.push({ date: today, count, timestamp: Date.now() });
            this.cleanup();
            this.save();
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
        this.todayMax = 0;
        this.save();
    }
}

// 单例
export const statsHistory = new StatsHistory();
