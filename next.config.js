/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['recharts'],
  serverExternalPackages: ['teamspeak.js', 'ssh2', 'cpu-features'],
};

module.exports = nextConfig;
