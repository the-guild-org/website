import React from 'react';

import { Section } from './Section';
import { BackgroundVideo } from './BackgroundVideo';

export const Infrastructure: React.FunctionComponent = () => {
  return (
    <Section
      on='right'
      anchor='infra'
      subtitle='Connected Build'
      description='Just like the React team is for Facebook, We can be your infrastructure team.'
      title='Infrastructure Team for All of You'
      highlight='React team'
    >
      <div/>
    </Section>
  );
};
