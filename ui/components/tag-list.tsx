import clsx from 'clsx';
import { FC, forwardRef, HTMLProps } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

// forwardRef fixes Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
const Tag = forwardRef<
  HTMLAnchorElement,
  HTMLProps<HTMLAnchorElement> & { clickable?: boolean; isActive?: boolean }
>(function Tag(
  { children, clickable = false, isActive = false, ...props },
  forwardedRef
) {
  return (
    <a
      ref={forwardedRef}
      className="overflow-hidden rounded-[5px] bg-gray-200 dark:bg-[#24272E]"
      {...props}
    >
      <span
        className={clsx(
          'flex py-1.5 px-2.5 text-sm font-medium transition-colors',
          clickable
            ? 'hover:text-black hover:dark:bg-[#15AFD04C] hover:dark:text-[#82E9FF]'
            : 'cursor-default',
          isActive
            ? 'dark:bg-[#15AFD04C] dark:text-[#82E9FF]'
            : 'text-gray-500 dark:text-[#7F818C]'
        )}
      >
        {children}
      </span>
    </a>
  );
});

const TagList: FC<{
  tags: (string | [string, number])[];
  asLink?: boolean;
  withCount?: boolean;
  className?: string;
}> = ({ tags, asLink = false, withCount = false, className, ...props }) => {
  const router = useRouter();
  return (
    <div
      className={clsx('flex flex-wrap justify-center gap-2.5', className)}
      {...props}
    >
      {tags.map((tagOrTagCount) => {
        const [tag, count] = Array.isArray(tagOrTagCount)
          ? tagOrTagCount
          : [tagOrTagCount, 0];

        const content = (
          <Tag isActive={tag === router.query.tag} clickable={asLink}>
            {withCount && count > 0 ? `${tag} (${count})` : tag}
          </Tag>
        );

        return asLink ? (
          <NextLink key={tag} href={`/blog/tag/${tag}`} passHref>
            {content}
          </NextLink>
        ) : (
          content
        );
      })}
    </div>
  );
};

export default TagList;
