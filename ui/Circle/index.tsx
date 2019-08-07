import React from 'react';

import * as S from './styles';
import * as T from './types';

interface CircleProps {
  size?: T.Size;
}

export const Circle: React.FunctionComponent<CircleProps> = ({
  size,
  children,
}) => (
  <S.CircleContainer size={size}>
    <S.Content size={size}>{children}</S.Content>
  </S.CircleContainer>
);
