import { withGuildDocs } from 'guild-docs/next.config';
import { applyUnderscoreRedirects } from 'guild-docs/underscore-redirects';

export default withGuildDocs({
  basePath: process.env.NEXT_BASE_PATH,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    optimizeCss: true,
    images: {
      unoptimized: true,
      allowFutureImage: true,
    },
  },
  webpack(config, meta) {
    applyUnderscoreRedirects(config, meta);

    return config;
  },
  redirects: () => [
    {
      source: '/blog/announcing-graphql-hive-public',
      destination: '/blog/announcing-graphql-hive-release',
      permanent: true,
    },
  ],
});
