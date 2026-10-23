import { describe, expect, test } from 'vitest';
import {
  getDocsMarkdown,
  getDocsSlug,
  getHeadingHtmlBySlug,
  type DocsEntry,
} from './docs-markdown';

function docsEntry(overrides: Partial<DocsEntry> = {}) {
  return {
    body: '## Install\n\n```sh\nnpm install example\n```',
    collection: 'docs',
    data: {
      description: 'Install: the example package',
      title: 'Getting Started',
    },
    id: 'guides/getting-started',
    ...overrides,
  } as DocsEntry;
}

describe('getDocsSlug', () => {
  test('normalizes root and nested index entries', () => {
    expect(getDocsSlug(docsEntry({ id: 'index' }))).toBe('');
    expect(getDocsSlug(docsEntry({ id: 'gateway/index' }))).toBe('gateway');
    expect(getDocsSlug(docsEntry())).toBe('guides/getting-started');
  });
});

describe('getDocsMarkdown', () => {
  test('adds selected frontmatter and preserves the Markdown body', () => {
    expect(getDocsMarkdown(docsEntry())).toBe(`---
title: "Getting Started"
description: "Install: the example package"
---

## Install

\`\`\`sh
npm install example
\`\`\`
`);
  });

  test('rejects entries without a Markdown body', () => {
    expect(() => getDocsMarkdown(docsEntry({ body: undefined }))).toThrow(
      'Documentation entry has no Markdown body',
    );
  });
});

describe('getHeadingHtmlBySlug', () => {
  test('drops empty and comment-only MDX expressions but keeps braces in inline code', () => {
    const markdown = [
      '## Sharing envelops { }',
      '',
      '## Removed{/* eslint-disable-line */}',
      '',
      '## Write `{ }`',
    ].join('\n');
    const headings = [
      { slug: 'sharing-envelops', text: 'Sharing envelops' },
      { slug: 'removed', text: 'Removed' },
      { slug: 'write', text: 'Write { }' },
    ];
    const html = getHeadingHtmlBySlug(markdown, headings);
    expect(html.get('sharing-envelops')).toBe('Sharing envelops');
    expect(html.get('removed')).toBe('Removed');
    expect(html.get('write')).toBe('Write <code>{ }</code>');
  });
});
