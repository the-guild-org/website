import {
  demoteReadmeHeadings,
  getPluginReadme,
  getPlugins,
} from '../../../../envelop/lib/plugin-data';

export const prerender = true;

/** A plugin page as Markdown: its readme, with the package name up top. */
export function getStaticPaths() {
  return getPlugins().map(plugin => ({ params: { name: plugin.key }, props: { plugin } }));
}

export function GET({
  props,
}: {
  props: { plugin: { key: string; npmPackage: string; title: string } };
}) {
  const readme = demoteReadmeHeadings(getPluginReadme(props.plugin.key));
  return new Response(
    `# ${props.plugin.title}\n\nPackage: \`${props.plugin.npmPackage}\`\n\n${readme}`,
    {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    },
  );
}
