/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    MAP_ACCESS_TOKEN: process.env.MAP_ACCESS_TOKEN,
  },
};

module.exports = nextConfig;
