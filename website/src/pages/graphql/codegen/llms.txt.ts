import { getCollection } from 'astro:content';
import { getCodegenDocsNav, getCodegenPluginsNav } from '../../../codegen/lib/docs-nav';
import { getCodegenLlmsText } from '../../../codegen/lib/llms';

export const prerender = true;

export async function GET() {
  const [docs, plugins, docsNav, pluginsNav] = await Promise.all([
    getCollection('codegenDocs'),
    getCollection('codegenPlugins'),
    getCodegenDocsNav(),
    getCodegenPluginsNav(),
  ]);

  return new Response(
    getCodegenLlmsText({
      docs,
      docsNav: docsNav.tree,
      plugins,
      pluginsNav: pluginsNav.tree,
    }),
    { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } },
  );
}
