import { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';

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
          px-4
          py-3
          font-medium
          placeholder:text-gray-500
          focus:outline-none
          focus:ring-1
          invalid:focus:border-red-500
          invalid:focus:bg-red-500/20
          invalid:focus:ring-red-500
          disabled:cursor-not-allowed
          disabled:opacity-30
          `,
        isInvalid
          ? 'border-red-500 bg-red-500/20 focus:ring-red-500'
          : 'border-transparent bg-gray-200 focus:border-cyan-400 focus:ring-cyan-400 dark:bg-zinc-800',
        className,
      )}
      {...props}
    />
  );
};
