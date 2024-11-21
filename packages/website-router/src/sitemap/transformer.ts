export class SitemapTransformer implements HTMLRewriterElementContentHandlers {
  constructor(private additionalUrls: string[]) {}

  element(element: Element) {
    element.append(
      this.additionalUrls.map(url => `<sitemap><loc>${url}</loc></sitemap>`).join('\n'),
      { html: true },
    );
  }
}
