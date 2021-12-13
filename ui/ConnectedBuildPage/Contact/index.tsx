import { FC } from 'react';
import { Section } from '../Section';
import { Form } from './Form';

export const Contact: FC = () => {
  return (
    <Section
      on="right"
      anchor="contact"
      subtitle="Join the revolution"
      description="Get real money for your work instead of relying on charity."
      title="Open Source Maintainer?"
      highlight="Maintainer"
    >
      <Form />
    </Section>
  );
};
