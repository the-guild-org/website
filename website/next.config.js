import path from 'node:path';
import { withGuildDocs } from '@theguild/components/next.config';

const sep = path.sep === '/' ? '/' : '\\\\';

const ALLOWED_SVG_REGEX = new RegExp(`ui${sep}logos${sep}.+\\.svg$`);

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
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
  webpack(config) {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));
    fileLoaderRule.exclude = ALLOWED_SVG_REGEX;

    config.module.rules.push({
      test: ALLOWED_SVG_REGEX,
      use: ['@svgr/webpack'],
    });
    return config;
  },
});
