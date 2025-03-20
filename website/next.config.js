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
      '/blog/taking-over-merge-graphql-schemas': 'https://the-guild.dev/graphql/hive/blog/taking-over-merge-graphql-schemas',
      '/blog/apollo-angular-12': 'https://the-guild.dev/graphql/hive/blog/apollo-angular-12',
      '/blog/graphql-code-generator': 'https://the-guild.dev/graphql/hive/blog/graphql-code-generator',
      '/blog/graphql-let': 'https://the-guild.dev/graphql/hive/blog/graphql-let',
      '/blog/modular-encapsulation-graphql-modules': 'https://the-guild.dev/graphql/hive/blog/modular-encapsulation-graphql-modules',
      '/blog/graphql-deep-dive-5': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-5',
      '/blog/announcing-graphql-network-inspector': 'https://the-guild.dev/graphql/hive/blog/announcing-graphql-network-inspector',
      '/blog/graphql-cli-is-back': 'https://the-guild.dev/graphql/hive/blog/graphql-cli-is-back',
      '/blog/understanding-the-differences-between-graphql-and-rest-api-gateways': 'https://the-guild.dev/graphql/hive/blog/understanding-the-differences-between-graphql-and-rest-api-gateways',
      '/blog/ci-ci-graphql-inspector': 'https://the-guild.dev/graphql/hive/blog/ci-ci-graphql-inspector',
      '/blog/graphql-hive-preview': 'https://the-guild.dev/graphql/hive/blog/graphql-hive-preview',
      '/blog/graphql-deep-dive-4': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-4',
      '/blog/graphql-codegen-relay-compiler': 'https://the-guild.dev/graphql/hive/blog/graphql-codegen-relay-compiler',
      '/blog/apollo-angular-011': 'https://the-guild.dev/graphql/hive/blog/apollo-angular-011',
      '/blog/graphql-codegen-java': 'https://the-guild.dev/graphql/hive/blog/graphql-codegen-java',
      '/blog/graphql-mesh-v1-hive-gateway-v1': 'https://the-guild.dev/graphql/hive/blog/graphql-mesh-v1-hive-gateway-v1',
      '/blog/slack-bot-with-cloudflare': 'https://the-guild.dev/graphql/hive/blog/slack-bot-with-cloudflare',
      '/blog/graphql-modules-v1': 'https://the-guild.dev/graphql/hive/blog/graphql-modules-v1',
      '/blog/graphql-deep-dive-1': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-1',
      '/blog/how-not-to-learn-graphql': 'https://the-guild.dev/graphql/hive/blog/how-not-to-learn-graphql',
      '/blog/graphql-deep-dive-3': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-3',
      '/blog/open-source-apollo-federation': 'https://the-guild.dev/graphql/hive/blog/open-source-apollo-federation',
      '/blog/graphql-over-websockets': 'https://the-guild.dev/graphql/hive/blog/graphql-over-websockets',
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
