import { FC } from 'react';
import NextLink from 'next/link';
import tw from 'twin.macro';

export const Tag: FC<{
  tag: string;
  asLink: boolean;
}> = ({ tag, asLink }) => {
  return (
    <span
      css={[
        tw`
    inline-block
    bg-gray-100
    hover:bg-gray-200
    p-2
    mr-2
    mb-2
    rounded-md
    text-xs
    text-gray-500
    dark:text-gray-600
    transition-all
    duration-200`,
        asLink && tw`cursor-pointer`,
      ]}
    >
      {asLink ? (
        <NextLink href={`/blog/tag/${tag}`}>
          <a>{tag}</a>
        </NextLink>
      ) : (
        tag
      )}
    </span>
  );
};
