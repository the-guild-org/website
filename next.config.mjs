import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import withShiki from '@stefanprobst/rehype-shiki';
import { getHighlighter } from 'shiki';

const nextConfig = {
  pageExtensions: ['tsx', 'md', 'mdx', 'ts', 'cts', 'mts'],
  experimental: {
    esmExternals: true,
    images: {
      allowFutureImage: true,
    },
    newNextLinkBehavior: true,
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
  eslint: {
    // TODO: Remove this when all eslint errors will be fixed
    ignoreDuringBuilds: true,
  },
};

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const highlighter = await getHighlighter({ theme: 'github-dark' });

// Add alias for `yml`
await highlighter.loadLanguage({
  id: 'yaml',
  scopeName: 'source.yaml',
  path: 'yaml.tmLanguage.json',
  aliases: ['yml'],
});

// Add alias for `json5`
await highlighter.loadLanguage({
  id: 'javascript',
  scopeName: 'source.js',
  path: 'javascript.tmLanguage.json',
  samplePath: 'javascript.sample',
  aliases: ['js', 'json5'],
});

const mdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    providerImportSource: '@mdx-js/react',
    rehypePlugins: [
      [
        withShiki,
        {
          highlighter,
          ignoreUnknownLanguage: false,
        },
      ],
    ],
  },
});

export default analyzer(mdx(nextConfig));
