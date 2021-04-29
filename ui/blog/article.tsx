import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import Head from 'next/head';
import styled from 'styled-components';
import format from 'date-fns/format';
import { ArrowLeft } from 'react-feather';
import { components } from './elements';
import { Newsletter } from './newsletter';
import { Page } from '../shared/Page';
import { Button } from '../shared/Layout';
import { Meta, hasAuthor, hasManyAuthors } from '../../lib/meta';
import { Image } from './image';
import { Tag } from './tag';
import { authors } from './authors';
import { Avatar } from './avatar';
import { GenericLink } from './elements/link';
import { useRouter } from 'next/router';

const Container = styled.div`
  max-width: 690px;
  margin: 0 auto;
`;

const Main = styled.article`
  padding: 125px 15px;
`;

const Content = styled.div`
  padding-top: 25px;
  font-family: 'PT Serif', serif;
  font-size: 1rem;
  font-weight: 400;
  color: var(--colors-text);
  line-height: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  margin-top: 0;
  font-size: 2rem;
  color: var(--colors-primary);
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
    props.many
      ? `
    &:not(:last-child) {
      padding-right: 15px;
    }

    &:not(:first-child) {
      padding-left: 15px;
    }
  `
      : ''}

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

const CenteredTime = styled.div`
  text-align: center;
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

const TagContainers = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const BackButton = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--colors-primary);
  margin: 0 auto;

  &:hover {
    background-color: var(--colors-dim-dark);
  }

  & > * {
    margin-right: 1.3rem;
  }
`;

const Back = styled.div`
  margin: 0 auto;
  margin: 125px auto 0 auto;
`;

const ConsultingInfo = styled.div`
  margin-top: 25px;
  padding: 25px;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2rem;
  font-family: 'PT Serif', serif;
  color: var(--colors-dim);
  background-color: #f7f7f7;
  border-left: 3px solid var(--colors-accent);
`;

function Authors(props: { meta: Meta }) {
  const { meta } = props;
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
        <CenteredTime>
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
        </CenteredTime>
        <Details>
          {meta.authors.map((authorId) => {
            const author = authors[authorId];

            return (
              <Author many>
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
}

const Article = (meta: Meta): React.FC => {
  return function ArticleRender({ children: content }) {
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
      dateModified: meta.updateDate
        ? new Date(meta.updateDate).toISOString()
        : new Date(meta.date).toISOString(),
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
          <Container>
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
            <Main>
              <Title>{meta.title}</Title>
              <Authors meta={meta} />
              <TagContainers>
                {meta.tags.map((t) => (
                  <Tag tag={t} key={t} asLink={true} />
                ))}
              </TagContainers>
              <Cover>
                <Image src={meta.image} alt={title} />
              </Cover>
              <ConsultingInfo>
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
              <Content>{content}</Content>
              <Newsletter />
              <Back>
                <Link href="/blog">
                  <BackButton title="Go back to blog">
                    <ArrowLeft /> Back to blog
                  </BackButton>
                </Link>
              </Back>
            </Main>
          </Container>
        </Page>
      </MDXProvider>
    );
  };
};

export default Article;
