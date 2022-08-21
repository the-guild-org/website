const plugin = require('tailwindcss/plugin');
const config = require('@theguild/tailwind-config');

module.exports = {
  ...config,
  content: [
    ...config.content,
    './{pages,ui}/**/*.{html,ts,tsx,js,jsx,cjs,mjs}',
  ],
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
