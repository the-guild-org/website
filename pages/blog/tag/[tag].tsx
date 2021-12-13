import { FC, ComponentProps } from 'react';
import { GetStaticProps } from 'next/types';
import Blog from '../../blog';
import { getAllArticles } from '../../../lib/get-all-articles';
import { unique, flatten } from '../../../lib/utils';

export const getStaticProps: GetStaticProps<
  ComponentProps<typeof Blog>
> = async ({ params }) => {
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

const BlogTagPage: FC<ComponentProps<typeof Blog>> = ({
  articles,
  tagFilter,
}) => {
  return <Blog articles={articles} tagFilter={tagFilter} />;
};

export default BlogTagPage;
