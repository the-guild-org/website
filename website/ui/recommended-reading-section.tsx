import { ReactElement } from 'react';
import { MetaWithLink } from '../lib/meta';
import { BlogCardList, Description, Heading, Link } from './components';

export const RecommendedReadingSection = ({
  articles = [],
}: {
  articles: MetaWithLink[];
}): ReactElement => {
  return (
    <div className="nextra-container py-32">
      <div className="nextra-container mb-24 text-center">
        <Heading>Recommended Reading</Heading>
        <Description className="mx-auto mb-24 max-w-xl">
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
