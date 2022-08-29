import { ReactElement, ReactNode } from 'react';
import clsx from 'clsx';
import { Image } from '@theguild/components';
import blueCircle from '../public/img/blue-circle.svg';
import pinkCircle from '../public/img/pink-circle.png';

export const HeroSection = ({
  children,
  hideCirclesOnMobile = false,
}: {
  children: ReactNode;
  hideCirclesOnMobile?: boolean;
}): ReactElement => {
  return (
    <div>
      <Image
        src={blueCircle}
        placeholder="empty"
        loading="eager"
        className={clsx('absolute top-0 -left-40 z-[-1] lg:left-0', hideCirclesOnMobile && 'hidden xl:block')}
      />
      <Image
        src={pinkCircle}
        placeholder="empty"
        loading="eager"
        className={clsx(
          'absolute top-96 right-0 z-[-1] w-32 drag-none sm:top-80 sm:w-60 md:top-24 lg:w-96',
          hideCirclesOnMobile && 'hidden xl:block'
        )}
      />
      <div className="flex flex-col items-center justify-center text-center">
        <div
          className="
          z-[1]
          mt-20
          flex
          max-w-[700px]
          flex-col items-center
          px-2
          md:px-2
          lg:mt-44"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
