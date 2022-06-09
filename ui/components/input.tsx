import clsx from 'clsx';
import { ComponentProps, ReactElement } from 'react';

export const Input = ({
  className,
  isInvalid,
  ...props
}: ComponentProps<'input'> & { isInvalid?: boolean }): ReactElement => {
  return (
    <input
      className={clsx(
        `
          w-full
          rounded-xl
          border
          py-3
          px-4
          font-medium
          placeholder:text-gray-500
          focus:outline-none
          focus:ring-1
          disabled:cursor-not-allowed
          disabled:opacity-30
          `,
        isInvalid
          ? 'border-red-500 bg-red-500/20 focus:ring-red-500'
          : 'border-transparent bg-gray-200 focus:border-cyan-400 focus:ring-cyan-400 dark:bg-zinc-800',
        className
      )}
      {...props}
    />
  );
};
