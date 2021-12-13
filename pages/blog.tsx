import { FC } from 'react';
import styled from 'styled-components';
import { GetStaticProps } from 'next/types';
import { Page } from '../ui/shared/Page';
import { Hero, Section, Container } from '../ui/shared/Layout';
import { Featured } from '../ui/shared/Featured';
import { ArticleCard } from '../ui/blog/article-card';
import { Newsletter } from '../ui/blog/newsletter';
import { MetaWithLink, pickAuthor } from '../lib/meta';
import { getAllArticles } from '../lib/get-all-articles';
import { authors } from '../ui/authors';
interface Props {
  articles: MetaWithLink[];
  tagFilter?: string[];
}

const SectionContainer = styled(Container)`
  padding: 75px 0;
`;

const NewsletterContainer = styled(Container)`
  padding-top: 50px;
`;

export const AllArticles = styled(Container)`
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

const Blog: FC<Props> = ({ articles, tagFilter }) => {
  const hasTagFilter = tagFilter && tagFilter.length > 0;
  const recentArticle = (articles || [])[0];

  const title = hasTagFilter
    ? `The Guild Blog - ${tagFilter.join(', ')}`
    : 'The Guild Blog';
  const description = hasTagFilter
    ? `List of articles related to ${tagFilter.join(', ')}`
    : `Announcements about our Open-Source projects`;

  return (
    <Page title={title} description={description} image="/img/ogimage-blog.png">
      <Hero shrink>
        <span>Blog</span>
        {hasTagFilter && <span>(filter by: {tagFilter.join(', ')})</span>}
      </Hero>
      {recentArticle && !hasTagFilter && (
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
      )}
      {!hasTagFilter && (
        <NewsletterContainer>
          <Newsletter />
        </NewsletterContainer>
      )}
      <AllArticles>
        {(articles || []).map((article) => {
          return (
            <ArticleCard
              author={authors[pickAuthor(article)]}
              key={article.link}
              title={article.title}
              description={article.description}
              image={article.thumbnail || article.image}
              link={article.link}
              date={article.date}
              tags={article.tags || []}
            />
          );
        })}
      </AllArticles>
    </Page>
  );
};

export default Blog;
