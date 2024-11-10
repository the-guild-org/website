import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import { InfiniteMovingCards } from '@components';
import { Image } from '@theguild/components';
import thirdFriday from './3rd-friday.svg';
import airFrance from './air-france.svg';
import bankHapoalim from './bank-hapoalim.svg';
import dalet from './dalet.svg';
import dfds from './dfds.svg';
import formidable from './formidable-labs.svg';
import fuse from './fuse-autotech.svg';
import klarna from './klarna.svg';
import klm from './klm.svg';
import microsoft from './microsoft.svg';
import msj from './msj.svg';
import nordea from './nordea.svg';
import outreach from './outreach.svg';
import parse from './parse-platform.svg';
import pepper from './pepper.svg';
import rabobank from './rabobank.svg';
import redwoodjs from './redwood-js.svg';
import schneiderElectric from './schneider-electric.svg';
import sequence from './sequence.svg';
import theGraph from './the-graph.svg';
import uber from './uber.svg';

const logos: Record<string, StaticImageData> = {
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
  'Parse Platform': parse,
  RedwoodJS: redwoodjs,
  Sequence: sequence,
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
