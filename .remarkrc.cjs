const IGNORE_CASING_WORDS = [
  'non-serial',
  'KitQL',
  'RxJS',
  'TL;DR',
  'MCB',
  'SaaS',
  'The Guild',
  'SF',
  'WhatsApp',
  'ESM',
  'SDL',
  'SwiftGraphQL',
  'OK-GROW',
  'JSON',
  'OpenAPI',
  'RESTful',
  'REST',
  'SOFA',
  'vs',
  'AST',
  'SDK',
  's',
  'DI', // Dependency Injection
  'APIs',
  'SvelteKit',
  'RabbitMQ',
  'PWA',
  'WebSocket',
  'WebSockets',
  'SSE',
  'SSEs',
  'ClickHouse',
  'urql',
  'HOC',
  'MongoDB',
  'AuthZ',
  'DOM',
  'npm',
  'NestJS',
  'WebGL',
  'WebAssembly',
  'ES6',
  'accounts-js',
  'Vue.js',
  'DataLoader',
  'AoT',
  'ESLint',
  'MDX',
  'SEO',
  'LTR',
  'RTL',
  'SWC',
  'feTS',
  'tRPC',
  'ORM',
  'TOC',
  'CJS',
  'MathJax',
  'LaTeX',
  'MikroORM',
  'GraphQL.js',
  'AbortController',
  'fetch'
];

module.exports = {
  plugins: [
    // "preset-lint-consistent", // Check that markdown is consistent.
    // "preset-lint-recommended", // Few recommended rules.
    // "preset-lint-markdown-style-guide", // Markdown style guide.
    // "preset-prettier",
    // `remark-lint-list-item-indent` is configured with `tab-size` in the
    // recommended preset, but if we’d prefer something else, it can be
    // reconfigured:
    // [
    //   "remark-lint-list-item-indent",
    //   "space"
    // ]
    'frontmatter',
    'lint-no-multiple-toplevel-headings',
    ['lint-chicago-heading', ['error', IGNORE_CASING_WORDS]],
    'lint-no-dot-at-end-of-heading',
    'lint-no-full-bold-heading',
  ],
};
