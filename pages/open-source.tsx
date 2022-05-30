import { ReactElement } from 'react';
import { GetStaticProps } from 'next/types';
import { styled } from '../stitches.config';
import { Page } from '../ui/shared/Page';
import { Container } from '../ui/shared/Layout';
import { projects } from '../lib/projects';
import { HeroSection } from '../ui/hero-section';
import { Heading } from '../ui/components';
import { Featured } from '../ui/shared/Featured';

const ProjectsSection = styled('div', {
  padding: '50px 0',
  textAlign: 'center',
  background: 'none',
  '&::before': {
    display: 'none',
  },
});

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

const ProjectSeparator = styled('div', {
  margin: '30px auto',
  width: 50,
  height: 2,
  backgroundColor: 'var(--colors-accent)',
});

const OpenSource = ({ projectsOrder }: Props): ReactElement => {
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
          {projectsOrder
            .map((id) => projects[id])
            .concat({
              title: 'WhatsApp Clone Tutorial',
              image: '/img/logos/whats-app.svg',
              link: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
              description: (
                <>
                  <p>An open-source full-stack example app.</p>
                  <p>
                    Using React (Hooks and Suspense), Apollo, TypeScript,
                    GraphQL-Subscriptions, GraphQL-Codegen, GraphQL-Modules,
                    PostgreSQL, Styled Components and Material UI
                  </p>
                </>
              ),
            })
            .map((project, i) => (
              <div key={project.title}>
                {i !== 0 && <ProjectSeparator />}
                <Featured
                  className="px-[50px]"
                  width={80}
                  noShadow
                  maxCoverSize={200}
                  title={project.title}
                  image={project.image}
                  link={project.link}
                  description={project.description}
                />
              </div>
            ))}
        </Container>
      </ProjectsSection>
    </Page>
  );
};

export default OpenSource;
