import React from 'react';
import styled from 'styled-components';

import { Form } from './Form';
import { RightPanel } from './RightPanel';

const Container = styled.div`
  height: 100vh;
  padding: 0 160px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;

  & > * {
    width: 35%;
  }
`;

export const Contact: React.FunctionComponent = () => {
  return (
    <Container>
      <Form />
      <RightPanel />
    </Container>
  );
};
