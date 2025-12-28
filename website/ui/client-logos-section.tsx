import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { InfiniteMovingCards } from '@/infinite-moving-cards';
import { Image } from '@theguild/components';
import thirdFriday from './logos/3rd-friday.svg';
import airFrance from './logos/air-france.svg';
import bankHapoalim from './logos/bank-hapoalim.svg';
import dalet from './logos/dalet.svg';
import dfds from './logos/dfds.svg';
import formidable from './logos/formidable-labs.svg';
import fuse from './logos/fuse-autotech.svg';
import klarna from './logos/klarna.svg';
import klm from './logos/klm.svg';
import microsoft from './logos/microsoft.svg';
import msj from './logos/msj.svg';
import nordea from './logos/nordea.svg';
import outreach from './logos/outreach.svg';
import parse from './logos/parse-platform.svg';
import pepper from './logos/pepper.svg';
import rabobank from './logos/rabobank.svg';
import redwoodjs from './logos/redwood-js.svg';
import schneiderElectric from './logos/schneider-electric.svg';
import sequence from './logos/sequence.svg';
import theGraph from './logos/the-graph.svg';
import uber from './logos/uber.svg';

const logos: Record<string, StaticImageData> = {
  'Parse Platform': parse,
  Sequence: sequence,
  RedwoodJS: redwoodjs,
  'The Graph': theGraph,
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
  'Formidable Labs': formidable,
};

export function ClientLogosSection(): ReactElement {
  return (
    <InfiniteMovingCards direction="right" speed="slow" className="py-10 lg:py-16">
      {Object.entries(logos).map(([name, logo]) => (
        <Image
          key={name}
          src={logo}
          title={name}
          alt={`${name} logo`}
          placeholder="empty"
          loading="eager"
          className="h-7 w-auto max-w-64 opacity-60 brightness-0 saturate-100 lg:h-10 dark:invert"
        />
      ))}
    </InfiniteMovingCards>
  );
}
