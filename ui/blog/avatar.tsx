import React from 'react';
import ReactAvatar from 'react-avatar';
import type { AuthorDetails } from './authors';

const AVATAR_SIZE = '40px';

export const Avatar: React.FC<{ author: AuthorDetails }> = ({ author }) => {
  return (
    <ReactAvatar
      round={true}
      githubHandle={author.github}
      twitterHandle={author.twitter}
      size={AVATAR_SIZE}
      title={author.name}
      alt={author.name}
    />
  );
};
