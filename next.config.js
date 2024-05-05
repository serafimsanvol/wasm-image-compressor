const withPWA = require('@ducanh2912/next-pwa').default({
  disable: process.env.NODE_ENV === 'development',
  register: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  dest: 'public',
  cacheStartUrl: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  runtimeCaching: [
    {
      handler: 'CacheOnly',
      urlPattern: /^(?!.*(clarity)).*/i,
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'credentialless',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
    ],
  },
  webpack: (config) => {
    // Alternatively, to bundle the CommonJS module:
    // Ensure "require" has a higher priority when matching export conditions.
    // https://webpack.js.org/configuration/resolve/#resolveconditionnames
    config.resolve.conditionNames = ['require', 'import'];

    return config;
  },
};

module.exports = withPWA(nextConfig);
