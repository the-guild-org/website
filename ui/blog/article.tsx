import { FC, useMemo } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
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

const Author = styled('div', {
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  fontSize: '0.9rem',
  '& > div:nth-child(2)': {
    marginLeft: 10,
    display: 'flex',
    textAlign: 'left',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > a': {
      color: 'var(--colors-accent)',
    },
    '& > a:hover': {
      color: 'var(--colors-accent-light)',
    },
  },
});

const Details = styled('div', {
  marginTop: '2rem',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
});

const Time = styled('time', {
  color: 'var(--colors-dim)',
  fontSize: '0.8rem',
});

const Cover = styled('div', {
  paddingTop: 25,
  margin: '0 auto',
  width: '100%',
  height: 'auto',
  '& > *': {
    maxWidth: '100%',
    height: 'auto',
    maxHeight: 300,
    display: 'block',
    margin: '0 auto',
  },
});

const ConsultingInfo = styled('div', {
  color: 'var(--colors-dim)',
  borderLeft: '3px solid var(--colors-accent)',
});

const Authors: FC<{ meta: Meta }> = ({ meta }) => {
  const date = meta.date ? new Date(meta.date) : new Date();
  const updatedDate = meta.updateDate ? new Date(meta.updateDate) : null;

  if (hasAuthor(meta)) {
    const author = meta.author && authors[meta.author];

    return (
      <Details>
        <Author>
          <div>
            <a href={author.link} title={author.name}>
              <Avatar author={author} />
            </a>
          </div>
          <div>
            <a href={author.link} title={author.name}>
              {author.name}
            </a>
            <Time
              dateTime={date.toISOString()}
              title={
                updatedDate
                  ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}`
                  : `Posted ${format(date, 'EEEE, LLL do y')}`
              }
            >
              {format(date, 'EEEE, LLL do y')}
            </Time>
          </div>
        </Author>
      </Details>
    );
  }

  if (hasManyAuthors(meta)) {
    return (
      <>
        <Time
          dateTime={date.toISOString()}
          title={
            updatedDate
              ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}`
              : `Posted ${format(date, 'EEEE, LLL do y')}`
          }
          className="mt-4 block text-center"
        >
          {format(date, 'EEEE, LLL do y')}
        </Time>
        <Details className="gap-x-5">
          {meta.authors.map((authorId, i) => {
            const author = authors[authorId];

            return (
              <Author key={`${authorId}_${i}`}>
                <div>
                  <a href={author.link} title={author.name}>
                    <Avatar author={author} />
                  </a>
                </div>
                <div>
                  <a href={author.link} title={author.name}>
                    {author.name}
                  </a>
                </div>
              </Author>
            );
          })}
        </Details>
      </>
    );
  }
};

const Article = (): FC<{ meta: Meta }> =>
  function ArticleRender({ meta, children }) {
    const title = `${meta.title} - The Guild Blog`;
    const router = useRouter();

    const similarArticles = useMemo<MetaWithLink[]>(() => {
      return blogsMeta
        .filter((article) => {
          const noTags = meta.tags.length === 0;
          const notActiveArticle = article.link !== router.route;
          const sharesTag = article.tags?.some((tag) =>
            meta.tags.includes(tag)
          );

          if (noTags) {
            return true;
          }

          return sharesTag && notActiveArticle;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 12)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    }, [router.route, blogsMeta]);

    const ogImage =
      (meta.image?.endsWith('.webm') || meta.image?.endsWith('.mp4')) &&
      meta.thumbnail
        ? meta.thumbnail
        : meta.image;

    const firstAuthor =
      authors[hasManyAuthors(meta) ? meta.authors[0] : meta.author];
    const markupData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      image: [ogImage],
      datePublished: new Date(meta.date).toISOString(),
      dateModified: new Date(meta.updateDate || meta.date).toISOString(),
      author: {
        '@type': 'Person',
        name: firstAuthor.name,
      },
      publisher: {
        '@type': 'Organization',
        name: 'The Guild',
        email: 'contact@the-guild.dev',
        url: 'https://the-guild.dev',
        logo: {
          '@type': 'ImageObject',
          url: 'https://the-guild.dev/static/logo.svg',
        },
      },
    };

    return (
      <MDXProvider components={components}>
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(markupData) }}
          />
          <link
            rel="canonical"
            href={meta.canonical || `https://the-guild.dev${router.route}`}
          />
        </Head>

        <Page title={title} image={ogImage} description={meta.description}>
          <div className="mx-auto w-[790px] max-w-[100vw] px-4 pt-32 sm:px-6 md:px-8">
            <Heading className="text-center text-[42px]">{meta.title}</Heading>
            <Authors meta={meta} />
            <TagList tags={meta.tags} asLink className="mt-4" />
            <Cover>
              <Image src={meta.image} alt={title} />
            </Cover>
            <ConsultingInfo className="mt-6 bg-gray-100 p-6 leading-7 dark:bg-gray-900">
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
            </ConsultingInfo>
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
