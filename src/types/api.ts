// ==========================================
// API Types
// ==========================================

/** 服务器信息 */
export interface ServerInfo {
  virtualserver_unique_identifier: string;
  virtualserver_name: string;
  virtualserver_clientsonline: number;
  virtualserver_maxclients: number;
  virtualserver_uptime: number;
  virtualserver_ping: number;
  virtualserver_packetloss_speech: number;
}

/** 客户端信息 */
export interface ClientInfo {
  clid: string;
  client_unique_identifier: string;
  client_nickname: string;
  connection_client_ip: string;
  client_channel_id: string;
  client_type: string;
  client_away: string;
  client_output_muted: string;
}

/** 频道信息 */
export interface ChannelInfo {
  cid: string;
  channel_name: string;
  channel_maxclients: number;
  total_clients: number;
  channel_order: string;
}
