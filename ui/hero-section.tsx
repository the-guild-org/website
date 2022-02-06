import { FC } from 'react';
import tw from 'twin.macro';

export const HeroSection: FC<{ hideCirclesOnMobile?: boolean }> = ({
  children,
  hideCirclesOnMobile = false,
}) => {
  return (
    <div>
      <img
        src="/img/blue-circle.svg"
        css={[
          tw`
          absolute
          -z-1
          top-0
          -left-40
          lg:left-0`,
          hideCirclesOnMobile && tw`hidden xl:block`,
        ]}
      />
      <img
        src="/img/pink-circle.png"
        css={[
          tw`absolute
          -z-1
          right-0
          top-96
          sm:top-80
          md:top-24
          w-32
          sm:w-60
          lg:w-96
          drag-none`,
          hideCirclesOnMobile && tw`hidden xl:block`,
        ]}
      />
      <div css={tw`text-center flex flex-col justify-center items-center`}>
        <div
          css={tw`
          max-w-[700px]
          lg:mt-44
          mt-20
          flex
          flex-col
          items-center
          z-1
          px-2
          md:px-2`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
