import { ReactElement } from 'react';
import NextLink from 'next/link';
import { MetaWithLink } from '../lib/meta';
import { Heading, Description, Anchor, BlogCardList } from './components';

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
        dark:[background:linear-gradient(180deg,rgba(41,40,40,0.2)0%,rgba(0,0,0,0)100%),#0b0d11]
        sm:px-6
        md:px-8
      "
    >
      <div className="flex flex-col items-center py-28">
        <Heading className="text-center">Recommended Reading</Heading>
        <Description className="max-w-[700px] text-center">
          Read and follow the most popular blog in the GraphQL Ecosystem
        </Description>
        <NextLink href="/blog">
          View all posts ➔
        </NextLink>
        <BlogCardList articles={articles} />
      </div>
    </div>
  );
};
