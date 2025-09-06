export type RewriteRecord = {
  rewrite: string;
  crisp?: { segments: string[] };
  sitemap?: boolean;
  banner?: string;
};
export type RedirectRecord = { redirect: string; status?: number };
export type WebsiteRecord = RewriteRecord | RedirectRecord;

export const jsonConfig = {
  // Change if you wish to invalidate/drop all caches for all websites
  cacheStorageId: 101,
  publicDomain: 'the-guild.dev',
  koaliaPk: 'pk_fab338b8afd93b93f49fafebf9651287060e',
  clientToWorkerMaxAge: 60,
  cfFetchCacheTtl: 60,
  gaTrackingId: 'G-VN2KZS6FK4',
  crispWebsiteId: 'af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
  defaultBanner: undefined,
  fallbackRoute: {
    rewrite: 'guild-dev-website.pages.dev',
    crisp: {
      segments: ['guild-website'],
    },
  } satisfies RewriteRecord,
  mappings: {
    // Rewrites
    '/graphql/codegen': {
      rewrite: 'graphql-code-generator.pages.dev',
      crisp: {
        segments: ['codegen'],
      },
      sitemap: true,
    },
    '/graphql/yoga-server': {
      rewrite: 'graphql-yoga.pages.dev',
      crisp: { segments: ['yoga'] },
      sitemap: true,
    },
    '/graphql/scalars': {
      rewrite: 'graphql-scalars.pages.dev',
      crisp: { segments: ['scalars'] },
      sitemap: true,
    },
    '/graphql/inspector': {
      rewrite: 'graphql-inspector.pages.dev',
      crisp: { segments: ['inspector'] },
      sitemap: true,
    },
    '/graphql/mesh': {
      rewrite: 'graphql-mesh.pages.dev',
      crisp: { segments: ['mesh'] },
      sitemap: true,
    },
    '/graphql/config': {
      rewrite: 'graphql-config.pages.dev',
      crisp: { segments: ['config'] },
      sitemap: true,
    },
    '/graphql/sofa-api': {
      rewrite: 'sofa.pages.dev',
      crisp: { segments: ['sofa'] },
      sitemap: true,
    },
    '/graphql/modules': {
      rewrite: 'graphql-modules.pages.dev',
      crisp: { segments: ['modules'] },
      sitemap: true,
    },
    '/graphql/tools': {
      rewrite: 'graphql-tools.pages.dev',
      crisp: { segments: ['tools'] },
      sitemap: true,
    },
    '/graphql/envelop': {
      rewrite: 'envelop.pages.dev',
      crisp: { segments: ['envelop'] },
      sitemap: true,
    },
    '/graphql/shield': {
      rewrite: 'graphql-shield.pages.dev',
      crisp: { segments: ['shield'] },
      sitemap: true,
    },
    '/graphql/apollo-angular': {
      rewrite: 'apollo-angular.pages.dev',
      sitemap: true,
    },
    '/graphql/hive/federation-gateway-audit': {
      rewrite: 'federation-gateway-compatibility.pages.dev',
      crisp: { segments: ['hive-website'] },
      sitemap: false,
    },
    '/graphql/hive/federation-gateway-performance': {
      rewrite: 'federation-gateway-benchmark.pages.dev',
      crisp: { segments: ['hive-website'] },
      sitemap: false,
    },
    '/graphql/hive': {
      rewrite: 'hive-landing-page.pages.dev',
      crisp: { segments: ['hive-website'] },
      sitemap: false,
    },
    '/graphql/gateway': {
      redirect: 'https://the-guild.dev/graphql/hive/docs/gateway',
      status: 302,
    },
    '/graphql/eslint': {
      rewrite: 'graphql-eslint.pages.dev',
      crisp: {
        segments: ['graphql-eslint'],
      },
      sitemap: true,
    },
    '/graphql/stitching': {
      rewrite: 'schema-stitching.pages.dev',
      crisp: {
        segments: ['stitching'],
      },
      sitemap: true,
    },
    '/graphql/ws': {
      rewrite: 'graphql-ws.pages.dev',
      crisp: {
        segments: ['ws'],
      },
      sitemap: true,
    },
    '/graphql/sse': {
      rewrite: 'graphql-sse.pages.dev',
      crisp: {
        segments: ['sse'],
      },
      sitemap: true,
    },
    '/openapi/fets': {
      rewrite: 'fets.pages.dev',
      crisp: {
        segments: ['fets'],
      },
      sitemap: true,
    },
    '/heltin': {
      rewrite: 'heltin.pages.dev',
      crisp: {
        segments: ['heltin'],
      },
      sitemap: false, // TODO: change to true when we have docs
    },
    // Redirects
    '/bob': {
      redirect: 'https://github.com/kamilkisiela/bob',
      status: 302,
    },
    '/fets': {
      redirect: 'https://the-guild.dev/openapi/fets',
      status: 302,
    },
    '/chat': {
      redirect: 'https://go.crisp.chat/chat/embed/?website_id=af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
      status: 302,
    },
    '/newsletter': {
      redirect: 'https://newsletter.the-guild.dev',
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
    '/stellate': {
      redirect: 'https://stellate.co?utm_source=theguild&utm_medium=redirect&utm_campaign=router',
      status: 302,
    },
  } satisfies Record<string, WebsiteRecord>,
};

export type InjectedJsonConfig = typeof jsonConfig;
