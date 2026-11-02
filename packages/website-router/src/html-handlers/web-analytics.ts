/**
 * Cloudflare Web Analytics: a cookieless beacon that reports page views and
 * real-user Core Web Vitals without identifying visitors, so it needs no
 * consent banner. The site token comes from the Worker's
 * `CF_WEB_ANALYTICS_TOKEN` variable (Cloudflare dashboard → Web Analytics →
 * the-guild.dev → JS snippet); when it is unset nothing is injected.
 */
export class WebAnalyticsHandler implements HTMLRewriterElementContentHandlers {
  constructor(private token: string | undefined) {}

  element(element: Element) {
    if (!this.token) return;
    const beacon = JSON.stringify({ token: this.token });
    element.append(
      `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='${beacon}'></script>`,
      { html: true },
    );
  }
}
