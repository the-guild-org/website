import { FC } from 'react';
import { css } from 'styled-components';
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
import { Button, Description, Heading } from '../ui';

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

const IndexPage: FC<Props> = ({ articles }) => {
  return (
    <Page
      title="The Guild - Open Source"
      description="Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings."
      image="/img/ogimage.png"
    >
      <div
        css={[
          // ❗️ Important! this position is necessary for 🔵 <Circle />, overflow needed for hiding images in get in touch section
          tw`relative md:static overflow-x-hidden`,
        ]}
      >
        <HeroSection>
          <Heading>Modern API Platform and ecosystem that scales</Heading>
          <Description>
            The Guild’s advanced open source ecosystem covers everything you
            need for your API infrastructure with a modular, open source and
            complete platform
          </Description>
          <Button
            as="a"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            href="#platform"
          >
            Explore The Platform
          </Button>
        </HeroSection>
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
