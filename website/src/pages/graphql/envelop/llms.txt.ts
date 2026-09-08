import { getCollection } from 'astro:content';
import { getEnvelopDocsNav } from '../../../envelop/lib/docs-nav';
import { getEnvelopLlmsText } from '../../../envelop/lib/llms';
import { getPluginDescription, getPlugins } from '../../../envelop/lib/plugin-data';

export const prerender = true;

export async function GET() {
  const [docs, docsNav] = await Promise.all([getCollection('envelopDocs'), getEnvelopDocsNav()]);
  const plugins = getPlugins().map(plugin => ({
    description: getPluginDescription(plugin.key),
    key: plugin.key,
    npmPackage: plugin.npmPackage,
    title: plugin.title,
  }));
  return new Response(getEnvelopLlmsText({ docs, docsNav: docsNav.tree, plugins }), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
