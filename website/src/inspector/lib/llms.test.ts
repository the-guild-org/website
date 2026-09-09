import { describe, expect, test } from 'vitest';
import type { DocsNavNode } from '../../docs/nav';
import { getInspectorLlmsText } from './llms';

describe('getInspectorLlmsText', () => {
  test('lists the docs in sidebar order with Markdown links', () => {
    const docs = [
      { data: { description: 'Start here' }, id: 'index' },
      { data: {}, id: 'commands/diff' },
    ];
    const docsNav: DocsNavNode[] = [
      { href: '/docs', title: 'GraphQL Inspector', type: 'page' },
      {
        children: [{ href: '/docs/commands/diff', title: 'Diff', type: 'page' }],
        title: 'Commands',
        type: 'folder',
      },
    ];
    const output = getInspectorLlmsText({ docs, docsNav });
    expect(output.startsWith('# GraphQL Inspector\n')).toBe(true);
    expect(output).toContain(
      '- [GraphQL Inspector](https://the-guild.dev/graphql/inspector/docs.md): Start here',
    );
    expect(output).toContain(
      '- [Diff](https://the-guild.dev/graphql/inspector/docs/commands/diff.md)\n',
    );
  });
});
