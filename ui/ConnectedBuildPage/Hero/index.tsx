import React from 'react';
import styled from 'styled-components';

import {Title} from './Title';
import {Menu} from './Menu';
import {Clients} from './Clients';

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Hero: React.FunctionComponent = () => {
  return (
    <Container>
      <Menu />
      <Title text="We Proud to Present" />
      <Clients />
    </Container>
  );
};
