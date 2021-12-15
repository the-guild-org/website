import { FC } from 'react';
import tw from 'twin.macro';
import { logos } from '../lib/logos';

export const ClientLogosSection: FC = () => {
  return (
    <div css={tw`container mx-auto`}>
      <div
        css={tw`mx-auto flex flex-wrap justify-center items-center mt-44 pb-20 max-w-[1260px]`}
      >
        {logos.map((item) => (
          <img
            key={item.logo}
            src={`/img/logos/companies/${item.logo}`}
            title={item.name}
            alt={`${item.name} logo`}
            css={tw`opacity-70 hover:opacity-100 transition-opacity duration-300 max-w-[90px] md:max-w-[180px] max-h-[35px] md:max-h-[40px] m-6`}
          />
        ))}
      </div>
    </div>
  );
};
