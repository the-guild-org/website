import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'config',
  name: 'GraphQL Config',
  shortName: 'Config',
  mark: 'CFG',
  description: 'One configuration for all your GraphQL tools.',
  repo: 'graphql-hive/graphql-config',
  branch: 'master',
  sections: [
    { base: '/docs', dir: 'docs', label: 'Documentation' },
    { base: '/changelog', dir: 'changelog', label: 'Changelog', breadcrumb: 'Changelog' },
  ],
  changelog: 'CHANGELOG.md',
  redirects: {
    '/legacy': '/docs/migration',
    '/docs/user/user-introduction': '/docs',
    '/docs/user/user-installation': '/docs/installation',
    '/docs/recipes/migration': '/docs/migration',
    '/docs/user/user-documents': '/docs/user/documents',
    '/docs/library/api-graphql-config': '/docs/library/graphql-config',
    '/docs/library/api-graphql-project-config': '/docs/library/graphql-project-config',
    '/docs/library/author-extensions': '/docs/library/extensions',
    '/docs/library/author-load-config': '/docs/library/load-config',
    '/docs/library/author-loaders': '/docs/library/loaders',
    '/usage': '/docs/user/usage',
    '/docs/user/user-usage': '/docs/user/usage',
    '/docs/user': '/docs/user/usage',
    '/docs/introduction': '/docs',
    '/extensions': '/docs/library/extensions',
    '/introduction': '/docs',
    '/schema': '/docs/user/schema',
    '/docs/schema': '/docs/user/schema',
    '/load-config': '/docs/library/load-config',
    '/docs/user/user-schema': '/docs/user/schema',
    '/docs/library': '/docs/library/graphql-config',
  },
  llmsTagline:
    'One configuration file for every GraphQL tool: point your schema and documents in a single place and editors, IDEs, code generators and linters all read it.',
  landing: {
    headline: 'One configuration for all your GraphQL tools',
    tagline:
      'The easiest way to configure your development environment with your GraphQL schema: one file that every tool, editor and IDE understands.',
    claims: ['Supported by most tools', 'Multiple projects', 'Extensible'],
    getStarted: '/docs',
    featuresTitle: 'Why GraphQL Config',
    features: [
      {
        title: 'Easy to use',
        copy: 'Describe where your schema and operations live once, in YAML, JSON, or a TypeScript file, and stop repeating it per tool.',
        href: '/docs/user/usage',
        icon: 'timer-line',
      },
      {
        title: 'Fully configurable',
        copy: 'Multiple projects, environment variables, and per-tool extensions that carry their own settings inside the same file.',
        href: '/docs/library/extensions',
        icon: 'puzzle',
      },
      {
        title: 'Open source',
        copy: 'Adopted by GraphQL Code Generator, GraphQL ESLint, the VS Code extension, and the JetBrains plugin, among others.',
        href: '/docs/library/graphql-config',
        icon: 'check',
      },
    ],
    codeSample: {
      title: 'Point, once',
      copy: 'The schema, the documents, and any extension settings. Tools load it with the graphql-config library and pick the project they need.',
      code: `# graphql.config.yaml
schema: https://localhost:4000/graphql
documents: src/**/*.{graphql,ts,tsx}
extensions:
  codegen:
    generates:
      src/generated/graphql.ts:
        plugins:
          - typescript
          - typescript-operations`,
      lang: 'yaml',
      href: '/docs/user/usage',
      cta: 'See the file format',
    },
    links: [
      {
        title: 'For users',
        copy: 'Install, write the file, and declare your schema and documents.',
        href: '/docs/user/usage',
        label: 'User guide',
      },
      {
        title: 'For tool authors',
        copy: 'Load the configuration, read a project, and define your own extension.',
        href: '/docs/library/load-config',
        label: 'Library docs',
      },
      {
        title: 'Migration',
        copy: 'Moving from the legacy .graphqlconfig format.',
        href: '/docs/migration',
        label: 'Migration guide',
      },
    ],
  },
} satisfies ProductDefinition;
