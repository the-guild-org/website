/**
 * IndexNow (https://www.indexnow.org) tells Bing, Yandex and the AI search
 * tools built on them which pages changed, instead of waiting for a recrawl.
 * scripts/indexnow.ts submits the changed pages after a production deploy.
 */
import { createHash } from 'node:crypto';

/**
 * Proves ownership of the host: served at /<key>.txt (public/<key>.txt).
 * Public by design, so it lives in the repo.
 */
export const INDEXNOW_KEY = '743c73ee7f6d77ce79bb75ca6f37db12';

/** One POST takes at most 10,000 URLs. */
export const INDEXNOW_BATCH_SIZE = 10_000;

/** Fingerprint per public URL, kept between deploys. */
export type PageManifest = Record<string, string>;

/**
 * Fingerprint of what a reader sees on the page. Markup, scripts, styles and
 * SVG are dropped and only the set of distinct words is hashed, so the things
 * that differ between two builds of the same content (asset hashes, Mermaid
 * coordinates, the Hive Gateway page's shuffled and repeated marquee rows) do
 * not count as a change. Navigation and footer are left out where
 * the page marks its content, so a new menu entry is not a change to every page.
 */
export function pageFingerprint(html: string): string {
  const content =
    html.match(/<main\b[\s\S]*<\/main>/i)?.[0] ??
    html.match(/<article\b[\s\S]*<\/article>/i)?.[0] ??
    html.match(/<body\b[\s\S]*<\/body>/i)?.[0] ??
    html;
  const words = content
    .replace(/<(script|style|svg)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const vocabulary = [...new Set(words)].sort();
  return createHash('sha256').update(vocabulary.join(' ')).digest('hex').slice(0, 16);
}

/** URLs that are new, changed or gone since the previous deploy. */
export function changedUrls(previous: PageManifest, current: PageManifest): string[] {
  const urls = new Set<string>();
  for (const [url, fingerprint] of Object.entries(current)) {
    if (previous[url] !== fingerprint) urls.add(url);
  }
  for (const url of Object.keys(previous)) {
    if (!(url in current)) urls.add(url);
  }
  return [...urls].sort();
}
