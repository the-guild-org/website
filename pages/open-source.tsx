import { FC } from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next/types';
import { Page } from '../ui/shared/Page';
import { Section, Container } from '../ui/shared/Layout';
import { projects } from '../lib/projects';
import { ProjectSeparator, Project } from '../ui/shared/Projects';
import { HeroSection } from '../ui/hero-section';
import { Heading } from '../ui';

const ProjectsSection = styled(Section)`
  padding: 50px 0;
  text-align: center;
  background: none;

  &::before {
    display: none;
  }
`;

interface Props {
  projectsOrder: string[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectsOrder = Object.keys(projects);

  return {
    props: {
      projectsOrder,
    },
  };
};

const OpenSource: FC<Props> = ({ projectsOrder }) => {
  return (
    <Page
      title="Open Source - The Guild"
      description="Tech Stack developed by us. Every project is Open Source and most of them are focused around GraphQL."
      image="/img/ogimage.png"
    >
      <HeroSection>
        <Heading>Open Source</Heading>
      </HeroSection>
      <ProjectsSection>
        <Container>
          {projectsOrder.map((id, i) => {
            const project = projects[id];

            return (
              <div key={id}>
                {i !== 0 && <ProjectSeparator />}
                <Project
                  title={project.title}
                  image={project.image}
                  link={project.link}
                  description={project.description}
                />
              </div>
            );
          })}
          <div key="whatsapp">
            <ProjectSeparator />
            <Project
              title="WhatsApp Clone Tutorial"
              image="/img/logos/whats-app.svg"
              link="https://github.com/Urigo/WhatsApp-Clone-Tutorial"
              description={
                <>
                  <p>An open-source full-stack example app.</p>
                  <p>
                    Using React (Hooks and Suspense), Apollo, TypeScript,
                    GraphQL-Subscriptions, GraphQL-Codegen, GraphQL-Modules,
                    PostgreSQL, Styled Components and Material UI
                  </p>
                </>
              }
            />
          </div>
        </Container>
      </ProjectsSection>
    </Page>
  );
};

export default OpenSource;
