export default {
  index: {
    display: 'hidden',
    theme: {
      layout: 'raw',
    },
  },
  blog: {
    type: 'page',
    theme: {
      layout: 'full',
      timestamp: false,
    },
  },
  solutions: {
    type: 'page',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  services: {
    type: 'page',
    theme: {
      layout: 'raw',
    },
  },
  'about-us': {
    type: 'page',
    theme: {
      typesetting: 'article',
      timestamp: false,
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
  contact: {
    title: 'Contact Us',
    type: 'page',
    route: '/contact',
  },
  404: {
    type: 'page',
    theme: {
      timestamp: false,
      typesetting: 'article',
    },
  },
};
