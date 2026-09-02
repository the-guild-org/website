/**
 * Grafts the built Hive site (hive/packages/documentation-astro/dist, built
 * with ASTRO_BASE_PATH=/graphql/hive) into this site's dist so the whole of
 * the-guild.dev deploys as a single Cloudflare Pages project.
 *
 * The Hive build emits _redirects and _headers written for its previous
 * standalone Workers deployment, where the router stripped the /graphql/hive
 * prefix before proxying. In the merged deployment nothing strips the prefix,
 * so their rules are rewritten onto /graphql/hive/... and installed at the
 * dist root (Pages only reads root-level _redirects/_headers).
 */
import { cpSync, existsSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const PREFIX = '/graphql/hive';
const websiteDist = fileURLToPath(new URL('../dist', import.meta.url));
const hiveDist = fileURLToPath(
  new URL('../../hive/packages/documentation-astro/dist', import.meta.url),
);

if (!existsSync(hiveDist)) {
  throw new Error(`Hive dist not found at ${hiveDist} - run the hive build first`);
}

const target = `${websiteDist}${PREFIX}`;
rmSync(target, { recursive: true, force: true });
cpSync(hiveDist, target, { recursive: true });

function prefixPath(path) {
  if (!path.startsWith('/') || path.startsWith(PREFIX)) return path;
  return `${PREFIX}${path}`;
}

// _redirects: "SOURCE DESTINATION [STATUS]" per line
const redirectsFile = `${target}/_redirects`;
if (existsSync(redirectsFile)) {
  const rewritten = readFileSync(redirectsFile, 'utf8')
    .split('\n')
    .map(line => {
      if (!line.trim() || line.startsWith('#')) return line;
      const parts = line.trim().split(/\s+/);
      parts[0] = prefixPath(parts[0]);
      // Relative destinations move with the site; absolute URLs stay as-is.
      if (parts[1]?.startsWith('/')) parts[1] = prefixPath(parts[1]);
      return parts.join(' ');
    })
    .join('\n');
  writeFileSync(`${websiteDist}/_redirects`, rewritten);
  rmSync(redirectsFile);
}

// _headers: path patterns on unindented lines, header lines indented
const headersFile = `${target}/_headers`;
if (existsSync(headersFile)) {
  const rewritten = readFileSync(headersFile, 'utf8')
    .split('\n')
    .map(line => {
      if (line.startsWith('/')) return prefixPath(line);
      return line;
    })
    .join('\n');
  writeFileSync(`${websiteDist}/_headers`, rewritten);
  rmSync(headersFile);
}

// Pages serves the root 404.html for the whole deployment.
rmSync(`${target}/404.html`, { force: true });

// The Hive build's root page is index.html (Astro keeps the site root as
// index.html even with file-format output). Left at graphql/hive/index.html,
// Pages would 308 /graphql/hive to /graphql/hive/ while the router strips
// trailing slashes - an infinite loop. Hoist it to graphql/hive.html so the
// slashless URL is served directly, like every other page.
renameSync(`${target}/index.html`, `${websiteDist}${PREFIX}.html`);

console.log(`Merged Hive site into ${target}`);
