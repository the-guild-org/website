import Head from 'next/head';
import styled, { ThemeProvider, ThemeConsumer } from 'styled-components';
import { BookOpen, Anchor, Bell, Calendar, Coffee, Play } from 'react-feather';

import { Background } from './Background';
import { Title } from './Title';
import { Center } from './Center';
import { Circle } from './Circle';
import { Edge } from './Edge';
import { CircleMenu } from './CircleMenu';
import { MenuItem } from './CircleMenu/types';

const THEME = {
  background: {
    color: '#05050f',
  },
  circle: {
    color: '#031824',
    activeColor: '#00eaff',
    content: '#fff',
  },
  edge: {
    color: '#00eaff',
  },
  oval: {
    color: '#00eaff',
    content: '#fff',
  },
  title: {
    color: '#fff',
  },
};

const menu: MenuItem[] = [
  {
    text: 'Start your journey',
    element: () => (
      <a href='/start-journey'>
        <Circle size={'normal'}>
          <BookOpen />
        </Circle>
      </a>
    ),
  },
  {
    text: 'End your journey',
    element: () => (
      <a href='/end-journey'>
        <Circle size={'normal'}>
          <Anchor />
        </Circle>
      </a>
    ),
  },
  {
    text: 'Your journey',
    element: () => (
      <a href='/journey'>
        <Circle size={'normal'}>
          <Bell />
        </Circle>
      </a>
    ),
  },
  {
    text: 'More and more',
    element: () => (
      <a href='/more'>
        <Circle size={'normal'}>
          <Calendar />
        </Circle>
      </a>
    ),
  },
  {
    text: 'Drink coffee',
    element: () => (
      <a href='/coffee'>
        <Circle size={'normal'}>
          <Coffee />
        </Circle>
      </a>
    ),
  },
  {
    text: 'Visit our YouTube',
    element: () => (
      <a href='/play'>
        <Circle size={'normal'}>
          <Play />
        </Circle>
      </a>
    ),
  },
];

const InColumns = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  ${Center} {
    flex: 1;
  }
`;

const HomePage = () => (
  <ThemeProvider theme={THEME}>
    <ThemeConsumer>
      {theme => {
        return (
          <>
            <Head>
              <title>The Guild</title>
              <meta name='theme-color' content={theme.background.color} />
              <meta name='Description' content='Website of The Guild' />
            </Head>
            <Background>
              <InColumns>
                <Title>The Guild</Title>
                <Center>
                  <CircleMenu
                    size={600}
                    itemSize={110}
                    edgeHeight={10}
                    edgeGap={120 * 1.5}
                    menu={menu}
                    edge={props => <Edge width={props.size[0]} />}
                  />
                </Center>
              </InColumns>
            </Background>
          </>
        );
      }}
    </ThemeConsumer>
  </ThemeProvider>
);

export default HomePage;
