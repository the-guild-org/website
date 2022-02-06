import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import tw from 'twin.macro';
import { components } from './blog/elements';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';
import { Heading } from '../ui';
import { GetInTouchSection } from './get-in-touch-section';
import { HeroSection } from './hero-section';
import { Description } from './index';

const AboutUs = ({ title, description }: Meta): FC => {
  return function AboutUsRender({ children }) {
    return (
      <MDXProvider components={components}>
        <Page title={title} description={description}>
          <HeroSection hideCirclesOnMobile>
            <Heading>About Us</Heading>
          </HeroSection>
          <div css={tw`max-w-[690px] mx-auto px-3 mt-24`}>
            <Description>{children}</Description>
            <GetInTouchSection hideCover />
          </div>
        </Page>
      </MDXProvider>
    );
  };
};

export default AboutUs;
