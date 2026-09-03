import eslintPluginAstro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

/**
 * Flat config for the whole monorepo: the Astro website and the two
 * Cloudflare Workers. The vendored Hive trees keep their upstream style and
 * are excluded here (they are also excluded from prettier — see
 * .prettierignore).
 */
export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.astro/**',
      '**/.wrangler/**',
      'website/src/hive/**',
      'website/src/pages/graphql/hive/**',
      'website/scripts/hive/**',
      'website/public/**',
      'eslint_report.json',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.node, ...globals.browser },
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.astro'],
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  {
    rules: {
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  {
    files: ['**/*.cjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Workers run on workerd with its own globals.
    files: ['packages/**/*.ts'],
    languageOptions: {
      globals: { ...globals.serviceworker },
    },
  },
);
