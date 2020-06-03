import React from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next/types';
import { Page } from '../ui/shared/Page';
import { Hero, Section, Container } from '../ui/shared/Layout';
import { projects } from '../lib/projects';
import { ProjectSeparator, Project } from '../ui/shared/Projects';

const ProjectsSection = styled(Section)`
  padding: 50px 0;
  background-color: #fff;
  text-align: center;

  &::before {
    display: none;
  }
`;

interface Props {
  projectsOrder: string[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectsOrder = Object.keys(projects).sort(() => 0.5 - Math.random());

  return {
    props: {
      projectsOrder,
    },
  };
};

const OpenSource: React.FC<Props> = ({ projectsOrder }) => {
  return (
    <Page
      title="Open Source - The Guild"
      description="Tech Stack developed by us. Every project is Open Source and most of them are focused around GraphQL."
      image="/img/ogimage.png"
    >
      <Hero shrink={true}>
        <span>Open Source</span>
      </Hero>
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
