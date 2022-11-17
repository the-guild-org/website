module.exports = {
  extends: ['@theguild', '@theguild/eslint-config/react'],
  rules: {
    'unicorn/filename-case': 0,
    'prefer-const': ['error', { destructuring: 'all' }],
  },
  overrides: [
    {
      files: '*.md{,x}',
      parser: 'eslint-mdx',
      processor: 'mdx/remark',
      plugins: ['mdx'],
      rules: {
        'mdx/remark': 'error',
      },
      parserOptions: {
        ecmaVersion: 13,
        sourceType: 'module',
      },
    },
  ],
};
