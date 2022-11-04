/* eslint-disable import/no-default-export, react-hooks/rules-of-hooks */
import { ReactElement, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Header, useConfig, Callout, defineConfig } from '@theguild/components';
import { BlogCardList, Newsletter, Video } from '@/components';
import { AUTHORS } from '@/authors';
import { CodeSandbox } from '@/shared/embed/CodeSandbox';
import { LinkPreview } from '@/shared/embed/LinkPreview';
import { OgCard } from '@/shared/embed/OgCard';
import { Gfycat } from '@/shared/embed/Gfycat';
import { Tweet } from '@/shared/embed/Tweet';
import { StackBlitz } from '@/shared/embed/StackBlitz';
import { Article } from '@/article';
import blogsMeta from './dist/blogs-meta.json';
import { MetaWithLink } from './lib/meta';
import { asArray } from './lib/as-array';

const siteName = 'The Guild';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

export default defineConfig({
  siteName,
  docsRepositoryBase: 'https://github.com/the-guild-org/the-guild-website/tree/master/website', // base URL for the docs repository
  navbar: <Header sameSite accentColor="var(--colors-accent)" themeSwitch searchBarProps={{ version: 'v2' }} />,
  getNextSeoProps() {
    const { frontMatter } = useConfig();
    const description = frontMatter.description || `${siteName}: Modern API Platform and Ecosystem that scales`;
    const authors =
      frontMatter.authors && asArray(frontMatter.authors).map(authorId => AUTHORS[authorId]?.name || authorId);
    const tags = frontMatter.tags && asArray(frontMatter.tags);
    const image = frontMatter.thumbnail || '/img/ogimage.png';
    const ogImage =
      (image.endsWith('.webm') || image.endsWith('.mp4')) && frontMatter.thumbnail ? frontMatter.thumbnail : image;

    return {
      description,
      openGraph: {
        images: [{ url: ensureAbsolute(ogImage) }],
        article: frontMatter.date
          ? {
              authors,
              publishedTime: new Date(frontMatter.date).toISOString(),
              modifiedTime: new Date(frontMatter.updateDate || frontMatter.date).toISOString(),
              tags,
            }
          : undefined,
      },
    };
  },
  head() {
    const { frontMatter } = useConfig();

    return (
      <>
        <meta property="og:site_name" content="the-guild.dev" key="ogsitename" />
        {frontMatter.canonical && <link rel="canonical" href={frontMatter.canonical} />}
      </>
    );
  },
  main({ children }) {
    const { route } = useRouter();
    const [similarArticles, setSimilarArticles] = useState<MetaWithLink[]>([]);
    const config = useConfig();
    const { tags } = config.frontMatter;

    useEffect(() => {
      const newSimilarArticles = tags
        ? blogsMeta
            .filter(
              article => article.link !== route && (tags.length === 0 || article.tags?.some(tag => tags.includes(tag)))
            )
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 12)
            .sort(() => 0.5 - Math.random())
            .slice(0, 4)
        : [];

      setSimilarArticles(newSimilarArticles);
    }, [tags, route]);

    if (!route.startsWith('/blog/') || route.startsWith('/blog/tag')) {
      return children as ReactElement;
    }

    return (
      <>
        <Article />
        {children}
        {similarArticles.length > 0 && (
          <>
            <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">Similar articles</h3>
            <BlogCardList articles={similarArticles} />
          </>
        )}
        <Newsletter />
      </>
    );
  },
  components: {
    Callout,
    Video,
    CodeSandbox,
    LinkPreview,
    OgCard,
    Gfycat,
    Tweet,
    StackBlitz,
  },
});
