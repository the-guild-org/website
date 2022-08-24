const plugin = require('tailwindcss/plugin');
const config = require('@theguild/tailwind-config');

module.exports = {
  ...config,
  content: [...config.content, './{pages,ui}/**/*.{tsx,mdx}'],
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.drag-none': {
          userDrag: 'none',
        },
      });
    }),
    require('@tailwindcss/line-clamp'),
  ],
};
