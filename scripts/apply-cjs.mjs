import { readFileSync, writeFileSync } from 'node:fs';
import { URL } from 'node:url';
import { join } from 'node:path';

const __dirname = new URL('.', import.meta.url).pathname;

const packages = [
  'algoliasearch',
  '@bugsnag/js',
  '@slack/web-api',
  'link-preview-node',
  'html-entities',
];

function makeCJS(name) {
  const filepath = join(__dirname, '..', 'node_modules', name, 'package.json');

  const pkg = JSON.parse(readFileSync(filepath, 'utf8'));

  pkg.type = 'commonjs';

  writeFileSync(filepath, JSON.stringify(pkg, null, 2), 'utf8');
}

for (const name of packages) {
  makeCJS(name);
}
