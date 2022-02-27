import { FC } from 'react';
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

export const Tweet: FC<ITweetProps> = ({
  tweetLink,
  theme = 'light',
  align = 'left',
}) => (
  <Observer onEnter={() => handleTwttrLoad()}>
    <div className="flex justify-center">
      <blockquote
        className="twitter-tweet"
        data-theme={theme}
        data-align={align}
      >
        <a href={`https://twitter.com/${tweetLink}?ref_src=twsrc%5Etfw`}>
          {typeof window !== 'undefined' && !(window as any).twttr && 'Loading'}
        </a>
      </blockquote>
    </div>
  </Observer>
);
