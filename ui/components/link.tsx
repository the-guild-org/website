import { ComponentProps, forwardRef, HTMLProps, ReactElement } from 'react';
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

export const GenericLink = ({
  children,
  href,
  className,
  ...props
}: ComponentProps<'a'>): ReactElement => {
  if (href.startsWith('/') && !href.startsWith('/blog')) {
    return (
      <NextLink href={href} className={clsx('text-[#1cc8ee] hover:underline', className)}>
        {children}
      </NextLink>
    );
  }

  if (href.startsWith('#')) {
    return (
      <a
        href={href}
        className={clsx('text-[#1cc8ee] hover:underline', className)}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={clsx('text-[#1cc8ee] hover:underline', className)}
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      {children}
    </a>
  );
};
