import { MANAGE_TITLES } from './config';

export interface HTMLTitleConfig {
  titleTagContent: string;
  URL: URL;
}

export function shouldHandleNewTitleChange(url: URL) {
  if (MANAGE_TITLES.some(v => url.pathname === v.URL.pathname)) {
    return true;
  }

  return false;
}

export class TitleHandler implements HTMLRewriterElementContentHandlers {
  constructor(private titleObjects: HTMLTitleConfig[]) {}

  element(element: Element) {
    const titleObject = this.titleObjects.find(v => v.URL.pathname === element.baseURI);

    if (titleObject) {
      element.append(
        `<title>
          ${titleObject.titleTagContent}
        </title>`,
        { html: true },
      );
    }
  }
}
