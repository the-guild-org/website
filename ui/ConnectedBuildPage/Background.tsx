import styled from 'styled-components';

export const Background = styled.div`
  --colors-primary: #fff;
  background-color: ${(props) => props.theme.background.color};
`;
