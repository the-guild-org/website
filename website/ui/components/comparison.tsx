import clsx from 'clsx';
import { ReactElement, ReactNode } from 'react';

export function Comparison({ children, className }: { children: ReactNode; className: string }): ReactElement {
  return (
    <div
      className={clsx(
        'mt-6 flex items-stretch gap-1',
        '[&>div]:mt-0 [&>div]:w-1/2 [&_button]:hidden',
        '[&_pre]:mb-0 [&_pre]:h-full',
        className
      )}
    >
      {children}
    </div>
  );
}
