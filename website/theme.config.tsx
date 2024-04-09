import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Article } from '@/article';
import { BlogCardList, Newsletter, Video } from '@/components';
import { CodeSandbox } from '@/shared/embed/code-sandbox';
import { Gfycat } from '@/shared/embed/gfycat';
import { LinkPreview } from '@/shared/embed/link-preview';
import { OgCard } from '@/shared/embed/og-card';
import { StackBlitz } from '@/shared/embed/stack-blitz';
import { Tweet } from '@/shared/embed/tweet';
import { Callout, defineConfig, Giscus, Steps, useConfig, useTheme } from '@theguild/components';
import { allBlogs } from './lib/all-blogs';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

const siteDescription = 'Modern, Open-source API Tooling and Ecosystem that scales';
const siteName = 'The Guild';

export default defineConfig({
  docsRepositoryBase: 'https://github.com/the-guild-org/the-guild-website/tree/master/website', // base URL for the docs repository
  head: function useHead() {
    const { frontMatter, title: pageTitle } = useConfig();

    const title = `${pageTitle} (${siteName})`;
    const {
      description = `${siteName}: ${siteDescription}`,
      canonical,
      image,
      thumbnail,
    } = frontMatter;
    return (
      <>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta
          name="og:image"
          content={ensureAbsolute(
            thumbnail ||
              image ||
              `https://og-image.the-guild.dev/?product=GUILD&title=${encodeURI(pageTitle)}`,
          )}
        />
        <meta property="og:site_name" content={siteName} />
      </>
    );
  },
  main: function Main({ children }) {
    const { route } = useRouter();
    const config = useConfig();
    const { tags } = config.frontMatter;
    const { resolvedTheme } = useTheme();

    const similarArticles =
      tags &&
      allBlogs
        .filter(
          article =>
            article.link !== route &&
            (tags.length === 0 || article.tags?.some(tag => tags.includes(tag))),
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 12)
        // .sort(() => 0.5 - Math.random())
        .slice(0, 4);

    if (!route.startsWith('/blog/') || route.startsWith('/blog/tag')) {
      return children as ReactElement;
    }

    return (
      <>
        <Article />
        {children}
        <Giscus
          // ensure giscus is reloaded when client side route is changed
          key={route}
          repo="the-guild-org/website"
          repoId="MDEwOlJlcG9zaXRvcnkxOTk3MTM1NzI="
          category="Docs Discussions"
          categoryId="DIC_kwDOC-djJM4CSZk-"
          mapping="pathname"
          theme={resolvedTheme}
        />
        <Newsletter />
        {!!similarArticles?.length && (
          <>
            <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">
              Similar articles
            </h3>
            <BlogCardList articles={similarArticles} />
          </>
        )}
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
    Steps,
  },
  websiteName: 'The Guild',
  description: siteDescription,
  search: {
    placeholder: 'Search…',
  },
});
