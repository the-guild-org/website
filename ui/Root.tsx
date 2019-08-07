import React from 'react';

import { useFonts } from '../hooks/use-fonts';

export const Root: React.FunctionComponent = ({ children }) => {
  useFonts();
  
  return <>{children}</>;
};
