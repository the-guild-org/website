import { PRODUCTS_MENU_LIST } from '../lib/future-components/products';

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
    items: PRODUCTS_MENU_LIST,
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
