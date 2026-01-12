# TS3 Server Hub

TeamSpeak 3 服务器监控面板，实时展示服务器状态和在线用户。

## 功能

- 实时在线人数和服务器状态
- 在线用户列表
- 历史流量趋势图表
- 一键连接服务器
- 客户端下载链接
- 深色/浅色主题切换

## 技术栈

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- ts3-nodejs-library

## 部署

### 环境变量

```env
TS3_SERVER_HOST=your-ts3-server.com
TS3_QUERY_PORT=10011
TS3_VIRTUAL_PORT=9987
TS3_QUERY_USERNAME=serveradmin
TS3_QUERY_PASSWORD=your-password
TS3_SERVER_ID=1
```

### 本地开发

```bash
pnpm install
pnpm run dev
```

### Vercel 部署

1. Fork 本仓库
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署

## License

MIT
