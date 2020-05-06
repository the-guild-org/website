import React from 'react';

import { Section } from '../Section';
import { Options } from './Options';

export const HowItWorks: React.FunctionComponent = () => {
  return (
    <Section
      on="left"
      anchor="how"
      subtitle="How it works"
      description="Influence, work and learn from the best open source maintainers out there!"
      title="Make Open Source libraries and maintainers work for you!"
      highlight="Open Source"
    >
      <Options />
    </Section>
  );
};
