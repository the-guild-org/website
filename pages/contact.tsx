import { FC } from 'react';
import styled, { css } from 'styled-components';
import { Page } from '../ui/shared/Page';
import { Hero } from '../ui/shared/Layout';
import { Contact } from '../ui/shared/Contact';

const Section = styled.section<{ noNotch?: boolean; light?: boolean }>`
  position: relative;
  background-color: ${(props) => (props.light ? 'transparent' : '#16171c')};
  color: var(--colors-primary);

  ${(props) =>
  props.noNotch
    ? ''
    : css`
          &::before {
            content: '';
            position: absolute;
            top: -40px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 40px 40px 40px;
            border-color: transparent transparent
              ${props.light ? '#fff' : '#16171c'} transparent;
            left: 50%;
            transform: translateX(-50%);
          }
        `}
`;

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
      <Section>
        <Contact />
      </Section>
    </Page>
  );
};

export default ContactPage;
