'use client';

import { FC } from 'react';
import ReactAvatar from 'react-avatar';

export const Avatar: FC<{
  author: { name: string; github?: string; twitter?: string };
}> = ({ author }) => {
  return (
    <ReactAvatar
      round
      githubHandle={author.github}
      twitterHandle={author.twitter}
      size="40"
      title={author.name}
      alt={author.name}
    />
  );
};
