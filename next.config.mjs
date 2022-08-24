import { withGuildDocs } from 'guild-docs/next.config';

export default withGuildDocs({
  experimental: {
    esmExternals: true,
    images: {
      allowFutureImage: true,
    },
    newNextLinkBehavior: true,
    optimizeCss: true,
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
      destination:
        'https://go.crisp.chat/chat/embed/?website_id=af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
      permanent: true,
    },
  ],
  eslint: {
    // TODO: Remove this when all eslint errors will be fixed
    ignoreDuringBuilds: true,
  },
});
