import { globalCss } from '../stitches.config'

export const globalStyles = globalCss({
  // TODO: Remove this when guild/components Header/Footer could accept bg color
  'html[data-theme="dark"]': {
    '&, body, #tgc-modal, #tgc-modal > div:last-child > div': {
      background: 'var(--colors-background)',
    },
  },
  '.nextra-sidebar-container': {
    // 37px is the banner's height
    'padding-top': 'calc(var(--nextra-navbar-height + 37)) !important'
  }
})
