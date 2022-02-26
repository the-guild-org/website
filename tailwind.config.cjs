const plugin = require('tailwindcss/plugin');

module.exports = {
  darkMode: 'class',
  content: ['./{pages,ui}/**/*.{html,ts,tsx,js,jsx,cjs,mjs}'],
  theme: {
    container: {
      center: true,
    },
    extend: {
      zIndex: {
        '-1': -1,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.drag-none': {
          userDrag: 'none',
        },
        '.select-none': {
          userSelect: 'none',
        },
      });
    }),
    require('@tailwindcss/line-clamp'),
  ],
};
