import React from 'react';
import styled from 'styled-components';
import { Page } from '../ui/shared/Page';
import { Hero, Section, Container, Arrow } from '../ui/shared/Layout';
import { Contact } from '../ui/shared/Contact';
import { services } from '../lib/services';
import { logos } from '../lib/logos';

const LogosContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 75px 25px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;

  & > div {
    flex-grow: 0;
    flex-shrink: 0;
    margin: 25px 25px 25px 25px;
    transition: opacity 0.2s ease;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }
  }

  & > div > img {
    display: block;
    max-height: 40px;
    max-width: 160px;
  }

  @media (max-width: 640px) {
    & > div > img {
      display: block;
      max-height: 30px;
      max-width: 120px;
    }
  }
`;

const Logos: React.FC<{
  logos: Array<{
    name: string;
    logo: string;
  }>;
}> = ({ logos }) => {
  return (
    <LogosContainer>
      {logos.map((item, i) => (
        <div key={`logo-${i}`}>
          <img
            src={`/img/logos/companies/${item.logo}`}
            title={item.name}
            alt={item.name}
          />
        </div>
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
      description="Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings"
      image="/img/ogimage.png"
    >
      <Hero shrink>
        <span>Our Services</span>
      </Hero>
      <DarkSection noNotch>
        <Logos logos={logos} />
      </DarkSection>
      {services.map((service, i) => {
        const isOdd = i % 2 !== 0;
        return (
          <MainSection key={`service-${i}`} noNotch={i !== 0} light={!isOdd}>
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
      <Section noNotch light={services.length % 2 === 0}>
        <Contact />
      </Section>
    </Page>
  );
};

export default Services;
