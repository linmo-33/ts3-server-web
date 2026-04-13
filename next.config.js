const path = require('path');

const cpuFeaturesShim = './src/shims/cpu-features.js';
const cpuFeaturesShimAbsolutePath = path.join(__dirname, 'src', 'shims', 'cpu-features.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  transpilePackages: ['recharts'],
  serverExternalPackages: ['teamspeak.js', 'ssh2', 'cpu-features', 'better-sqlite3'],
  turbopack: {
    resolveAlias: {
      'cpu-features': cpuFeaturesShim,
    },
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias['cpu-features'] = cpuFeaturesShimAbsolutePath;
    }

    return config;
  },
};

module.exports = nextConfig;
