import { DocsThemeConfig, useConfig } from '@theguild/components';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Callout } from 'nextra-theme-docs';
import { NextSeo } from 'next-seo';
import { BlogCardList, Newsletter, Video } from '@/components';
import { MetaWithLink } from './lib/meta';
import blogsMeta from './dist/blogs-meta.json';

const SITE_NAME = 'The Guild';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

const config: DocsThemeConfig = {
  titleSuffix: ` – ${SITE_NAME}`,
  projectLink: 'https://github.com/the-guild-org/the-guild-website', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/the-guild-org/the-guild-website/tree/master/pages', // base URL for the docs repository
  nextLinks: true,
  prevLinks: true,
  search: false,
  floatTOC: true,
  darkMode: true,
  footer: false,
  footerEditLink: 'Edit this page on GitHub',
  logo: null,
  head: function Head() {
    const { title, meta: frontMatter } = useConfig();
    const description = frontMatter.description || `${SITE_NAME}: Modern API Platform and Ecosystem that scales`;
    const image = frontMatter.image || '/img/ogimage.png';
    console.log({ image }, frontMatter.image);
    return (
      <>
        <meta name="og:title" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:site_name" content="the-guild.dev" key="ogsitename" />
        <NextSeo title={title} description={description} openGraph={{ images: [{ url: ensureAbsolute(image) }] }} />
      </>
    );
  },
  gitTimestamp: 'Last updated on',
  defaultMenuCollapsed: true,
  feedbackLink: 'Question? Give us feedback →',
  feedbackLabels: 'kind/docs',
  bodyExtraContent: function BodyFooter() {
    const { route } = useRouter();
    const [similarArticles, setSimilarArticles] = useState<MetaWithLink[]>([]);
    const config = useConfig();
    const { tags } = config.meta;

    // useEffect(() => {
    //   if (!tags) {
    //     return;
    //   }
    //   const newSimilarArticles = blogsMeta
    //     .filter(article => tags.length === 0 || article.link !== route || article.tags?.some(tag => tags.includes(tag)))
    //     .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    //     .slice(0, 12)
    //     .sort(() => 0.5 - Math.random())
    //     .slice(0, 4);
    //
    //   setSimilarArticles(newSimilarArticles);
    // }, [tags, route]);

    if (!route.startsWith('/blog/')) {
      return null;
    }

    return (
      <div className="my-20">
        {similarArticles.length > 0 && (
          <>
            <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">Similar articles</h3>
            <BlogCardList articles={similarArticles} />
          </>
        )}
        <Newsletter />
      </div>
    );
  },
  components: {
    Callout,
    Video,
  },
};

export default config;
