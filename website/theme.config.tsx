import { DocsThemeConfig, useConfig } from '@theguild/components';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Callout } from 'nextra-theme-docs';
import { ArticleJsonLd, NextSeo } from 'next-seo';
import { BlogCardList, Newsletter, Video } from '@/components';
import { AUTHORS } from '@/authors';
import { CodeSandbox } from '@/shared/embed/CodeSandbox';
import { LinkPreview } from '@/shared/embed/LinkPreview';
import { Gfycat } from '@/shared/embed/Gfycat';
import { YouTube } from '@/shared/embed/YouTube';
import { Tweet } from '@/shared/embed/Tweet';
import { StackBlitz } from '@/shared/embed/StackBlitz';
import blogsMeta from './dist/blogs-meta.json';
import { MetaWithLink } from './lib/meta';
import { asArray } from './lib/as-array';

const SITE_NAME = 'The Guild';

function ensureAbsolute(url: string): string {
  return url.startsWith('/') ? `https://the-guild.dev${url}` : url;
}

const config: DocsThemeConfig = {
  titleSuffix: ` – ${SITE_NAME}`,
  projectLink: 'https://github.com/the-guild-org/the-guild-website', // GitHub link in the navbar
  docsRepositoryBase: 'https://github.com/the-guild-org/the-guild-website/tree/master/pages', // base URL for the docs repository
  nextLinks: false,
  prevLinks: false,
  search: false,
  floatTOC: true,
  darkMode: true,
  footer: false,
  footerEditLink: 'Edit this page on GitHub',
  logo: null,
  head: function Head() {
    // eslint-disable-next-line prefer-const
    let { title, meta: frontMatter } = useConfig();
    const { route } = useRouter();
    const description = frontMatter.description || `${SITE_NAME}: Modern API Platform and Ecosystem that scales`;
    const image = frontMatter.image || '/img/ogimage.png';

    let head: ReactElement;

    if (route.startsWith('/newsletter/') || (route.startsWith('/blog/') && !route.startsWith('/blog/tag/'))) {
      let authors: string[];
      let tags: string[];

      if (route.startsWith('/newsletter/')) {
        title += ` - ${SITE_NAME} Newsletter`;
        authors = [SITE_NAME];
        tags = ['newsletter', 'graphql'];
      } else {
        title += ` - ${SITE_NAME} Blog`;
        authors = asArray(frontMatter.authors);
        tags = asArray(frontMatter.tags);
      }
      authors = authors.map(authorId => AUTHORS[authorId]?.name || authorId);

      const ogImage =
        (image.endsWith('.webm') || image.endsWith('.mp4')) && frontMatter.thumbnail ? frontMatter.thumbnail : image;
      const imageUrl = ogImage.startsWith('/') ? `https://the-guild.dev${ogImage}` : (ogImage as string);

      head = (
        <>
          <NextSeo
            title={title}
            description={description}
            openGraph={{
              title,
              images: [{ url: imageUrl }],
              article: {
                authors,
                publishedTime: new Date(frontMatter.date).toISOString(),
                modifiedTime: new Date(frontMatter.updateDate || frontMatter.date).toISOString(),
                tags,
              },
            }}
          />
          <ArticleJsonLd
            title={title}
            description={description}
            url={`https://the-guild.dev${route}`}
            publisherName={SITE_NAME}
            publisherLogo="https://the-guild.dev/static/logo.svg"
            authorName={authors[0]}
            datePublished={new Date(frontMatter.date).toISOString()}
            dateModified={new Date(frontMatter.updateDate || frontMatter.date).toISOString()}
            images={[imageUrl]}
          />
        </>
      );
    }

    return (
      <>
        {head || (
          <NextSeo title={title} description={description} openGraph={{ images: [{ url: ensureAbsolute(image) }] }} />
        )}
        <meta name="og:title" content={title} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta property="og:site_name" content="the-guild.dev" key="ogsitename" />
        {frontMatter.canonical ? <link rel="canonical" href={frontMatter.canonical} /> : null}
        <meta name="twitter:card" content="summary_large_image" />
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

    useEffect(() => {
      if (!tags) {
        return;
      }
      const newSimilarArticles = blogsMeta
        .filter(article => tags.length === 0 || article.link !== route || article.tags?.some(tag => tags.includes(tag)))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 12)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      setSimilarArticles(newSimilarArticles);
    }, [tags, route]);

    if (!route.startsWith('/blog/') && !route.startsWith('/newsletter/') && route !== '/about-us') {
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
    CodeSandbox,
    LinkPreview,
    Gfycat,
    YouTube,
    Tweet,
    StackBlitz,
  },
};

// eslint-disable-next-line import/no-default-export
export default config;
