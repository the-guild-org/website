import { describe, expect, test } from 'vitest';
import { getDocsMarkdown, getDocsSlug, type DocsEntry } from './docs-markdown';

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
