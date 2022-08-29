import { withGuildDocs } from 'guild-docs/next.config';

export default withGuildDocs({
  basePath: process.env.NEXT_BASE_PATH,
  experimental: {
    optimizeCss: true,
    images: {
      unoptimized: true,
      allowFutureImage: true,
    },
  },
  rewrites: () => [
    {
      source: '/feed.xml',
      destination: '/_next/static/feed.xml',
    },
    {
      source: '/sitemap.xml',
      destination: '/_next/static/sitemap.xml',
    },
  ],
  redirects: () => [
    {
      source: '/chat',
      destination: 'https://go.crisp.chat/chat/embed/?website_id=af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
      permanent: true,
    },
  ],
});
