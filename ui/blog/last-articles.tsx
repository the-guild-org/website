import React from 'react';
import styled from 'styled-components';
import { Container } from '../shared/Layout';
import { MetaWithLink } from '../../lib/types';
import { ArticleCard } from './article-card';

const ArticlesContainer = styled(Container)`
  padding: 125px 0;
  display: grid;
  grid-column-gap: 40px;
  grid-row-gap: 70px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
`;

export const LastArticles: React.FC<{
  articles: MetaWithLink[];
  className?: string;
}> = ({ articles, className }) => {
  return (
    <ArticlesContainer className={className}>
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
    </ArticlesContainer>
  );
};
