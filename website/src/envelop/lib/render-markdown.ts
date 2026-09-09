/**
 * Renders plain markdown strings (plugin readmes) to HTML at build time with
 * Astro's markdown pipeline, and reports the headings it found so a page can
 * build its table of contents.
 *
 * Readmes are third-party markdown that may carry raw HTML, and the site
 * injects the result with set:html — so the rendered HTML is sanitized
 * afterwards (Astro applies its raw-HTML pass after any configured rehype
 * plugin, which is why sanitizing inside the pipeline would not be enough).
 * The schema keeps what a readme legitimately needs: heading ids for the
 * table of contents, and the classes plus inline colors Shiki emits.
 */
import rehypeParse from 'rehype-parse';
import rehypeSanitize, { defaultSchema, type Options as SanitizeSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';
import { createMarkdownProcessor, type MarkdownHeading } from '@astrojs/markdown-remark';

const processorPromise = createMarkdownProcessor({
  syntaxHighlight: 'shiki',
  shikiConfig: { themes: { dark: 'github-dark', light: 'github-light' } },
});

// Shiki colors tokens with inline styles (CSS custom properties carry the
// dark theme); `style` stays forbidden everywhere else.
const shikiStyle: [string, RegExp] = [
  'style',
  // Only color declarations (plain values or Shiki's custom properties) and
  // the overflow Astro adds to <pre>; anything else drops the attribute.
  /^(?:\s*(?:--shiki-[\w-]+|color|background-color|overflow-x)\s*:\s*[#\w\s(),.%-]*;?)+\s*$/,
];
const attributes = defaultSchema.attributes ?? {};
const schema: SanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...attributes,
    '*': [...(attributes['*'] ?? []), 'className', 'id'],
    code: [...(attributes['code'] ?? []), shikiStyle, 'dataLanguage'],
    pre: [...(attributes['pre'] ?? []), shikiStyle, 'dataLanguage', 'tabIndex'],
    span: [...(attributes['span'] ?? []), shikiStyle],
  },
  // The sanitizer prefixes ids by default; readme anchors must stay as authored.
  clobber: [],
  clobberPrefix: '',
};

const sanitizer = unified()
  .use(rehypeParse, { fragment: true })
  .use(rehypeSanitize, schema)
  .use(rehypeStringify);

export async function renderMarkdown(
  markdown: string,
): Promise<{ headings: MarkdownHeading[]; html: string }> {
  const processor = await processorPromise;
  const result = await processor.render(markdown);
  const html = String(await sanitizer.process(result.code));
  return { headings: result.metadata.headings ?? [], html };
}
