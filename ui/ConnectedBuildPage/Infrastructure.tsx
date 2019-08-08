import React from 'react';

import { Section } from './Section';
import { BackgroundVideo } from './BackgroundVideo';

export const Infrastructure: React.FunctionComponent = () => {
  return (
    <Section
      on='right'
      anchor='infra'
      subtitle='Connected Build'
      description='The React team works first of all for Facebook, keeps them up to date and makes sure everything works for Facebook.
                   We do the same for your company and many other companies.'
      title='Infrastructure Team for All of You'
      highlight='You'
    >
      <div/>
    </Section>
  );
};
