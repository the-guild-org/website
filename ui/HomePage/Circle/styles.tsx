import styled from 'styled-components';

import * as T from './types';

const defaultSize: T.Size = 'normal';
const sizes: Record<T.Size, number> = {
  normal: 110,
};
const ratio = 80 / sizes.normal;
const innerRatio = 40 / sizes.normal;

function pickSize(size: T.Size) {
  return sizes[size || defaultSize];
}

export const Content = styled.div<{ size?: T.Size }>`
  display: flex;
  width: ${props => pickSize(props.size) * ratio}px;
  height: ${props => pickSize(props.size) * ratio}px;
  box-shadow: 3px 2px 44px 0 #000617, -5px 2px 24px 0 rgba(0, 0, 0, 0.5);
  background-color: ${props => props.theme.circle.color};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.circle.content};
  
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  & > * {
    width: ${props => pickSize(props.size) * innerRatio}px;
    height: ${props => pickSize(props.size) * innerRatio}px;
    stroke-width: 1px;
  }
`;

export const CircleContainer = styled.div<{ size?: T.Size }>`
  display: flex;
  width: ${props => pickSize(props.size)}px;
  height: ${props => pickSize(props.size)}px;
  border: solid 5px ${props => props.theme.circle.color};
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  transition-property: border-color;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  &:hover {
    border-color: ${props => props.theme.circle.activeColor};

    ${Content} {
      background-color: ${props => props.theme.circle.activeColor};
    }
  }
`;
