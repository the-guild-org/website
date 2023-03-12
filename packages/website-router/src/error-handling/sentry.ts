import { Toucan } from 'toucan-js';

export function createSentry(request: Request, context: any, dsn: string) {
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
