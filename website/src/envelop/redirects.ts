/**
 * Legacy redirects ported from the Envelop website's next.config.js: guides
 * that moved under /docs/guides, plugins that were removed or renamed, and
 * the v2→v3 migration guide that now lives with the v3 docs.
 */
export const envelopRedirects: Record<string, string> = {
  '/docs/securing-your-graphql-api': '/docs/guides/securing-your-graphql-api',
  '/docs/adding-authentication-with-auth0': '/docs/guides/adding-authentication-with-auth0',
  '/docs/monitoring-and-tracing': '/docs/guides/monitoring-and-tracing',
  '/docs/using-graphql-features-from-the-future':
    '/docs/guides/using-graphql-features-from-the-future',
  '/docs/resolving-subscription-data-loader-caching-issues':
    '/docs/guides/resolving-subscription-data-loader-caching-issues',
  '/docs/adding-a-graphql-response-cache': '/docs/guides/adding-a-graphql-response-cache',
  '/plugins/use-depth-limit': '/plugins/graphql-armor-max-depth',
  '/docs/introduction': '/docs',
  '/docs/plugins/introduction': '/docs/plugins',
  '/plugins/use-async-schema': '/v3/guides/migrating-from-v2-to-v3#3-remove-useasyncschema-plugin',
  '/plugins/use-timing': '/v3/guides/migrating-from-v2-to-v3#2-drop-usetiming-plugin',
  '/docs/guides/migrating-from-v2-to-v3': '/v3/guides/migrating-from-v2-to-v3',
  '/plugins/use-lazy-loaded-schema':
    '/v3/guides/migrating-from-v2-to-v3#4-rename-uselazyloadedschema-to-useschemabycontext',
};
