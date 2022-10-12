import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  redirects: () => [
    {
      source: '/connected-build',
      destination: '/',
      permanent: true,
    },
    {
      source: '/blog/announcing-graphql-hive-public',
      destination: '/blog/announcing-graphql-hive-release',
      permanent: true,
    },
    {
      source: '/blog/announcing-graphql-yoga-2',
      destination: '/blog/announcing-graphql-yoga-v2',
      permanent: true,
    },
    {
      source: '/blog/graphql-cli',
      destination: '/blog/graphql-cli-is-back',
      permanent: true,
    },
  ],
});
