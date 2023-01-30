module.exports = {
  extends: ['@theguild'],
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
      rules: {
        // enable without breaking existing iframes
        'react/iframe-missing-sandbox': 'off',
      },
      settings: {
        'import/resolver': {
          typescript: {
            project: 'website/tsconfig.json',
          },
        },
      },
    },
    {
      files: 'packages/website-router/**',
      rules: {
        'import/extensions': 'off',
      },
    },
  ],
};
