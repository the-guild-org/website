import { Children, CSSProperties, ReactElement, ReactNode } from 'react';
import { clsx } from 'clsx';

const TimeToSeconds = {
  fast: '20s',
  normal: '40s',
  slow: '80s',
};

export function InfiniteMovingCards({
  children,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}): ReactElement {
  const content = Children.map(children, (child, index) => (
    <li key={index}>
      {child}
    </li>
  ));

  return (
    <div
      className={clsx(
        'relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className,
      )}
      style={
        {
          '--animation-duration': TimeToSeconds[speed],
          '--animation-direction': direction === 'left' ? 'forwards' : 'reverse',
        } as CSSProperties
      }
    >
      <ul
        className={clsx(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-10 sm:gap-16 lg:gap-20 py-4',
          'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {content}
        {content}
      </ul>
    </div>
  );
}
