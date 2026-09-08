interface Author {
  github: string;
  link: string;
  name: string;
}

const authors: Record<string, Author> = {
  adam: {
    github: 'adambenhassen',
    link: 'https://github.com/adambenhassen',
    name: 'Adam Benhassen',
  },
  AlecAivazis: {
    github: 'AlecAivazis',
    link: 'https://twitter.com/AlecAivazis',
    name: 'Alec Aivazis',
  },
  aleksandra: {
    github: 'beerose',
    link: 'https://x.com/aleksandrasays',
    name: 'Aleksandra Sikora',
  },
  arda: {
    github: 'ardatan',
    link: 'https://twitter.com/ardatanrikulu',
    name: 'Arda Tanrikulu',
  },
  charlypoly: {
    github: 'charlypoly',
    link: 'https://charlypoly.com',
    name: 'Charly Poly',
  },
  chimame: {
    github: 'chimame',
    link: 'https://twitter.com/chimame_rt',
    name: 'Rito Tamata',
  },
  croutonn: {
    github: 'croutonn',
    link: 'https://twitter.com/croutnn',
    name: 'Yuta Haga',
  },
  david: {
    github: 'davidyaha',
    link: 'https://twitter.com/DavidYahalomi',
    name: 'David Yahalomi',
  },
  denis: {
    github: 'enisdenjo',
    link: 'https://github.com/enisdenjo',
    name: 'Denis Badurina',
  },
  dimatill: {
    github: 'dimatill',
    link: 'https://github.com/dimatill',
    name: 'Dmitry Til',
  },
  dimitri: {
    github: 'dimaMachina',
    link: 'https://x.com/dimaMachina_',
    name: 'Dimitri Postolov',
  },
  dotan: {
    github: 'dotansimha',
    link: 'https://github.com/dotansimha',
    name: 'Dotan Simha',
  },
  eddeee888: {
    github: 'eddeee888',
    link: 'https://twitter.com/eddeee888',
    name: 'Eddy Nguyen',
  },
  egoodwinx: {
    github: 'egoodwinx',
    link: 'https://www.linkedin.com/in/emily-y-goodwin/',
    name: 'Emily Goodwin',
  },
  enisdenjo: {
    github: 'enisdenjo',
    link: 'https://twitter.com/enisdenjo',
    name: 'Denis Badurina',
  },
  ephelan: {
    github: 'craicoverflow',
    link: 'https://twitter.com/PhelanEnda',
    name: 'Enda Phelan',
  },
  eytan: {
    github: 'DAB0mB',
    link: 'https://twitter.com/eytan_manor',
    name: 'Eytan Manor',
  },
  gabotechs: {
    github: 'gabotechs',
    link: 'https://github.com/gabotechs',
    name: 'Gabriel Musat',
  },
  gil: {
    github: 'gilgardosh',
    link: 'https://github.com/gilgardosh',
    name: 'Gil Gardosh',
  },
  giladtidhar: {
    github: 'giladd123',
    link: 'https://twitter.com/tidhar_gilad',
    name: 'Gilad Tidhar',
  },
  gmac: {
    github: 'gmac',
    link: 'https://twitter.com/gmacwilliam',
    name: 'Greg MacWilliam',
  },
  gthau: {
    github: 'gthau',
    link: 'https://github.com/gthau',
    name: 'Ghislain Thau',
  },
  iha: {
    github: 'XiNiHa',
    link: 'https://github.com/XiNiHa',
    name: 'Iha Shin',
  },
  jason: {
    github: 'jasonkuhrt',
    link: 'https://github.com/jasonkuhrt',
    name: 'Jason Kuhrt',
  },
  jdolle: {
    github: 'jdolle',
    link: 'https://github.com/jdolle',
    name: 'Jeff Dolle',
  },
  jessevelden: {
    github: 'jessevelden',
    link: 'https://twitter.com/JesseVelden',
    name: 'Jesse van der Velden',
  },
  jiri: { github: 'capaj', link: 'https://x.com/capajj', name: 'Jiri Spac' },
  jonathanawesome: {
    github: 'jonathanawesome',
    link: 'https://github.com/jonathanawesome',
    name: 'Jonathan Brennan',
  },
  josiassejod1: {
    github: 'josiassejod1',
    link: 'https://github.com/josiassejod1',
    name: 'Dalvin Sejour',
  },
  jycouet: {
    github: 'jycouet',
    link: 'https://twitter.com/jycouet',
    name: 'Jean-Yves Couët',
  },
  kamil: {
    github: 'kamilkisiela',
    link: 'https://x.com/kamilkisiela',
    name: 'Kamil Kisiela',
  },
  laurin: {
    github: 'n1ru4l',
    link: 'https://twitter.com/n1rual',
    name: 'Laurin Quast',
  },
  leonardo: {
    github: 'leonardfactory',
    link: 'https://twitter.com/leonardfactory',
    name: 'Leonardo Ascione',
  },
  maticzav: {
    github: 'maticzav',
    link: 'https://twitter.com/maticzav',
    name: 'Matic Zavadlal',
  },
  michael: {
    github: 'mskorokhodov',
    link: 'https://github.com/mskorokhodov',
    name: 'Michael Skorokhodov',
  },
  niccolo: {
    github: 'darkbasic',
    link: 'https://twitter.com/niccolobelli',
    name: 'Niccolo Belli',
  },
  nohehf: {
    github: 'nohehf',
    link: 'https://twitter.com/NoheHf',
    name: 'Nohé Hinniger-Foray',
  },
  notrab: {
    github: 'notrab',
    link: 'https://graphql.wtf',
    name: 'Jamie Barton',
  },
  saihaj: {
    github: 'saihaj',
    link: 'https://github.com/saihaj',
    name: 'Saihajpreet Singh',
  },
  soichi: {
    github: 'piglovesyou',
    link: 'https://twitter.com/piglovesyou1',
    name: 'Soichi Takamura',
  },
  tshedor: {
    github: 'tshedor',
    link: 'https://github.com/tshedor',
    name: 'Tim Shedor',
  },
  tuval: {
    github: 'TuvalSimha',
    link: 'https://github.com/tuvalsimha',
    name: 'Tuval Simha',
  },
  tuvalSimha: {
    github: 'TuvalSimha',
    link: 'https://twitter.com/SimhaTuval',
    name: 'Tuval Simha',
  },
  tvvignesh: {
    github: 'tvvignesh',
    link: 'https://twitter.com/techahoy',
    name: 'Vignesh T.V.',
  },
  uri: {
    github: 'Urigo',
    link: 'https://github.com/Urigo',
    name: 'Uri Goldshtein',
  },
  valentin: {
    github: 'EmrysMyrddin',
    link: 'https://github.com/EmrysMyrddin',
    name: 'Valentin Cocaud',
  },
  warrenjday: {
    github: 'warrenjday',
    link: 'https://twitter.com/warrenjday',
    name: 'Warren Day',
  },
};

function author(name: string, github: string): Author {
  return { github, link: `https://github.com/${github}`, name };
}

export function resolveAuthor(value: string | { name: string }): Author {
  const key = typeof value === 'string' ? value : value.name;
  return authors[key] ?? author(key, key);
}
