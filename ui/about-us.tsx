import { FC } from 'react';
import { MDXProvider } from '@mdx-js/react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { components } from './blog/elements';
import { Page } from './shared/Page';
import { Meta } from '../lib/meta';
import { Heading } from '../ui';
import { GetInTouchSection } from './get-in-touch-section';
import { Description } from './index';

const AboutUs = ({ title, description }: Meta): FC => {
  return function AboutUsRender({ children }) {
    return (
      <MDXProvider components={components}>
        <Page title={title} description={description}>
          <img
            src="/img/blue-circle.svg"
            css={tw`absolute top-0 lg:left-0 -left-40 z-0 hidden xl:block`}
          />
          <img
            src="/img/pink-circle.png"
            css={tw`absolute right-0 lg:w-96 w-64 -right-16 top-80 md:top-24 z-0 hidden xl:block`}
          />
          <div css={tw`max-w-[690px] mx-auto px-3 mt-44`}>
            <Heading css={tw`text-center`}>About Us</Heading>
            <Description>{children}</Description>
            <GetInTouchSection hideCover />
          </div>
        </Page>
      </MDXProvider>
    );
  };
};

export default AboutUs;
