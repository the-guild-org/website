import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { components } from './blog/elements';
import { Newsletter } from './blog/newsletter';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';
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

const AboutUs = (meta: Meta): React.FC => {
  return function AboutUsRender({ children: content }) {
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

export default AboutUs;
