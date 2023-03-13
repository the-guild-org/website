import { MANAGE_SEO_TITLES } from './config';

export class HtmlTitleHandler implements HTMLRewriterElementContentHandlers {
  constructor(private url: string) {}

  text(element: Text) {
    // 1. Search if need to handle title change based on URL
    const title = MANAGE_SEO_TITLES.find(config => config.URL === this.url);
    console.log('title --->', title);
    // 2. The text of the element (title tag)
    const text = element.text;
    console.log('text --->', text);

    if (title) {
      // 3. Change the text of the element (title tag)
      element.replace(title.titleTagContent);
    }
  }
}
