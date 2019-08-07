import styled from 'styled-components';

interface EdgeProps {
  width: number;
}

export const Edge = styled.div<EdgeProps>`
  display: block;
  width: ${props => props.width}px;
  height: 20px;
  border-radius: 10px;
  box-shadow: 3px 2px 44px 0 rgba(0, 234, 255, 0.5),
    -5px 2px 24px 0 rgba(0, 0, 0, 0.5), inset 2px 2px 0 0 rgba(0, 0, 0, 0.23),
    inset 0 1px 13px 0 #2a5357;
  background-color: ${props => props.theme.edge.color};
`;
