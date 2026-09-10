import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'tools',
  name: 'GraphQL Tools',
  shortName: 'Tools',
  mark: 'TLS',
  description: 'A set of utilities for faster GraphQL development.',
  repo: 'ardatan/graphql-tools',
  branch: 'master',
  // TEMPORARY: until ardatan/graphql-tools's website-content-only branch merges.
  contentRef: 'website-content-only',
  sections: [
    { base: '/docs', dir: 'docs', label: 'Documentation' },
    { base: '/changelogs', dir: 'changelogs', label: 'Changelogs', breadcrumb: 'Changelogs' },
  ],
  redirects: {
    '/docs': '/docs/introduction',
    '/install': '/docs/introduction',
    '/changelogs': '/changelogs/graphql-tools',
    // The API reference: the TypeDoc README pages became the folder index pages.
    '/docs/api/README': '/docs/api',
    '/docs/api/modules': '/docs/api',
    '/docs/api/modules/*': '/docs/api',
    '/api/modules/*': '/docs/api',
    '/docs/api/:package/src/readme': '/docs/api/:package/src',
    '/docs/api/:group/:package/src/readme': '/docs/api/:group/:package/src',
    // Pages renamed or folded into others over the years.
    '/docs/directive-resolvers': '/docs/schema-directives',
    '/docs/schema-directives-legacy': '/docs/schema-directives',
    '/docs/legacy-schema-directives': '/docs/schema-directives',
    '/docs/merge-resolvers': '/docs/resolvers',
    '/docs/merge-typedefs': '/docs/migration/migration-from-merge-graphql-schemas',
    '/docs/graphql-tools/mocking': '/docs/mocking',
    '/docs/migration-from-import': '/docs/migration/migration-from-import',
    '/docs/migration-from-merge-graphql-schemas':
      '/docs/migration/migration-from-merge-graphql-schemas',
    '/docs/migration-from-toolkit': '/docs/migration/migration-from-toolkit',
    '/docs/migration-from-tools': '/docs/migration/migration-from-tools',
    '/docs/migration-from-tools-v5': '/docs/migration/migration-from-tools',
    // Schema stitching moved to its own site.
    '/docs/schema-stitching': 'https://the-guild.dev/graphql/stitching',
    '/docs/stitch-api': 'https://the-guild.dev/graphql/stitching',
    '/docs/stitch-combining-schemas': 'https://the-guild.dev/graphql/stitching/docs/approaches',
    '/docs/stitch-directives-sdl':
      'https://the-guild.dev/graphql/stitching/docs/approaches/stitching-directives',
    '/docs/stitch-schema-extensions':
      'https://the-guild.dev/graphql/stitching/docs/approaches/schema-extensions',
    '/docs/stitch-type-merging':
      'https://the-guild.dev/graphql/stitching/docs/approaches/type-merging',
    '/docs/schema-stitching/stitch-api': 'https://the-guild.dev/graphql/stitching',
    '/docs/schema-stitching/stitch-combining-schemas':
      'https://the-guild.dev/graphql/stitching/docs/approaches',
    '/docs/schema-stitching/stitch-directives-sdl':
      'https://the-guild.dev/graphql/stitching/docs/approaches/stitching-directives',
    '/docs/schema-stitching/stitch-schema-extensions':
      'https://the-guild.dev/graphql/stitching/docs/approaches/schema-extensions',
    '/docs/schema-stitching/stitch-type-merging':
      'https://the-guild.dev/graphql/stitching/docs/approaches/type-merging',
    '/docs/schema-stitching/stitch-federation':
      'https://the-guild.dev/graphql/stitching/handbook/other-integrations/federation-services',
    '/docs/schema-transforms':
      'https://the-guild.dev/graphql/stitching/docs/getting-started/adding-transforms',
    '/docs/batch-execution':
      'https://the-guild.dev/graphql/stitching/docs/getting-started/remote-subschemas#batch-execution',
    '/docs/remote-schemas':
      'https://the-guild.dev/graphql/stitching/docs/getting-started/remote-subschemas',
    '/docs/schema-delegation':
      'https://the-guild.dev/graphql/stitching/docs/approaches/schema-extensions#schema-delegation',
    '/docs/schema-wrapping': 'https://the-guild.dev/graphql/stitching/docs/transforms',
  },
  llmsTagline:
    'A set of npm packages (@graphql-tools/*) for building and manipulating GraphQL schemas in JavaScript: executable schemas from SDL, resolver composition, schema and document loading, merging, mocking, and directives, plus a generated API reference for every package.',
  landing: {
    headline: 'A set of utilities for faster GraphQL development',
    tagline:
      'GraphQL Tools is a collection of npm packages that provides a structured approach to building GraphQL schemas and resolvers in JavaScript, following the GraphQL-first development workflow.',
    claims: ['Fully open source', 'No vendor lock-in', 'Works with any GraphQL server'],
    getStarted: '/docs/introduction',
    featuresTitle: 'Everything GraphQL',
    features: [
      {
        title: 'GraphQL-first philosophy',
        copy: 'Use the GraphQL schema definition language to generate a schema with full support for resolvers, interfaces, unions, and custom scalars.',
        href: '/docs/introduction#the-graphql-first-philosophy',
        icon: 'graphql',
      },
      {
        title: 'Mock your GraphQL API',
        copy: 'Mock your API with fine-grained per-type mocking for fast prototyping without any data sources.',
        href: '/docs/mocking',
        icon: 'arrow-up',
      },
      {
        title: 'Load schemas and documents',
        copy: 'Load type definitions and operations from files, URLs, code, and Git with a single loader API.',
        href: '/docs/schema-loading',
        icon: 'server-line',
      },
      {
        title: 'Merge and compose',
        copy: 'Merge type definitions and resolvers from many modules, and compose resolvers with middleware-style functions.',
        href: '/docs/schema-merging',
        icon: 'puzzle',
      },
    ],
    codeSample: {
      title: 'From SDL to an executable schema',
      copy: 'Write the schema in the GraphQL schema language, add a resolver map, and get a GraphQLSchema any server can execute.',
      code: `import { makeExecutableSchema } from '@graphql-tools/schema';

const typeDefs = /* GraphQL */ \`
  type Query {
    hello(name: String): String!
  }
\`;

const resolvers = {
  Query: {
    hello: (_root, { name }) => \`Hello, \${name ?? 'world'}!\`,
  },
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });`,
      lang: 'ts',
      href: '/docs/generate-schema',
      cta: 'Build a schema',
    },
    links: [
      {
        title: 'API reference',
        copy: 'Every function, class, and type exported by each @graphql-tools package, generated from the sources.',
        href: '/docs/api',
        label: 'API reference',
      },
      {
        title: 'Schema stitching',
        copy: 'Combine several GraphQL services into one gateway schema with Schema Stitching.',
        href: 'https://the-guild.dev/graphql/stitching',
        label: 'Stitching docs',
      },
      {
        title: 'Changelogs',
        copy: 'Every release of every package and the changes it brought.',
        href: '/changelogs/graphql-tools',
        label: 'Changelogs',
      },
    ],
  },
} satisfies ProductDefinition;
