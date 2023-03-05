import { HTMLTitleConfig } from './config';

export class TitleHandler implements HTMLRewriterElementContentHandlers {
  constructor(private titles: HTMLTitleConfig[]) {}

  element(element: Element) {
    const currentURL = new URL(element.baseURI);
    const shouldChangeTitle = this.titles.find(title => title.URL === currentURL);
    if (shouldChangeTitle) {
      const getWebsiteTitleTag =
        element.tagName === 'title' ? element : element.querySelector('title');
      if (getWebsiteTitleTag) {
        getWebsiteTitleTag.replace(shouldChangeTitle.titleTagContent);
      }
    }
  }
}
