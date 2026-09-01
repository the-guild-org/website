const config = require('@theguild/prettier-config');

module.exports = {
  ...config,
  plugins: [...config.plugins, 'prettier-plugin-astro', 'prettier-plugin-tailwindcss'],
};
