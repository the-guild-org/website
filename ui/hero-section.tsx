import { FC } from 'react';
import styled, { css } from 'styled-components';
import tw from 'twin.macro';
import { Description, Heading, Button } from './index';

const Circle = styled.div<{ $size?: number }>`
  ${({ $size }) =>
    $size &&
    css`
      width: ${$size}px;
      height: ${$size}px;
    `}
  ${tw`rounded-full absolute`}
`;

export const HeroSection: FC = () => {
  return (
    <>
      {/* Shadow for 🔵 Circle */}
      <Circle
        $size={616}
        css={[
          css`
            top: -250px;
            background: linear-gradient(
              135.17deg,
              #47deff -7.39%,
              #9847ff 143.25%
            );
            opacity: 0.4;
            filter: blur(194px);
          `,
          tw`2xl:-left-56 xl:-left-64 -left-80`,
        ]}
      />
      {/* 🔵 Circle */}
      <Circle
        $size={616}
        css={[
          css`
            background: linear-gradient(
              121.11deg,
              #1cc8ee 21.82%,
              #9847ff 144.74%
            );
            transform: rotate(-57.29deg);
          `,
          tw`2xl:-left-64 xl:-left-80 -left-96 md:-top-64 -top-80`,
        ]}
      />
      <div
        css={[
          // ❗️ Important! relative is necessary for 🔴 <Circle />, to be behind text
          tw`text-white text-center flex flex-col justify-center items-center relative`,
        ]}
      >
        <div
          css={[
            tw`max-w-[700px] mt-44 flex flex-col items-center z-1 px-2 md:px-0`,
          ]}
        >
          <Heading>Modern API Platform and ecosystem that scales</Heading>
          <Description>
            The Guild’s advanced open source ecosystem covers everything you
            need for your API infrastructure with a modular, open source and
            complete platform
          </Description>
          <Button
            as="a"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            href="#platform"
          >
            Explore The Platform
          </Button>
        </div>
        {/* Shadow for 🟣 Circle */}
        <Circle
          css={[
            css`
              background: linear-gradient(114.44deg, #7433ff 0%, #ffa3fd 100%);
              opacity: 0.5;
              filter: blur(114px);
            `,
            tw`top-96 md:top-64 lg:top-56 lg:-right-80 -right-56 md:-right-48 w-[400px] lg:w-[616px] h-[400px] lg:h-[616px]`,
          ]}
        />
        {/* 🟣 Circle */}
        <Circle
          css={[
            css`
              background: linear-gradient(114.44deg, #7433ff 0%, #ffa3fd 100%);
            `,
            tw`top-96 md:top-80 lg:top-64 -right-72 lg:-right-96 w-[400px] lg:w-[616px] h-[400px] lg:h-[616px]`,
          ]}
        />
        {/* 🔴 Circle */}
        <Circle
          $size={250}
          css={[
            css`
              background: linear-gradient(
                126.5deg,
                rgba(242, 92, 64, 0.4) 40.36%,
                rgba(255, 158, 87, 0.4) 102.61%
              );
              backdrop-filter: blur(94px);
              filter: blur(1.5px);
            `,
            tw`-right-10 lg:right-0 -bottom-36 lg:w-[316px] lg:h-[316px] opacity-95`,
          ]}
        />
      </div>
    </>
  );
};
