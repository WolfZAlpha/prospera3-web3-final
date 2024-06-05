/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|png|jpg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/media/[name].[hash][ext]',
      },
    });
    return config;
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  async rewrites() {
    return [
      {
        source: '/ico/:path*',
        has: [
          {
            type: 'host',
            value: 'ico.localhost:3000'
          },
        ],
        destination: '/ico/:path*',
      },
      {
        source: '/desktop/:path*',
        has: [
          {
            type: 'host',
            value: 'desktop.localhost:3000'
          },
        ],
        destination: '/desktop/:path*',
      },
    ];
  },
};

export default nextConfig;