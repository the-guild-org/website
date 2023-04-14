import { Toucan } from 'toucan-js';
import { redirect } from '../routing';

export function shouldHandleFeed(url: URL) {
  return ['/feed', '/feeds', '/feed/', '/feeds/', '/rss', '/rss/', '/rss.xml'].some(v =>
    url.pathname.endsWith(v),
  );
}

export function handleFeed(sentry: Toucan, from: string, publicDomain: string) {
  return redirect(sentry, from, `https://${publicDomain}/feed.xml`);
}
