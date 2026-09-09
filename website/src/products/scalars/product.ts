import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'scalars',
  name: 'GraphQL Scalars',
  shortName: 'Scalars',
  mark: 'SCL',
  description: 'A collection of custom scalar types not included in base GraphQL.',
  repo: 'graphql-hive/graphql-scalars',
  branch: 'master',
  // TEMPORARY: until graphql-hive/graphql-scalars's website-content-only branch merges.
  contentRef: 'website-content-only',
  sections: [
    { base: '/docs', dir: 'docs', label: 'Documentation' },
    { base: '/changelog', dir: 'changelog', label: 'Changelog', breadcrumb: 'Changelog' },
  ],
  changelog: 'CHANGELOG.md',
  redirects: {
    '/docs/introduction': '/docs',
    '/docs/scalars': '/docs/scalars/account-number',
    '/en/docs/scalars/*': '/docs/scalars/:splat',
    '/docs/scalars/datetime': '/docs/scalars/date-time',
    '/docs/scalars/jsonobject': '/docs/scalars/json-object',
  },
  llmsTagline:
    'A collection of custom scalar types for GraphQL (dates, emails, URLs, currencies, JSON and dozens more), with validation, TypeScript types and mocks, ready to add to any schema.',
  landing: {
    headline: 'Scalars your schema is missing',
    tagline:
      'GraphQL ships with five scalars. GraphQL Scalars adds more than eighty precise, validated types for dates, identifiers, formats, and units, with mocks and TypeScript definitions.',
    claims: ['80+ scalar types', 'Validation on input and output', 'Mocks and TypeScript included'],
    getStarted: '/docs/quick-start',
    featuresTitle: 'Precise types, less validation code',
    features: [
      {
        title: 'Validated at the edge',
        copy: 'Every scalar validates values on the way in and out, so resolvers work with data that is already correct.',
        href: '/docs/scalars/email-address',
        icon: 'safe-line',
      },
      {
        title: 'Works with any server',
        copy: 'Add the type definitions and resolvers to Apollo Server, GraphQL Yoga, Mercurius, or any graphql-js based server.',
        href: '/docs/usage/apollo-server',
        icon: 'server-line',
      },
      {
        title: 'Mocks and types',
        copy: 'Every scalar ships with a mock for testing and a TypeScript type for code generation.',
        href: '/docs/usage/mocks',
        icon: 'check',
      },
    ],
    codeSample: {
      title: 'Add a scalar in two lines',
      copy: 'Import the type definition and its resolver, add both to the schema, and use the scalar like any built-in one.',
      code: `import { makeExecutableSchema } from '@graphql-tools/schema';
import { DateTimeResolver, DateTimeTypeDefinition, EmailAddressResolver } from 'graphql-scalars';

const schema = makeExecutableSchema({
  typeDefs: [
    DateTimeTypeDefinition,
    'scalar EmailAddress',
    \`type User { email: EmailAddress!, createdAt: DateTime! }\`,
  ],
  resolvers: {
    DateTime: DateTimeResolver,
    EmailAddress: EmailAddressResolver,
  },
});`,
      lang: 'ts',
      href: '/docs/quick-start',
      cta: 'Quick start',
    },
    links: [
      {
        title: 'All scalars',
        copy: 'The full list, from AccountNumber to Void, each with its format and validation rules.',
        href: '/docs/scalars/account-number',
        label: 'Browse the scalars',
      },
      {
        title: 'Usage',
        copy: 'Setup with Apollo Server, GraphQL Yoga, GraphQL Tools, and code generation.',
        href: '/docs/usage/apollo-server',
        label: 'Usage guides',
      },
      {
        title: 'Changelog',
        copy: 'Every release and the changes it brought.',
        href: '/changelog',
        label: 'Changelog',
      },
    ],
  },
} satisfies ProductDefinition;
