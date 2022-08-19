import { ReactElement } from 'react';
import { GetStaticProps } from 'next/types';
import { Page } from '../ui/shared/Page';
import { MetaWithLink } from '../lib/meta';
import { getAllArticles } from '../lib/get-all-articles';
import { HeroSection } from '../ui/hero-section';
import { PlatformSection } from '../ui/platform-section';
import { ServicesSection } from '../ui/services-section';
import { GetInTouchSection } from '../ui/get-in-touch-section';
import { ClientLogosSection } from '../ui/client-logos-section';
import { RecommendedReadingSection } from '../ui/recommended-reading-section';
import { Button, Description, Heading, Newsletter } from '../ui/components';

type Props = {
  articles: MetaWithLink[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      articles: await getAllArticles(),
    },
  };
};

const IndexPage = ({ articles }: Props): ReactElement => {
  return (
    <Page
      title="The Guild - Open Source"
      description="Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings."
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>Modern API Platform and ecosystem that scales</Heading>
        <Description>
          The Guild's advanced open source ecosystem covers everything you need
          for your API infrastructure with a modular, open source and complete
          platform
        </Description>
        <Button as="a" href="#platform">
          Explore The Ecosystem
        </Button>
      </HeroSection>
      <ClientLogosSection />
      <PlatformSection
        className={`
          [background:linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(41,40,40,0.1)100%)]
          dark:[background:linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(41,40,40,0.2)100%),#0b0d11]
        `}
      />
      <ServicesSection />
      <GetInTouchSection />
      <RecommendedReadingSection articles={articles.slice(0, 4)} />
      <Newsletter />
    </Page>
  );
};

export default IndexPage;
