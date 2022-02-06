import { FC, ComponentProps } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next/types';
import Blog from '../../blog';
import { getAllArticles } from '../../../lib/get-all-articles';

export const getStaticProps: GetStaticProps<ComponentProps<typeof Blog>> =
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

export const getStaticPaths: GetStaticPaths = async () => {
  const allArticles = await getAllArticles();
  const allTags = new Set<string>(allArticles.flatMap((art) => art.tags));

  return {
    paths: Array.from(allTags).map((tag) => ({ params: { tag } })),
    fallback: false,
  };
};

const BlogTagPage: FC<ComponentProps<typeof Blog>> = ({
  articles,
  tagFilter,
}) => {
  return <Blog articles={articles} tagFilter={tagFilter} />;
};

export default BlogTagPage;
