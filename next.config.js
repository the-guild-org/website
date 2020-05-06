const nextMDX = require('@next/mdx');
const rehypePrism = require('@mapbox/rehype-prism');
const oembed = require('@agentofuser/remark-oembed').default;

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

module.exports = withBundleAnalyzer(
  withMDX({
    pageExtensions: ['tsx', 'md', 'mdx'],
  })
);
