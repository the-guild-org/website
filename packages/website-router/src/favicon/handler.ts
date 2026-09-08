import type { RewriteRecord } from '../config';
import { FAVICON_FILES } from './transformer';

export function shouldHandleFavicon(url: URL) {
  // Anchor on a path segment so /foo-favicon.ico does not match.
  if (FAVICON_FILES.some(v => url.pathname.endsWith(`/${v}`))) {
    return true;
  }

  return false;
}

export function handleFavicon(url: URL, rootRoute: RewriteRecord) {
  return fetch(`https://${rootRoute.rewrite}${url.pathname}`);
}
