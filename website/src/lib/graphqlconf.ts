/**
 * The Guild's sessions at every GraphQLConf, newest conference first. Session
 * links go to graphql.org, which hosts the recording of each talk. Add a
 * conference by appending an entry; the page and the header card follow.
 */
export type SessionType = 'keynote' | 'panel' | 'talk' | 'sponsored' | 'workshop' | 'lightning';

export interface Session {
  title: string;
  /** Guild speakers first, then co-presenters from elsewhere. */
  speakers: string[];
  type: SessionType;
  /** graphql.org session page, which carries the recording. */
  href: string;
}

export interface Conference {
  year: number;
  dates: string;
  city: string;
  /** Our role at that edition, as shown under the city. */
  role: string;
  scheduleHref: string;
  playlistHref?: string;
  recapHref?: string;
  sessions: Session[];
}

const SESSION_TYPE_LABEL: Record<SessionType, string> = {
  keynote: 'Keynote',
  panel: 'Panel',
  talk: 'Talk',
  sponsored: 'Sponsored session',
  workshop: 'Workshop',
  lightning: 'Lightning talk',
};

export const sessionTypeLabel = (type: SessionType): string => SESSION_TYPE_LABEL[type];

export const conferences: Conference[] = [
  {
    year: 2026,
    dates: 'May 19–20, 2026',
    city: 'Fremont, California',
    role: 'Sponsored keynote',
    scheduleHref: 'https://graphql.org/conf/2026/schedule/',
    sessions: [
      {
        title: 'Shaping New GraphQL Patterns from Strong Baselines',
        speakers: ['Uri Goldshtein'],
        type: 'keynote',
        href: 'https://graphql.org/conf/2026/schedule/76fc09beec012a1f43092ba55a295afb/',
      },
      {
        title: 'Scaling Real-Time: Building Federated Subscriptions in Rust',
        speakers: ['Denis Badurina'],
        type: 'talk',
        href: 'https://graphql.org/conf/2026/schedule/a31ba6e2e84a482857ebc4097d93c2aa/',
      },
      {
        title:
          'Was It Worth It? Lessons from Implementing Two GraphQL Routers, in JavaScript and Rust',
        speakers: ['Arda Tanrıkulu'],
        type: 'talk',
        href: 'https://graphql.org/conf/2026/schedule/a8e4cd7263cbe0a48113eebf3b0a7606/',
      },
      {
        title: 'Caching Deep Dive: The Ultimate Way To Speed up Your GraphQL API',
        speakers: ['Uri Goldshtein'],
        type: 'talk',
        href: 'https://graphql.org/conf/2026/schedule/76ddf2f65ecfd5036ad78bed7f631061/',
      },
      {
        title: 'Beyond HTTP 200: Observability With GraphQL',
        speakers: ['Kamil Kisiela'],
        type: 'talk',
        href: 'https://graphql.org/conf/2026/schedule/616a26da6957b595a0bc10905cff2720/',
      },
      {
        title: 'The Biggest Change To GraphQL Codegen in 10 Years',
        speakers: ['Eddy Nguyen', 'Igor Kusakov'],
        type: 'talk',
        href: 'https://graphql.org/conf/2026/schedule/dcd9017f3882e90a2afbdc44893441cd/',
      },
      {
        title:
          'Changing the Game for Trusted Documents: What If Your Whole Platform Natively Supported It?',
        speakers: ['Laurin Quast', 'Denis Badurina'],
        type: 'talk',
        href: 'https://graphql.org/conf/2026/schedule/d96e6d2bb0c7badfa5604e2ce8336138/',
      },
      {
        title: 'Breaking up With Inputs (Without Breaking Your Users)',
        speakers: ['Laurin Quast'],
        type: 'lightning',
        href: 'https://graphql.org/conf/2026/schedule/a7caf168c70c3f50d1805a1cb9e5119a/',
      },
    ],
  },
  {
    year: 2025,
    dates: 'September 8–10, 2025',
    city: 'Amsterdam, Netherlands',
    role: 'Community update keynote',
    scheduleHref: 'https://graphql.org/conf/2025/schedule/',
    playlistHref: 'https://youtube.com/playlist?list=PL43V96KpNj7MKvDbnyOUrRv0k1gCODtjW',
    sessions: [
      {
        title: 'Community Update 2025: Growing in the Open',
        speakers: ['Uri Goldshtein', 'Benjie Gillam', 'Jem Gillam'],
        type: 'keynote',
        href: 'https://graphql.org/conf/2025/schedule/f31a60c9bffdbc04ea8fe446bd8d644b/',
      },
      {
        title: 'Building an Open-Source Federation Query Planner & Router',
        speakers: ['Dotan Simha', 'Kamil Kisiela'],
        type: 'talk',
        href: 'https://graphql.org/conf/2025/schedule/1a0475a575803503fce927f22dd1beae/',
      },
      {
        title: 'From Private To Public: Evolving a GraphQL API for the Outside World',
        speakers: ['Laurin Quast'],
        type: 'talk',
        href: 'https://graphql.org/conf/2025/schedule/11ee2487ca4b81120d1d7218b13f2003/',
      },
      {
        title: 'Imagining the Future of GraphQL Documentation Tooling',
        speakers: ['Jason Kuhrt'],
        type: 'talk',
        href: 'https://graphql.org/conf/2025/schedule/6c9b846e538e001af3db938d771d1178/',
      },
      {
        title: 'Proven Schema Designs and Best-practices',
        speakers: ['Jeff Dolle'],
        type: 'talk',
        href: 'https://graphql.org/conf/2025/schedule/9e816cd378c96b466658842ef0900183/',
      },
      {
        title: 'Building the Ideal GraphQL Server Workflow Featuring GraphQL Code Generator',
        speakers: ['Eddy Nguyen'],
        type: 'sponsored',
        href: 'https://graphql.org/conf/2025/schedule/0281a72e8e35f07c74a5815c42c64a02/',
      },
      {
        title: 'Unleash the Power of Federation with Hive Gateway',
        speakers: ['Denis Badurina', 'Arda Tanrıkulu'],
        type: 'workshop',
        href: 'https://graphql.org/conf/2025/schedule/6fbc71a3ad13189339d753cb078ec781/',
      },
      {
        title: 'Social Media App "Y" with GraphQL, Relay, and React Server Components',
        speakers: ['Saihajpreet Singh'],
        type: 'workshop',
        href: 'https://graphql.org/conf/2025/schedule/1ef800d68c28db994bfec011a6817fc8/',
      },
      {
        title: 'Hello Graffle! A Modular Type Safe GraphQL Client',
        speakers: ['Jason Kuhrt'],
        type: 'lightning',
        href: 'https://graphql.org/conf/2025/schedule/ce3c04db5c598ba5451fcd71df4849ee/',
      },
    ],
  },
  {
    year: 2024,
    dates: 'September 10–12, 2024',
    city: 'San Francisco Bay Area, California',
    role: 'Sponsored keynote',
    scheduleHref: 'https://graphql.org/conf/2024/schedule/',
    sessions: [
      {
        title: 'Sponsored Keynote',
        speakers: ['Uri Goldshtein'],
        type: 'keynote',
        href: 'https://graphql.org/conf/2024/schedule/0cc847db0ed6bf193da7b5413c7f3e8e',
      },
      {
        title: 'Comparing API Protocols, One Feature at a Time',
        speakers: ['Uri Goldshtein'],
        type: 'talk',
        href: 'https://graphql.org/conf/2024/schedule/303433f67a7ffc5e3d31a6edfd8b1f28',
      },
      {
        title: 'Spec Agnostic Executor for Federated GraphQL',
        speakers: ['Denis Badurina'],
        type: 'talk',
        href: 'https://graphql.org/conf/2024/schedule/de8fa563c5beb17fbe9b4f5f23c99e89',
      },
      {
        title: 'In-House Schema Registry: the Good, the Bad, and the Ugly',
        speakers: ['Kamil Kisiela'],
        type: 'talk',
        href: 'https://graphql.org/conf/2024/schedule/af55205b1d68ec3b3d1b1663e4bd2adf',
      },
      {
        title: "GraphQL Subscriptions in Production Is Easy, Isn't It?",
        speakers: ['Laurin Quast'],
        type: 'talk',
        href: 'https://graphql.org/conf/2024/schedule/5cabf2af855ce1e45161cd36903d41c0',
      },
      {
        title: 'Unlocking Blockchain Data with GraphQL',
        speakers: ['Saihajpreet Singh'],
        type: 'talk',
        href: 'https://graphql.org/conf/2024/schedule/66a12b5aa41f22c3a7f80a9838488826',
      },
      {
        title: 'The Composite Schemas Working Group',
        speakers: ['Kamil Kisiela', 'Danielle Man', 'Martijn Walraven', 'Pascal Senn'],
        type: 'panel',
        href: 'https://graphql.org/conf/2024/schedule/75386a4288d49dcb4aba5b54e475de43',
      },
      {
        title: 'Scaling and Securing API Development with a GraphQL Platform',
        speakers: ['Laurin Quast', 'Kamil Kisiela'],
        type: 'workshop',
        href: 'https://graphql.org/conf/2024/schedule/2f44e6cde4172d716d83bcb02809517f',
      },
      {
        title: 'Efficient Cross-Platform GraphQL and State Management with React Native',
        speakers: ['Yassin Eldeeb'],
        type: 'workshop',
        href: 'https://graphql.org/conf/2024/schedule/914fd37e2c0bd49ce423fb1cbc326ec8',
      },
    ],
  },
  {
    year: 2023,
    dates: 'September 19–21, 2023',
    city: 'San Francisco, California',
    role: 'Diamond sponsor and workshop day sponsor',
    scheduleHref: 'https://graphql.org/conf/2023/sessions/',
    recapHref: 'https://the-guild.dev/graphql/hive/blog/graphqlconf-2023-recap',
    sessions: [
      {
        title: 'Open Federation: Open Remote Schema Specifications with Other Specs',
        speakers: ['Uri Goldshtein'],
        type: 'keynote',
        href: 'https://graphql.org/conf/2023/sessions/e29bf518adeb99b2319fa8cb70d8f445/',
      },
      {
        title:
          'GraphQL Everywhere: How GraphQL is Being Used in Places You Never Thought Were Possible',
        speakers: ['Uri Goldshtein'],
        type: 'keynote',
        href: 'https://graphql.org/conf/2023/sessions/b9e35d673e7b541421d45ce2043dc05e/',
      },
      {
        title: "Navigating the Future: GraphQL's Expansion, AI Adoption, and Modern Languages",
        speakers: ['Uri Goldshtein', 'Benjie Gillam', 'and others'],
        type: 'panel',
        href: 'https://graphql.org/conf/2023/sessions/f485ec8e2dc60c435e8a3a90185d73bf/',
      },
      {
        title: 'The Graph of Everything: Federated Architecture for Any API Service',
        speakers: ['Uri Goldshtein'],
        type: 'talk',
        href: 'https://graphql.org/conf/2023/sessions/7a87fe1cfc351a993ed40e01d384e3c6/',
      },
      {
        title: 'How to Choose a GraphQL Gateway?',
        speakers: ['Dotan Simha'],
        type: 'talk',
        href: 'https://graphql.org/conf/2023/sessions/70f9e59dc60cf417aa38eb890b2a8abe/',
      },
      {
        title: 'GraphQL Over Internet',
        speakers: ['Denis Badurina'],
        type: 'talk',
        href: 'https://graphql.org/conf/2023/sessions/6c2eefe955e288e974a9182dac06f8fa/',
      },
      {
        title: 'The New GraphiQL and the Future of Open GraphQL IDEs',
        speakers: ['Dimitri Postolov', 'Thomas Heyenbrock'],
        type: 'talk',
        href: 'https://graphql.org/conf/2023/sessions/e0985f6bdb4bbf07a5ca5ba72fbcc39c/',
      },
      {
        title: 'AI, GraphQL, and the Rise of Malleable Applications',
        speakers: ['Aleksandra Sikora'],
        type: 'talk',
        href: 'https://graphql.org/conf/2023/sessions/4feef977ceb883c69c91ccd2dd607aec/',
      },
      {
        title: 'Safely Evolve Your (Federated) GraphQL Schema with GraphQL Hive',
        speakers: ['Laurin Quast', 'Kamil Kisiela'],
        type: 'workshop',
        href: 'https://graphql.org/conf/2023/sessions/55dd5ef56bd778955509d08ea81903ea/',
      },
      {
        title: 'GraphQL Mesh: A Federated Gateway for Any API Protocol',
        speakers: ['Arda Tanrıkulu', 'Gil Gardosh'],
        type: 'workshop',
        href: 'https://graphql.org/conf/2023/sessions/de9b490bff0d1e234ec4e19bc03392b5/',
      },
      {
        title: 'The Evolution of GraphQL Code Generation',
        speakers: ['Laurin Quast'],
        type: 'lightning',
        href: 'https://graphql.org/conf/2023/sessions/675c416b16ad2b0c519b1ec894353fc5/',
      },
      {
        title: "Shared Schema Policies and Automatic Standards Across Your Company's Teams",
        speakers: ['Dimitri Postolov'],
        type: 'lightning',
        href: 'https://graphql.org/conf/2023/sessions/ff6a2ae37d87e74c9f7739a1331804a1/',
      },
    ],
  },
];

/** The most recent edition, for the header card. */
export const latestConference = conferences[0]!;

export const sessionCount = conferences.reduce((n, conf) => n + conf.sessions.length, 0);
