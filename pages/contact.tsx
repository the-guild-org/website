import { ReactElement } from 'react';
import { Page } from '../ui/shared/Page';
import { HeroSection } from '../ui/hero-section';
import { Heading } from '../ui/components';
import { GetInTouchSection } from '../ui/get-in-touch-section';

const ContactPage = (): ReactElement => {
  return (
    <Page
      title="Contact Us - The Guild"
      description="Looking to work with The Guild or to learn more about our projects? We will be happy to speak with you!"
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>Get in Touch</Heading>
      </HeroSection>
      <GetInTouchSection hideHeading />
    </Page>
  );
};

export default ContactPage;
