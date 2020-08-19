import React from 'react';
import styled from 'styled-components';
import { Page } from '../ui/shared/Page';
import { Hero, Section, Container, Arrow } from '../ui/shared/Layout';
import { Contact } from '../ui/shared/Contact';

const logos: Array<{
  name: string;
  logo: string;
}> = [
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

const services: Array<{
  reversed?: boolean;
  title: string;
  image: string;
  description?: string;
  list?: string[];
}> = [
  {
    title: 'Consulting',
    image: 'unicorn.svg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus.',
    list: [
      'Lorem ipsum',
      'Dolor sit amet',
      'Consectetur adipiscing elit',
      'Sed do eiusmod tempor',
    ],
  },
  {
    title: 'Architecture',
    image: 'new-ideas.svg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus.',
  },
  {
    title: 'Workshops and Trainings',
    image: 'quiz.svg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus.',
  },
  {
    title: 'Engineering',
    image: 'work-time.svg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus.',
    list: [
      'Mentorship',
      'Coding',
      'Part of developing process',
      'Code Reviews',
    ],
  },
  {
    title: 'Open Source',
    image: 'developer-activity.svg',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus.',
  },
];

const LogosContainer = styled.div<{ size: number }>`
  box-sizing: border-box;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 75px 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-template-rows: 1fr;
  gap: 50px 25px;
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
    <LogosContainer size={logos.length}>
      {logos.map((item, i) => (
        <Logo key={`logo-${i}`} src={item.logo} alt={item.name} />
      ))}
    </LogosContainer>
  );
};

//

const ServiceContainer = styled(Container)<{ reversed?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.reversed ? 'row-reverse' : 'row')};

  & > div > img {
    max-width: 60%;
  }

  & > div:first-child {
    text-align: ${(props) => (props.reversed ? 'right' : 'left')};
    flex: 0 0 50%;
    max-width: 50%;
  }

  & > div:last-child {
    text-align: left;
    flex: 0 0 50%;
    max-width: 50%;
  }
`;

const ServiceTitle = styled.h2`
  margin-top: 0;
  color: var(--colors-text);
`;

const ServiceDescription = styled.div`
  color: var(--colors-dim);
  margin: 1rem 0;
`;

const ServiceArrow = styled(Arrow)`
  color: #05a5a6;
  margin-right: 10px;
`;

const ServiceList = styled.ul`
  padding: 0;
  list-style: none;

  & > li {
    display: flex;
    color: var(--colors-dim);
    line-height: 25px;
    align-items: center;
  }
`;

const Service: React.FC<{
  reversed?: boolean;
  title: string;
  image: string;
  description?: string;
  list?: string[];
}> = ({ title, image, description, list, reversed }) => {
  return (
    <ServiceContainer reversed={reversed}>
      <div>
        <img src={`/img/illustrations/${image}`} alt={title} />
      </div>
      <div>
        <ServiceTitle>{title}</ServiceTitle>
        {description && <ServiceDescription>{description}</ServiceDescription>}
        {list && (
          <ServiceList>
            {list.map((item, i) => (
              <li key={`item-${i}`}>
                <ServiceArrow /> {item}
              </li>
            ))}
          </ServiceList>
        )}
      </div>
    </ServiceContainer>
  );
};

const MainSection = styled(Section)`
  padding: 75px 0;
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
      {services.map((service, i) => {
        const isOdd = i % 2 !== 0;
        return (
          <MainSection key={`service-${i}`} noNotch={true} light={!isOdd}>
            <Service
              reversed={isOdd}
              title={service.title}
              image={service.image}
              description={service.description}
              list={service.list}
            />
          </MainSection>
        );
      })}
      <Section noNotch={true} light={services.length % 2 === 0}>
        <Contact />
      </Section>
    </Page>
  );
};

export default Services;
