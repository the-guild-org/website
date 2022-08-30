/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { readFileSync } from 'node:fs';
import * as cloudflare from '@pulumi/cloudflare';
import { jsonConfig } from './config';

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

new cloudflare.WorkerRoute('capture-route', {
  scriptName: myScript.name,
  zoneId: process.env.CLOUDFLARE_ZONEID!,
  pattern: `*.the-guild.dev/*`,
});
