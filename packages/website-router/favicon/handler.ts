import type { RewriteRecord } from '../config';
import { FAVICON_FILES } from './transformer.js';

export function shouldHandleFavicon(url: URL) {
  if (FAVICON_FILES.some(v => url.pathname.endsWith(v))) {
    return true;
  }

  return false;
}

export function handleFavicon(url: URL, rootRoute: RewriteRecord) {
  return fetch(`https://${rootRoute.rewrite}${url.pathname}`);
}
