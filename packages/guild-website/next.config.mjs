import { withGuildDocs } from 'guild-docs/next.config';

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
});
