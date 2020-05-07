import React from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next/types';
import { Page } from '../ui/shared/Page';
import { Hero, Section, Container } from '../ui/shared/Layout';
import { Featured } from '../ui/shared/Featured';
import { ArticleCard } from '../ui/blog/article-card';
import { Newsletter } from '../ui/blog/newsletter';
import { MetaWithLink } from '../lib/types';
import { getAllArticles } from '../lib/get-all-articles';

interface Props {
  articles: MetaWithLink[];
}

const SectionContainer = styled(Container)`
  padding: 75px 0;
`;

const NewsletterContainer = styled(Container)`
  padding-top: 50px;
`;

const AllArticles = styled(Container)`
  padding: 125px 0;
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 70px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
`;

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      articles: await getAllArticles(),
    },
  };
};

const Blog: React.FC<Props> = ({ articles }) => {
  const recentArticle = articles[0];

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
          <Featured
            title={recentArticle.title}
            description={recentArticle.description}
            image={recentArticle.thumbnail || recentArticle.image}
            link={recentArticle.link}
          />
        </SectionContainer>
      </Section>

      <NewsletterContainer>
        <Newsletter />
      </NewsletterContainer>

      <AllArticles>
        {articles.map((article) => {
          return (
            <ArticleCard
              key={article.link}
              title={article.title}
              description={article.description}
              image={article.thumbnail || article.image}
              link={article.link}
              date={article.date}
            />
          );
        })}
      </AllArticles>
    </Page>
  );
};

export default Blog;
