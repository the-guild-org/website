import { FC, useEffect, useState } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import { ArticleJsonLd, NextSeo } from 'next-seo';

import { OpenGraph } from 'next-seo/lib/types';
import { styled } from '../../stitches.config';
import { components } from './elements';
import {
  Newsletter,
  Image,
  Avatar,
  GenericLink,
  TagList,
  Heading,
  BlogCardList,
} from '../components';
import { Page } from '../shared/Page';
import { Meta, hasAuthor, hasManyAuthors, MetaWithLink } from '../../lib/meta';
import { authors } from '../authors';
import blogsMeta from '../../dist/blogs-meta.json';

const Content = styled('div', {
  fontFamily: 'Open Sans, sans-serif',
  paddingTop: 25,
  fontWeight: 400,
  '> *': {
    marginBottom: '1.7rem',
  },
  '> pre[class*="language-"]': {
    margin: 0,
    marginBottom: '1.7rem',
    borderRadius: 3,
    '> pre': {
      padding: '1.5rem',
      margin: 0,
    },
  },
});

const Authors: FC<{ meta: Meta }> = ({ meta }) => {
  const date = meta.date ? new Date(meta.date) : new Date();
  const updatedDate = meta.updateDate ? new Date(meta.updateDate) : null;

  if (hasAuthor(meta)) {
    const author = meta.author && authors[meta.author];

    return (
      <div className="my-5 flex flex-row items-center justify-center">
        <a href={author.link} title={author.name}>
          <Avatar author={author} />
        </a>
        <div className="ml-2.5 flex flex-col">
          <a href={author.link} title={author.name} className="text-[#1cc8ee]">
            {author.name}
          </a>
          <time
            dateTime={date.toISOString()}
            title={
              updatedDate
                ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}`
                : `Posted ${format(date, 'EEEE, LLL do y')}`
            }
            className="text-xs text-[#777]"
          >
            {format(date, 'EEEE, LLL do y')}
          </time>
        </div>
      </div>
    );
  }

  if (hasManyAuthors(meta)) {
    return (
      <>
        <time
          dateTime={date.toISOString()}
          title={
            updatedDate
              ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}`
              : `Posted ${format(date, 'EEEE, LLL do y')}`
          }
          className="mt-5 block text-center text-xs text-[#777]"
        >
          {format(date, 'EEEE, LLL do y')}
        </time>
        <div className="my-5 flex flex-wrap justify-center gap-5">
          {meta.authors.map((authorId) => {
            const author = authors[authorId];
            return (
              <div key={authorId}>
                <a href={author.link} title={author.name}>
                  <Avatar author={author} />
                  <span className="ml-2.5 text-sm text-[#1cc8ee]">
                    {author.name}
                  </span>
                </a>
              </div>
            );
          })}
        </div>
      </>
    );
  }
};

const Article = (meta: Meta): FC =>
  function ArticleRender({ children }) {
    const title = `${meta.title} - The Guild Blog`;
    const router = useRouter();

    const [similarArticles, setSimilarArticles] = useState<MetaWithLink[]>([]);

    useEffect(() => {
      const newSimilarArticles = blogsMeta
        .filter(
          (article) =>
            meta.tags.length === 0 ||
            article.link !== router.route ||
            article.tags?.some((tag) => meta.tags.includes(tag))
        )
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 12)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      setSimilarArticles(newSimilarArticles);
    }, [router.route]);

    const firstAuthor =
      authors[hasManyAuthors(meta) ? meta.authors[0] : meta.author];
    const ogImage =
      (meta.image?.endsWith('.webm') || meta.image?.endsWith('.mp4')) &&
      meta.thumbnail
        ? meta.thumbnail
        : meta.image;

    const markupData: OpenGraph = {
      title,
      images: [{ url: `https://the-guild.dev/${ogImage}` }],
      article: {
        authors: meta.authors,
        publishedTime: new Date(meta.date).toISOString(),
        modifiedTime: new Date(meta.updateDate || meta.date).toISOString(),
        tags: meta.tags,
      },
    };

    return (
      <MDXProvider components={components}>
        <Head>
          <link
            rel="canonical"
            href={meta.canonical || `https://the-guild.dev${router.route}`}
          />
        </Head>
        <NextSeo
          title={meta.title}
          description={meta.description}
          openGraph={markupData}
        />
        <ArticleJsonLd
          title={title}
          description={meta.description}
          url={`https://the-guild.dev${router.route}`}
          publisherName="The Guild"
          publisherLogo="https://the-guild.dev/static/logo.svg"
          authorName={firstAuthor.name}
          datePublished={new Date(meta.date).toISOString()}
          dateModified={new Date(meta.updateDate || meta.date).toISOString()}
          images={[`https://the-guild.dev/${ogImage}`]}
        />

        <Page
          title={title}
          image={`https://the-guild.dev/${ogImage}`}
          description={meta.description}
        >
          <div className="mx-auto w-[790px] max-w-[100vw] px-4 pt-32 sm:px-6 md:px-8">
            <Heading className="text-center text-[42px]">{meta.title}</Heading>
            <Authors meta={meta} />
            <TagList tags={meta.tags} asLink className="mt-4" />
            <Image
              src={meta.image}
              alt={title}
              className="mx-auto mt-6 max-h-72"
            />
            <div className="mt-6 border-l-[3px] border-solid border-[#1cc8ee] bg-gray-100 p-6 leading-7 text-[#777] dark:bg-gray-900">
              Looking for experts? We offer consulting and trainings.
              <br />
              Explore{' '}
              <GenericLink
                href="/services"
                title="Explore our services. Consulting and Trainings."
              >
                our services
              </GenericLink>{' '}
              and get in touch.
            </div>
            <Content className="dark:text-[#7F818C]">{children}</Content>
          </div>
          <div className="container my-20">
            {similarArticles.length > 0 && (
              <>
                <h3 className="text-center text-[28px] font-extrabold dark:text-[#FCFCFC]">
                  Similar articles
                </h3>
                <BlogCardList articles={similarArticles} />
              </>
            )}
            <Newsletter className="mx-auto max-w-[650px]" />
          </div>
        </Page>
      </MDXProvider>
    );
  };

export default Article;
