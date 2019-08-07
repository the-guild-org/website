import React from 'react';

import * as S from './styles';

interface OvalProps {
  size: number;
}

export const Oval: React.FunctionComponent<OvalProps> = ({
  size,
  children,
}) => {
  return (
    <S.InnerOval size={size}>
      <S.Content>{children}</S.Content>
    </S.InnerOval>
  );
};
