import React from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next/types';
import { Page } from '../ui/shared/Page';
import { Hero, Section, Container } from '../ui/shared/Layout';
import { LastArticle } from '../ui/blog/last-article';
import { ArticleCard } from '../ui/blog/article-card';
import { Newsletter } from '../ui/blog/newsletter';
import { MetaWithLink } from '../lib/types';
import { getAllPosts } from '../lib/get-all-posts';

interface Props {
  posts: MetaWithLink[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      posts: await getAllPosts(),
    },
  };
};

const SectionContainer = styled(Container)`
  padding: 75px 0;
`;

const AllArticles = styled(Container)`
  padding: 125px 0;
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 70px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
`;

const Blog: React.FC<Props> = ({ posts }) => {
  const recentPost = posts[0];

  return (
    <Page
      title="The Guild Blog"
      description="Announcements about our Open-Source projects"
    >
      <Hero shrink={true}>
        <span>Blog</span>
      </Hero>
      <Section>
        <SectionContainer>
          <LastArticle
            title={recentPost.title}
            description={recentPost.description}
            image={recentPost.image}
            link={recentPost.link}
          />
        </SectionContainer>
      </Section>

      <Container>
        <Newsletter />
      </Container>

      <AllArticles>
        {posts.map((post) => {
          return (
            <ArticleCard
              key={post.link}
              title={post.title}
              description={post.description}
              image={post.image}
              link={post.link}
              date={post.date}
            />
          );
        })}
      </AllArticles>
    </Page>
  );
};

export default Blog;
