/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['recharts'],
  serverExternalPackages: ['ts3-nodejs-library', 'ssh2', 'cpu-features'],
};

module.exports = nextConfig;
