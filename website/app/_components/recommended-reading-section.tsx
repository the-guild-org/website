import { ReactElement } from 'react';
import { BlogCardList, Heading } from '@components';
import { Anchor } from '@theguild/components';
import { MetaWithLink } from './meta';

export const RecommendedReadingSection = ({
  articles = [],
}: {
  articles: MetaWithLink[];
}): ReactElement => {
  return (
    <div className="nextra-container py-16 lg:py-32">
      <div className="md:mb-24 md:text-center">
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
