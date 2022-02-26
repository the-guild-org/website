import { FC } from 'react';
import clsx from 'clsx';
import NextLink from 'next/link';
import { format } from 'date-fns';
import Description from './description';
import Heading from './heading';
import { authors } from '../authors';
import { MetaWithLink, pickAuthor } from '../../lib/meta';

const BlogCard = tw.a`
w-[278px]
flex flex-col
bg-white
border border-solid rounded-[20px]
dark:border-transparent
overflow-hidden
cursor-pointer
transition-colors
hover:border-[#7F818C]
dark:bg-[#101218]
`;

const BlogCardList: FC<{ articles: MetaWithLink[]; className?: string }> = ({
  articles,
  className,
}) => {
  return (
    <div
      className={clsx('flex flex-wrap justify-center gap-x-7 gap-y-10 my-6', className)}
    >
      {articles.map((article) => (
        <NextLink key={article.title} href={article.link} passHref>
          <BlogCard>
            <img
              src={article.thumbnail ?? article.image}
              alt="Article logo"
              className='w-full h-[164px] object-cover drag-none'
            />
            <div className='flex flex-col flex-grow p-5'>
              <Heading $size="md" className='line-clamp-3'>
                {article.title}
              </Heading>
              <Description
                $size="md"
                className='leading-[18px] line-clamp-3 overflow-ellipsis overflow-hidden'
              >
                {article.description}
              </Description>
              <div className='mt-auto text-xs'>
                <span className='font-bold dark:text-[#C4C4C4]'>
                  {authors[pickAuthor(article)].name}
                </span>
                <span className='dark:text-gray-500'>
                  <span className='select-none'> • </span>
                  {format(new Date(article.date), 'LLL do y')}
                </span>
              </div>
            </div>
          </BlogCard>
        </NextLink>
      ))}
    </div>
  );
};

export default BlogCardList;
