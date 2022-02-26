import { FC } from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { format } from 'date-fns';
import Description from './description';
import Heading from './heading';
import { authors } from '../authors';
import { MetaWithLink, pickAuthor } from '../../lib/meta';

const BlogCardList: FC<{ articles: MetaWithLink[]; className?: string }> = ({
  articles,
  className,
}) => {
  return (
    <div
      className={clsx(
        'flex flex-wrap gap-x-7 gap-y-10 justify-center my-6',
        className
      )}
    >
      {articles.map((article) => (
        <NextLink key={article.title} href={article.link} passHref>
          <a
            className="
          overflow-hidden
          flex flex-col
          w-[278px]
          bg-white dark:bg-[#101218] rounded-[20px]
          border border-solid
          hover:border-[#7F818C]
          dark:border-transparent
          transition-colors
          cursor-pointer"
          >
            <img
              src={article.thumbnail ?? article.image}
              alt="Article logo"
              className="object-cover w-full h-[164px] drag-none"
            />
            <div className="flex flex-col grow p-5">
              <Heading $size="md" className="line-clamp-3">
                {article.title}
              </Heading>
              <Description
                $size="md"
                className="overflow-hidden leading-[18px] text-ellipsis line-clamp-3"
              >
                {article.description}
              </Description>
              <div className="mt-auto text-xs">
                <span className="font-bold dark:text-[#C4C4C4]">
                  {authors[pickAuthor(article)].name}
                </span>
                <span className="dark:text-gray-500">
                  <span className="select-none"> • </span>
                  {format(new Date(article.date), 'LLL do y')}
                </span>
              </div>
            </div>
          </a>
        </NextLink>
      ))}
    </div>
  );
};

export default BlogCardList;
