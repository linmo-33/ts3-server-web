import React from 'react';
import {
    Hash,
    Users,
    Circle,
    Square,
    Triangle,
    Hexagon,
    Star,
    Diamond,
    Octagon,
    Pentagon,
    Sparkles,
    Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Channel {
    cid: string;
    channel_name: string;
    channel_is_spacer: boolean;
    channel_maxclients: number;
    total_clients: number;
    real_clients?: number; // 真实用户数
}

interface ChannelListProps {
    loading: boolean;
    channels: Channel[];
    displayChannelNames: string[];
}

function normalizeChannelMatchName(name: string): string {
    return name.trim().toLocaleLowerCase();
}

function shouldDisplayChannel(channel: Channel, displayChannelNames: string[]): boolean {
    const realClientCount = channel.real_clients ?? 0;

    if (!channel.channel_name.trim()) {
        return false;
    }

    if (realClientCount > 0) {
        return true;
    }

    const normalizedChannelName = normalizeChannelMatchName(channel.channel_name);
    const matchesWhitelist = displayChannelNames.some((keyword) => {
        const normalizedKeyword = normalizeChannelMatchName(keyword);
        return normalizedKeyword !== '' && normalizedChannelName.includes(normalizedKeyword);
    });

    if (displayChannelNames.length === 0) {
        return true;
    }

    return matchesWhitelist;
}

// 图标列表
const ICONS: LucideIcon[] = [
    Zap,
    Circle,
    Square,
    Triangle,
    Hexagon,
    Star,
    Diamond,
    Octagon,
    Pentagon,
    Sparkles,
];

// 颜色列表
const COLORS: { color: string; bg: string }[] = [
    { color: '#22C55E', bg: '#DCFCE7' }, // 绿色
    { color: '#3B82F6', bg: '#DBEAFE' }, // 蓝色
    { color: '#A855F7', bg: '#F3E8FF' }, // 紫色
    { color: '#F59E0B', bg: '#FEF3C7' }, // 黄色
    { color: '#EF4444', bg: '#FEE2E2' }, // 红色
    { color: '#14B8A6', bg: '#CCFBF1' }, // 青色
    { color: '#EC4899', bg: '#FCE7F3' }, // 粉色
    { color: '#8B5CF6', bg: '#EDE9FE' }, // 靛色
    { color: '#F97316', bg: '#FFEDD5' }, // 橙色
    { color: '#06B6D4', bg: '#CFFAFE' }, // 天蓝
    { color: '#84CC16', bg: '#ECFCCB' }, // 黄绿
    { color: '#F43F5E', bg: '#FFE4E6' }, // 玫红
    { color: '#10B981', bg: '#D1FAE5' }, // 翠绿
    { color: '#6366F1', bg: '#E0E7FF' }, // 靛蓝
    { color: '#D946EF', bg: '#FAE8FF' }, // 品红
];

// 根据频道 ID 获取固定的图标和颜色配置
const getChannelIconConfig = (cid: string) => {
    const id = parseInt(cid, 10) || 0;

    // 图标：直接取模
    const iconIndex = id % ICONS.length;

    // 颜色：使用质数跳跃，让相邻 ID 的颜色差异更大
    const colorIndex = (id * 7) % COLORS.length; // 乘以质数 7 来打散分布

    return {
        icon: ICONS[iconIndex],
        ...COLORS[colorIndex],
    };
};

const ChannelCard: React.FC<{ channel: Channel }> = ({ channel }) => {
    const iconConfig = getChannelIconConfig(channel.cid);
    const Icon = iconConfig.icon;
    // 使用真实用户数（如果有的话）
    const clientCount = channel.real_clients ?? channel.total_clients;
    const hasUsers = clientCount > 0;
    const percentage = channel.channel_maxclients > 0
        ? (clientCount / channel.channel_maxclients) * 100
        : 0;

    // 根据使用率确定进度条颜色
    const getProgressColor = () => {
        if (percentage >= 100) return '#EF4444'; // 红色 - 满员
        if (percentage >= 70) return '#F59E0B'; // 橙色 - 快满
        return '#22C55E'; // 绿色 - 正常
    };

    return (
        <div className="stat-card p-4" style={{ opacity: hasUsers ? 1 : 0.6 }}>
            {/* 图标 + 人数 */}
            <div className="flex items-center justify-between mb-3">
                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                        background: iconConfig.bg,
                        border: '2px solid var(--theme-ink)',
                        boxShadow: '2px 2px 0px var(--theme-ink)',
                    }}
                >
                    <Icon size={20} style={{ color: iconConfig.color }} />
                </div>
                <div className="flex items-center gap-1">
                    <Users
                        size={14}
                        className={hasUsers ? 'text-fresh-primary' : 'text-fresh-text-muted'}
                    />
                    <span
                        className={`text-sm font-bold tabular-nums ${hasUsers ? 'text-fresh-text' : 'text-fresh-text-muted'
                            }`}
                    >
                        {clientCount}
                        {channel.channel_maxclients > 0 && (
                            <span className="text-fresh-text-muted text-xs">
                                /{channel.channel_maxclients}
                            </span>
                        )}
                    </span>
                </div>
            </div>

            {/* 频道名 */}
            <h4 className="font-bold text-sm mb-2 text-fresh-text truncate">
                {channel.channel_name}
            </h4>

            {/* 进度条 */}
            {channel.channel_maxclients > 0 && (
                <div className="progress-bar h-2">
                    <div
                        className="progress-bar-fill transition-all duration-300"
                        style={{
                            width: `${Math.min(percentage, 100)}%`,
                            background: getProgressColor(),
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export const ChannelList: React.FC<ChannelListProps> = ({ loading, channels, displayChannelNames }) => {
    // 过滤并排序：有人的频道始终显示；配置白名单后仅显示命中的无人频道
    const sortedChannels = [...channels]
        .filter((c) => shouldDisplayChannel(c, displayChannelNames))
        .sort((a, b) => {
            const aCount = a.real_clients ?? a.total_clients;
            const bCount = b.real_clients ?? b.total_clients;
            // 有人的频道优先
            if (aCount > 0 && bCount === 0) return -1;
            if (aCount === 0 && bCount > 0) return 1;
            // 都有人或都没人，按人数排序
            return bCount - aCount;
        })
        .slice(0, 6); // 只显示前6个

    return (
        <div className="lg:col-span-2">
            <div className="theme-card p-6 h-[280px] flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <div
                        className="p-2 rounded-lg bg-fresh-primary text-white"
                        style={{ border: '2px solid var(--theme-ink)', boxShadow: '2px 2px 0px var(--theme-ink)' }}
                    >
                        <Hash size={16} />
                    </div>
                    <div>
                        <h3 className="font-bold text-fresh-text">频道列表</h3>
                        <span className="text-xs text-fresh-text-muted">Channel List</span>
                    </div>
                </div>

                {/* 频道卡片网格 */}
                <div className="flex-1 overflow-auto">
                    {loading ? (
                        <div className="h-full flex items-center justify-center text-fresh-text-muted">
                            <div className="text-center">
                                <div className="w-8 h-8 theme-spinner mx-auto mb-2"></div>
                                <p className="text-sm font-medium">加载中...</p>
                            </div>
                        </div>
                    ) : sortedChannels.length === 0 ? (
                        <div className="h-full flex items-center justify-center text-fresh-text-muted">
                            <div className="text-center">
                                <Hash size={28} className="mx-auto mb-2 opacity-50" />
                                <p className="text-sm font-medium">暂无频道数据</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {sortedChannels.map((channel) => (
                                <ChannelCard key={channel.cid} channel={channel} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
