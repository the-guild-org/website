import React from 'react';
import { useRouter } from 'next/router';
import Blog from '../../blog';
import { GetStaticProps } from 'next/types';
import { getAllArticles } from '../../../lib/get-all-articles';

export const getStaticProps: GetStaticProps<React.ComponentProps<
  typeof Blog
>> = async ({ params }) => {
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
  return {
    paths: [],
    fallback: true,
  };
}

const BlogTagPage: React.FC<React.ComponentProps<typeof Blog>> = ({
  articles,
  tagFilter,
}) => {
  return <Blog articles={articles} tagFilter={tagFilter} />;
};

export default BlogTagPage;
