import { ReactElement } from 'react';
import { MetaWithLink } from '../lib/meta';
import { BlogCardList, Description, Heading, Link } from './components';

export const RecommendedReadingSection = ({
  articles = [],
}: {
  articles: MetaWithLink[];
}): ReactElement => {
  return (
    <div
      className="
        px-4
        [background:linear-gradient(180deg,rgba(41,40,40,0.1)0%,rgba(0,0,0,0)100%)]
        sm:px-6
        md:px-8
        dark:[background:linear-gradient(180deg,rgba(41,40,40,0.2)0%,rgba(0,0,0,0)100%),#0b0d11]
      "
    >
      <div className="flex flex-col items-center py-28">
        <Heading className="text-center">Recommended Reading</Heading>
        <Description className="max-w-[700px] text-center">
          Read and follow the most popular blog in the GraphQL Ecosystem
        </Description>
        <Link
          href="/blog"
          className="font-bold !text-gray-500 hover:!text-gray-600 hover:no-underline dark:hover:!text-gray-300"
        >
          View all posts ➔
        </Link>
        <BlogCardList articles={articles} />
      </div>
    </div>
  );
};
