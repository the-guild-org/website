import { FC } from 'react';
import ReactAvatar from 'react-avatar';

export const Avatar: FC<{ author: any }> = ({ author }) => {
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
