import type { APIRoute } from 'astro';

// Preview deploys ship the exact same build as prod (see astro.config.mjs's
// SITE_ORIGIN), so a static robots.txt can't tell them apart. SITE_URL is
// only set for preview builds (see .github/workflows/ci.yaml) — disallow
// everything there instead of inviting crawlers onto in-review content.
export const GET: APIRoute = ({ site }) => {
  if (process.env.SITE_URL) {
    return new Response(
      `User-agent: *
Disallow: /
`,
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

  return new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL('/sitemap.xml', site).href}
`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
};
