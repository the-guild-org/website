import { MANAGE_SEO_TITLES } from './config';

export class HtmlTitleHandler implements HTMLRewriterElementContentHandlers {
  constructor(private url: string) {}

  element(element: Element) {
    console.log('url', this.url);

    const title = MANAGE_SEO_TITLES.find(v => v.URL === this.url);

    if (title) {
      console.log('title', title.URL);
      const titleTag = element.tagName === 'title';
      console.log('titleTag', titleTag);
      // 1. chack if the title already exist
      // 2. if not, add it
      // 3. if yes, replace it
      // 4. if yes, but it's the same, do nothing
      if (titleTag) {
        element.setAttribute('title', title.titleTagContent);
      } else {
        element.append(title.titleTagContent, { html: true });
      }
    }

    console.log('title', title);
  }
}
