/**
 * Renders plain markdown strings (npm readmes, generated config reference)
 * to HTML at build time with Astro's markdown pipeline. Kept separate from
 * the content pipeline: readmes are arbitrary third-party markdown, so they
 * get the default renderer rather than the strict docs one.
 */
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const processorPromise = createMarkdownProcessor({
  syntaxHighlight: 'shiki',
  shikiConfig: { themes: { dark: 'github-dark', light: 'github-light' } },
});

export async function renderMarkdown(markdown: string): Promise<string> {
  const processor = await processorPromise;
  const result = await processor.render(markdown);
  return result.code;
}
