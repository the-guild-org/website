export default {
  index: {
    display: 'hidden',
  },
  // To have link in navbar
  blog2: {
    type: 'page',
    title: 'Blog',
    href: '/blog',
  },
  // Remove link from mobile menu
  blog: {
    display: 'hidden',
    theme: {
      typesetting: 'article',
    },
  },
  logos: {
    type: 'page',
    display: 'hidden',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  'about-us': {
    type: 'page',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  contact: {
    title: 'Contact Us',
    type: 'page',
    href: '/contact',
  },
};
