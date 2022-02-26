/* eslint sort-keys: ['error', 'asc', { minKeys: 5 }] */

module.exports = {
  root: true,
  ignorePatterns: ['!.*'],
  reportUnusedDisableDirectives: true,
  overrides: [
    {
      env: {
        es6: true,
      },
      extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'next',
        'prettier',
      ],
      files: '*.{js,jsx,cjs,mjs,ts,tsx,cts,mts}',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
      },
      plugins: ['unicorn'],
      rules: {
        '@typescript-eslint/array-type': ['error', { readonly: 'generic' }],
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
        'no-empty': ['error', { allowEmptyCatch: true }],
        'no-lonely-if': 'error',
        'no-restricted-globals': [
          'error',
          { name: 'isNaN', message: 'Use Number.isNaN instead' },
          { name: 'React', message: 'use named import instead' },
        ],
        'no-restricted-imports': [
          'error',
          {
            name: 'react',
            importNames: ['default', 'FunctionComponent'],
            message:
              "Use named import if you need import something from react. `import React from 'react'` not need in NextJS. Use 'FC' instead 'FunctionComponent'.",
          },
        ],
        'no-var': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-const': 'error',
        'prefer-destructuring': ['error', { object: true }],
        'prefer-template': 'error',
        'react/jsx-boolean-value': ['error', 'never'],
        'react/jsx-curly-brace-presence': ['error', 'never'],
        'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
        'react/no-unescaped-entities': 'off',
        'react/self-closing-comp': 'error',
        'unicorn/prefer-module': 'error',
        'unicorn/prefer-node-protocol': 'error',
      },
    },
    {
      files: '*.{ts,tsx,cts,mts}',
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        '@typescript-eslint/prefer-includes': 'error',
        '@typescript-eslint/prefer-string-starts-ends-with': 'error',
        '@typescript-eslint/prefer-regexp-exec': 'error',
        '@typescript-eslint/dot-notation': 'error',
      },
    },
    {
      files: '*.{js,jsx,cjs,mjs}',
      rules: {
        'dot-notation': 'error',
      },
    },
    {
      files: ['*.cjs'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: '{pages,ui}/**/*',
      extends: ['plugin:tailwindcss/recommended'],
      settings: {
        tailwindcss: {
          config: 'tailwind.config.cjs',
        },
      },
    },
  ],
};
