import { globalCss } from '../stitches.config';

export const globalStyles = globalCss({
  /* TODO: Remove this when guild/components Header/Footer will can accept bg color */
  'html[data-theme="dark"]': {
    '&, body, #tgc-modal, #tgc-modal > div:last-child > div': {
      background: 'var(--colors-background)',
    },
  },
});
