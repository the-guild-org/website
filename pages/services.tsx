import { FC } from 'react';
import styled from 'styled-components';
import { useColorMode } from '@chakra-ui/react';
import { Page } from '../ui/shared/Page';
import { Section, Container, Arrow } from '../ui/shared/Layout';
import { HeroSection } from '../ui/hero-section';
import { Heading } from '../ui';
import { ClientLogosSection } from '../ui/client-logos-section';
import { SERVICES } from '../ui/services-section';
import { GetInTouchSection } from '../ui/get-in-touch-section';

const ServiceContainer = styled(Container)<{ reversed?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${(props) => (props.reversed ? 'row-reverse' : 'row')};

  & > div {
    text-align: left;
    flex: 0 0 50%;
    max-width: 50%;
  }

  & > div:first-of-type {
    text-align: ${(props) => (props.reversed ? 'right' : 'left')};
  }

  @media (max-width: 640px) {
    flex-direction: column;

    & > div:first-of-type {
      margin-bottom: 50px;
      text-align: center;
    }

    & > div {
      text-align: center;
      flex: 1;
      max-width: 100%;
    }
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
  display: inline-block;
  padding: 0;
  list-style: none;

  & > li {
    display: flex;
    color: var(--colors-dim);
    line-height: 25px;
    align-items: center;
  }
`;

const Service: FC<{
  reversed?: boolean;
  title: string;
  image: string;
  description?: string;
  list?: string[];
}> = ({ title, image, description, list, reversed }) => (
  <ServiceContainer
    reversed={reversed}
    id={title.toLowerCase().replace(/ /g, '-')}
  >
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

const MainSection = styled(Section)`
  padding: 75px 0;
  text-align: center;
`;

const Services: FC = () => {
  const { colorMode } = useColorMode()
  return (
    <Page
      title="Our Services - The Guild"
      description="Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings"
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>Our Services</Heading>
      </HeroSection>
      <ClientLogosSection />
      {SERVICES.map((service, i) => {
        const isOdd = i % 2 !== 0;
        return (
          <MainSection key={`service-${i}`} noNotch={i !== 0} light={colorMode === 'light'}>
            <Service
              reversed={isOdd}
              title={service.name}
              image={service.icon}
              description={service.description}
              list={service.list}
            />
          </MainSection>
        );
      })}
      <GetInTouchSection />
    </Page>
  );
};

export default Services;
