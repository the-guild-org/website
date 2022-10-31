import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  redirects: () =>
    Object.entries({
      '/contact': '/#get-in-touch',
      '/open-source': '/#platform',
      '/connected-build': '/',
      '/blog/announcing-graphql-hive-public': '/blog/announcing-graphql-hive-release',
      '/blog/announcing-graphql-yoga-2': '/blog/announcing-graphql-yoga-v2',
      '/blog/graphql-cli': '/blog/graphql-cli-is-back',
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
});
