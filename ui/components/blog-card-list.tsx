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
        'my-6 flex flex-wrap justify-center gap-x-7 gap-y-10',
        className
      )}
    >
      {articles.map((article) => (
        <NextLink key={article.title} href={article.link} passHref>
          <a
            className="
          flex
          w-[278px]
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-[20px]
          border
          border-solid
          bg-white
          transition-colors
          hover:border-[#7F818C]
          dark:border-transparent
          dark:bg-[#101218]
          hover:dark:border-[#7F818C]"
          >
            <img
              src={article.thumbnail ?? article.image}
              alt="Article logo"
              className="h-[164px] w-full object-cover drag-none"
            />
            <div className="flex grow flex-col p-5">
              <Heading size="md" className="line-clamp-3">
                {article.title}
              </Heading>
              <Description
                size="md"
                className="overflow-hidden text-ellipsis leading-[18px] line-clamp-3"
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
