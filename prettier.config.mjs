// The whole formatting setup lives here (it used to extend
// @theguild/prettier-config; this is that config, verbatim).
export default {
  trailingComma: 'all',
  printWidth: 100,
  singleQuote: true,
  arrowParens: 'avoid',
  // printWidth line breaks in md/mdx.
  proseWrap: 'always',
  overrides: [
    { files: '*.md{,x}', options: { semi: false, trailingComma: 'none' } },
    { files: '*.svg', options: { parser: 'html' } },
    { files: '*.json', options: { trailingComma: 'none' } },
  ],
  plugins: [
    // Shell scripts, Dockerfiles, .properties, .gitignore, dotenv.
    'prettier-plugin-sh',
    // Field order in package.json.
    'prettier-plugin-pkg',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-astro',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    // React and Next first (the blog's code samples import them).
    '^react(-dom)?$',
    '^next(/.*|$)',
    // Anything not matched in the other groups.
    '<THIRD_PARTY_MODULES>',
    // Scoped packages, and names starting with a digit or underscore.
    '^(@|\\d|_)',
    // Relative imports, except the asset extensions below.
    '^(?=\\.+)(.(?!\\.(graphql|css|png|svg|jpe?g|webp|avif|wasm|mp4|webm)))+$',
    // Asset imports last.
    '^.+\\.(graphql|css|png|svg|jpe?g|webp|avif|wasm|mp4|webm)$',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy', 'importAssertions'],
  // Tailwind v4: class sorting reads the theme from the stylesheet.
  tailwindStylesheet: './website/src/styles/global.css',
};
