const withPWA = require('@ducanh2912/next-pwa').default({
  register: true,
  skipWaiting: true,
  dest: 'public',
  cacheStartUrl: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  runtimeCaching: [
    {
      handler: 'CacheOnly',
      urlPattern: /.*/i,
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
            value: 'require-corp',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    // Ensure "require" has a higher priority when matching export conditions.
    // https://webpack.js.org/configuration/resolve/#resolveconditionnames
    config.resolve.conditionNames = ['require'];

    return config;
  },
};

module.exports = withPWA(nextConfig);
