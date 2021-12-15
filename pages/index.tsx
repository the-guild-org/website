import { FC } from 'react';
import { css, createGlobalStyle } from 'styled-components';
import { GetStaticProps } from 'next/types';
import tw from 'twin.macro';
import { Page } from '../ui/shared/Page';
import { MetaWithLink } from '../lib/meta';
import { getAllArticles } from '../lib/get-all-articles';
import { projects } from '../lib/projects';
import { HeroSection } from '../ui/hero-section';
import { PlatformSection } from '../ui/platform-section';
import { ServicesSection } from '../ui/services-section';
import { GetInTouchSection } from '../ui/get-in-touch-section';
import { ClientLogosSection } from '../ui/client-logos-section';
import { RecommendedReadingSection } from '../ui/recommended-reading-section';

type Props = {
  articles: MetaWithLink[];
  projectsOrder: string[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectsOrder = Object.keys(projects)
    .filter((name) => projects[name].featured === true)
    .sort(() => 0.5 - Math.random());

  return {
    props: {
      articles: await getAllArticles(),
      projectsOrder,
    },
  };
};

const GlobalStyle = createGlobalStyle`
  html {
    // For smooth scrolling effect when click on '#' hash links
    scroll-behavior: smooth;
  }

  // TODO: Remove this when guild/components Header/Footer will can accept bg color
  footer {
    background-color: #0b0d11 !important;
  }

  header {
    &,
    & > div > nav {
      background-color: #0b0d11 !important;
    }
  }
`;

const IndexPage: FC<Props> = ({ articles }) => {
  return (
    <Page
      title="The Guild - Open Source"
      description="Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings."
      image="/img/ogimage.png"
    >
      {/* TODO: Remove this when site will be compatible with two themes */}
      <GlobalStyle />

      <div
        css={[
          css`
            @font-face {
              font-family: 'Poppins';
              font-style: normal;
              font-weight: 900;
              font-display: swap;
              src: url(https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLBT5Z11lFd2JQEl8qw.woff2)
                format('woff2');
              unicode-range: U+0900-097F, U+1CD0-1CF6, U+1CF8-1CF9, U+200C-200D,
                U+20A8, U+20B9, U+25CC, U+A830-A839, U+A8E0-A8FB;
            }

            * {
              font-family: Poppins, sans-serif;
            }

            background-color: #0b0d11;
          `,
          // ❗️ Important! this position is necessary for 🔵 <Circle />, overflow needed for hiding images in get in touch section
          tw`relative md:static overflow-x-hidden`,
        ]}
      >
        <HeroSection />
        <ClientLogosSection />
        <PlatformSection />
        <ServicesSection />
        <GetInTouchSection />
        <RecommendedReadingSection articles={articles.slice(0, 4)} />
      </div>
    </Page>
  );
};

export default IndexPage;
