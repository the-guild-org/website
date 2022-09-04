/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as cloudflare from '@pulumi/cloudflare';
import { buildSync } from 'esbuild';

const buildResult = buildSync({
  entryPoints: ['worker.ts'],
  bundle: true,
  platform: 'browser',
  target: 'chrome95',
  minify: false,
  write: false,
  sourcemap: 'inline',
});

const workerCode = buildResult.outputFiles[0].text;

const myScript = new cloudflare.WorkerScript('routingWorker', {
  name: 'guild-website-routing',
  content: workerCode,
  plainTextBindings: [
    {
      name: 'RELEASE',
      text: process.env.RELEASE! || process.env.GITHUB_SHA! || 'local',
    },
  ],
  secretTextBindings: [
    {
      name: 'SENTRY_DSN',
      text: process.env.SENTRY_DSN!,
    },
  ],
});

new cloudflare.WorkerRoute('capture-route', {
  scriptName: myScript.name,
  zoneId: process.env.CLOUDFLARE_ZONEID!,
  pattern: `*.the-guild.dev/*`,
});
