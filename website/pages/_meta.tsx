import { PRODUCTS } from '@theguild/components';

export default {
  index: {
    display: 'hidden',
    theme: {
      layout: 'raw',
    },
  },
  blog: {
    display: 'hidden',
    type: 'page',
    theme: {
      layout: 'full',
      timestamp: false,
    },
  },
  solutions: {
    display: 'hidden',
    type: 'page',
    theme: {
      typesetting: 'article',
      timestamp: false,
    },
  },
  ecosystem: {
    type: 'menu',
    title: 'Ecosystem',
    items: Object.values(PRODUCTS).map(product => ({
      title: (
        <span className="flex items-center gap-2">
          <product.logo className="h-7 w-auto" />
          {product.name}
        </span>
      ),
      href: new URL(product.href).pathname,
    })),
  },
  services: {
    type: 'page',
    theme: {
      layout: 'raw',
    },
  },
  'about-us': {
    display: 'hidden',
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
  404: {
    type: 'page',
    theme: {
      timestamp: false,
      typesetting: 'article',
    },
  },
};
