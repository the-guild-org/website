const nextMDX = require('@next/mdx');
const rehypePrism = require('@mapbox/rehype-prism');
const oembed = require('@agentofuser/remark-oembed').default;
const withOptimizedImages = require('next-optimized-images');
const compose = require('next-compose-plugins');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withMDX = nextMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [oembed],
    rehypePlugins: [rehypePrism],
  },
});

module.exports = compose([withBundleAnalyzer, withOptimizedImages, withMDX], {
  pageExtensions: ['tsx', 'md', 'mdx'],
  experimental: {
    modern: true,
    rewrites() {
      return [
        {
          source: '/feed.xml',
          destination: '/_next/static/feed.xml',
        },
        {
          source: '/sitemap.xml',
          destination: '/_next/static/sitemap.xml',
        },
      ];
    },
  },
});
