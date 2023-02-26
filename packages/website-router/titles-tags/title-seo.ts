export interface HTMLTitleConfig {
  titleTagContent: string;
  URL: URL;
}

export class TitleHandler implements HTMLRewriterElementContentHandlers {
  constructor(private titleObjects: HTMLTitleConfig[]) {}

  element(element: Element) {
    if (element.tagName === 'title') {
      const currentURL = new URL(window.location.href).pathname;
      const titleObject = this.titleObjects.find(obj => obj.URL === currentURL);

      if (titleObject) {
        element.setInnerContent(titleObject.titleTagContent);
      }
    }
  }
}
