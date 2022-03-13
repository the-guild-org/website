import clsx from 'clsx';
import { FC } from 'react';

type Size = 'lg' | 'md';

const Heading: FC<{ size?: Size; className?: string }> = ({
  className,
  size = 'lg',
  children,
}) => {
  return (
    <h2
      className={clsx(
        'm-0 mb-2',
        size === 'lg' &&
          'text-3xl font-extrabold leading-snug dark:text-gray-50 md:text-[42px] md:leading-[55px]',
        size === 'md' && 'text-lg font-bold leading-7 dark:text-gray-50',
        className
      )}
    >
      {children}
    </h2>
  );
};

export default Heading;
