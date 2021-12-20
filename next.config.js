const { join } = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withMDX = require('@next/mdx');
const withOptimizedImages = require('next-optimized-images');
const rehypePrism = require('@mapbox/rehype-prism');
const admonitions = require('remark-admonitions');

const nextConfig = {
  pageExtensions: ['tsx', 'md', 'mdx'],
  experimental: {
    esmExternals: true,
    optimizeFonts: true,
    optimizeCss: true,
  },
  rewrites: () => [
    {
      source: '/feed.xml',
      destination: '/_next/static/feed.xml',
    },
    {
      source: '/sitemap.xml',
      destination: '/_next/static/sitemap.xml',
    },
  ],
  webpack(config) {
    config.resolve.alias.Public = join(process.cwd(), 'public');

    //❗️ need for Next 12 with next-optimized-images
    config.module.rules.push({
      test: /\.(gif|mp4|webm|svg|ico)$/,
      use: {
        loader: 'file-loader',
      },
    });

    return config;
  },
  eslint: {
    // TODO: Remove this when all eslint errors will be fixed
    ignoreDuringBuilds: true,
  },
  images: {
    handleImages: ['jpeg', 'jpg', 'png'], //❗️ svg provoke fail during build – NonErrorEmittedError: (Emitted value instead of an instance of Error)
    limit: 1000,
    disableStaticImages: true, //❗️ need for Next 12 with next-optimized-images
    loader: 'custom', //❗️ need for Next 12 with next-optimized-images
  },
};

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [admonitions],
    rehypePlugins: [rehypePrism],
  },
});

module.exports = analyzer(mdx(withOptimizedImages(nextConfig)));
