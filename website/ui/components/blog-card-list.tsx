import { ReactElement } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { format } from 'date-fns';
import { AUTHORS } from '@/authors';
import { MetaWithLink } from '../../lib/meta';
import { Description } from './description';
import { Heading } from './heading';

export const BlogCardList = ({
  articles,
  className,
}: {
  articles: MetaWithLink[];
  className?: string;
}): ReactElement => {
  return (
    <div className={clsx('my-12 grid gap-14 md:grid-cols-2 xl:grid-cols-4', className)}>
      {articles.map(article => (
        <NextLink
          key={article.link}
          href={article.link}
          className="
          hocus:bg-neutral-200
          hocus:dark:bg-[#24272E]
          flex
          cursor-pointer
          flex-col
          overflow-hidden
          rounded-[20px]
          bg-[#f1f1f1]
          transition-colors
          duration-300
          hover:!no-underline
          dark:bg-[#24272E]/50
          lg:[:is(&:hover,&:focus)>img]:h-36
          "
        >
          <div className="flex grow flex-col p-5">
            <Heading size="md" className="line-clamp-3 [hyphens:auto]">
              {article.title}
            </Heading>
            <Description
              size="md"
              className="line-clamp-4 overflow-hidden text-ellipsis !leading-[18px] [hyphens:auto]"
            >
              {article.description}
            </Description>
            <div className="mt-auto text-xs">
              <span className="font-bold dark:text-[#C4C4C4]">
                {AUTHORS[article.authors[0]]?.name ?? article.authors[0]}
              </span>
              <span className="before:content-['_•_'] dark:text-gray-500">
                {format(new Date(article.date), 'LLL do y')}
              </span>
            </div>
          </div>
        </NextLink>
      ))}
    </div>
  );
};
