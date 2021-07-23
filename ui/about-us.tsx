import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import { components } from './blog/elements';
import { Newsletter } from './blog/newsletter';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';

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

    return (
      <MDXProvider components={components}>
        <Page title={title} description={meta.description}>
          <Container>
            <Main>
              <Title>{meta.title}</Title>
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
