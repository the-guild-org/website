/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { readFileSync } from 'node:fs';
import * as cloudflare from '@pulumi/cloudflare';

const jsonConfig = {
  // Change if you wish to invalidate/drop all caches for all websites
  cacheStorageId: 43,
  clientToWorkerMaxAge: 60,
  cfFetchCacheTtl: 60,
  gaTrackingId: 'G-VN2KZS6FK4',
  slackChannelId: 'CLZ5BCE7K',
  crispWebsiteId: 'af9adec5-ddfa-4db9-a4a3-25769daf2fc2',
  mappings: {
    '/graphql/codegen': {
      rewrite: 'graphql-code-generator.pages.dev',
      crispSegments: ['codegen'],
    },
    '/graphql/yoga-server': {
      rewrite: 'graphql-yoga.com',
    },
    '/graphql/config': {
      rewrite: 'graphql-config.com',
    },
    '/graphql/envelop': {
      rewrite: 'envelop.dev',
    },
    '/graphql/mesh': {
      rewrite: 'graphql-mesh.com',
    },
    '/graphql/modules': {
      rewrite: 'graphql-modules.com',
    },
    '/graphql/scalars': {
      rewrite: 'graphql-scalars.dev',
    },
    '/graphql/sofa-api': {
      rewrite: 'sofa-api.com',
    },
    '/graphql/hive': {
      rewrite: 'graphql-hive.com',
    },
    '/graphql/inspector': {
      rewrite: 'graphql-inspector.com',
    },
    '/graphql/tools': {
      rewrite: 'graphql-tools.com',
    },
    '/graphql/apollo-angular': {
      rewrite: 'apollo-angular.com',
    },
    '/graphql/eslint': {
      redirect: 'https://github.com/B2o5T/graphql-eslint',
    },
    '/bob': {
      redirect: 'https://github.com/kamilkisiela/bob',
    },
    '/chat': {
      redirect: 'https://go.crisp.chat/chat/embed/?website_id=af9adec5-ddfa-4db9-a4a3-25769daf2fc2'
    }
  },
};

const myScript = new cloudflare.WorkerScript('routingWorker', {
  name: 'guild-website-routing',
  content: readFileSync('worker.js', 'utf-8'),
  plainTextBindings: [
    {
      name: 'JSON_CONFIG',
      text: JSON.stringify(jsonConfig),
    },
  ],
  secretTextBindings: [
    {
      name: 'SLACK_TOKEN',
      text: process.env.SLACK_TOKEN!,
    },
  ],
});

for (const captureRoute of Object.keys(jsonConfig.mappings)) {
  new cloudflare.WorkerRoute(`r${captureRoute.replace(/\//g, '-')}`, {
    scriptName: myScript.name,
    zoneId: process.env.CLOUDFLARE_ZONEID!,
    pattern: `*.the-guild.dev${captureRoute}*`,
  });
}
