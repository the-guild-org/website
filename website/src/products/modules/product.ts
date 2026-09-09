import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'modules',
  name: 'GraphQL Modules',
  shortName: 'Modules',
  mark: 'MOD',
  description: 'Enterprise-grade tooling for modular GraphQL servers.',
  repo: 'graphql-hive/graphql-modules',
  branch: 'master',
  // TEMPORARY: until graphql-hive/graphql-modules's website-content-only branch merges.
  contentRef: 'website-content-only',
  sections: [
    { base: '/docs', dir: 'docs', label: 'Documentation' },
    { base: '/changelog', dir: 'changelog', label: 'Changelog', breadcrumb: 'Changelog' },
  ],
  changelog: 'packages/graphql-modules/CHANGELOG.md',
  redirects: {
    '/di/introduction': '/docs/di/introduction',
    '/docs/di': '/docs/di/introduction',
    '/docs/legacy/recipes/type-graphql': '/docs/get-started',
    '/docs/introduction/getting-started': '/docs/get-started',
    '/docs/guides/development-environment': '/docs/get-started',
    '/docs/recipes/db-connection-pooling': '/docs/get-started',
    '/docs/legacy/recipes/development-environment': '/docs/get-started',
    '/docs/legacy/recipes/file-uploads': '/docs/get-started',
    '/docs/api.md': '/docs/api',
    '/docs/api/api.md': '/docs/api',
    '/docs/essentials': '/docs/essentials/type-definitions',
    '/docs/introduction/context': '/docs/essentials/context',
    '/docs/advanced': '/docs/advanced/subscriptions',
    '/docs/next/recipes/migration': '/docs/recipes/migration',
    '/docs/legacy/introduction/context': '/docs/get-started',
    '/docs/guides/data-sources': '/docs/get-started',
    '/docs/introduction/dependency-injection': '/docs/di/introduction',
    '/docs/introduction/resolvers-composition': '/docs/essentials/resolvers',
    '/docs/recipes': '/docs/recipes/migration',
  },
  llmsTagline:
    'A toolset of libraries and guidelines for building reusable, maintainable, testable and extendable modules out of a GraphQL server, with dependency injection and a modular schema.',
  landing: {
    headline: 'Enterprise-grade tooling for your GraphQL server',
    tagline:
      'GraphQL Modules is a toolset of libraries and guidelines dedicated to creating reusable, maintainable, testable and extendable modules out of your GraphQL server.',
    claims: ['Reusable modules', 'Dependency injection', 'Works with any server'],
    getStarted: '/docs',
    featuresTitle: 'Built for growing teams',
    features: [
      {
        title: 'Reusable modules',
        copy: 'Split your schema and resolvers into modules with clear boundaries, and share them between projects.',
        href: '/docs/essentials/type-definitions',
        icon: 'puzzle',
      },
      {
        title: 'Scalable structure',
        copy: 'A structure that keeps a large schema navigable, with one place to look for each feature of your API.',
        href: '/docs/get-started',
        icon: 'server-line',
      },
      {
        title: 'Gradual growth',
        copy: 'Start with a single module and add more as the server grows; nothing has to be decided up front.',
        href: '/docs/recipes/migration',
        icon: 'arrow-up',
      },
      {
        title: 'Testable',
        copy: 'Test each module and provider in isolation with the built-in testing utilities and dependency injection.',
        href: '/docs/advanced/lifecycles',
        icon: 'check',
      },
    ],
    codeSample: {
      title: 'A module is a schema slice',
      copy: 'Each module owns its type definitions, resolvers and providers. The application composes them into one executable schema.',
      code: `import { createModule, gql } from 'graphql-modules';

export const usersModule = createModule({
  id: 'users',
  typeDefs: gql\`
    type User {
      id: ID!
      name: String!
    }
    type Query {
      user(id: ID!): User
    }
  \`,
  resolvers: {
    Query: {
      user: (_root, { id }, { injector }) => injector.get(UsersService).byId(id),
    },
  },
});`,
      lang: 'ts',
      href: '/docs/get-started',
      cta: 'Get started',
    },
    links: [
      {
        title: 'Dependency injection',
        copy: 'Providers, scopes and tokens: how modules share services without coupling.',
        href: '/docs/di/introduction',
        label: 'DI docs',
      },
      {
        title: 'Advanced',
        copy: 'Execution context, lifecycles, middlewares and subscriptions.',
        href: '/docs/advanced/subscriptions',
        label: 'Advanced topics',
      },
      {
        title: 'API reference',
        copy: 'Every function and type exported by graphql-modules.',
        href: '/docs/api',
        label: 'API reference',
      },
    ],
  },
} satisfies ProductDefinition;
