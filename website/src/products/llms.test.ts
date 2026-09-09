import { describe, expect, test } from 'vitest';
import type { DocsNavNode } from '../docs/nav';
import type { ProductDefinition } from './define';
import { getProductLlmsText } from './llms';

const product = {
  slug: 'demo-product',
  name: 'Demo Product',
  shortName: 'Demo',
  mark: 'DEM',
  description: 'A demo.',
  repo: 'the-guild-org/demo',
  branch: 'main',
  sections: [{ base: '/docs', dir: 'docs', label: 'Documentation' }],
  redirects: {},
  llmsTagline: 'Demo tagline.',
  landing: {
    headline: 'Demo',
    tagline: 'Demo.',
    claims: ['a', 'b', 'c'],
    getStarted: '/docs',
    featuresTitle: 'Features',
    features: [],
    links: [],
  },
} satisfies ProductDefinition;

describe('getProductLlmsText', () => {
  test('lists every section in sidebar order with Markdown links', () => {
    const nav: DocsNavNode[] = [
      { href: '/docs', title: 'Introduction', type: 'page' },
      {
        children: [{ href: '/docs/guides/setup', title: 'Setup', type: 'page' }],
        title: 'Guides',
        type: 'folder',
      },
    ];
    const output = getProductLlmsText(
      product,
      [{ label: 'Documentation', nav }],
      new Map([['/docs', 'Start here']]),
    );
    expect(output.startsWith('# Demo Product\n\n> Demo tagline.\n')).toBe(true);
    expect(output).toContain('## Documentation');
    expect(output).toContain(
      '- [Introduction](https://the-guild.dev/graphql/demo-product/docs.md): Start here',
    );
    expect(output).toContain(
      '- [Setup](https://the-guild.dev/graphql/demo-product/docs/guides/setup.md)\n',
    );
  });
});
