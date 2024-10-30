import { productsItems } from '@theguild/components';

export default {
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
};
