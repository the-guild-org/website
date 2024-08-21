import { ComponentProps, ReactElement } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import { styled } from '../../stitches.config';

const ButtonWithAsProp = styled('button', {});

export const Button = ({
  className,
  children,
  variant = 'secondary',
  disabled,
  loading,
  ...props
}: Omit<ComponentProps<'button'>, 'ref'> & {
  variant?: 'secondary' | 'primary';
  as?: 'a';
  href?: string;
  loading?: boolean;
}): ReactElement => {
  return (
    <ButtonWithAsProp
      className={clsx(
        `
  cursor-pointer
  rounded-xl
  border-0
  bg-gray-200
  py-4
  text-sm
  font-bold
  transition
  disabled:cursor-not-allowed
  dark:bg-gray-800`,
        {
          primary:
            'px-10 text-white opacity-80 [background:linear-gradient(114.44deg,#7433ff_0%,#ffa3fd_100%)]',
          secondary: 'px-5 text-gray-500',
        }[variant],
        !disabled &&
          {
            primary: 'hover:opacity-100',
            secondary: 'hover:text-gray-600 dark:hover:text-gray-400',
          }[variant],
        !disabled && 'hover:bg-gray-300 dark:hover:bg-gray-700',
        className,
      )}
      disabled={disabled}
      {...props}
    >
      {loading && (
        <svg
          className="-ml-5 mr-2 inline h-5 w-5 animate-spin text-white"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="stroke-current opacity-25" cx="12" cy="12" r="10" strokeWidth="3" />
          <path
            className="fill-current opacity-75"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </ButtonWithAsProp>
  );
};

export function GuildButton({
  children,
  className,
  // @ts-expect-error -- fixme
  as: Component = NextLink,
  ...props
}: ComponentProps<typeof NextLink>): ReactElement {
  return (
    // @ts-expect-error -- fixme
    <Component
      {...props}
      className={clsx(
        'text-dark relative inline-flex items-center gap-3 rounded-[10px] px-5 py-3 font-medium transition-none',
        // @ts-expect-error -- fixme
        props.disabled
          ? 'opacity-50'
          : [
              'after:font-mono after:text-3xl after:leading-none after:content-["➔"]',
              'hocus:after:transition-[opacity]',
              'lg:hocus:pr-10 duration-700 lg:transition-[padding]',
              'hocus:after:delay-100 hocus:after:duration-500',
              'lg:hocus:after:opacity-100 lg:after:opacity-0',
              'lg:after:absolute lg:after:right-3',
            ],
        className,
      )}
    >
      {children}
    </Component>
  );
}
