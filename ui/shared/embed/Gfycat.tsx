import React, { FC } from 'react';
import { Observer } from '../Observer';

export interface IGfycatProps {
  gifId: string;
}

export const Gfycat: FC<IGfycatProps> = ({ gifId }) => (
  <Observer>
    <div
      style={{
        position: 'relative',
        paddingBottom: 'calc(73.71% + 44px)',
      }}
    >
      <iframe
        src={`https://gfycat.com/ifr/${gifId}`}
        scrolling="no"
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
        allowFullScreen
        frameBorder={0}
      />
    </div>
  </Observer>
);
