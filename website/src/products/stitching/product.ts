import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'stitching',
  name: 'Schema Stitching',
  shortName: 'Stitching',
  mark: 'STI',
  description: 'Combine multiple GraphQL schemas into one gateway API.',
  repo: 'ardatan/schema-stitching',
  branch: 'master',
  // TEMPORARY: until ardatan/schema-stitching's website-content-only branch merges.
  contentRef: 'website-content-only',
  sections: [
    { base: '/docs', dir: 'docs', label: 'Documentation' },
    { base: '/handbook', dir: 'handbook', label: 'Handbook', breadcrumb: 'Handbook' },
  ],
  redirects: {
    '/handbook/other-integrations/federation-services':
      '/handbook/other-integrations/federation-to-stitching-sdl',
  },
  llmsTagline:
    'Schema stitching from GraphQL Tools: combine multiple GraphQL services into one gateway schema with type merging, transforms and stitching directives, plus a handbook of worked examples.',
  landing: {
    headline: 'Many schemas, one API',
    tagline:
      'Automatically stitch multiple GraphQL schemas together into one larger API in a simple, fast and powerful way, with type merging to join the pieces.',
    claims: ['Type merging', 'Transforms', 'Works with Federation subgraphs'],
    getStarted: '/docs',
    featuresTitle: 'How stitching works',
    features: [
      {
        title: 'Type merging',
        copy: 'Let several services contribute fields to the same type; the gateway resolves each part from the service that owns it.',
        href: '/docs/approaches/type-merging',
        icon: 'puzzle',
      },
      {
        title: 'Transforms',
        copy: 'Rename, filter, wrap and prune subschemas before they join the gateway, without touching the services.',
        href: '/docs/transforms',
        icon: 'server-line',
      },
      {
        title: 'Stitching directives',
        copy: 'Describe merges in the subgraph SDL itself and let the gateway compose the configuration.',
        href: '/docs/approaches/stitching-directives',
        icon: 'check',
      },
    ],
    codeSample: {
      title: 'Stitch two services',
      copy: 'Point stitchSchemas at your subschemas and describe how their shared types merge. The result is a regular executable schema.',
      code: `import { stitchSchemas } from '@graphql-tools/stitch';

export const gatewaySchema = stitchSchemas({
  subschemas: [
    {
      schema: usersSchema,
      merge: {
        User: {
          selectionSet: '{ id }',
          fieldName: 'user',
          args: ({ id }) => ({ id }),
        },
      },
    },
    { schema: postsSchema },
  ],
});`,
      lang: 'ts',
      href: '/docs/getting-started/basic-example',
      cta: 'See the basic example',
    },
    links: [
      {
        title: 'Getting started',
        copy: 'A basic gateway, remote subschemas, duplicate types, and error handling.',
        href: '/docs/getting-started/basic-example',
        label: 'Getting started',
      },
      {
        title: 'Handbook',
        copy: 'Guided, runnable examples: from the foundation to architecture patterns and other integrations.',
        href: '/handbook',
        label: 'Open the handbook',
      },
      {
        title: 'Hive Gateway',
        copy: 'A production gateway built on the same tooling, with a schema registry, observability and more.',
        href: 'https://the-guild.dev/graphql/hive/docs/gateway',
        label: 'Hive Gateway docs',
      },
    ],
  },
} satisfies ProductDefinition;
