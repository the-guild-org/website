import type { RewriteRecord } from '../config';

export class CrispHandler implements HTMLRewriterElementContentHandlers {
  constructor(
    private crispWebsiteId: string,
    private websiteRecord: RewriteRecord,
  ) {}

  element(element: Element) {
    if (this.crispWebsiteId && this.websiteRecord.crisp) {
      element.append(
        `<script>
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = '${this.crispWebsiteId}';
          // Chat is not critical-path: load it when the browser is idle
          // (the $crisp command queue works before the script arrives).
          (function () {
            var load = function () {
              var s = document.createElement('script');
              s.src = 'https://client.crisp.chat/l.js';
              s.async = 1;
              document.getElementsByTagName('head')[0].appendChild(s);
            };
            if ('requestIdleCallback' in window) {
              requestIdleCallback(load, { timeout: 5000 });
            } else {
              setTimeout(load, 3000);
            }
          })();
          ${
            this.websiteRecord.crisp.segments.length > 0
              ? `
            window.$crisp.push([
              'set',
              'session:segments',
              [${JSON.stringify(this.websiteRecord.crisp.segments)}],
            ]);
            `
              : ''
          }
        </script>`,
        { html: true },
      );
    }
  }
}
