import React from 'react';
import Blog from '../../blog';
import { GetStaticProps } from 'next/types';
import { getAllArticles } from '../../../lib/get-all-articles';
import { unique, flatten } from '../../../lib/utils';

export const getStaticProps: GetStaticProps<React.ComponentProps<typeof Blog>> =
  async ({ params }) => {
    const tagFilter: string[] = !params.tag
      ? []
      : Array.isArray(params.tag)
      ? params.tag
      : [params.tag];

    return {
      props: {
        articles: await getAllArticles(tagFilter),
        tagFilter,
      },
    };
  };

export async function getStaticPaths() {
  const allArticles = await getAllArticles();
  const allTags = unique(flatten(allArticles.map((art) => art.tags)));

  return {
    paths: allTags.map((tag) => ({ params: { tag } })),
    fallback: false,
  };
}

const BlogTagPage: React.FC<React.ComponentProps<typeof Blog>> = ({
  articles,
  tagFilter,
}) => {
  return <Blog articles={articles} tagFilter={tagFilter} />;
};

export default BlogTagPage;
