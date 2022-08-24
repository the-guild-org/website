import { ReactElement } from 'react';
import { GetStaticProps } from 'next/types';
import { Page } from '@/shared/Page';
import { Newsletter, Heading, BlogCardList, TagList } from '@/components';
import { HeroSection } from '@/hero-section';
import { MetaWithLink } from '../lib/meta';
import { getAllArticles } from '../lib/get-all-articles';

interface Props {
  articles: MetaWithLink[];
  tagFilter?: string[];
}

function extractRelevantTags(articles: Props['articles']) {
  const allTags = articles.flatMap((article) => article.tags || []);

  const map: Record<string, number> = Object.create(null);

  for (const tag of allTags) {
    map[tag] ??= 0;
    map[tag] += 1;
  }

  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  if (sorted.every(([tagName]) => tagName !== 'codegen')) {
    sorted.unshift(['codegen', 0]);
  }
  if (sorted.every(([tagName]) => tagName !== 'envelop')) {
    sorted.unshift(['envelop', 0]);
  }

  return sorted.slice(0, 10);
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  return {
    props: {
      articles: await getAllArticles(),
    },
  };
};

const Blog = ({ articles, tagFilter }: Props): ReactElement => {
  const tagFilters = tagFilter?.join(', ');
  const allTags = extractRelevantTags(articles);

  const title = tagFilters
    ? `The Guild Blog - ${tagFilters}`
    : 'The Guild Blog';
  const description = tagFilters
    ? `List of articles related to ${tagFilters}`
    : 'Announcements about our Open-Source projects';

  return (
    <Page title={title} description={description} image="/img/ogimage.png">
      <HeroSection>
        <Heading>The Guild's blog</Heading>
      </HeroSection>
      <div className="container max-w-[1200px]">
        <TagList tags={allTags} withCount asLink className="mt-10 mb-20" />
        {!tagFilters && <Newsletter />}
        <BlogCardList articles={articles} />
      </div>
    </Page>
  );
};

export default Blog;
