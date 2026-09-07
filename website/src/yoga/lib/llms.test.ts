import { describe, expect, test } from 'vitest';
import type { DocsNavNode } from '../../docs/nav';
import { getYogaLlmsText } from './llms';

describe('getYogaLlmsText', () => {
  test('lists docs and tutorial pages in sidebar order with Markdown links', () => {
    const docs = [
      { data: { description: 'Start here' }, id: 'index' },
      { data: {}, id: 'features/cors' },
    ];
    const tutorial = [{ data: { description: 'From scratch' }, id: 'basic/index' }];
    const docsNav: DocsNavNode[] = [
      { href: '/docs', title: 'Quick start', type: 'page' },
      {
        children: [{ href: '/docs/features/cors', title: 'CORS', type: 'page' }],
        title: 'Features',
        type: 'folder',
      },
    ];
    const tutorialNav: DocsNavNode[] = [
      {
        children: [],
        href: '/tutorial/basic',
        title: 'Basic',
        type: 'folder',
      },
    ];

    const output = getYogaLlmsText({ docs, docsNav, tutorial, tutorialNav });

    expect(output.startsWith('# GraphQL Yoga\n')).toBe(true);
    expect(output).toContain(
      '- [Quick start](https://the-guild.dev/graphql/yoga-server/docs.md): Start here',
    );
    expect(output).toContain(
      '- [CORS](https://the-guild.dev/graphql/yoga-server/docs/features/cors.md)\n',
    );
    expect(output).toContain(
      '- [Basic](https://the-guild.dev/graphql/yoga-server/tutorial/basic.md): From scratch',
    );
    expect(output.indexOf('## Documentation')).toBeLessThan(output.indexOf('## Tutorial'));
  });
});
