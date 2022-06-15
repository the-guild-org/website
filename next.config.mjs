import { join } from 'node:path';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import withOptimizedImages from 'next-optimized-images';
import rehypePrism from '@mapbox/rehype-prism';

const CWD = process.cwd();

const nextConfig = {
  pageExtensions: ['tsx', 'md', 'mdx', 'ts', 'cts', 'mts'],
  experimental: {
    esmExternals: 'loose',
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
  redirects: () => [
    {
      source: '/chat',
      destination:
        'https://go.crisp.chat/chat/embed/?website_id=af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
      permanent: true,
    },
  ],
  webpack(config) {
    config.resolve.alias.Public = join(CWD, 'public');

    //❗️ need for Next 12 with next-optimized-images
    config.module.rules.push({
      test: /\.(gif|mp4|webm|svg|ico|zip)$/,
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
    providerImportSource: '@mdx-js/react',
    rehypePlugins: [rehypePrism],
  },
});

export default analyzer(mdx(withOptimizedImages(nextConfig)));
