// @theguild/prettier-config 3 is ESM-only, so this file is too.
import config from '@theguild/prettier-config';

export default {
  ...config,
  plugins: [...config.plugins, 'prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  // Tailwind v4: class sorting reads the theme from the stylesheet.
  tailwindStylesheet: './website/src/styles/global.css',
};
