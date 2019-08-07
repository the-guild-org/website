import styled from 'styled-components';
import * as T from './types';

export const InnerContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

export const Container = styled.div<{ size: number; padding: number }>`
  width: ${props => props.size - props.padding * 2}px;
  height: ${props => props.size - props.padding * 2}px;
  padding: ${props => props.padding}px;
  border-radius: 50%;

  ${Content} & {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

export const Item = styled.div<{ point: T.Point; noRotation?: boolean }>`
  position: absolute;
  left: ${props => props.point[0]}px;
  top: ${props => props.point[1]}px;
  ${props =>
    !props.noRotation ? `transform: rotate(${props.point[2] + 90}deg);` : ''}
`;