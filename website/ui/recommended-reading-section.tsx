import { ReactElement } from 'react';
import { Anchor } from '@theguild/components';
import { MetaWithLink } from '../lib/meta';
import { BlogCardList, Heading } from './components';

export const RecommendedReadingSection = ({
  articles = [],
}: {
  articles: MetaWithLink[];
}): ReactElement => {
  return (
    <div className="nextra-container py-12 lg:py-20">
      <div className="md:mb-12 md:text-center">
        <Heading>Recommended Reading</Heading>
        <p className="mb-3.5 text-[#7F818C] md:mb-[30px]">
          Read and follow the most popular blog in the GraphQL Ecosystem
        </p>
        <Anchor
          href="/blog"
          className="font-medium hover:text-gray-600 hover:no-underline dark:text-[#fcfcfc] dark:hover:text-gray-300"
        >
          View all posts ➔
        </Anchor>
      </div>
      <BlogCardList articles={articles} />
    </div>
  );
};
