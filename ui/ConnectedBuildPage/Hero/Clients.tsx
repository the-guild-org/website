import React from 'react';
import styled from 'styled-components';

import {device} from '../../media';
import { AirFranceLogo } from './logos/AirFrance';
import { NordeaLogo } from './logos/Nordea';
import { SchneiderLogo } from './logos/Schneider';
import { KLMLogo } from './logos/KLM';
import { PoalimLogo } from './logos/Poalim';

const Container = styled.div`
  padding: 0 40px;
  backdrop-filter: blur(10px);
  background-color: rgba(4, 6, 18, 0.7);

  @media ${device.min.laptop} {
    padding: 0 160px;
  }
`;

const List = styled.div`
  padding: 20px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

  @media ${device.min.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  }
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
