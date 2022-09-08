import { redirect } from '../routing';

export function shouldHandleFeed(url: URL) {
  return ['/feed', '/feeds', '/feed/', '/feeds/', '/rss', '/rss/', '/rss.xml'].some(v => url.pathname.endsWith(v));
}

export function handleFeed(publicDomain: string) {
  return redirect(`https://${publicDomain}/feed.xml`);
}
