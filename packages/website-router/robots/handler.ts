import Toucan from 'toucan-js';
import { redirect } from '../routing.js';

export function shouldHandleRobotsTxt(url: URL) {
  return url.pathname !== '/robots.txt' && url.pathname.endsWith('robots.txt');
}

export function handleRobotsTxt(sentry: Toucan, from: string, publicDomain: string) {
  return redirect(sentry, from, `https://${publicDomain}/robots.txt`);
}
