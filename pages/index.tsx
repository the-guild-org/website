import { FC } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import Image from 'next/image';
import { GetStaticProps } from 'next/types';
import { Section, Hero, Container, Button } from '../ui/shared/Layout';
import { Page } from '../ui/shared/Page';
import { Project, ProjectSeparator } from '../ui/shared/Projects';
import { MetaWithLink } from '../lib/meta';
import { getAllArticles } from '../lib/get-all-articles';
import { LastArticles } from '../ui/blog/last-articles';
import { Newsletter } from '../ui/blog/newsletter';
import { projects } from '../lib/projects';
import { services } from '../lib/services';
import { Contact } from '../ui/shared/Contact';

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

const ServicesSection = styled(Section)`
  background-color: #03a6a6;
  padding: 50px 0;
  text-align: center;

  & ${SectionTitle} {
    & > span {
      color: var(--colors-background);
    }
  }
`;

const Services = styled.div`
  margin: 0 auto;
  padding: 50px 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 80px 80px;
  color: #fff;
  text-align: left;

  & > div {
    background-color: #fff;
    border-radius: 0.375rem;
    padding: 10px 25px;
    display: flex;
    align-items: flex-start;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.18);
  }

  & > div h3 {
    color: var(--colors-text);
  }

  & > div div:last-child {
    width: 100px;
    height: 110px;
    flex-shrink: 0;
    flex-grow: 0;
    text-align: center;
    margin-left: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > div div:last-child > img {
    width: 100%;
    height: auto;
    max-width: 100%;
  }

  & p {
    color: var(--colors-dim);
  }

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    grid-row-gap: 120px;
    text-align: center;

    & > div {
      align-items: center;
      flex-direction: column;
    }
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

const Index: FC<Props> = ({ articles, projectsOrder }) => {
  const recentArticles = articles.slice(0, 3);

  return (
    <Page
      title="The Guild - Open Source"
      description="Open Source developers with experience of working with the largest companies and applications. GraphQL consulting, workshops and trainings."
      image="/img/ogimage.png"
    >
      <Hero shrink>
        We are <span>The Guild</span>
      </Hero>

      {/* Services */}
      <ServicesSection noNotch>
        <Container>
          <SectionTitle>
            <span>Our services</span>
          </SectionTitle>
          <Services>
            {services
              .filter((s) => s.highlight)
              .map(({ highlight, image }, i) => (
                <div key={`service-${i}`}>
                  <div>
                    <h3>{highlight.title}</h3>
                    <p>{highlight.description}</p>
                  </div>
                  <div>
                    <Image
                      alt={highlight.title}
                      src={`/img/illustrations/${image}`}
                      width={100}
                      height={110}
                    />
                  </div>
                </div>
              ))}
          </Services>

          <Link href="/services" passHref>
            <BlogButton as="a" title="Our services">
              View all services
            </BlogButton>
          </Link>
        </Container>
      </ServicesSection>
      <ProjectsSection>
        <Contact />
      </ProjectsSection>
      {/* Blog */}
      <BlogSection noNotch>
        <Container>
          <SectionTitle>
            We have a <span>blog</span>
          </SectionTitle>
          <BlogLastArticles articles={recentArticles} />
          <Link href="/blog" passHref>
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
          <Link href="/open-source" passHref>
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
