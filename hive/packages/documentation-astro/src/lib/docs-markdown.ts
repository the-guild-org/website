import type { CollectionEntry } from "astro:content";

export type DocsEntry = CollectionEntry<"docs">;

export function getDocsSlug(entry: DocsEntry) {
  return entry.id.replace(/(^|\/)index$/, "").replace(/\.(md|mdx)$/, "");
}

export function getDocsMarkdown(entry: DocsEntry) {
  if (!entry.body)
    throw new Error(`Documentation entry has no Markdown body: ${entry.id}`);

  const data = entry.data as { description?: string; title?: string };
  const title = data.title ?? entry.id.split("/").at(-1) ?? entry.id;
  const frontmatter = [
    "---",
    `title: ${JSON.stringify(title)}`,
    data.description && `description: ${JSON.stringify(data.description)}`,
    "---",
  ]
    .filter(Boolean)
    .join("\n");

  return `${frontmatter}\n\n${entry.body.trim()}\n`;
}

export function markdownResponse(entry: DocsEntry) {
  return new Response(getDocsMarkdown(entry), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderHeadingInlineHtml(raw: string) {
  return raw
    .split(/(`[^`]+`)/g)
    .map((segment) => {
      if (
        segment.startsWith("`") &&
        segment.endsWith("`") &&
        segment.length >= 2
      ) {
        return `<code>${escapeHtml(segment.slice(1, -1))}</code>`;
      }
      return escapeHtml(segment)
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/__([^_]+)__/g, "$1")
        .replace(/\*([^*]+)\*/g, "$1");
    })
    .join("");
}

/**
 * Astro's built-in heading collector (used by `render()`) flattens heading
 * content to plain text, so inline code like `` `fetch` `` loses its `<code>`
 * element by the time it reaches the table of contents. This re-derives an
 * HTML string per heading straight from the Markdown source, matching
 * headings by position (both walk the document in the same top-level order).
 */
export function getHeadingHtmlBySlug(
  markdown: string,
  headings: { slug: string; text: string }[],
) {
  const rawHeadings: string[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (/^(```|~~~)/.test(line.trim())) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const match = /^#{1,6}\s+(.*)$/.exec(line);
    if (!match) continue;
    rawHeadings.push(match[1].replace(/\s*\{#[\w-]+\}\s*$/, "").trim());
  }

  const htmlBySlug = new Map<string, string>();
  headings.forEach((heading, index) => {
    const raw = rawHeadings[index];
    htmlBySlug.set(
      heading.slug,
      raw === undefined
        ? escapeHtml(heading.text)
        : renderHeadingInlineHtml(raw),
    );
  });
  return htmlBySlug;
}
