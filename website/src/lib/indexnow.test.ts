import { expect, test } from 'vitest';
import { changedUrls, pageFingerprint } from './indexnow';

const page = (main: string, nav = '<nav>Docs</nav>') =>
  `<html><head><title>t</title></head><body>${nav}<main>${main}</main></body></html>`;

test('the fingerprint ignores what differs between two builds of the same content', () => {
  const first = page(
    '<h1 class="a">Title</h1><img src="/_astro/x.111.webp"><svg><text>12.5</text></svg><ul><li>one</li><li>two</li></ul>',
  );
  const second = page(
    '<h1 class="b">Title</h1><img src="/_astro/x.222.webp"><svg><text>12.7</text></svg><ul><li>two</li><li>one</li><li>one</li></ul>',
    '<nav>Docs Blog</nav>',
  );
  expect(pageFingerprint(first)).toBe(pageFingerprint(second));
});

test('the fingerprint changes when the text changes', () => {
  expect(pageFingerprint(page('<p>Hive supports SCIM</p>'))).not.toBe(
    pageFingerprint(page('<p>Hive supports SCIM and OIDC</p>')),
  );
});

test('new, changed and removed pages are reported; unchanged ones are not', () => {
  expect(
    changedUrls(
      { '/same': 'a', '/edited': 'a', '/removed': 'a' },
      { '/same': 'a', '/edited': 'b', '/added': 'a' },
    ),
  ).toEqual(['/added', '/edited', '/removed']);
});
