import { FC } from 'react';
import clsx from 'clsx';

export const HeroSection: FC<{ hideCirclesOnMobile?: boolean }> = ({
  children,
  hideCirclesOnMobile = false,
}) => {
  return (
    <div>
      <img
        src="/img/blue-circle.svg"
        className={clsx(
          'absolute -z-1 top-0 -left-40 lg:left-0',
          hideCirclesOnMobile && 'hidden xl:block'
        )}
      />
      <img
        src="/img/pink-circle.png"
        className={clsx(
          'absolute -z-1 right-0 top-96 sm:top-80 md:top-24 w-32 sm:w-60 lg:w-96 drag-none',
          hideCirclesOnMobile && 'hidden xl:block'
        )}
      />
      <div className="text-center flex flex-col justify-center items-center">
        <div
          className="
          max-w-[700px]
          lg:mt-44
          mt-20
          flex
          flex-col
          items-center
          z-1
          px-2
          md:px-2"
        >
          {children}
        </div>
      </div>
    </div>
  );
};
