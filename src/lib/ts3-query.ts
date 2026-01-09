import { TeamSpeak, QueryProtocol } from 'ts3-nodejs-library';

// 使用 globalThis 在热重载时保持连接状态
const globalForTs3 = globalThis as unknown as {
    teamspeak: TeamSpeak | null;
    connectionPromise: Promise<TeamSpeak> | null;
    lastActivity: number;
};

globalForTs3.teamspeak = globalForTs3.teamspeak ?? null;
globalForTs3.connectionPromise = globalForTs3.connectionPromise ?? null;
globalForTs3.lastActivity = globalForTs3.lastActivity ?? 0;

function getConnectionTimeout(): number {
    return parseInt(process.env.TS3_CONNECTION_TIMEOUT || '30000');
}

async function getConnection(): Promise<TeamSpeak> {
    const now = Date.now();
    const timeout = getConnectionTimeout();

    // 如果有正在进行的连接，等待它
    if (globalForTs3.connectionPromise) {
        return globalForTs3.connectionPromise;
    }

    // 检查现有连接是否可用
    if (globalForTs3.teamspeak && now - globalForTs3.lastActivity < timeout) {
        try {
            await globalForTs3.teamspeak.whoami();
            globalForTs3.lastActivity = now;
            return globalForTs3.teamspeak;
        } catch {
            // 连接失效，关闭并重连
            try {
                await globalForTs3.teamspeak.quit();
            } catch {
                // 忽略关闭错误
            }
            globalForTs3.teamspeak = null;
        }
    }

    // 如果有旧连接但超时了，先关闭
    if (globalForTs3.teamspeak) {
        try {
            await globalForTs3.teamspeak.quit();
        } catch {
            // 忽略
        }
        globalForTs3.teamspeak = null;
    }

    // 创建新连接
    globalForTs3.connectionPromise = TeamSpeak.connect({
        host: process.env.TS3_SERVER_HOST || 'localhost',
        protocol: QueryProtocol.RAW,
        queryport: parseInt(process.env.TS3_QUERY_PORT || '10011'),
        serverport: parseInt(process.env.TS3_VIRTUAL_PORT || '9987'),
        username: process.env.TS3_QUERY_USERNAME || 'serveradmin',
        password: process.env.TS3_QUERY_PASSWORD || '',
        nickname: 'WebQuery',
        keepAlive: true,
    });

    try {
        globalForTs3.teamspeak = await globalForTs3.connectionPromise;
        globalForTs3.lastActivity = now;

        // 监听断开事件
        globalForTs3.teamspeak.on('close', () => {
            globalForTs3.teamspeak = null;
        });

        globalForTs3.teamspeak.on('error', () => {
            globalForTs3.teamspeak = null;
        });

        return globalForTs3.teamspeak;
    } catch (error) {
        globalForTs3.teamspeak = null;
        throw error;
    } finally {
        globalForTs3.connectionPromise = null;
    }
}

export async function getServerInfo() {
    const ts = await getConnection();
    globalForTs3.lastActivity = Date.now();
    const info = await ts.serverInfo();
    return {
        virtualserver_unique_identifier: info.virtualserverUniqueIdentifier,
        virtualserver_name: info.virtualserverName,
        virtualserver_clientsonline: info.virtualserverClientsonline,
        virtualserver_maxclients: info.virtualserverMaxclients,
        virtualserver_uptime: info.virtualserverUptime,
        virtualserver_ping: info.virtualserverTotalPing || 0,
        virtualserver_packetloss_speech: info.virtualserverTotalPacketlossSpeech || 0,
    };
}

export async function getClientList() {
    const ts = await getConnection();
    globalForTs3.lastActivity = Date.now();
    const clients = await ts.clientList({ clientType: 0 });

    return clients.map((c) => ({
        clid: c.clid,
        client_unique_identifier: c.uniqueIdentifier,
        client_nickname: c.nickname,
        client_channel_id: c.cid,
        client_type: '0',
        client_away: c.away ? '1' : '0',
        client_output_muted: c.outputMuted ? '1' : '0',
    }));
}

export async function getChannelList() {
    const ts = await getConnection();
    globalForTs3.lastActivity = Date.now();
    const channels = await ts.channelList();

    return channels.map((c) => ({
        cid: c.cid,
        channel_name: c.name.replace(/\[cspacer\d*\]/g, '').trim(),
        channel_maxclients: c.maxclients,
        total_clients: c.totalClients,
        channel_order: c.order?.toString() || '0',
    }));
}
