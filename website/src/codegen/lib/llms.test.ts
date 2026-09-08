import { describe, expect, test } from 'vitest';
import type { DocsNavNode } from '../../docs/nav';
import { getCodegenLlmsText } from './llms';

describe('getCodegenLlmsText', () => {
  test('lists docs and plugins in sidebar order with Markdown links', () => {
    const docs = [
      { body: '# Intro', data: { description: 'Start here' }, id: 'getting-started/index.mdx' },
      { body: 'Guide', data: {}, id: 'guides/react-vue.mdx' },
    ];
    const plugins = [
      {
        body: 'Resolvers prose',
        data: { description: 'Typed resolvers' },
        id: 'typescript/typescript-resolvers.mdx',
      },
      { body: '', data: {}, id: 'other/add.mdx' },
    ];
    const docsNav: DocsNavNode[] = [
      { href: '/docs/getting-started', title: 'Getting Started', type: 'page' },
      {
        children: [{ href: '/docs/guides/react-vue', title: 'React / Vue', type: 'page' }],
        title: 'Guides',
        type: 'folder',
      },
    ];
    const pluginsNav: DocsNavNode[] = [
      {
        children: [
          { href: '/plugins/typescript/typescript-resolvers', title: 'resolvers', type: 'page' },
        ],
        title: 'TypeScript',
        type: 'folder',
      },
      {
        children: [{ href: '/plugins/other/add', title: 'add', type: 'page' }],
        title: 'Other',
        type: 'folder',
      },
    ];

    const output = getCodegenLlmsText({ docs, docsNav, plugins, pluginsNav });

    expect(output.startsWith('# GraphQL Code Generator\n')).toBe(true);
    expect(output).toContain(
      '- [Getting Started](https://the-guild.dev/graphql/codegen/docs/getting-started.md): Start here',
    );
    expect(output).toContain(
      '- [React / Vue](https://the-guild.dev/graphql/codegen/docs/guides/react-vue.md)',
    );
    expect(output).toContain(
      '- [resolvers](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers.md): Typed resolvers',
    );
    // No prose of its own → no Markdown rendition; link the page.
    expect(output).toContain('- [add](https://the-guild.dev/graphql/codegen/plugins/other/add)\n');
    expect(output.indexOf('## Documentation')).toBeLessThan(
      output.indexOf('## Plugins and presets'),
    );
  });
});
