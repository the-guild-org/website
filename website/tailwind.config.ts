// @ts-expect-error -- types are missing
import plugin from 'tailwindcss/plugin';
import config from '@theguild/tailwind-config';
const hocusPlugin = require('tailwindcss-hocus')

export default {
  ...config,
  content: [
    // @ts-expect-error -- fixme
    ...config.content,
    './{pages,ui}/**/*.{tsx,mdx}',
  ],
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.drag-none': {
          userDrag: 'none',
        },
      });
    }),
    // Adds hocus:, hocus-within:, group-hocus:, group-hocus-within:, peer-hocus:, peer-hocus-within:
    // for lazy people like me who use similar styles for :hover and :focus states.
    hocusPlugin,
  ],
};
