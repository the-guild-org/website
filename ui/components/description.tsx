import clsx from 'clsx';
import { FC } from 'react';

type Size = 'lg' | 'md';

const Description: FC<{ size?: Size; className?: string }> = ({
  className,
  size = 'lg',
  children,
}) => {
  return (
    <p
      className={clsx(
        'text-gray-500',
        size === 'lg' && 'mb-7 leading-6',
        size === 'md' && 'mb-6 text-xs leading-4',
        className
      )}
    >
      {children}
    </p>
  );
};

export default Description;
