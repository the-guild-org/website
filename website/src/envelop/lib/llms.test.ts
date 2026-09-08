import { describe, expect, test } from 'vitest';
import type { DocsNavNode } from '../../docs/nav';
import { getEnvelopLlmsText } from './llms';

describe('getEnvelopLlmsText', () => {
  test('lists the docs in sidebar order and the plugins with Markdown links', () => {
    const docs = [
      { data: { description: 'Start here' }, id: 'index' },
      { data: {}, id: 'plugins/lifecycle' },
    ];
    const docsNav: DocsNavNode[] = [
      { href: '/docs', title: 'Introduction', type: 'page' },
      {
        children: [{ href: '/docs/plugins/lifecycle', title: 'Lifecycle', type: 'page' }],
        title: 'Plugins',
        type: 'folder',
      },
    ];
    const plugins = [
      {
        description: 'Sentry tracing',
        key: 'use-sentry',
        npmPackage: '@envelop/sentry',
        title: 'useSentry',
      },
    ];
    const output = getEnvelopLlmsText({ docs, docsNav, plugins });
    expect(output.startsWith('# Envelop\n')).toBe(true);
    expect(output).toContain(
      '- [Introduction](https://the-guild.dev/graphql/envelop/docs.md): Start here',
    );
    expect(output).toContain(
      '- [Lifecycle](https://the-guild.dev/graphql/envelop/docs/plugins/lifecycle.md)\n',
    );
    expect(output).toContain(
      '- [useSentry](https://the-guild.dev/graphql/envelop/plugins/use-sentry.md): @envelop/sentry — Sentry tracing',
    );
  });
});
