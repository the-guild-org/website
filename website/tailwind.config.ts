import plugin from 'prettier-plugin-tailwindcss';
import hocusPlugin from 'tailwindcss-hocus';
import config from '@theguild/tailwind-config';

export default {
  ...config,
  theme: {
    ...config.theme,
    extend: {
      ...config.theme.extend,
      animation: {
        scroll:
          'scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite',
      },
      keyframes: {
        scroll: {
          to: {
            transform: 'translate(calc(-50% - .5rem))',
          },
        },
      },
    },
  },
  content: [...config.content, './{pages,ui}/**/*.{tsx,mdx}'],
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.drag-none': { userDrag: 'none' },
      });
    }),
    // Adds hocus:, hocus-within:, group-hocus:, group-hocus-within:, peer-hocus:, peer-hocus-within:
    // for lazy people like me who use similar styles for :hover and :focus states.
    hocusPlugin,
  ],
};
