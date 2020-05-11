import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Observer } from '../Observer';
import { handleTwttrLoad } from './utils';

export interface ITweetProps {
  /** Tweet link */
  tweetLink: string;
  /** Color theme of the Tweet */
  theme?: 'light' | 'dark';
  /** Alignment of the Tweet */
  align?: 'left' | 'center' | 'right';
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: auto;
`;

export const Tweet: FunctionComponent<ITweetProps> = ({
  tweetLink,
  theme = 'light',
  align = 'left',
}: ITweetProps) => (
  <Observer onEnter={() => handleTwttrLoad()}>
    <Container>
      <blockquote
        className="twitter-tweet"
        data-theme={theme}
        data-align={align}
      >
        <a href={`https://twitter.com/${tweetLink}?ref_src=twsrc%5Etfw`}>
          {typeof window !== 'undefined' && !(window as any).twttr
            ? 'Loading'
            : ''}
        </a>
      </blockquote>
    </Container>
  </Observer>
);
