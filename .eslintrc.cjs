module.exports = {
  extends: ['@theguild'],
  rules: {
    'unicorn/filename-case': 0,
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
    {
      files: 'website/**',
      extends: '@theguild/eslint-config/react',
      settings: {
        'import/resolver': {
          typescript: {
            project: 'website/tsconfig.json',
          },
        },
      },
    },
  ],
};
