/**
 * Appends the codegen redirects to dist/_redirects (the hive generator runs
 * first and owns the file). Sources: the legacy map ported from
 * next.config.js, the parameterized legacy routes expanded concretely from
 * the plugin registry, and the /plugins/<name> → /plugins/<category>/<name>
 * category moves.
 */
import { appendFileSync, readFileSync } from 'node:fs';
import { basePath } from '../../src/codegen/lib/base-path.ts';
import { codegenRedirects } from '../../src/codegen/redirects.ts';
import { DIST } from '../lib/build-output.ts';

const registry = JSON.parse(
  readFileSync(
    new URL('../../src/codegen/generated/plugins-registry.json', import.meta.url),
    'utf8',
  ),
) as Record<string, { category: string }>;

const rules = new Map<string, string>();
const add = (source: string, destination: string) => {
  if (source !== destination && !rules.has(source)) rules.set(source, destination);
};

for (const [source, destination] of Object.entries(codegenRedirects)) {
  add(source, destination);
}

for (const [key, { category }] of Object.entries(registry)) {
  // Old flat plugin URLs moved into category folders.
  add(`/plugins/${key}`, `/plugins/${category}/${key}`);
  // Pre-marketplace config/plugin doc routes.
  add(`/docs/generated-config/${key}`, `/plugins/${key}`);
  add(`/docs/plugins/${key}`, `/plugins/${key}`);
  if (key.endsWith('-preset')) {
    add(`/docs/presets/${key.slice(0, -'-preset'.length)}`, `/plugins/${key}`);
  }
}

const lines = [...rules]
  .map(([source, destination]) => {
    const target = destination.startsWith('/') ? `${basePath}${destination}` : destination;
    return `${basePath}${source} ${target} 301`;
  })
  .join('\n');

appendFileSync(`${DIST}/_redirects`, `\n# GraphQL Codegen legacy routes\n${lines}\n`);
console.log(`Appended ${rules.size} codegen redirects`);
