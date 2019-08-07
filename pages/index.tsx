import { BookOpen, Anchor, Bell, Calendar, Coffee, Play } from 'react-feather';

import { Root } from '../ui/Root';
import { Center } from '../ui/Center';
import { Circle } from '../ui/Circle';
import { Edge } from '../ui/Edge';
import { CircleMenu } from '../ui/CircleMenu';
import { MenuItem } from '../ui/CircleMenu/types';

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
  }
];

const Index = () => (
  <Root>
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
  </Root>
);

export default Index;
