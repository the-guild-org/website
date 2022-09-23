export type RewriteRecord = { rewrite: string; crispSegments?: string[]; sitemap?: boolean };
export type RedirectRecord = { redirect: string; status?: number };
export type WebsiteRecord = RewriteRecord | RedirectRecord;

export const jsonConfig = {
  // Change if you wish to invalidate/drop all caches for all websites
  cacheStorageId: 57,
  publicDomain: 'the-guild.dev',
  clientToWorkerMaxAge: 60,
  cfFetchCacheTtl: 60,
  gaTrackingId: 'G-VN2KZS6FK4',
  crispWebsiteId: 'af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
  fallbackRoute: <RewriteRecord>{
    rewrite: 'guild-dev-website.pages.dev',
    crispSegments: ['guild-website'],
  },
  mappings: <Record<string, WebsiteRecord>>{
    // Rewrites
    '/graphql/codegen': {
      rewrite: 'graphql-code-generator.pages.dev',
      crispSegments: ['codegen'],
      sitemap: true,
    },
    '/graphql/yoga-server': {
      rewrite: `graphql-yoga.pages.dev`,
      crispSegments: ['yoga'],
      sitemap: true,
    },
    '/graphql/scalars': {
      rewrite: 'graphql-scalars.pages.dev',
      crispSegments: ['scalars'],
      sitemap: true,
    },
    '/graphql/inspector': {
      rewrite: 'graphql-inspector.pages.dev',
      crispSegments: ['inspector'],
      sitemap: true,
    },
    '/graphql/mesh': {
      rewrite: 'graphql-mesh.pages.dev',
      crispSegments: ['mesh'],
      sitemap: true,
    },
    '/graphql/config': {
      rewrite: 'graphql-config.pages.dev',
      crispSegments: ['config'],
      sitemap: true,
    },
    '/graphql/sofa-api': {
      rewrite: 'sofa-api.pages.dev',
      crispSegments: ['sofa'],
      sitemap: true,
    },
    // TODO: Replace with rewrite when this is ready
    '/graphql/envelop': {
      redirect: 'https://envelop.dev',
      status: 302,
      // rewrite: 'envelop.dev',
      // crispSegments: ['envelop'],
    },
    '/graphql/modules': {
      redirect: 'https://graphql-modules.com',
      status: 302,
      // rewrite: 'graphql-modules.com',
      // crispSegments: ['modules'],
    },
    '/graphql/tools': {
      redirect: 'https://graphql-tools.com',
      status: 302,
      // rewrite: 'graphql-tools.com',
      // crispSegments: ['tools'],
    },
    '/graphql/apollo-angular': {
      redirect: 'https://apollo-angular.com',
      status: 302,
      // rewrite: 'apollo-angular.com',
      // crispSegments: ['apollo-angular'],
    },
    // Redirects
    '/graphql/hive': {
      redirect: 'https://graphql-hive.com',
    },
    '/graphql/eslint': {
      redirect: 'https://github.com/B2o5T/graphql-eslint',
      status: 302,
    },
    '/bob': {
      redirect: 'https://github.com/kamilkisiela/bob',
      status: 302,
    },
    '/chat': {
      redirect: 'https://go.crisp.chat/chat/embed/?website_id=af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
      status: 302,
    },
    '/newsletter': {
      redirect: 'https://www.getrevue.co/profile/TheGuild',
      status: 302,
    },
    '/twitter': {
      redirect: 'https://twitter.com/TheGuildDev',
      status: 302,
    },
    '/discord': {
      redirect: 'https://discord.com/invite/xud7bH9',
      status: 302,
    },
    '/youtube': {
      redirect: 'https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd',
      status: 302,
    },
    '/linkedin': {
      redirect: 'https://linkedin.com/company/the-guild-software',
      status: 302,
    },
  },
};

export type InjectedJsonConfig = typeof jsonConfig;
