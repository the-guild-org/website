import React from 'react';

import { Section } from '../Section';
import { Form } from './Form';

export const Contact: React.FunctionComponent = () => {
  return (
    <Section
      on='right'
      anchor='contact'
      subtitle='Join the revolution'
      description='Get work and real money for your work instead of relaying on charity.'
      title="Think You're Open Source Maintainer?"
      highlight='Open Source'
    >
      <Form />
    </Section>
  );
};
