/**
 * Legacy redirects ported from the Inspector website's next.config.js: the
 * old "essentials" section that became "commands", the GitHub App recipes
 * that moved under products, and a few entry points.
 */
export const inspectorRedirects: Record<string, string> = {
  '/install': '/docs/installation',
  '/enterprise': '/docs',
  '/docs/index': '/docs',
  '/products': '/docs/products/ci',
  '/docs/recipies/github': '/docs/migration-guides/github',
  '/docs/api': '/docs/api/schema',
  '/docs/recipes': '/docs/recipes/environments',
  '/docs/recipes/github': '/docs/recipes/pull-requests',
  '/docs/essentials': '/docs/commands/diff',
  '/docs/essentials/diff': '/docs/commands/diff',
  '/docs/essentials/coverage': '/docs/commands/coverage',
  '/docs/essentials/validate': '/docs/commands/validate',
  '/docs/essentials/similar': '/docs/commands/similar',
  '/docs/essentials/audit': '/docs/commands/audit',
  '/docs/essentials/introspect': '/docs/commands/introspect',
  // The GitHub App is deprecated; its page lives with the migration guides.
  '/docs/products/github': '/docs/migration-guides/github',
};
