'use client'

import { FC } from 'react';
import { Observer } from '../observer';
import { handleTwttrLoad } from './utils';

export const Tweet: FC<{
  /** Tweet link */
  tweetLink: string;
  /** Color theme of the Tweet */
  theme?: 'light' | 'dark';
  /** Alignment of the Tweet */
  align?: 'left' | 'center' | 'right';
}> = ({
  tweetLink,
  theme = 'light',
  align = 'left',
}) => (
  <Observer onEnter={() => handleTwttrLoad()}>
    <div className="flex justify-center">
      <blockquote className="twitter-tweet" data-theme={theme} data-align={align}>
        <a href={`https://twitter.com/${tweetLink}?ref_src=twsrc%5Etfw`}>
          {typeof window !== 'undefined' && !window.twttr && 'Loading'}
        </a>
      </blockquote>
    </div>
  </Observer>
);
