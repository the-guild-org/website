import Toucan from 'toucan-js';
import PackageJSON from '../package.json';

export function createSentry(event: FetchEvent, dsn: string, release: string) {
  return new Toucan({
    dsn,
    context: event,
    environment: 'production',
    release,
    pkg: PackageJSON,
    attachStacktrace: true,
    allowedHeaders: [
      'content-type',
      'content-length',
      'accept',
      'accept-language',
      'accept-encoding',
      'user-agent',
      'referer',
      'host',
      'cf-connecting-ip',
      'cf-ray',
      'cf-device-type',
      'x-forwarded-for',
      'x-forwarded-proto',
    ],
  });
}
