export const jsonConfig = {
  // Change if you wish to invalidate/drop all caches for all websites
  cacheStorageId: 52,
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
      sitemap: true,
    },
    // TODO: Replace with rewrite when this is ready
    '/graphql/yoga-server': {
      redirect: `https://graphql-yoga.com`,
      // rewrite: 'graphql-yoga.com',
      // crispSegments: ['yoga'],
    },
    '/graphql/config': {
      redirect: 'https://graphql-config.com',
      // rewrite: 'graphql-config.com',
      // crispSegments: ['config'],
    },
    '/graphql/envelop': {
      redirect: 'https://envelop.dev',
      // rewrite: 'envelop.dev',
      // crispSegments: ['envelop'],
    },
    '/graphql/mesh': {
      redirect: 'https://graphql-mesh.com',
      // rewrite: 'graphql-mesh.com',
      // crispSegments: ['mesh'],
    },
    '/graphql/modules': {
      redirect: 'https://graphql-modules.com',
      // rewrite: 'graphql-modules.com',
      // crispSegments: ['modules'],
    },
    '/graphql/scalars': {
      redirect: 'https://graphql-scalars.dev',
      // rewrite: 'graphql-scalars.dev',
      // crispSegments: ['scalars'],
    },
    '/graphql/sofa-api': {
      redirect: 'https://sofa-api.com',
      // rewrite: 'sofa-api.com',
      // crispSegments: ['sofa'],
    },
    '/graphql/inspector': {
      redirect: 'https://graphql-inspector.com',
      // rewrite: 'graphql-inspector.com',
      // crispSegments: ['inspector'],
    },
    '/graphql/tools': {
      redirect: 'https://graphql-tools.com',
      // rewrite: 'graphql-tools.com',
      // crispSegments: ['tools'],
    },
    '/graphql/apollo-angular': {
      redirect: 'https://apollo-angular.com',
      // rewrite: 'apollo-angular.com',
      // crispSegments: ['apollo-angular'],
    },
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
