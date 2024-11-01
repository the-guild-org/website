export default {
  blog: {
    type: 'page',
    title: 'Blog',
    theme: {
      sidebar: false,
      pagination: false,
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
