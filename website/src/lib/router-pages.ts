/**
 * Pages of this domain that other deployments serve through the
 * website-router (packages/website-router/src/config.ts). They are not in
 * this build's output, so the build checks treat them as known.
 */
export const ROUTER_SERVED_PAGES = [
  '/graphql/hive/federation-gateway-performance',
  '/graphql/hive/federation-gateway-audit',
  '/graphql/hive/federation-playground',
];

/**
 * The ones that belong in the sitemap: indexable, self-canonical pages that
 * the router's own sitemap handling leaves out (`sitemap: false`). The
 * playground is an app without a canonical, so it stays out.
 */
export const ROUTER_SITEMAP_PAGES = [
  '/graphql/hive/federation-gateway-performance',
  '/graphql/hive/federation-gateway-audit',
];
