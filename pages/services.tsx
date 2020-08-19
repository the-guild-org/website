import React from 'react';
import styled from 'styled-components';
import { Page } from '../ui/shared/Page';
import { Hero, Section } from '../ui/shared/Layout';
import { Contact } from '../ui/shared/Contact';

const logos = [
  {
    name: 'DFDS',
    logo: '/img/logos/companies/dfds-white.png',
  },
  {
    name: 'Microsoft',
    logo: '/img/logos/companies/microsoft-white.png',
  },
  {
    name: 'Uber',
    logo: '/img/logos/companies/uber-white.png',
  },
  {
    name: 'KLM',
    logo: '/img/logos/companies/klm-white.png',
  },
  {
    name: 'Air France',
    logo: '/img/logos/companies/air-france-white.png',
  },
];

const Container = styled.div<{ size: number }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 75px 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-template-rows: 1fr;
  gap: 1rem;
  place-items: center;
`;

const Logo = styled.img`
  max-height: 40px;
  max-width: 160px;
  transition: opacity 0.2s ease;
  opacity: 0.7;

  &:hover {
    opacity: 1;
  }
`;

const Logos: React.FC<{
  logos: Array<{
    name: string;
    logo: string;
  }>;
}> = ({ logos }) => {
  return (
    <Container size={logos.length}>
      {logos.map((item, i) => (
        <Logo key={`logo-${i}`} src={item.logo} alt={item.name} />
      ))}
    </Container>
  );
};

const MainSection = styled(Section)`
  padding: 50px 0;
  background-color: #fff;
  text-align: center;
`;

const DarkSection = styled(Section)`
  background-color: #03a6a6;
`;

const Services: React.FC = () => {
  return (
    <Page
      title="Our Services - The Guild"
      description="Consultancy for Enterprise. Trainings and Workshops. Mentorship."
      image="/img/ogimage.png"
    >
      <Hero shrink={true}>
        <span>Our Services</span>
      </Hero>
      <DarkSection noNotch={true}>
        <Logos logos={logos} />
      </DarkSection>
      <MainSection noNotch={true}>asd</MainSection>
      <Section noNotch={true}>
        <Contact />
      </Section>
    </Page>
  );
};

export default Services;
