import NextLink from 'next/link';
import clsx from 'clsx';
import { FC, HTMLProps } from 'react';

export const Anchor: FC<HTMLProps<HTMLAnchorElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <a
      className={clsx(
        'font-bold text-gray-500 hover:text-gray-600 dark:hover:text-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};

export const GenericLink = (props) => {
  if (props.href.startsWith('/') && !props.href.startsWith('/blog')) {
    return (
      <NextLink href={props.href} as={props.as}>
        <a className="text-[#1cc8ee] hover:underline">{props.children}</a>
      </NextLink>
    );
  }

  if (props.href.startsWith('#')) {
    return <a className="text-[#1cc8ee] hover:underline" {...props} />;
  }

  return (
    <a
      className="text-[#1cc8ee] hover:underline"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
};
