import { useState, useEffect, useCallback } from 'react';
import { ts3Api } from '@/lib/api';
import type { ServerStats, User } from '@/types';
import type { ClientInfo, ChannelInfo } from '@/types/api';

function formatUptime(seconds: number): string {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    if (days > 0) {
        return `${days}天 ${hours}小时`;
    }
    return `${hours}小时`;
}

function mapClientsToUsers(clients: ClientInfo[], channels: ChannelInfo[]): User[] {
    const channelMap = new Map(channels.map((c) => [c.cid, c.channel_name]));

    return clients.map((client, index) => ({
        id: parseInt(client.clid) || index + 1,
        nickname: client.client_nickname,
        badge: undefined,
        channel: channelMap.get(client.client_channel_id) || '未知频道',
        status: client.client_away === '1' ? 'away' : client.client_output_muted === '1' ? 'mic-muted' : 'online',
    }));
}

// 计算每个频道的真实用户数
function calculateRealChannelCounts(clients: ClientInfo[]): Map<string, number> {
    const counts = new Map<string, number>();

    // 统计每个频道的真实用户数
    clients.forEach(client => {
        const channelId = client.client_channel_id;
        counts.set(channelId, (counts.get(channelId) || 0) + 1);
    });

    return counts;
}

export function useTS3Data(refreshInterval = 30000) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [stats, setStats] = useState<ServerStats>({
        onlineCount: 0,
        maxSlots: 100,
        uptime: '加载中...',
        ping: 0,
        packetLoss: 0,
    });
    const [users, setUsers] = useState<User[]>([]);
    const [channels, setChannels] = useState<ChannelInfo[]>([]);
    const [channelCounts, setChannelCounts] = useState<Map<string, number>>(new Map());

    const fetchData = useCallback(async () => {
        try {
            const data = await ts3Api.getAllData();

            const realUserCount = data.clients.length;
            setStats({
                onlineCount: realUserCount,
                maxSlots: data.server.virtualserver_maxclients,
                uptime: formatUptime(data.server.virtualserver_uptime),
                ping: Math.round(data.server.virtualserver_ping),
                packetLoss: data.server.virtualserver_packetloss_speech,
            });

            setUsers(mapClientsToUsers(data.clients, data.channels));
            setChannels(data.channels);
            setChannelCounts(calculateRealChannelCounts(data.clients));
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : '获取数据失败');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, refreshInterval);
        return () => clearInterval(interval);
    }, [refreshInterval, fetchData]);

    return { loading, error, stats, users, channels, channelCounts, refetch: fetchData };
}
