import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'sofa-api',
  name: 'SOFA',
  shortName: 'SOFA',
  mark: 'SOF',
  description: 'Generate RESTful APIs from your GraphQL server.',
  repo: 'graphql-hive/SOFA',
  branch: 'master',
  // TEMPORARY: until graphql-hive/SOFA's website-content-only branch merges.
  contentRef: 'website-content-only',
  sections: [{ base: '/docs', dir: 'docs', label: 'Documentation' }],
  redirects: {
    '/docs/essentials': '/docs/essentials/queries',
    '/docs/recipes': '/docs/recipes/open-api',
    '/docs/api': '/docs/api/context',
  },
  llmsTagline:
    'Turns a GraphQL schema into a REST API: every query, mutation and subscription becomes an endpoint, with OpenAPI documentation generated on the side.',
  landing: {
    headline: 'REST APIs from your GraphQL schema',
    tagline:
      'SOFA takes your GraphQL schema, looks for the available queries, mutations and subscriptions, and turns all of them into a REST API, with an OpenAPI definition to match.',
    claims: ['One line of setup', 'Fully RESTful', 'OpenAPI included'],
    getStarted: '/docs',
    featuresTitle: 'Why SOFA',
    features: [
      {
        title: 'Easy to use',
        copy: 'Set up SOFA within a single line of code and start serving a REST API right away, next to your existing GraphQL endpoint.',
        href: '/docs',
        icon: 'timer-line',
      },
      {
        title: 'Fully RESTful',
        copy: 'Queries become GET endpoints, mutations become POST endpoints, and subscriptions become webhooks, following REST conventions.',
        href: '/docs/essentials/queries',
        icon: 'server-line',
      },
      {
        title: 'OpenAPI for free',
        copy: 'Generate an OpenAPI definition from the same schema, so REST consumers get typed clients and interactive docs.',
        href: '/docs/recipes/open-api',
        icon: 'puzzle',
      },
    ],
    codeSample: {
      title: 'Your schema, served twice',
      copy: 'Mount SOFA as middleware and every operation in the schema is reachable over REST, with the GraphQL execution underneath.',
      code: `import { useSofa } from 'sofa-api';
import express from 'express';

const app = express();

app.use(
  '/api',
  useSofa({
    basePath: '/api',
    schema,
  }),
);

// GET /api/users        -> query { users }
// POST /api/add-user    -> mutation { addUser }`,
      lang: 'ts',
      href: '/docs',
      cta: 'Read the introduction',
    },
    links: [
      {
        title: 'Essentials',
        copy: 'How queries, mutations and subscriptions map onto REST endpoints.',
        href: '/docs/essentials/queries',
        label: 'Essentials',
      },
      {
        title: 'Recipes',
        copy: 'OpenAPI generation, error handling and other real-world setups.',
        href: '/docs/recipes/open-api',
        label: 'Recipes',
      },
      {
        title: 'API reference',
        copy: 'Every option of useSofa, from context and models to the error handler.',
        href: '/docs/api/context',
        label: 'API reference',
      },
    ],
  },
} satisfies ProductDefinition;
