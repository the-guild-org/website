import styled from 'styled-components';

export const Title = styled.div`
  padding: 25px 0;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
  color: ${props => props.theme.title.color};
`;
