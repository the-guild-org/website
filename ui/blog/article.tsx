import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import styled from 'styled-components';
import format from 'date-fns/format';
import { ArrowLeft } from 'react-feather';
import { components } from './elements';
import { Newsletter } from './newsletter';
import { Page } from '../shared/Page';
import { Button } from '../shared/Layout';
import { Meta } from '../../lib/types';
import { Image } from './image';

const Container = styled.div`
  max-width: 690px;
  margin: 0 auto;
`;

const Main = styled.article`
  padding: 125px 15px;
`;

const Content = styled.div`
  padding-top: 75px;
  font-family: 'PT Serif', serif;
  font-size: 1.2rem;
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

const Details = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Time = styled.time`
  color: var(--colors-dim);
  font-size: 0.8rem;

  & > a {
    color: var(--colors-accent);
  }

  & > a:hover {
    color: var(--colors-accent-light);
  }
`;

const Cover = styled.div`
  padding-top: 75px;
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

const authors: Record<string, { name: string; link: string }> = {
  eytan: {
    name: 'Eytan Manor',
    link: 'https://twitter.com/eytan_manor',
  },
  kamil: {
    name: 'Kamil Kisiela',
    link: 'https://twitter.com/kamilkisiela',
  },
  dotan: {
    name: 'Dotan Simha',
    link: 'https://twitter.com/dotansimha',
  },
  uri: {
    name: 'Uri Goldshtein',
    link: 'https://twitter.com/UriGoldshtein',
  },
  arda: {
    name: 'Arda Tanrikulu',
    link: 'https://twitter.comm/ardatanrikulu',
  },
  laurin: {
    name: 'Laurin Quast',
    link: 'https://twitter.com/n1rual',
  },
  leonardo: {
    name: 'Leonardo Ascione',
    link: 'https://medium.com/@leonardoascione',
  },
  niccolo: {
    name: 'Niccolo Belli',
    link: 'https://medium.com/@darkbasic',
  },
  david: {
    name: 'David Yahalomi',
    link: 'https://medium.com/@davidyahalomi',
  },
};

export default (meta: Meta): React.FC => {
  return ({ children: content }) => {
    const title = `${meta.title} - The Guild Blog`;
    const date = meta.date ? new Date(meta.date) : new Date();
    const author = meta.author && authors[meta.author];

    const authorLink = author ? (
      <>
        <span> - </span>
        <a href={author.link} title={author.name}>
          {author.name}
        </a>
      </>
    ) : null;

    return (
      <MDXProvider components={components}>
        <Page title={title} image={meta.image} description={meta.description}>
          <Container>
            <Main>
              <Title>{meta.title}</Title>
              <Details>
                <Time dateTime={date.toString()}>
                  {format(date, 'EEEE, LLL do y')}
                  {authorLink}
                </Time>
              </Details>
              <Cover>
                <Image src={meta.image} alt={title} />
              </Cover>
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
