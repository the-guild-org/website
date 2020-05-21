import React from 'react';
import Avatar from 'react-avatar';

const AVATAR_SIZE = '40px';

export type AuthorDetails = {
  name: string;
  link: string;
  avatar: React.ReactChild;
};

export const authors: Record<string, AuthorDetails> = {
  eytan: {
    name: 'Eytan Manor',
    link: 'https://twitter.com/eytan_manor',
    avatar: <Avatar round={true} githubHandle="DAB0mB" size={AVATAR_SIZE} />,
  },
  kamil: {
    name: 'Kamil Kisiela',
    link: 'https://twitter.com/kamilkisiela',
    avatar: (
      <Avatar round={true} githubHandle="kamilkisiela" size={AVATAR_SIZE} />
    ),
  },
  dotan: {
    name: 'Dotan Simha',
    link: 'https://twitter.com/dotansimha',
    avatar: (
      <Avatar round={true} githubHandle="dotansimha" size={AVATAR_SIZE} />
    ),
  },
  uri: {
    name: 'Uri Goldshtein',
    link: 'https://twitter.com/UriGoldshtein',
    avatar: <Avatar round={true} githubHandle="Urigo" size={AVATAR_SIZE} />,
  },
  arda: {
    name: 'Arda Tanrikulu',
    link: 'https://twitter.com/ardatanrikulu',
    avatar: <Avatar round={true} githubHandle="ardatan" size={AVATAR_SIZE} />,
  },
  laurin: {
    name: 'Laurin Quast',
    link: 'https://twitter.com/n1rual',
    avatar: <Avatar round={true} githubHandle="n1ru4l" size={AVATAR_SIZE} />,
  },
  leonardo: {
    name: 'Leonardo Ascione',
    link: 'https://twitter.com/leonardfactory',
    avatar: (
      <Avatar round={true} githubHandle="leonardfactory" size={AVATAR_SIZE} />
    ),
  },
  niccolo: {
    name: 'Niccolo Belli',
    link: 'https://twitter.com/niccolobelli',
    avatar: <Avatar round={true} githubHandle="darkbasic" size={AVATAR_SIZE} />,
  },
  david: {
    name: 'David Yahalomi',
    link: 'https://twitter.com/DavidYahalomi',
    avatar: (
      <Avatar round={true} twitterHandle="davidyaha" size={AVATAR_SIZE} />
    ),
  },
};
