/* eslint sort-keys: ['error', 'asc', { minKeys: 5 }] */
module.exports = {
  root: true,
  ignorePatterns: ['!.*'],
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      files: ['*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}'],
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'next',
        'prettier',
      ],
      env: {
        es6: true,
      },
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'import/order': [
          'error',
          {
            groups: ['builtin', 'external', 'internal'],
            pathGroups: [
              {
                pattern: './*.css',
                group: 'unknown',
                position: 'after',
              },
            ],
          },
        ],
        'no-else-return': ['error', { allowElseIf: false }],
        'no-lonely-if': 'error',
        'no-restricted-globals': [
          'error',
          { name: 'isNaN', message: 'Use Number.isNaN instead' },
        ],
        'object-shorthand': ['error', 'always'],
        'prefer-destructuring': ['error', { object: true }],
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-curly-brace-presence': ['error', 'never'],
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
      },
    },
    {
      files: ['.eslintrc.js', 'next.config.js', 'check-links.js', 'api/*'],
      env: {
        node: true,
      },
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
