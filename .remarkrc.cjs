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
    [
      'lint-chicago-heading',
      [
        'error',
        [
          'KitQL',
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
        ],
      ],
    ],
  ],
};
