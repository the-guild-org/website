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
        'placeholder-[#24272e] dark:placeholder:text-[#b4b5be]',
        'w-full border-b bg-transparent pb-2.5',
        'disabled:cursor-not-allowed disabled:opacity-30',
        isInvalid ? 'border-[#f6547b] text-[#f6547b]' : 'border-[#24272e] dark:border-[#b4b5be]',
        className,
      )}
      {...props}
    />
  );
};
