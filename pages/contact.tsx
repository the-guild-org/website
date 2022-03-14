import { FC } from 'react';
import { Page } from '../ui/shared/Page';
import { Hero } from '../ui/shared/Layout';
import { Contact } from '../ui/shared/Contact';

const ContactPage: FC = () => {
  return (
    <Page
      title="Contact Us - The Guild"
      description="Looking to work with The Guild or to learn more about our projects? We will be happy to speak with you!"
      image="/img/ogimage.png"
    >
      <Hero shrink>
        <span>Contact us</span>
      </Hero>
      <section
        className="
          relative
          bg-gray-100
          before:absolute
          before:left-1/2
          before:-top-10
          before:-translate-x-1/2
          before:border-transparent
          before:border-b-gray-100
          before:content-['']
          before:[border-width:0_40px_40px_40px]
          dark:bg-[#16171c]
          before:dark:border-b-[#16171c]
      "
      >
        <Contact />
      </section>
    </Page>
  );
};

export default ContactPage;
