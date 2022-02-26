import { FC } from 'react';
import { logos } from '../lib/logos';

export const ClientLogosSection: FC = () => {
  return (
    <div className="container">
      <div className="flex flex-wrap justify-center items-center pb-20 mx-auto mt-44 max-w-[1260px]">
        {logos.map((item) => (
          <img
            key={item.logo}
            src={`/img/logos/companies/${item.logo}`}
            title={item.name}
            alt={`${item.name} logo`}
            className="m-6
            max-w-[90px]
            max-h-[35px]
            opacity-70
            hover:opacity-100
            invert
            dark:invert-0
            transition-opacity
            duration-300
            md:max-w-[180px]
            md:max-h-[40px]"
          />
        ))}
      </div>
    </div>
  );
};
