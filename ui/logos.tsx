import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { components } from './blog/elements';
import { Page } from './shared/Page';
import type { Meta } from '../lib/meta';
import { Heading, Description, Button } from './components';
import { GetInTouchSection } from './get-in-touch-section';
import { HeroSection } from './hero-section';

const Logos = ({ title, description }: Meta): FC =>
  function LogosRender({ children }) {
    return (
      <MDXProvider components={components}>
        <Page title={title} description={description}>
          <HeroSection hideCirclesOnMobile>
            <Heading>Logo &amp; Brand Guidelines</Heading>
            <Description>
              Here we've a selection of logos that you should use for
              co-marketing.
            </Description>
            <Button as="a" href="static/logos.zip">
              Download Logo Pack
            </Button>
          </HeroSection>
          <div className="mx-auto mt-24 max-w-[790px] px-3">
            <div className="text-[#111] dark:text-[#7F818C]">{children}</div>

            <GetInTouchSection hideCover />
          </div>
        </Page>
      </MDXProvider>
    );
  };

export default Logos;
