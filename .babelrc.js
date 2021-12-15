module.exports = {
  presets: ['next/babel'],
  plugins: [['styled-components', { ssr: true }], 'babel-plugin-macros'],
};
