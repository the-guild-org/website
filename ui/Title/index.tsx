import styled from 'styled-components';

export const Title = styled.div`
  padding-top: 25px;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: ${props => props.theme.title.color};
`;
