export class BannerHandler implements HTMLRewriterElementContentHandlers {
  constructor(private bannerHtml: string | undefined) {}

  element(element: Element) {
    if (!this.bannerHtml) {
      return;
    }

    element.prepend(this.bannerHtml, {
      html: true,
    });
  }
}
