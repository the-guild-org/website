import { redirect } from '../routing';

export function shouldHandleRobotsTxt(url: URL) {
  return url.pathname !== '/robots.txt' && url.pathname.endsWith('robots.txt');
}

export function handleRobotsTxt(publicDomain: string) {
  return redirect(`https://${publicDomain}/robots.txt`);
}
