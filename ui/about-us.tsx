import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { components } from './blog/elements';
import { Newsletter } from './blog/newsletter';
import { Page } from './shared/Page';
import { Button } from './shared/Layout';
import { Meta } from '../lib/types';
import { Tag } from './blog/tag';
import { Image } from './blog/image';

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

const Details = styled.div`
  margin-top: 2rem;
  text-align: center;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 0.9rem;

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

const Article = (meta: Meta): React.FC => {
  return function ArticleRender({ children: content }) {
    const title = meta.title;

    const ogImage =
      (meta.image?.endsWith('.webm') || meta.image?.endsWith('.mp4')) &&
      meta.thumbnail
        ? meta.thumbnail
        : meta.image;

    return (
      <MDXProvider components={components}>
        <Page title={title} image={ogImage} description={meta.description}>
          <Container>
            <Main>
              <Title>{meta.title}</Title>
              {meta.image && (
                <Cover>
                  <Image src={meta.image} alt={title} />
                </Cover>
              )}
              <Content>{content}</Content>
              <Newsletter />
            </Main>
          </Container>
        </Page>
      </MDXProvider>
    );
  };
};

export default Article;
