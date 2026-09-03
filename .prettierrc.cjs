const config = require('@theguild/prettier-config');

module.exports = {
  ...config,
  plugins: [...config.plugins, 'prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
  // Tailwind v4: class sorting reads the theme from the stylesheet.
  tailwindStylesheet: './website/src/styles/global.css',
};
