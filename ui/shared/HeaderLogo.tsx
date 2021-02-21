import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  color: var(--colors-accent);
`;

const Text = styled.div`
  margin-left: 10px;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--colors-primary);
`;

export const HeaderLogo: React.FunctionComponent = () => {
  return (
    <Container>
      <img src="/img/header-logo.png" />
    </Container>
  );
};
