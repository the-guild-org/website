export const FAVICON_FILES = [
  'site.webmanifest',
  'favicon.ico',
  'favicon-32x32.png',
  'favicon-16x16.png',
  'apple-touch-icon.png',
  'apple-touch-icon-precomposed.png',
  ...[57, 72, 76, 114, 120, 144, 152, 180].flatMap(size => [
    `apple-touch-icon-${size}x${size}-precomposed.png`,
    `apple-touch-icon-${size}x${size}.png`,
  ]),
];

export class FaviconHandler implements HTMLRewriterElementContentHandlers {
  element(element: Element) {
    element.append('<meta name="msapplication-config" content="none" />', { html: true });
    element.append('<link rel="manifest" href="/site.webmanifest" />', { html: true });
    element.append('<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />', {
      html: true,
    });
    element.append('<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />', {
      html: true,
    });
    element.append('<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />', {
      html: true,
    });
    element.append('<link rel="shorcut icon" type="image/x-icon" href="/favicon.ico">', {
      html: true,
    });
  }
}
