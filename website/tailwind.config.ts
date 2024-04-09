// @ts-expect-error -- types are missing
import plugin from 'tailwindcss/plugin';
import config from '@theguild/tailwind-config';

// eslint-disable-next-line import/no-default-export
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
  ],
};
