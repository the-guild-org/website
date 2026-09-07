/**
 * Legacy redirects ported from the Yoga website's next.config.ts, plus the
 * changelog entry points (the old site linked /changelog from its header).
 */
export const yogaRedirects: Record<string, string> = {
  '/docs/quick-start': '/docs',
  '/tutorial': '/tutorial/basic',
  '/tutorial/basic/00-introduction': '/tutorial/basic',
  '/docs/testing': '/docs/features/testing',
  '/docs/integrations': '/docs',
  '/docs/features': '/docs',
  '/v2/features/health-check': '/v2',
  '/v2/features/defer-stream': '/v2',
  '/v2/features/automatic-persisted-queries': '/v2',
  '/v2/features/response-caching': '/v2',
  '/v2/features/introspection': '/v2',
  '/v2/features/persisted-operations': '/v2',
  '/features/graphiql': '/docs/features/graphiql',
  // The old landing page linked this path without the /docs prefix.
  '/features/persisted-operations': '/docs/features/persisted-operations',
  '/examples/graphql-ws': '/docs/features/subscriptions',
  '/changelog': '/changelogs/graphql-yoga',
  '/changelogs': '/changelogs/graphql-yoga',
};
