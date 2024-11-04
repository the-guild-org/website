import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  nextraConfig: {
    // Do not include code blocks
    search: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    // needs for canonical <link />
    SITE_URL: 'https://the-guild.dev',
  },
  typescript: {
    /*
     * behaves weird
     *
     * app/blog/page.tsx
     * Type error: Page "app/blog/page.tsx" has an invalid "default" export:
     * Type "{ tag: string; }" is not valid.
     */
    ignoreBuildErrors: true,
  },
  output: 'export',
  redirects: async () =>
    Object.entries({
      '/contact': '/#get-in-touch',
      '/solutions': '/#platform',
      '/connected-build': '/',
      '/services': '/#services',
      '/blog/announcing-graphql-hive-public': '/blog/announcing-graphql-hive-release',
      '/blog/announcing-graphql-yoga-2': '/blog/announcing-graphql-yoga-v2',
      '/blog/graphql-eslint-3': '/blog/graphql-eslint-3.14',
      '/blog/graphql-cli': '/blog/graphql-cli-is-back',
      '/open-source': '/about-us',
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
  experimental: {
    optimizePackageImports: ['@components'],
  },
});
