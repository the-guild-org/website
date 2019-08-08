import React from 'react';

import { Section } from '../Section';
import { Options } from './Options';

export const HowItWorks: React.FunctionComponent = () => {
  return (
    <Section
      on='left'
      anchor='how'
      subtitle='How it works'
      description='Now you can list a product once, sell it everywhere and grow your sales faster.'
      title='Manage Your Open Source Updates'
      highlight='Updates'
    >
      <Options />
    </Section>
  );
};
