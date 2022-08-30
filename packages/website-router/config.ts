export const jsonConfig = {
  // Change if you wish to invalidate/drop all caches for all websites
  cacheStorageId: 43,
  clientToWorkerMaxAge: 60,
  cfFetchCacheTtl: 60,
  gaTrackingId: 'G-VN2KZS6FK4',
  slackChannelId: 'CLZ5BCE7K',
  crispWebsiteId: 'af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
  // errors: {
  //   404: {
  //     report: true,
  //     channelId: 'CLZ5BCE7K',
  //     use: 'graphql-code-generator.pages.dev'
  //   },
  // },
  fallbackRoute: {
    rewrite: 'guild-dev-website.pages.dev',
    crispSegments: ['guild-website'],
  },
  mappings: {
    // Rewrites
    '/graphql/codegen': {
      rewrite: 'graphql-code-generator.pages.dev',
      crispSegments: ['codegen'],
    },
    // '/graphql/yoga-server': {
    //   rewrite: 'graphql-yoga.com',
    //   crispSegments: ['yoga'],
    // },
    // '/graphql/config': {
    //   rewrite: 'graphql-config.com',
    //   crispSegments: ['config'],
    // },
    // '/graphql/envelop': {
    //   rewrite: 'envelop.dev',
    //   crispSegments: ['envelop'],
    // },
    // '/graphql/mesh': {
    //   rewrite: 'graphql-mesh.com',
    //   crispSegments: ['mesh'],
    // },
    // '/graphql/modules': {
    //   rewrite: 'graphql-modules.com',
    //   crispSegments: ['modules'],
    // },
    // '/graphql/scalars': {
    //   rewrite: 'graphql-scalars.dev',
    //   crispSegments: ['scalars'],
    // },
    // '/graphql/sofa-api': {
    //   rewrite: 'sofa-api.com',
    //   crispSegments: ['sofa'],
    // },
    // '/graphql/inspector': {
    //   rewrite: 'graphql-inspector.com',
    //   crispSegments: ['inspector'],
    // },
    // '/graphql/tools': {
    //   rewrite: 'graphql-tools.com',
    //   crispSegments: ['tools'],
    // },
    // '/graphql/apollo-angular': {
    //   rewrite: 'apollo-angular.com',
    //   crispSegments: ['apollo-angular'],
    // },
    // Redirects
    '/graphql/hive': {
      redirect: 'https://graphql-hive.com',
    },
    '/graphql/eslint': {
      redirect: 'https://github.com/B2o5T/graphql-eslint',
    },
    '/bob': {
      redirect: 'https://github.com/kamilkisiela/bob',
    },
    '/chat': {
      redirect: 'https://go.crisp.chat/chat/embed/?website_id=af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
    },
  },
};

export type InjectedJsonConfig = typeof jsonConfig;
