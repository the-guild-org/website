import React from 'react';
import ReactAvatar from 'react-avatar';
import type { AuthorDetails } from './authors';

export const Avatar: React.FC<{ author: AuthorDetails }> = ({ author }) => {
  return (
    <ReactAvatar
      round={true}
      githubHandle={author.github}
      twitterHandle={author.twitter}
      size="40"
      title={author.name}
      alt={author.name}
    />
  );
};
