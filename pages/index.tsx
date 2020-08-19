import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GetStaticProps } from 'next/types';
import { Section, Hero, Container, Button } from '../ui/shared/Layout';
import { Page } from '../ui/shared/Page';
import { Project, ProjectSeparator } from '../ui/shared/Projects';
import { MetaWithLink } from '../lib/types';
import { getAllArticles } from '../lib/get-all-articles';
import { LastArticles } from '../ui/blog/last-articles';
import { Newsletter } from '../ui/blog/newsletter';
import { projects } from '../lib/projects';

const BlogSection = styled(Section)`
  padding: 50px 0;
  text-align: center;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 28px;
  margin: 0;

  & > span {
    color: var(--colors-accent);
  }
`;

const BlogLastArticles = styled(LastArticles)`
  margin-top: 50px !important;
  margin-bottom: 50px !important;
  padding: 0 !important;
`;

const BlogButton = styled(Button)`
  display: inline-block;
  margin: 25px 0;
  background-color: var(--colors-primary);

  &:hover {
    background-color: var(--colors-dim-dark);
  }

  & > * {
    margin-right: 1.3rem;
  }
`;

const ProjectsSection = styled(Section)`
  padding: 50px 0;
  background-color: #fff;
  text-align: center;

  &::before {
    border-color: transparent transparent #fff transparent;
  }
`;

const NewsletterContainer = styled(Container)`
  padding: 0 0 75px 0;
`;

const NewsletterSignUp = styled(Newsletter)`
  margin-top: 0 !important;
`;

interface Props {
  articles: MetaWithLink[];
  projectsOrder: string[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projectsOrder = Object.keys(projects)
    .filter((name) => projects[name].featured === true)
    .sort(() => 0.5 - Math.random());

  return {
    props: {
      articles: await getAllArticles(),
      projectsOrder,
    },
  };
};

const Index: React.FC<Props> = ({ articles, projectsOrder }) => {
  const recentArticles = articles.slice(0, 3);

  return (
    <Page
      title="The Guild - Open Source"
      description="Open Source Developers"
      image="/img/ogimage.png"
    >
      <Hero shrink>
        We are <span>The Guild</span>
      </Hero>

      {/* Blog */}
      <BlogSection>
        <Container>
          <SectionTitle>
            We have a <span>blog</span>
          </SectionTitle>
          <BlogLastArticles articles={recentArticles} />
          <Link href="/blog" passHref={true}>
            <BlogButton as="a" title="Read our blog">
              View all posts
            </BlogButton>
          </Link>
        </Container>
      </BlogSection>

      {/* Projects */}
      <ProjectsSection>
        <Container>
          <SectionTitle>
            We do <span>Open Source</span>
          </SectionTitle>
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
          <Link href="/open-source" passHref={true}>
            <BlogButton as="a" title="View our Open Source projects">
              View all projects
            </BlogButton>
          </Link>
        </Container>
      </ProjectsSection>

      <NewsletterContainer>
        <NewsletterSignUp />
      </NewsletterContainer>
    </Page>
  );
};

export default Index;
