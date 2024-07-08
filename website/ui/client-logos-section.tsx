import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { InfiniteMovingCards } from '@/infinite-moving-cards';
import { Image } from '@theguild/components';
import thirdFriday from '../public/img/logos/companies/3rdfriday-white.png';
import airFrance from '../public/img/logos/companies/air-france-white.png';
import bankHapoalim from '../public/img/logos/companies/bank-hapoalim-white.png';
import dalet from '../public/img/logos/companies/dalet-white.png';
import dfds from '../public/img/logos/companies/dfds-white.png';
import formidable from '../public/img/logos/companies/formidable-white.png';
import fuse from '../public/img/logos/companies/fuse-white.png';
import klarna from '../public/img/logos/companies/klarna-white.png';
import klm from '../public/img/logos/companies/klm-white.png';
import lance from '../public/img/logos/companies/lance-white.png';
import microsoft from '../public/img/logos/companies/microsoft-white.png';
import msj from '../public/img/logos/companies/msj-white.png';
import nordea from '../public/img/logos/companies/nordea-white.png';
import outreach from '../public/img/logos/companies/outreach-white.png';
import parse from '../public/img/logos/companies/parse-white.png';
import pepper from '../public/img/logos/companies/pepper-white.png';
import rabobank from '../public/img/logos/companies/rabobank-white.png';
import redwoodjs from '../public/img/logos/companies/redwoodjs-white.png';
import schneiderElectric from '../public/img/logos/companies/schneider-electric-white.png';
import sequence from '../public/img/logos/companies/seq-white.png';
import theGraph from '../public/img/logos/companies/thegraph-white.png';
import uber from '../public/img/logos/companies/uber-white.png';

const logos: Record<string, StaticImageData> = {
  'The Graph': theGraph,
  Lance: lance,
  Outreach: outreach,
  Dalet: dalet,
  Klarna: klarna,
  Microsoft: microsoft,
  Uber: uber,
  DFDS: dfds,
  KLM: klm,
  'Air France': airFrance,
  'Schneider Electric': schneiderElectric,
  Nordea: nordea,
  'Bank Hapoalim': bankHapoalim,
  Rabobank: rabobank,
  Pepper: pepper,
  '3rdFriday': thirdFriday,
  'Mount St. Joseph University': msj,
  'FUSE autotech': fuse,
  Formidable: formidable,
  'Parse Platform': parse,
  RedwoodJS: redwoodjs,
  Sequence: sequence,
};

export const ClientLogosSection = (): ReactElement => {
  return (
    <div className="nextra-container">
      <InfiniteMovingCards direction="right" speed="slow" className="py-16">
        {Object.entries(logos).map(([name, logo]) => (
          <Image
            key={name}
            src={logo}
            title={name}
            alt={`${name} logo`}
            className="h-16 w-auto opacity-50 transition-opacity hover:opacity-100"
            placeholder="empty"
            loading="eager"
            // className="
            // h-8
            // w-auto
            // opacity-70
            // invert
            // transition-opacity
            // duration-300
            // hover:opacity-100
            // dark:invert-0
            // "
          />
        ))}
      </InfiniteMovingCards>
    </div>
  );
};
