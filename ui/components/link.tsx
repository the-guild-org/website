import { forwardRef, HTMLProps } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';

// forwardRef fixes Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
export const Anchor = forwardRef<
  HTMLAnchorElement,
  HTMLProps<HTMLAnchorElement>
>(function Anchor({ className, children, ...props }, forwardedRef) {
  return (
    <a
      ref={forwardedRef}
      className={clsx(
        'font-bold text-gray-500 hover:text-gray-600 dark:hover:text-gray-300',
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
});

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
