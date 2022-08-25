import { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { styled } from '../../stitches.config';

export const Container = styled('div', {
  maxWidth: 960,
  margin: '0 auto',
  boxSizing: 'border-box',
  '@media (max-width: 960px)': {
    margin: '0 15px',
  },
});

const HeroHeader = styled('div', {
  color: 'var(--colors-primary)',
  span: {
    color: 'var(--colors-accent)',
  },
  '& > h1': {
    display: 'block',
    fontSize: 34,
  },
});

export const Hero = ({ shrink, children }: { shrink?: boolean; children: ReactNode }): ReactElement => {
  return (
    <div
      // eslint-disable-next-line tailwindcss/no-contradicting-classname -- false positive for background image on before and after
      className={clsx(
        `
      relative
      min-h-[300px]
      w-full
      overflow-hidden
      before:absolute
      before:inset-0
      before:bg-[url(/img/tiles-lb.png)]
      before:bg-left-bottom
      before:bg-no-repeat
      before:content-['']
      after:absolute
      after:inset-0
      after:rotate-180
      after:bg-[url(/img/tiles-lb.png)]
      after:bg-left-bottom
      after:bg-no-repeat
      after:content-['']
      `,
        shrink ? 'h-[50vh]' : 'h-[100vh]'
      )}
    >
      <Container className="h-full">
        <HeroHeader
          className="
        flex
        h-full
        w-full
        flex-col
        items-center
        justify-center
        text-center
        "
        >
          <h1>{children}</h1>
        </HeroHeader>
      </Container>
    </div>
  );
};

export const Arrow = ({ className }: { className?: string }): ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
