/**
 * Downloads the GitHub avatar of every blog author into
 * src/hive/assets/avatars/<github>.png, so the blog serves author pictures
 * from our own origin instead of hot-linking avatars.githubusercontent.com,
 * which ad and tracker blockers drop. Run it after adding an author to
 * src/hive/lib/authors.ts and commit the new file:
 *
 *   pnpm --filter website fetch:avatars
 *
 * It is deliberately not part of fetch-all: the build must not depend on
 * GitHub being reachable.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { authorGithubLogins } from '../../src/hive/lib/authors.ts';

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, '../../src/hive/assets/avatars');
mkdirSync(outDir, { recursive: true });

// 160px covers the largest rendering (40px at 4x) with room to spare.
const SIZE = 160;
let failed = 0;
for (const login of authorGithubLogins()) {
  const url = `https://github.com/${login}.png?size=${SIZE}`;
  const res = await fetch(url, { redirect: 'follow' });
  if (res.status === 404) {
    // A deleted or renamed GitHub account; the page shows the author's initials.
    console.warn(`  – ${login}: no such GitHub user, skipped`);
    continue;
  }
  if (!res.ok) {
    console.error(`  ✗ ${login}: HTTP ${res.status}`);
    failed++;
    continue;
  }
  writeFileSync(join(outDir, `${login}.png`), Buffer.from(await res.arrayBuffer()));
  console.log(`  ✓ ${login}`);
}
if (failed) {
  console.error(`${failed} avatar(s) could not be fetched.`);
  process.exit(1);
}
