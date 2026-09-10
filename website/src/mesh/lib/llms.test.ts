import { describe, expect, test } from 'vitest';
import type { DocsNavNode } from '../../docs/nav';
import { getMeshLlmsText } from './llms';

describe('getMeshLlmsText', () => {
  test('lists the v1 docs in sidebar order with Markdown links', () => {
    const docs = [
      { data: { description: 'Start here' }, id: 'index' },
      { data: {}, id: 'source-handlers/openapi' },
    ];
    const docsNav: DocsNavNode[] = [
      { href: '/v1', title: 'Introduction', type: 'page' },
      {
        children: [{ href: '/v1/source-handlers/openapi', title: 'OpenAPI', type: 'page' }],
        title: 'Source Handlers',
        type: 'folder',
      },
    ];
    const output = getMeshLlmsText({ docs, docsNav });
    expect(output.startsWith('# GraphQL Mesh\n')).toBe(true);
    expect(output).toContain(
      '- [Introduction](https://the-guild.dev/graphql/mesh/v1.md): Start here',
    );
    expect(output).toContain(
      '- [OpenAPI](https://the-guild.dev/graphql/mesh/v1/source-handlers/openapi.md)\n',
    );
  });
});
