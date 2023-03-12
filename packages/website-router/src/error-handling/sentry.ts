import { Toucan } from 'toucan-js';
import { Env } from '../env';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createSentry(request: Request, context: EventContext<Env, any, any>, dsn: string) {
  return new Toucan({
    dsn,
    request,
    enabled: !!dsn,
    context,
    environment: 'production',
    attachStacktrace: true,
    requestDataOptions: {
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
    },
  });
}
