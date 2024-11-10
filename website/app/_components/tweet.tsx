'use client';

import { FC } from 'react';
import { useTheme } from '@theguild/components';
import { Observer } from './observer';
import { handleTwttrLoad } from './utils';

export const Tweet: FC<{
  /** Tweet link */
  tweetLink: string;
}> = ({ tweetLink }) => {
  const { resolvedTheme } = useTheme();

  return (
    <Observer onEnter={handleTwttrLoad}>
      <blockquote
        className="twitter-tweet mt-6 text-center"
        data-theme={resolvedTheme}
        data-align="center"
      >
        <a href={`https://twitter.com/${tweetLink}?ref_src=twsrc%5Etfw`}>Loading...</a>
      </blockquote>
    </Observer>
  );
};
