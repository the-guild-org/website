import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
import format from 'date-fns/format';
import tw from 'twin.macro';
import { components } from './elements';
import { Newsletter } from './newsletter';
import { Page } from '../shared/Page';
import { Meta, hasAuthor, hasManyAuthors } from '../../lib/meta';
import { Image } from './image';
import { Tag } from './tag';
import { authors } from '../authors';
import { Avatar } from './avatar';
import { GenericLink } from './elements/link';

const Content = styled.div`
  font-family: Inter, -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif;

  padding-top: 25px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.8rem;

  > * {
    margin-bottom: 1.7rem;
  }

  > pre[class*='language-'] {
    margin: 0;
    padding: 0;
    margin-bottom: 1.7rem;
    border-radius: 3px;

    > pre {
      padding: 1.5rem;
      margin: 0;
    }
  }
`;

const Author = styled.div<{
  many?: boolean;
}>`
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 0.9rem;

  ${(props) =>
    props.many &&
    css`
      &:not(:last-child) {
        padding-right: 15px;
      }

      &:not(:first-of-type) {
        padding-left: 15px;
      }
    `}
  & > div:nth-child(2) {
    margin-left: 10px;
    display: flex;
    text-align: left;
    flex-direction: column;
    justify-content: center;

    & > a {
      color: var(--colors-accent);
    }

    & > a:hover {
      color: var(--colors-accent-light);
    }
  }
`;

const Details = styled.div`
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Time = styled.time`
  color: var(--colors-dim);
  font-size: 0.8rem;
`;

const Cover = styled.div`
  padding-top: 25px;
  margin: 0 auto;
  width: 100%;
  height: auto;

  & > * {
    max-width: 100%;
    height: auto;
    max-height: 300px;
    display: block;
    margin: 0 auto;
  }
`;

const ConsultingInfo = styled.div`
  color: var(--colors-dim);
  border-left: 3px solid var(--colors-accent);
`;

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
          css={tw`block text-center mt-4`}
        >
          {format(date, 'EEEE, LLL do y')}
        </Time>
        <Details>
          {meta.authors.map((authorId, i) => {
            const author = authors[authorId];

            return (
              <Author many key={`${authorId}_${i}`}>
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

const Article = (meta: Meta): FC =>
  function ArticleRender({ children }) {
    const title = `${meta.title} - The Guild Blog`;
    const router = useRouter();

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
        <Page title={title} image={ogImage} description={meta.description}>
          <div css={tw`mx-auto max-w-[690px]`}>
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
            <div css={tw`py-32 px-3 md:px-0`}>
              <div css={tw`text-4xl text-center`}>{meta.title}</div>
              <Authors meta={meta} />
              <div css={tw`text-center mt-4`}>
                {meta.tags.map((t) => (
                  <Tag tag={t} key={t} asLink />
                ))}
              </div>
              <Cover>
                <Image src={meta.image} alt={title} />
              </Cover>
              <ConsultingInfo
                css={tw`bg-gray-100 dark:bg-gray-900 leading-7 p-6 mt-6`}
              >
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
              <Content>{children}</Content>
              <Newsletter />
            </div>
          </div>
        </Page>
      </MDXProvider>
    );
  };

export default Article;
