import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { components } from './blog/elements';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';
import { Heading } from './components';
import { GetInTouchSection } from './get-in-touch-section';
import { HeroSection } from './hero-section';

const Branding = (): FC<Meta> =>
  function BrandingRender({ children, title, description }) {
    return (
      <MDXProvider components={components}>
        <Page title={title} description={description}>
          <HeroSection hideCirclesOnMobile>
            <Heading>Logo &amp; Brand Guidelines</Heading>
          </HeroSection>
          <div className="mx-auto mt-24 max-w-[790px] px-3">
            <div className="text-[#111] dark:text-[#7F818C]">{children}</div>
            <GetInTouchSection hideCover />
          </div>
        </Page>
      </MDXProvider>
    );
  };

export default Branding;
