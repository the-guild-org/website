export class SitemapTransformer implements HTMLRewriterElementContentHandlers {
  constructor(private additionalUrls: string[]) {}

  element(element: Element) {
    element.append(
      this.additionalUrls
        // Hive has its own sitemap.xml and according to Google, it's better to separate it
        .filter(url => !url.includes('/hive/'))
        .map(url => `<sitemap><loc>${url}</loc></sitemap>`)
        .join('\n'),
      { html: true },
    );
  }
}
