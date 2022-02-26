import { FC } from 'react';
import clsx from 'clsx';
import { logos } from '../lib/logos';

export const ClientLogosSection: FC = () => {
  return (
    <div className="container">
      <div className="mx-auto flex flex-wrap justify-center items-center mt-44 pb-20 max-w-[1260px]">
        {logos.map((item) => (
          <img
            key={item.logo}
            src={`/img/logos/companies/${item.logo}`}
            title={item.name}
            alt={`${item.name} logo`}
            className="opacity-70
            hover:opacity-100
            transition-opacity
            duration-300
            max-w-[90px]
            md:max-w-[180px]
            max-h-[35px]
            md:max-h-[40px]
            m-6
            invert
            dark:invert-0"
          />
        ))}
      </div>
    </div>
  );
};
