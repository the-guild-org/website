import { ComponentProps, ReactElement } from 'react';
import clsx from 'clsx';

type Size = 'lg' | 'md';

export const Heading = ({
  className,
  size = 'lg',
  children,
  ...props
}: {
  size?: Size;
} & ComponentProps<'h2'>): ReactElement => {
  return (
    <h2
      className={clsx(
        'm-0 mb-3.5 text-[#24272e]',
        {
          lg: 'text-3xl font-medium leading-snug md:text-5xl dark:text-gray-50',
          md: 'text-lg font-bold leading-7 dark:text-gray-50',
        }[size],
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
