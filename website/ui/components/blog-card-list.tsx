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
    <div className={clsx('my-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4', className)}>
      {articles.map(article => (
        <NextLink
          key={article.link}
          href={article.link}
          className="
            hocus:bg-neutral-200/60
            hocus:dark:bg-[#2b2f37]/60
            flex
            cursor-pointer
            flex-col
            overflow-hidden
            rounded-[20px]
            bg-[#f1f1f1]/60
            backdrop-blur-xl
            backdrop-saturate-[1.3]
            transition-colors
            duration-300 [box-shadow:inset_2px_2px_8px_rgba(153,192,255,0.015),inset_-2px_-2px_8px_rgba(229,253,190,0.015)]
            hover:!no-underline
            hover:duration-0
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
