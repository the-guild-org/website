import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import clsx from 'clsx';
import { components } from './blog/elements';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';
import { Heading } from './components';
import { GetInTouchSection } from './get-in-touch-section';
import { HeroSection } from './hero-section';

const AboutUs = ({ title, description }: Meta): FC => {
  return function AboutUsRender({ children }) {
    return (
      <MDXProvider components={components}>
        <Page title={title} description={description}>
          <HeroSection hideCirclesOnMobile>
            <Heading>About Us</Heading>
          </HeroSection>
          <div className='max-w-[790px] mx-auto px-3 mt-24'>
            <div className='text-[#111] dark:text-[#7F818C]'>{children}</div>
            <GetInTouchSection hideCover />
          </div>
        </Page>
      </MDXProvider>
    );
  };
};

export default AboutUs;
