import { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';

export function Comparison({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}): ReactElement {
  return (
    <div
      className={clsx(
        'mt-6 grid grid-cols-2 items-stretch gap-1',
        '*:!mt-0 [&_button]:hidden',
        '[&_pre]:h-[calc(100%-3rem)]',
        className,
      )}
    >
      {children}
    </div>
  );
}
