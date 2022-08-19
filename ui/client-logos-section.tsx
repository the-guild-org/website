import { ReactElement } from 'react';
import { Image } from '@theguild/components';
import { logos } from '../lib/logos';

export const ClientLogosSection = (): ReactElement => {
  return (
    <div className="container">
      <div className="mx-auto mt-44 flex max-w-[1260px] flex-wrap items-center justify-center pb-20 gap-12">
        {logos.map((item) => (
          <Image
            key={item.name}
            src={item.logo}
            title={item.name}
            alt={`${item.name} logo`}
            className="
            h-8
            w-auto
            max-w-[15rem]
            opacity-70
            invert
            transition-opacity
            duration-300
            hover:opacity-100
            dark:invert-0
            "
          />
        ))}
      </div>
    </div>
  );
};
