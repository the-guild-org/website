import { getDocsMarkdown } from '~hive/lib/docs-markdown';
import { getCollection } from 'astro:content';
import type { DocsNavNode } from '../../../docs/nav';
import { getEnvelopDocsNav } from '../../../envelop/lib/docs-nav';
import { entryHref } from '../../../envelop/lib/llms';
import {
  demoteReadmeHeadings,
  getPluginReadme,
  getPlugins,
} from '../../../envelop/lib/plugin-data';

export const prerender = true;

function hrefsInOrder(nodes: DocsNavNode[]): string[] {
  return nodes.flatMap(node =>
    node.type === 'page'
      ? [node.href]
      : [...(node.href ? [node.href] : []), ...hrefsInOrder(node.children)],
  );
}

/** The current Envelop documentation and every plugin readme as one Markdown file. */
export async function GET() {
  const [docs, docsNav] = await Promise.all([getCollection('envelopDocs'), getEnvelopDocsNav()]);
  const byHref = new Map(docs.map(entry => [entryHref('/docs', entry), entry] as const));
  const ordered = hrefsInOrder(docsNav.tree)
    .map(href => byHref.get(href))
    .filter(entry => entry && (entry.body ?? '').trim().length > 0);
  const pluginSections = getPlugins().flatMap(plugin => {
    const readme = getPluginReadme(plugin.key).trim();
    return readme
      ? [`# ${plugin.title} (${plugin.npmPackage})\n\n${demoteReadmeHeadings(readme)}`]
      : [];
  });
  return new Response(
    [...ordered.map(entry => getDocsMarkdown(entry as never)), ...pluginSections].join('\n\n'),
    { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
  );
}
