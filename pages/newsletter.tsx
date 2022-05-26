import { Page } from '../ui/shared/Page';
import { HeroSection } from '../ui/hero-section';
import { Newsletter, Heading, Description } from '../ui/components';

const NewsletterPage = () => {
  return (
    <Page
      title="The Guild Blog"
      description="Subscribe to our newsletter"
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>The Guild's newsletter</Heading>
        <Description>
          <p>A monthly newsletter that shares:</p>
          <ul style={{ textAlign: 'left' }}>
            <li> - The Guild and GraphQL Foundation projects releases</li>
            <li> - Blogposts about GraphQL</li>
            <li> - Tips on how to get the best of our tools</li>
          </ul>
        </Description>
      </HeroSection>
      <div className="container max-w-[1200px]">
        <Newsletter className="mb-14" />
      </div>
    </Page>
  );
};

export default NewsletterPage;
