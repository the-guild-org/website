const { join } = require('path');
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withMDX = require('@next/mdx');
const withOptimizedImages = require('next-optimized-images');
const rehypePrism = require('@mapbox/rehype-prism');
const admonitions = require('remark-admonitions');

const nextConfig = {
  experimental: {
    optimizeFonts: true,
    optimizeCss: true,
    babelMultiThread: true,
  },
  target: 'experimental-serverless-trace',
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
  webpack(config, { dev, isServer }) {
    if (!dev && isServer) {
      const originalEntry = config.entry;

      config.entry = async () => {
        const entries = { ...(await originalEntry()) };

        entries['./lib/build.ts'] = './lib/build.ts';

        return entries;
      };
    }
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
  images: {
    loader: 'custom', //❗️ need for Next 12 with next-optimized-images
    disableStaticImages: true, //❗️ need for Next 12 with next-optimized-images
  },
  eslint: {
    // TODO: Remove this when all eslint errors will be fixed
    ignoreDuringBuilds: true,
  },
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer, { enabled: process.env.ANALYZE === 'true' }],
    [
      withMDX,
      {
        extension: /\.mdx?$/,
        pageExtensions: ['tsx', 'md', 'mdx'],
        options: {
          remarkPlugins: [admonitions],
          rehypePlugins: [rehypePrism],
        },
      },
    ],
    [
      withOptimizedImages,
      {
        handleImages: ['jpeg', 'jpg', 'png'], //❗️ svg provoke fail during build – NonErrorEmittedError: (Emitted value instead of an instance of Error)
        inlineImageLimit: 1000,
        optimizeImagesInDev: false,
      },
    ],
  ],
  nextConfig
);
