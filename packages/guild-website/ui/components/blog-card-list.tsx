import { ReactElement } from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { format } from 'date-fns';
import { AUTHORS } from '@/authors';
import { Description } from './description';
import { Heading } from './heading';
import { MetaWithLink } from '../../lib/meta';

export const BlogCardList = ({
  articles,
  className,
}: {
  articles: MetaWithLink[];
  className?: string;
}): ReactElement => {
  return (
    <div className={clsx('my-6 flex flex-wrap justify-center gap-x-7 gap-y-10', className)}>
      {articles.map(article => (
        <NextLink
          key={article.link}
          href={article.link}
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
          hover:!no-underline
          dark:border-transparent
          dark:bg-[#101218]
          hover:dark:border-[#7F818C]"
        >
          <img
            src={article.thumbnail ?? article.image}
            alt="Article logo"
            className="drag-none h-[164px] w-full object-cover"
          />
          <div className="flex grow flex-col p-5">
            <Heading size="md" className="line-clamp-3 [hyphens:auto]">
              {article.title}
            </Heading>
            <Description
              size="md"
              className="line-clamp-3 overflow-hidden text-ellipsis !leading-[18px] [hyphens:auto]"
            >
              {article.description}
            </Description>
            <div className="mt-auto text-xs">
              <span className="font-bold dark:text-[#C4C4C4]">{AUTHORS[article.authors[0]].name}</span>
              <span className="dark:text-gray-500">
                <span className="select-none"> • </span>
                {format(new Date(article.date), 'LLL do y')}
              </span>
            </div>
          </div>
        </NextLink>
      ))}
    </div>
  );
};
