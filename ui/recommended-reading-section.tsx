import { FC } from 'react';
import NextLink from 'next/link';
import { MetaWithLink } from '../lib/meta';
import { Heading, Description, Anchor, BlogCardList } from './components';

export const RecommendedReadingSection: FC<{ articles: MetaWithLink[] }> = ({
  articles = [],
}) => {
  return (
    <div
      className="
        [background:linear-gradient(180deg,rgba(41,40,40,0.2)0%,rgba(0,0,0,0)100%)]
        dark:[background:linear-gradient(180deg,rgba(41,40,40,0.2)0%,rgba(0,0,0,0)100%),#0b0d11]
        "
    >
      <div className="flex flex-col items-center py-28">
        <Heading className="text-center">Recommended Reading</Heading>
        <Description className="max-w-[700px]">
          Read and follow the most popular blog in the GraphQL Ecosystem
        </Description>
        <NextLink href="/blog" passHref>
          <Anchor>View all posts ➔</Anchor>
        </NextLink>
        <BlogCardList articles={articles} />
      </div>
    </div>
  );
};
