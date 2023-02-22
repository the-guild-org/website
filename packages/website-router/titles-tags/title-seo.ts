

export interface TitleConfig {
  titleSEO: string;
  URL: string;
}


export class TitleHandler implements HTMLRewriterElementContentHandlers {
  constructor(private titleObjects: TitleConfig[]) {}

  element(element: Element) {
    if (element.tagName === 'title') {
      const currentURL = new URL(window.location.href).pathname;
      const titleObject = this.titleObjects.find(obj => obj.URL === currentURL);

      if (titleObject) {
        element.setInnerContent(titleObject.titleSEO);
      }
    }
  }
}
