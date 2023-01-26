export type RewriteRecord = { rewrite: string; crispSegments?: string[]; sitemap?: boolean };
export type RedirectRecord = { redirect: string; status?: number };
export type WebsiteRecord = RewriteRecord | RedirectRecord;

export const jsonConfig = {
  // Change if you wish to invalidate/drop all caches for all websites
  cacheStorageId: 58,
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
      rewrite: 'sofa.pages.dev',
      crispSegments: ['sofa'],
      sitemap: true,
    },
    '/graphql/modules': {
      rewrite: 'graphql-modules.pages.dev',
      crispSegments: ['modules'],
      sitemap: true,
    },
    '/graphql/tools': {
      rewrite: 'graphql-tools.pages.dev',
      crispSegments: ['tools'],
      sitemap: true,
    },
    '/graphql/envelop': {
      rewrite: 'envelop.pages.dev',
      crispSegments: ['envelop'],
      sitemap: true,
    },
    '/graphql/shield': {
      rewrite: 'graphql-shield.pages.dev',
      crispSegments: ['shield'],
      sitemap: true,
    },
    '/graphql/apollo-angular': {
      rewrite: 'apollo-angular.pages.dev',
      crispSegments: ['apollo-angular'],
      sitemap: true,
    },
    '/graphql/hive': {
      rewrite: 'hive-landing-page.pages.dev',
      crispSegments: ['hive-website'],
      sitemap: true,
    },
    '/graphql/gateway': {
      rewrite: 'conductor.pages.dev',
      crispSegments: ['conductor'],
      sitemap: true,
    },
    '/graphql/eslint': {
      rewrite: 'graphql-eslint.pages.dev',
      crispSegments: ['graphql-eslint'],
      sitemap: true,
    },
    '/graphql/stitching': {
      rewrite: 'schema-stitching.pages.dev',
      crispSegments: ['stitching'],
      sitemap: true,
    },
    // Redirects
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
