const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

// The widget's site key is only valid on these hostnames; a token solved
// anywhere else (a scraper replaying the site key on its own page) is refused.
const ALLOWED_HOSTNAMES = new Set(['the-guild.dev', 'www.the-guild.dev']);

type SiteverifyResult = {
  success: boolean;
  hostname?: string;
  'error-codes'?: string[];
};

/**
 * Checks a Turnstile token with Cloudflare. The widget on the page only proves
 * something to Cloudflare; without this server-side check a bot can skip the
 * page and POST to the API directly, which is what the old Next.js form allowed.
 * Tokens are single-use and expire after 300 seconds.
 */
export async function verifyTurnstileToken(options: {
  secret: string;
  token: string;
  remoteIp: string | null;
}): Promise<boolean> {
  const form = new FormData();
  form.append('secret', options.secret);
  form.append('response', options.token);
  if (options.remoteIp) {
    form.append('remoteip', options.remoteIp);
  }

  const response = await fetch(SITEVERIFY_URL, { method: 'POST', body: form });
  if (!response.ok) {
    throw new Error(`Turnstile siteverify returned HTTP ${response.status}`);
  }

  const result = (await response.json()) as SiteverifyResult;
  return result.success && !!result.hostname && ALLOWED_HOSTNAMES.has(result.hostname);
}
