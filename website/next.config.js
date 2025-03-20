import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    // needs for canonical <link />
    SITE_URL: 'https://the-guild.dev',
  },
  output: 'export',
  redirects: () =>
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
      // Blog posts moved to the Hive blog
      '/blog/the-anatomy-of-a-graphql-request': 'https://the-guild.dev/graphql/hive/blog/the-anatomy-of-a-graphql-request',
      '/blog/graphql-code-generator-090': 'https://the-guild.dev/graphql/hive/blog/graphql-code-generator-090',
      '/blog/whatsapp-clone-react-hooks-graphql-typescript-and-postgresql': 'https://the-guild.dev/graphql/hive/blog/whatsapp-clone-react-hooks-graphql-typescript-and-postgresql',
      '/blog/multiple-environments-endpoints-graphql-inspector': 'https://the-guild.dev/graphql/hive/blog/multiple-environments-endpoints-graphql-inspector',
      '/blog/graphql-deep-dive-2': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-2',
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
});
