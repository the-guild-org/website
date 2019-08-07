import { Users, Github, Power, MessageSquare, Clipboard, TrendingUp } from 'react-feather';
import styled from 'styled-components';

import { Root } from '../ui/Root';
import { Title } from '../ui/Title';
import { Center } from '../ui/Center';
import { Circle } from '../ui/Circle';
import { Edge } from '../ui/Edge';
import { CircleMenu } from '../ui/CircleMenu';
import { MenuItem } from '../ui/CircleMenu/types';

const menu: MenuItem[] = [
  {
    text: 'Who are we',
    element: () => (
      <a href='https://github.com/the-guild-org/'>
        <Circle size={'normal'}>
          <Users />
        </Circle>
      </a>
    ),
  },
  {
    text: 'Open Source',
    element: () => (
      <a href='https://github.com/the-guild-org/Stack'>
        <Circle size={'normal'}>
          <Github />
        </Circle>
      </a>
    ),
  },
  {
    text: 'Platform',
    element: () => (
      <a href='/connected-build'>
        <Circle size={'normal'}>
          <Power />
        </Circle>
      </a>
    ),
  },
  {
    text: 'Start your journey',
    element: () => (
      <a href='/your-path'>
        <Circle size={'normal'}>
          <TrendingUp />
        </Circle>
      </a>
    ),
  },  
  {
    text: 'Blog',
    element: () => (
      <a href='https://medium.com/the-guild'>
        <Circle size={'normal'}>
          <Clipboard />
        </Circle>
      </a>
    ),
  },
  {
    text: 'Talk to us',
    element: () => (
      <a href='https://github.com/urigo'>
        <Circle size={'normal'}>
          <MessageSquare />
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

const Index = () => (
  <Root>
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
  </Root>
);

export default Index;
