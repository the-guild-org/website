import { join } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import withOptimizedImages from 'next-optimized-images';
import rehypePrism from '@mapbox/rehype-prism';
import admonitions from 'remark-admonitions';

const CWD = process.cwd();
let wrotePackageJson = false;

const nextConfig = {
  pageExtensions: ['tsx', 'md', 'mdx', 'ts'],
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
  webpack(config) {
    config.resolve.alias.Public = join(CWD, 'public');

    //❗️ need for Next 12 with next-optimized-images
    config.module.rules.push({
      test: /\.(gif|mp4|webm|svg|ico)$/,
      use: {
        loader: 'file-loader',
      },
    });

    /*
     * https://github.com/vercel/next.js/discussions/32220#discussioncomment-1766378
     * Temporal workaround to use "type": "module" and fixes ERR_REQUIRE_ESM error in `next build`
     * PR that will fix this issue https://github.com/vercel/next.js/pull/33637
     */
    if (!wrotePackageJson) {
      mkdirSync(join(CWD, '.next'), { recursive: true });
      writeFileSync(join(CWD, '.next/package.json'), '{"type":"commonjs"}');
      wrotePackageJson = true;
    }

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

export default analyzer(mdx(withOptimizedImages(nextConfig)));
