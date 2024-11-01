'use client';

import { ComponentProps, FC, ReactElement } from 'react';
import { useParams } from 'next/navigation';
import clsx from 'clsx';
import { Anchor } from '@theguild/components';

const Tag: FC<ComponentProps<typeof Anchor> & { isActive: boolean }> = ({
  children,
  isActive,
  href,
  ...props
}): ReactElement => {
  return (
    <Anchor
      href={href}
      className={clsx(
        'rounded-md bg-gray-200 hover:!no-underline dark:bg-[#24272E]',
        'flex px-2.5 py-1.5 text-sm font-medium transition-colors',
        href
          ? 'hover:text-black hover:dark:bg-[#15AFD04C] hover:dark:text-[#82E9FF]'
          : 'cursor-default',
        isActive ? 'dark:bg-[#15AFD04C] dark:text-[#82E9FF]' : 'text-gray-500 dark:text-[#7F818C]',
      )}
      {...props}
    >
      {children}
    </Anchor>
  );
};

export const TagList: FC<{
  tags: (string | [string, number])[];
  withCount?: boolean;
  className?: string;
}> = ({ tags, withCount, className, ...props }): ReactElement => {
  const params = useParams();
  return (
    <div className={clsx('flex flex-wrap justify-center gap-2.5', className)} {...props}>
      {tags.map(tagOrTagCount => {
        const [tag, count] = Array.isArray(tagOrTagCount) ? tagOrTagCount : [tagOrTagCount, 0];
        return (
          <Tag key={tag} href={`/blog/tag/${tag}`} isActive={tag === params.tag}>
            {withCount && count > 0 ? `${tag} (${count})` : tag}
          </Tag>
        );
      })}
    </div>
  );
};
