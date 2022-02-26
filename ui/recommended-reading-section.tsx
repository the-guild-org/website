import { FC } from 'react';
import NextLink from 'next/link';
import { css } from 'styled-components';
import clsx from 'clsx';
import { useColorModeValue } from '@chakra-ui/react';
import { MetaWithLink } from '../lib/meta';
import { Heading, Description, Anchor, BlogCardList } from './components';

export const RecommendedReadingSection: FC<{ articles: MetaWithLink[] }> = ({
  articles = [],
}) => {
  const bg = useColorModeValue('white', 'var(--colors-background)');
  return (
    <div
      css={css`
        background: linear-gradient(
            180deg,
            rgba(41, 40, 40, 0.2) 0%,
            rgba(0, 0, 0, 0) 100%
          ),
          ${bg};
      `}
    >
      <div css={tw`flex flex-col items-center py-28`}>
        <Heading css={tw`text-center`}>Recommended Reading</Heading>
        <Description css={tw`max-w-[700px]`}>
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
