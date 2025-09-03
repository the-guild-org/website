import { productsItems } from '@theguild/components';

export default {
  index: {
    display: 'hidden',
    theme: {
      layout: 'raw',
    },
  },
  products: {
    type: 'menu',
    title: 'Products',
    items: productsItems,
  },
  blog: {
    type: 'page',
    theme: {
      layout: 'full',
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
  'join-us': {
    type: 'page',
    display: 'hidden',
    theme: {
      layout: 'full',
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
