import React from 'react';
import ReactAvatar from 'react-avatar';

export const Avatar: React.FC<{ author: any }> = ({ author }) => {
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
