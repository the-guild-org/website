import { FC } from 'react';
import { logos } from '../lib/logos';

export const ClientLogosSection: FC = () => {
  return (
    <div className="container">
      <div className="mx-auto mt-44 flex max-w-[1260px] flex-wrap items-center justify-center pb-20">
        {logos.map((item) => (
          <img
            key={item.logo}
            src={`/img/logos/companies/${item.logo}`}
            title={item.name}
            alt={`${item.name} logo`}
            className="
            m-6
            max-h-[35px]
            max-w-[90px]
            opacity-70
            invert
            transition-opacity
            duration-300
            hover:opacity-100
            dark:invert-0
            md:max-h-[40px]
            md:max-w-[180px]"
          />
        ))}
      </div>
    </div>
  );
};
