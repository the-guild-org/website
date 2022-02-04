import { FC } from 'react';
import tw from 'twin.macro';

export const HeroSection: FC = ({ children }) => {
  return (
    <>
      <img
        src="/img/blue-circle.svg"
        css={tw`absolute top-0 lg:left-0 -left-40 z-0`}
      />
      <img
        src="/img/pink-circle.png"
        css={tw`absolute right-0 lg:w-96 w-64 -right-16 top-80 md:top-24 z-0`}
      />
      <div css={tw`text-center flex flex-col justify-center items-center`}>
        <div
          css={tw`max-w-[700px] lg:mt-44 mt-20 flex flex-col items-center z-1 px-2 md:px-2`}
        >
          {children}
        </div>
      </div>
    </>
  );
};
