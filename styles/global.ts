import { globalCss } from '../stitches.config';

const globalStyles = globalCss({
  /* TODO: Remove this when guild/components Header/Footer will can accept bg color */
  '@media (min-width: 768px)': {
    'header, header > div > nav': {
      backgroundColor: 'transparent !important',
    },
  },
  footer: {
    backgroundColor: 'transparent !important',
  },
  'html[data-theme="dark"]': {
    '&, body, #tgc-modal, #tgc-modal > div:last-child > div': {
      backgroundColor: 'var(--colors-background)',
    },
  },
  'html, body, #__next': {
    margin: 0,
    width: '100%',
    height: '100%',
  },
  ':root': {
    '--colors-text': 'white',
    '--colors-dim': '#777',
    '--colors-dim-dark': '#555',
    '--colors-accent': '#1cc8ee',
    '--colors-accent-light': '#1cc8ee',
    '--colors-error': '#bf120d',
    '--colors-error-light': '#ff3f38',
    '--colors-primary': 'white',
    '--colors-background': '#0b0d11',
    '--hover-opacity': 0.75,
  },
  body: {
    fontFamily: 'Poppins, sans-serif',
    zIndex: -1 /* needs for blue and pink circles */
  },
  a: {
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.2s ease 0s',
  },
  html: {
    /* For smooth scrolling effect when click on '#' hash links */
    scrollBehavior: 'smooth',
  }
});

export default globalStyles;
