import React from 'react';

import { useFonts } from '../hooks/use-fonts';
import { Progress } from './shared/Progress';

export const Root: React.FunctionComponent = ({ children }) => {
  useFonts();

  return (
    <>
      <Progress />
      {children}
    </>
  );
};
