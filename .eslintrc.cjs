module.exports = {
  overrides: [
    {
      files: ['*.js', '*.mjs', '*.cjs'],
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 2022,
      },
    },
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
      files: 'website/**/*.{ts,tsx}',
      extends: ['@theguild', '@theguild/eslint-config/react'],
      rules: {
        // enable without breaking existing iframes
        'react/iframe-missing-sandbox': 'off',
        'import/extensions': 'off',
      },
      parserOptions: {
        project: 'website/tsconfig.json',
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
      extends: ['@theguild'],
      rules: {
        'import/extensions': 'off',
      },
      parserOptions: {
        project: 'packages/website-router/tsconfig.json',
      },
    },
    {
      files: 'packages/website-helper-worker/**',
      extends: ['@theguild'],
      rules: {
        'import/extensions': 'off',
      },
      parserOptions: {
        project: 'packages/website-helper-worker/tsconfig.json',
      },
    },
  ],
};
