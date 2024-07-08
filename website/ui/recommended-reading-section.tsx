import { ReactElement } from 'react';
import { MetaWithLink } from '../lib/meta';
import { BlogCardList, Description, Heading, Link } from './components';

export const RecommendedReadingSection = ({
  articles = [],
}: {
  articles: MetaWithLink[];
}): ReactElement => {
  return (
    <div className="nextra-container py-16 lg:py-32">
      <div className="md:text-center">
        <Heading>Recommended Reading</Heading>
        <Description className="mx-auto !mb-10 md:max-w-xl md:!mb-24">
          Read and follow the most popular blog in the GraphQL Ecosystem
        </Description>
        <Link
          href="/blog"
          className="font-bold !text-gray-500 hover:!text-gray-600 hover:no-underline dark:hover:!text-gray-300"
        >
          View all posts ➔
        </Link>
      </div>
      <BlogCardList articles={articles} />
    </div>
  );
};
