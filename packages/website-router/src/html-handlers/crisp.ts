import type { RewriteRecord } from '../config';

/**
 * Crisp chat. Loaded on every opted-in page once the browser is idle, so the
 * chat bubble is visible everywhere; the `$crisp` command queue works before
 * the script arrives, which is what the site's "Contact us" links rely on.
 */
export class CrispHandler implements HTMLRewriterElementContentHandlers {
  constructor(
    private crispWebsiteId: string,
    private websiteRecord: RewriteRecord,
  ) {}

  element(element: Element) {
    if (!this.crispWebsiteId || !this.websiteRecord.crisp) return;
    element.append(crispSnippet(this.crispWebsiteId, this.websiteRecord.crisp.segments), {
      html: true,
    });
  }
}

/** The inline script; exported so the tests can run it against a fake window. */
export function crispSnippet(websiteId: string, segments: string[]): string {
  return `<script>
  window.$crisp = [];
  window.CRISP_WEBSITE_ID = ${JSON.stringify(websiteId)};
  ${segments.length > 0 ? `window.$crisp.push(['set', 'session:segments', [${JSON.stringify(segments)}]]);` : ''}
  // Chat is not critical-path: load it when the browser is idle.
  (function () {
    var load = function () {
      var s = document.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      document.head.appendChild(s);
    };
    if ('requestIdleCallback' in window) {
      requestIdleCallback(load, { timeout: 5000 });
    } else {
      setTimeout(load, 3000);
    }
  })();
</script>`;
}
