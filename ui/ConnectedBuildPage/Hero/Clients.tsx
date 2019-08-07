import React from 'react';
import styled from 'styled-components';

import { AirFranceLogo } from './logos/AirFrance';
import { NordeaLogo } from './logos/Nordea';
import { SchneiderLogo } from './logos/Schneider';
import { KLMLogo } from './logos/KLM';
import { PoalimLogo } from './logos/Poalim';

const Container = styled.div`
  display: flex;
  padding: 0 160px;
  flex-shrink: 0;
  flex-grow: 0;
  flex-direction: row;
  backdrop-filter: blur(10px);
  background-color: rgba(4, 6, 18, 0.7);
`;

const List = styled.div`
  padding: 20px 0;
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Clients: React.FunctionComponent = () => {
  return (
    <Container>
      <List>
        <AirFranceLogo />
        <NordeaLogo />
        <SchneiderLogo />
        <KLMLogo />
        <PoalimLogo />
      </List>
    </Container>
  );
};
