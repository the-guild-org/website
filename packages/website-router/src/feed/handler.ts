import { Toucan } from 'toucan-js';
import { redirect } from '../routing';

export function shouldHandleFeed(url: URL) {
  // Trailing slashes are stripped before this predicate runs.
  return ['/feed', '/feeds', '/rss', '/rss.xml'].some(v => url.pathname.endsWith(v));
}

export function handleFeed(sentry: Toucan, from: string, publicDomain: string) {
  return redirect(sentry, from, `https://${publicDomain}/feed.xml`);
}
