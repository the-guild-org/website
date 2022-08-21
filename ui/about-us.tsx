import type { FC, ReactNode } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { components } from './blog/elements';
import { Page } from './shared/Page';
import type { Meta } from '../lib/meta';
import { Heading } from './components';
import { GetInTouchSection } from './get-in-touch-section';
import { HeroSection } from './hero-section';

const AboutUs = ({ title, description }: Meta): FC =>
  function AboutUsRender({ children }: { children: ReactNode }) {
    return (
      <MDXProvider components={components}>
        <Page title={title} description={description}>
          <HeroSection hideCirclesOnMobile>
            <Heading>About Us</Heading>
          </HeroSection>
          <div className="mx-auto mt-24 max-w-[790px] px-3">
            <div className="text-[#111] dark:text-[#7F818C]">{children}</div>
            <GetInTouchSection hideCover />
          </div>
        </Page>
      </MDXProvider>
    );
  };

export default AboutUs;
