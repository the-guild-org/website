import clsx from 'clsx';
import { FC } from 'react';
import { useRouter } from 'next/router';
import NextLink from 'next/link';

const Tag = ({ children, clickable = false, isActive = false, ...props }) => {
  return (
    <a
      className="bg-gray-200 dark:bg-[#24272E] rounded-[5px] overflow-hidden"
      {...props}
    >
      <span
        className={clsx(
          'flex px-2.5 py-1.5 transition-colors text-sm font-medium',
          clickable
            ? 'hover:text-black hover:dark:text-[#82E9FF] hover:dark:bg-[rgba(21, 175, 208, 0.3)]'
            : 'cursor-default',
          // TODO: has bug when using dark mode, try refactor proper when migrate to tailwind v3
          isActive
            ? 'bg-[rgba(21, 175, 208, 0.3)] text-[#82E9FF]!'
            : 'text-gray-500 dark:text-[#7F818C]'
        )}
      >
        {children}
      </span>
    </a>
  );
};

const TagList: FC<{
  tags: (string | [string, number])[];
  asLink?: boolean;
  withCount?: boolean;
}> = ({ tags, asLink = false, withCount = false, ...props }) => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-2.5 justify-center" {...props}>
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
