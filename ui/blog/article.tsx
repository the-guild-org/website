import { ReactElement } from 'react';
import { format } from 'date-fns';
import { useConfig } from '@theguild/components';
import { Image, Avatar, TagList } from '@/components';
import { LookingForExperts } from '@/looking-for-experts';
import { AUTHORS } from '@/authors';
import { Meta } from '../../lib/meta';
import { asArray } from '../../lib/as-array';

const Authors = ({ meta }: { meta: Meta }): ReactElement => {
  const date = meta.date ? new Date(meta.date) : new Date();
  const updatedDate = meta.updateDate ? new Date(meta.updateDate) : null;

  const authors = asArray(meta.authors);

  if (authors.length === 1) {
    const author = AUTHORS[authors[0]];

    return (
      <div className="my-5 flex flex-row items-center justify-center">
        <a href={author.link} title={author.name}>
          <Avatar author={author} />
        </a>
        <div className="ml-2.5 flex flex-col">
          <a href={author.link} title={author.name} className="text-[#1cc8ee]">
            {author.name}
          </a>
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
          updatedDate ? `Updated ${format(updatedDate, 'EEEE, LLL do y')}` : `Posted ${format(date, 'EEEE, LLL do y')}`
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
              <a href={author.link} title={author.name}>
                <Avatar author={author} />
                <span className="ml-2.5 text-sm text-[#1cc8ee]">{author.name}</span>
              </a>
            </div>
          );
        })}
      </div>
    </>
  );
};

export const Article = (): ReactElement => {
  const { meta: frontMatter } = useConfig();

  return (
    <>
      <h1>{frontMatter.title}</h1>
      <Authors meta={frontMatter as Meta} />
      <TagList tags={frontMatter.tags} asLink className="mt-4" />
      <Image src={frontMatter.image} className="mx-auto mt-6" />
      <LookingForExperts />
    </>
  );
};
