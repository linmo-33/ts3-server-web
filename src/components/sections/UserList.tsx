import React from "react";
import { Mic, MicOff, Coffee, Gamepad2, Hash, Users } from "lucide-react";
import type { User } from "@/types";

interface UserListProps {
  loading: boolean;
  users: User[];
}

const StatusIcon: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case "away":
      return <Coffee size={14} className="text-yellow-500" />;
    case "mic-muted":
      return <MicOff size={14} className="text-fresh-text-muted" />;
    default:
      return <Mic size={14} className="text-fresh-primary" />;
  }
};

// Claymorphism style avatars - Minimal cute style
const avatarStyles = [
  { bg: "#DCFCE7", face: "#166534" }, // green
  { bg: "#DBEAFE", face: "#1E40AF" }, // blue
  { bg: "#FEF3C7", face: "#B45309" }, // yellow
  { bg: "#FCE7F3", face: "#BE185D" }, // pink
  { bg: "#F3E8FF", face: "#7E22CE" }, // purple
];

// Simple blob with face
const BlobAvatar: React.FC<{ bg: string; face: string; variant: number }> = ({
  bg,
  face,
  variant,
}) => {
  // Different eye styles
  const eyes = [
    // Happy dots
    <>
      <circle cx="11" cy="14" r="2" fill={face} />
      <circle cx="21" cy="14" r="2" fill={face} />
    </>,
    // Sleepy lines
    <>
      <path
        d="M9 14 L13 14"
        stroke={face}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M19 14 L23 14"
        stroke={face}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>,
    // Wink
    <>
      <circle cx="11" cy="14" r="2" fill={face} />
      <path
        d="M19 12 L23 16"
        stroke={face}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </>,
    // Big eyes
    <>
      <circle
        cx="11"
        cy="14"
        r="3"
        fill="white"
        stroke={face}
        strokeWidth="1.5"
      />
      <circle
        cx="21"
        cy="14"
        r="3"
        fill="white"
        stroke={face}
        strokeWidth="1.5"
      />
      <circle cx="12" cy="14" r="1.5" fill={face} />
      <circle cx="22" cy="14" r="1.5" fill={face} />
    </>,
    // Star eyes
    <>
      <polygon
        points="11,11 12,14 15,14 12.5,16 13.5,19 11,17 8.5,19 9.5,16 7,14 10,14"
        fill={face}
        transform="scale(0.6) translate(6, 6)"
      />
      <polygon
        points="11,11 12,14 15,14 12.5,16 13.5,19 11,17 8.5,19 9.5,16 7,14 10,14"
        fill={face}
        transform="scale(0.6) translate(23, 6)"
      />
    </>,
  ];

  // Different mouth styles
  const mouths = [
    <path
      d="M13 20 Q16 23 19 20"
      stroke={face}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />,
    <circle cx="16" cy="20" r="2" fill={face} />,
    <path
      d="M13 19 L19 19"
      stroke={face}
      strokeWidth="1.5"
      strokeLinecap="round"
    />,
    <path
      d="M14 19 Q16 21 18 19"
      stroke={face}
      strokeWidth="1.5"
      fill="none"
      strokeLinecap="round"
    />,
    <ellipse cx="16" cy="20" rx="2.5" ry="1.5" fill={face} />,
  ];

  return (
    <svg viewBox="0 0 32 32" className="w-6 h-6">
      <circle cx="16" cy="16" r="12" fill={bg} />
      {eyes[variant % 5]}
      {mouths[variant % 5]}
    </svg>
  );
};

const UserAvatar: React.FC<{ index: number }> = ({ index }) => {
  const style = avatarStyles[index % avatarStyles.length];

  return (
    <div
      className="w-10 h-10 rounded-xl flex items-center justify-center"
      style={{
        background: "white",
        border: "2px solid #1F2937",
        boxShadow: "2px 2px 0px #1F2937",
      }}
    >
      <BlobAvatar bg={style.bg} face={style.face} variant={index} />
    </div>
  );
};

export const UserList: React.FC<UserListProps> = ({ loading, users }) => {
  return (
    <div className="w-full">
      <div className="theme-card p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg bg-fresh-primary text-white"
              style={{
                border: "2px solid #1F2937",
                boxShadow: "2px 2px 0px #1F2937",
              }}
            >
              <Users size={16} />
            </div>
            <div>
              <h3 className="font-bold text-fresh-text">在线玩家</h3>
              <span className="text-sm text-fresh-text-muted">
                {users.length} online
              </span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-fresh-text-muted">
            <div className="w-8 h-8 theme-spinner mb-3"></div>
            <span className="text-sm font-medium">加载中...</span>
          </div>
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-fresh-text-muted">
            <Gamepad2 size={40} className="mb-3 opacity-40" />
            <span className="text-sm font-medium">暂无玩家在线</span>
            <span className="text-xs mt-1 opacity-70">快来成为第一个吧</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {users.map((user, index) => (
              <div
                key={user.id}
                className="user-item flex items-center gap-3 p-3"
              >
                <UserAvatar index={index} />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm truncate text-fresh-text">
                    {user.nickname}
                  </div>
                  <div
                    className="inline-flex items-center gap-1 text-xs text-fresh-text-muted mt-1 px-2 py-0.5 rounded-full"
                    style={{
                      background: '#F3F4F6',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <Hash size={10} />
                    <span className="truncate max-w-[100px]">{user.channel}</span>
                  </div>
                </div>
                <StatusIcon status={user.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
