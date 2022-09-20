export const FAVICON_FILES = [
  'site.webmanifest',
  'favicon.ico',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'apple-touch-icon.png',
  'apple-touch-icon-precomposed.png',
  'apple-touch-icon-120x120-precomposed.png',
  'apple-touch-icon-120x120.png',
  'apple-touch-icon-152x152-precomposed.png',
  'apple-touch-icon-152x152.png',
];

export class FaviconHandler implements HTMLRewriterElementContentHandlers {
  element(element: Element) {
    element.append(`<meta name="msapplication-config" content="none" />`, { html: true });
    element.append(`<link rel="manifest" href="/site.webmanifest" />`, { html: true });
    element.append(`<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`, { html: true });
    element.append(`<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />`, { html: true });
    element.append(`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`, { html: true });
    element.append(`<link rel="shorcut icon" type="image/x-icon" href="/favicon.ico">`, { html: true });
  }
}
