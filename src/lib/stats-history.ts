// 服务端历史数据存储（内存）
// 注意：服务器重启后数据会丢失，如需持久化可改用文件或数据库

interface HistoryPoint {
    time: string;
    count: number;
    timestamp: number;
}

class StatsHistory {
    private history: HistoryPoint[] = [];
    private maxPoints = 48; // 保留最近48个点（每30秒一个，约24分钟）

    add(count: number) {
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

        // 避免同一分钟内重复添加
        const lastPoint = this.history[this.history.length - 1];
        if (lastPoint && lastPoint.time === time) {
            lastPoint.count = count; // 更新而不是新增
            return;
        }

        this.history.push({ time, count, timestamp: Date.now() });

        // 保持最大数量
        if (this.history.length > this.maxPoints) {
            this.history = this.history.slice(-this.maxPoints);
        }
    }

    getHistory(): { time: string; count: number }[] {
        return this.history.map(({ time, count }) => ({ time, count }));
    }

    clear() {
        this.history = [];
    }
}

// 单例
export const statsHistory = new StatsHistory();
