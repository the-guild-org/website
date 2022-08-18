import { readFileSync } from 'node:fs';
import * as cloudflare from '@pulumi/cloudflare';

// Change if you wish to invalidate/drop all caches
const PAGES_CACHE_ID = 41;

const mappings = {
  '/graphql/codegen': {
    rewrite: 'graphql-code-generator.pages.dev',
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
};

const myScript = new cloudflare.WorkerScript('routingWorker', {
  name: 'guild-website-routing',
  content: readFileSync('worker.js', 'utf-8'),
  plainTextBindings: [
    {
      name: 'MAPPINGS',
      text: JSON.stringify(mappings),
    },
    {
      name: 'CACHE_ID',
      text: `test-website-v${PAGES_CACHE_ID}`,
    },
    {
      name: 'SLACK_CHANNEL_ID',
      text: process.env.SLACK_CHANNEL_ID!,
    },
  ],
  secretTextBindings: [
    {
      name: 'SLACK_TOKEN',
      text: process.env.SLACK_TOKEN!,
    },
  ],
});

for (const captureRoute of Object.keys(mappings)) {
  new cloudflare.WorkerRoute(`r${captureRoute.replace(/\//g, '-')}`, {
    scriptName: myScript.name,
    zoneId: process.env.CLOUDFLARE_ZONEID!,
    pattern: `*.the-guild.dev${captureRoute}*`,
  });
}
