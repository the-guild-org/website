const config = require('@theguild/prettier-config');

module.exports = {
  ...config,
  plugins: [...config.plugins, require('prettier-plugin-tailwindcss')],
};
