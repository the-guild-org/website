export type AuthorDetails = {
  name: string;
  link: string;
  github?: string;
  twitter?: string;
};

export const authors: Record<string, AuthorDetails> = {
  eytan: {
    name: 'Eytan Manor',
    link: 'https://twitter.com/eytan_manor',
    github: 'DAB0mB',
  },
  kamil: {
    name: 'Kamil Kisiela',
    link: 'https://twitter.com/kamilkisiela',
    github: 'kamilkisiela',
  },
  dotan: {
    name: 'Dotan Simha',
    link: 'https://twitter.com/dotansimha',
    github: 'dotansimha',
  },
  uri: {
    name: 'Uri Goldshtein',
    link: 'https://twitter.com/UriGoldshtein',
    github: 'Urigo',
  },
  arda: {
    name: 'Arda Tanrikulu',
    link: 'https://twitter.com/ardatanrikulu',
    github: 'ardatan',
  },
  laurin: {
    name: 'Laurin Quast',
    link: 'https://twitter.com/n1rual',
    github: 'n1ru4l',
  },
  leonardo: {
    name: 'Leonardo Ascione',
    link: 'https://twitter.com/leonardfactory',
    github: 'leonardfactory',
  },
  niccolo: {
    name: 'Niccolo Belli',
    link: 'https://twitter.com/niccolobelli',
    github: 'darkbasic',
  },
  david: {
    name: 'David Yahalomi',
    link: 'https://twitter.com/DavidYahalomi',
    twitter: 'davidyaha',
  },
};
