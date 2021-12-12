import React from 'react';
import { Page } from '../ui/shared/Page';
import { Hero, Section } from '../ui/shared/Layout';
import { Contact } from '../ui/shared/Contact';

const ContactPage: React.FC = () => {
  return (
    <Page
      title="Contact Us - The Guild"
      description="Looking to work with The Guild or to learn more about our projects? We will be happy to speak with you!"
      image="/img/ogimage-contact.png"
    >
      <Hero shrink>
        <span>Contact us</span>
      </Hero>
      <Section>
        <Contact />
      </Section>
    </Page>
  );
};

export default ContactPage;
