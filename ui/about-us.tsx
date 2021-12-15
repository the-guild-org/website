import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { components } from './blog/elements';
import { Newsletter } from './blog/newsletter';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';
import { Heading } from '../ui';
import { GetInTouchSection } from './get-in-touch-section';
import { HeroSection } from './hero-section';

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
          <HeroSection>
            <Heading>About Us</Heading>
          </HeroSection>
          <div css={tw`max-w-[690px] mx-auto`}>
            <Content>{children}</Content>
            <GetInTouchSection hideCover />
          </div>
        </Page>
      </MDXProvider>
    );
  };
};

export default AboutUs;
