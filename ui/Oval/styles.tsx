import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.oval.content};
  text-align: center;
  box-sizing: border-box;
  padding: 20px;
`;

export const InnerOval = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  box-shadow: 3px 2px 44px 0 rgba(0, 234, 255, 0.5),
    -5px 2px 24px 0 rgba(0, 0, 0, 0.5), inset 2px 2px 0 0 rgba(0, 0, 0, 0.23),
    inset 0 1px 13px 0 #2a5357;
  background-color: ${props => props.theme.oval.color};
  border-radius: 50%;
`;
