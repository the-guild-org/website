import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'eslint',
  name: 'GraphQL ESLint',
  shortName: 'ESLint',
  mark: 'ESL',
  description: 'Lint GraphQL schemas and operations with ESLint.',
  repo: 'graphql-hive/graphql-eslint',
  branch: 'master',
  // TEMPORARY: until graphql-hive/graphql-eslint's website-content-only branch merges.
  contentRef: 'website-content-only',
  sections: [
    { base: '/docs', dir: 'docs', label: 'Documentation' },
    { base: '/rules', dir: 'rules', label: 'Rules', breadcrumb: 'Rules' },
    { base: '/changelog', dir: 'changelog', label: 'Changelog', breadcrumb: 'Changelog' },
  ],
  changelog: 'packages/plugin/CHANGELOG.md',
  redirects: {
    // The old site's playground ran ESLint in the browser; it is not ported.
    '/play': '/docs',
    '/docs/getting-started': '/docs/usage',
    '/docs/getting-started/parser': '/docs/parser',
    '/docs/getting-started/parser-options': '/docs/parser',
    '/docs/parser-options': '/docs/parser',
  },
  llmsTagline:
    'An ESLint parser, plugin and rule set for GraphQL: lints .graphql files and GraphQL in code files, validates schemas and operations against the spec, and enforces naming, description and Relay conventions.',
  landing: {
    headline: 'Lint your GraphQL with ESLint',
    tagline:
      'GraphQL ESLint integrates GraphQL into ESLint: it parses .graphql files and GraphQL embedded in your code, validates schemas and operations, and enforces the conventions your team agrees on.',
    claims: ['Schema and operations', 'Works in your editor', '60+ rules, custom rules welcome'],
    getStarted: '/docs/usage',
    featuresTitle: 'ESLint, extended to GraphQL',
    features: [
      {
        title: 'Lints both sides',
        copy: 'Rules for the schema you publish and for the operations your clients write, with shared recommended configs for each.',
        href: '/docs/configs',
        icon: 'graphql',
      },
      {
        title: 'Code files too',
        copy: 'Finds GraphQL in gql tags and /* GraphQL */ comments in JavaScript, TypeScript, Vue and Svelte files and reports at the right location.',
        href: '/docs/usage/js',
        icon: 'puzzle',
      },
      {
        title: 'Schema-aware',
        copy: 'Loads your schema through GraphQL Config, so rules can check that fields exist, types are reachable and deprecated fields are not used.',
        href: '/docs/usage',
        icon: 'safe-line',
      },
      {
        title: 'Your own rules',
        copy: 'The parser turns the GraphQL AST into ESTree, so custom rules use the ESLint API you already know.',
        href: '/docs/custom-rules',
        icon: 'check',
      },
    ],
    codeSample: {
      title: 'One config object',
      copy: 'Register the parser and plugin for .graphql files, pick a shared config or individual rules, and ESLint does the rest — on the command line and in your editor.',
      code: `import graphqlPlugin from '@graphql-eslint/eslint-plugin';

export default [
  {
    files: ['**/*.graphql'],
    languageOptions: {
      parser: graphqlPlugin.parser,
    },
    plugins: {
      '@graphql-eslint': graphqlPlugin,
    },
    rules: {
      ...graphqlPlugin.configs['flat/schema-recommended'].rules,
      '@graphql-eslint/require-description': ['error', { types: true }],
    },
  },
];`,
      lang: 'js',
      href: '/docs/usage',
      cta: 'Get started',
    },
    links: [
      {
        title: 'Rules',
        copy: 'Every rule with its category, the configs that enable it, and examples of correct and incorrect code.',
        href: '/rules',
        label: 'Browse the rules',
      },
      {
        title: 'Shared configs',
        copy: 'Recommended, all and Relay configs for schemas and operations.',
        href: '/docs/configs',
        label: 'Configs',
      },
      {
        title: 'Custom rules',
        copy: 'How the parser maps GraphQL to ESTree, and how to write and test rules of your own.',
        href: '/docs/custom-rules',
        label: 'Write a rule',
      },
    ],
  },
} satisfies ProductDefinition;
