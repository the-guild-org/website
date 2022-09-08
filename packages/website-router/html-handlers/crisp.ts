import type { RewriteRecord } from '../config';

export class CrispHandler implements HTMLRewriterElementContentHandlers {
  constructor(private crispWebsiteId: string, private websiteRecord: RewriteRecord) {}

  element(element: Element) {
    if (this.crispWebsiteId) {
      element.append(
        `<script>
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = '${this.crispWebsiteId}';
          (function () {
            d = document;
            s = d.createElement('script');
            s.src = 'https://client.crisp.chat/l.js';
            s.async = 1;
            d.getElementsByTagName('head')[0].appendChild(s);
          })();
          ${
            this.websiteRecord.crispSegments && this.websiteRecord.crispSegments.length > 0
              ? `
            window.$crisp.push([
              'set',
              'session:segments',
              [${JSON.stringify(this.websiteRecord.crispSegments)}],
            ]);
            `
              : ''
          }
        </script>`,
        { html: true }
      );
    }
  }
}
