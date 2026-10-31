import type { RewriteRecord } from '../config';

/**
 * Crisp chat, loaded on demand. The page gets only the `$crisp` command
 * queue; the widget script (and the cookies it keeps for the conversation)
 * is fetched the first time something asks the chat to act, which is what
 * the site's "Contact us" links do with `$crisp.push(['do', 'chat:open'])`.
 * Until then no Crisp code runs and nothing is stored in the browser.
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
  (function () {
    var queue = [];
    ${segments.length > 0 ? `queue.push(['set', 'session:segments', [${JSON.stringify(segments)}]]);` : ''}
    var loaded = false;
    var load = function () {
      if (loaded) return;
      loaded = true;
      var s = document.createElement('script');
      s.src = 'https://client.crisp.chat/l.js';
      s.async = true;
      document.head.appendChild(s);
    };
    // Crisp reads window.$crisp as a plain array once l.js runs; until then
    // a 'do' command (open the chat, send a message…) is what fetches it.
    queue.push = function () {
      var result = Array.prototype.push.apply(this, arguments);
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] && arguments[i][0] === 'do') load();
      }
      return result;
    };
    window.$crisp = queue;
    window.CRISP_WEBSITE_ID = ${JSON.stringify(websiteId)};
  })();
</script>`;
}
