import { ComponentProps, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Anchor } from '@theguild/components';
import clsx from 'clsx';

const Tag = ({
  children,
  isActive = false,
  href = '',
  ...props
}: Omit<ComponentProps<'a'>, 'ref'> & {
  isActive?: boolean;
}): ReactElement => {
  return (
    <Anchor
      href={href}
      className={clsx(
        'rounded-md bg-gray-200 hover:!no-underline dark:bg-[#24272E]',
        'flex py-1.5 px-2.5 text-sm font-medium transition-colors',
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

export const TagList = ({
  tags,
  asLink = false,
  withCount = false,
  className,
  ...props
}: {
  tags: (string | [string, number])[];
  asLink?: boolean;
  withCount?: boolean;
  className?: string;
}): ReactElement => {
  const router = useRouter();
  return (
    <div className={clsx('flex flex-wrap justify-center gap-2.5', className)} {...props}>
      {tags.map(tagOrTagCount => {
        const [tag, count] = Array.isArray(tagOrTagCount) ? tagOrTagCount : [tagOrTagCount, 0];
        return (
          <Tag
            key={tag}
            href={asLink ? `/blog/tag/${tag}` : ''}
            isActive={tag === router.query.tag}
          >
            {withCount && count > 0 ? `${tag} (${count})` : tag}
          </Tag>
        );
      })}
    </div>
  );
};
