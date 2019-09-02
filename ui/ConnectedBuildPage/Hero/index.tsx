import React from 'react';
import styled from 'styled-components';

import { Title } from './Title';
import { Menu } from './Menu';
import { Clients } from './Clients';
import { BackgroundVideo } from '../BackgroundVideo';

const Container = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    z-index: 2;
  }
`;

export const Hero: React.FunctionComponent = () => {
  return (
    <Container>
      <BackgroundVideo
        image='/static/hero.jpg'
        src='/static/hero.webm'
        type='video/webm'
      />
      <Menu />
      <Title text="We're Proud to Present" />
      <Clients />
    </Container>
  );
};
