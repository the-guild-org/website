/**
 * Legacy redirects ported from the Mesh website's next.config.js. Wildcard
 * sources use Cloudflare's `*` / `:splat` form; absolute destinations are
 * kept as-is.
 */
export const meshRedirects: Record<string, string> = {
  '/api': '/docs',
  '/api/enums/store_src.PredefinedProxyOptionsName': '/docs/getting-started/customize-mesh-server',
  '/docs/api/classes/*': '/docs',
  '/docs/api/interfaces/*': '/docs',
  '/docs/api/modules/*': '/docs',
  '/docs/cache': '/docs/cache/cache-introduction',
  '/docs/getting-started': '/docs/getting-started/overview',
  '/docs/getting-started/basic-example': '/docs/getting-started/your-first-mesh-gateway',
  '/docs/getting-started/combine-many-sources': '/docs/getting-started/combine-multiple-sources',
  '/docs/getting-started/introduction': '/docs/getting-started/overview',
  '/docs/getting-started/mesh-transforms': '/docs/transforms/transforms-introduction',
  '/docs/getting-started/multiple-apis': '/docs/getting-started/combine-multiple-sources',
  '/docs/guides': '/docs/guides/extending-unified-schema',
  '/docs/guides/combine-many-sources': '/docs/getting-started/combine-multiple-sources',
  '/docs/guides/error-handling': '/docs/guides/error-masking',
  '/docs/guides/live-queries': '/docs/plugins/live-queries',
  '/docs/guides/performances-best-practices': '/docs/guides/batching',
  '/docs/handlers': '/docs/handlers/handlers-introduction',
  '/docs/handlers/available-handlers': '/docs/handlers/handlers-introduction',
  '/docs/introduction': '/docs',
  '/docs/migration': '/docs/migration/openapi-0.31-0.32',
  '/docs/migration/openapi-0': '/docs/migration/openapi-0.31-0.32',
  '/docs/modules/*': '/docs',
  '/docs/plugins': '/docs/plugins/plugins-introduction',
  '/docs/recipes/*': '/docs',
  '/docs/subscriptions-webhooks.md': '/docs/guides/subscriptions-webhooks',
  '/docs/transforms': '/docs/transforms/transforms-introduction',
  '/docs/transforms/cache': '/docs/cache/cache-introduction',
  '/docs/transforms/mock': '/docs/plugins/mock',
  '/openapi': '/docs/handlers/openapi',
  '/v1/serve': 'https://the-guild.dev/graphql/hive/docs/gateway',
  '/v1/serve/*': 'https://the-guild.dev/graphql/hive/docs/gateway/:splat',
  '/v1/introduction': '/v1',
  // The old footer linked a partners page that never existed on this site.
  '/partners': 'https://the-guild.dev/graphql/hive/partners',
};
