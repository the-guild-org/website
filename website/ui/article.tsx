import { FC } from 'react';
import { format } from 'date-fns';
import { AUTHORS } from '@/authors';
import { Avatar } from '@/components';
import { Anchor } from '@theguild/components';
import { asArray } from '../lib/as-array';
import { Meta } from '../lib/meta';

export const Authors: FC<{ meta: Meta }> = ({ meta }) => {
  const date = meta.date ? new Date(meta.date) : new Date();
  const updatedDate = meta.updateDate ? new Date(meta.updateDate) : null;

  const authors = asArray(meta.authors);

  if (authors.length === 1) {
    const author = AUTHORS[authors[0]];

    return (
      <div className="my-5 flex flex-row items-center justify-center">
        <Anchor href={author.link} title={author.name}>
          <Avatar author={author} />
        </Anchor>
        <div className="ml-2.5 flex flex-col">
          <Anchor href={author.link} title={author.name} className="text-[#1cc8ee]">
            {author.name}
          </Anchor>
          <time
            dateTime={date.toISOString()}
            title={
              updatedDate
                ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}`
                : `Posted ${format(date, 'EEEE, LLL do y')}`
            }
            className="text-xs text-[#777]"
          >
            {format(date, 'EEEE, LLL do y')}
          </time>
        </div>
      </div>
    );
  }
  return (
    <>
      <time
        dateTime={date.toISOString()}
        title={
          updatedDate
            ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}`
            : `Posted ${format(date, 'EEEE, LLL do y')}`
        }
        className="mt-5 block text-center text-xs text-[#777]"
      >
        {format(date, 'EEEE, LLL do y')}
      </time>
      <div className="my-5 flex flex-wrap justify-center gap-5">
        {authors.map(authorId => {
          const author = AUTHORS[authorId];
          return (
            <div key={authorId}>
              <Anchor href={author.link} title={author.name} className="text-[#1cc8ee]">
                <Avatar author={author} />
                <span className="ml-2.5 text-sm">{author.name}</span>
              </Anchor>
            </div>
          );
        })}
      </div>
    </>
  );
};
