import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { components } from './blog/elements';
import { Newsletter } from './blog/newsletter';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';
import { Heading } from '../ui';

const Main = styled.article`
  padding: 125px 15px;
`;

const Content = styled.div`
  padding-top: 25px;
  font-family: 'PT Serif', serif;
  font-size: 1rem;
  font-weight: 400;
  color: #7f818c;
  line-height: 2rem;
`;

const AboutUs = ({ title, description }: Meta): FC => {
  return function AboutUsRender({ children }) {
    return (
      <MDXProvider components={components}>
        <Page title={title} description={description}>
          <div
            css={[
              css`
                background-color: #0b0d11;
              `,
            ]}
          >
            <div css={tw`max-w-[690px] mx-auto`}>
              <Main>
                <Heading css={tw`text-center`}>{title}</Heading>
                <Content>{children}</Content>
                <Newsletter />
              </Main>
            </div>
          </div>
        </Page>
      </MDXProvider>
    );
  };
};

export default AboutUs;
