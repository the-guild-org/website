export class GoogleAnalyticsHandler implements HTMLRewriterElementContentHandlers {
  constructor(private gaTrackingId: string) {}

  element(element: Element) {
    if (this.gaTrackingId) {
      element.append(
        `
        <script async src="https://www.googletagmanager.com/gtag/js?id=${this.gaTrackingId}"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${this.gaTrackingId}');
        </script>`,
        { html: true },
      );
    }
  }
}
