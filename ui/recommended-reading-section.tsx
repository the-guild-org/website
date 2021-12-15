import { FC } from 'react';
import NextLink from 'next/link';
import { css } from 'styled-components';
import tw from 'twin.macro';
import { format } from 'date-fns';
import { authors } from './authors';
import { MetaWithLink, pickAuthor } from '../lib/meta';
import { Heading, Description, Anchor } from './index';

export const BlogCard = tw.a`w-[278px] min-h-[380px] max-h-[400px] border border-solid border-gray-500 rounded-2xl m-4 overflow-hidden flex flex-col hover:opacity-90 cursor-pointer border border-solid border-transparent hover:border-gray-500 transition-colors duration-200`;

export const RecommendedReadingSection: FC<{ articles: MetaWithLink[] }> = ({
  articles = [],
}) => {
  return (
    <div
      css={css`
        background: linear-gradient(
            180deg,
            rgba(41, 40, 40, 0.2) 0%,
            rgba(0, 0, 0, 0) 100%
          ),
          #0b0d11;
      `}
    >
      <div css={tw`flex flex-col items-center text-center pt-28`}>
        <Heading>Recommended Reading</Heading>
        <Description css={tw`max-w-[700px]`}>
          Read and follow the most popular blog in the GraphQL Ecosystem
        </Description>
        <NextLink href="/blog">
          <Anchor>View all posts ➔</Anchor>
        </NextLink>
      </div>

      <div
        css={tw`container mx-auto my-6 flex flex-wrap justify-center text-white`}
      >
        {articles.map((article) => (
          <BlogCard key={article.title} href={article.link}>
            {/*<img src={article.image} css={tw`max-w-[278px] max-h-[164px]`} />*/}
            <div
              css={[
                css`
                  background-image: url(${article.image});
                `,
                tw`w-full h-full max-w-[278px] max-h-[164px] bg-cover bg-center bg-no-repeat flex-shrink-0`,
              ]}
            />
            <div css={[tw`p-5`]}>
              <Heading $size="md">{article.title}</Heading>
              <Description
                $size="md"
                css={tw`overflow-ellipsis overflow-hidden max-h-[48px]`}
              >
                {article.description}
              </Description>
              <div css={tw`text-xs `}>
                <span css={tw`text-gray-200 font-bold`}>
                  {authors[pickAuthor(article)].name}
                </span>
                <span css={tw`text-gray-500`}>
                  {' '}
                  • {format(new Date(article.date), 'LLL do y')}
                </span>
              </div>
            </div>
          </BlogCard>
        ))}
      </div>
    </div>
  );
};
