export function buildResponseCorsHeaders(headers: Headers) {
  const accessControlRequestHeaders = headers.get('Access-Control-Request-Headers');
  const origin = headers.get('Origin');
  const parsedOrigin = new URL(origin || '');
  const headersResponse: Record<string, string> = {};

  if (parsedOrigin.hostname === 'the-guild.dev' || parsedOrigin.hostname === 'www.the-guild.dev') {
    headersResponse['Access-Control-Allow-Origin'] = origin || '*';
  }

  headersResponse['Access-Control-Allow-Methods'] = 'GET,HEAD,POST,OPTIONS';
  headersResponse['Access-Control-Allow-Headers'] = accessControlRequestHeaders || '';
  headersResponse['Access-Control-Max-Age'] = '86400';

  return headersResponse;
}
