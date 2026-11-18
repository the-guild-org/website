/**
 * A tiny HTML reader for the figure components in this folder.
 *
 * The figures take plain Markdown as children (a list, a table, a paragraph),
 * so the MDX source stays readable on GitHub and in the Markdown twins of the
 * docs pages. At build time Astro hands the component the rendered HTML of
 * that Markdown; the helpers here turn it back into rows, cells and labels.
 * The input is our own build output, never user content, so the parser only
 * has to be predictable, not defensive.
 */

export interface ElementNode {
  attrs: Record<string, string>;
  children: HtmlNode[];
  tag: string;
  type: 'element';
}

export interface TextNode {
  type: 'text';
  value: string;
}

export type HtmlNode = ElementNode | TextNode;

const VOID_TAGS = new Set(['br', 'hr', 'img', 'input', 'wbr', 'source', 'meta', 'link', 'col']);

const TOKEN =
  /<!--[\s\S]*?-->|<\/([a-zA-Z][\w-]*)\s*>|<([a-zA-Z][\w-]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>|[^<]+|</g;

const ATTR = /([^\s=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;

const ENTITIES: Record<string, string> = {
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: ' ',
  quot: '"',
};

export function decodeEntities(text: string): string {
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === '#') {
      const code =
        entity[1] === 'x' || entity[1] === 'X'
          ? Number.parseInt(entity.slice(2), 16)
          : Number.parseInt(entity.slice(1), 10);
      return Number.isNaN(code) ? match : String.fromCodePoint(code);
    }
    return ENTITIES[entity.toLowerCase()] ?? match;
  });
}

export function parseHtml(html: string): HtmlNode[] {
  const root: ElementNode = { attrs: {}, children: [], tag: '#root', type: 'element' };
  const stack: ElementNode[] = [root];

  for (const match of html.matchAll(TOKEN)) {
    const [token, closing, opening, rawAttrs, selfClosing] = match;
    if (!token || token.startsWith('<!--')) continue;

    if (closing) {
      const tag = closing.toLowerCase();
      const index = stack.findLastIndex(node => node.tag === tag);
      if (index > 0) stack.length = index;
      continue;
    }

    if (opening) {
      const tag = opening.toLowerCase();
      const attrs: Record<string, string> = {};
      for (const attr of (rawAttrs ?? '').matchAll(ATTR)) {
        attrs[attr[1].toLowerCase()] = decodeEntities(attr[2] ?? attr[3] ?? attr[4] ?? '');
      }
      const node: ElementNode = { attrs, children: [], tag, type: 'element' };
      stack.at(-1)!.children.push(node);
      if (!selfClosing && !VOID_TAGS.has(tag)) stack.push(node);
      continue;
    }

    stack.at(-1)!.children.push({ type: 'text', value: decodeEntities(token) });
  }

  return root.children;
}

export function isElement(node: HtmlNode | undefined, ...tags: string[]): node is ElementNode {
  return node?.type === 'element' && (tags.length === 0 || tags.includes(node.tag));
}

/** Plain text with whitespace collapsed, like the browser would show it. */
export function textOf(nodes: HtmlNode | HtmlNode[] | undefined): string {
  return rawTextOf(nodes).replace(/\s+/g, ' ').trim();
}

/** Plain text with the original whitespace, for code blocks. */
export function rawTextOf(nodes: HtmlNode | HtmlNode[] | undefined): string {
  if (!nodes) return '';
  if (!Array.isArray(nodes)) nodes = [nodes];
  let out = '';
  for (const node of nodes) {
    if (node.type === 'text') out += node.value;
    else if (node.tag === 'br') out += '\n';
    else out += rawTextOf(node.children);
  }
  return out;
}

export const escapeHtml = (text: string) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

/** Serialises inline content back to HTML, keeping code, links and emphasis. */
export function htmlOf(nodes: HtmlNode | HtmlNode[] | undefined): string {
  if (!nodes) return '';
  if (!Array.isArray(nodes)) nodes = [nodes];
  let out = '';
  for (const node of nodes) {
    if (node.type === 'text') {
      out += escapeHtml(node.value);
      continue;
    }
    if (node.tag === 'br') {
      out += ' ';
      continue;
    }
    if (node.tag === 'a') {
      const href = node.attrs.href ?? '';
      out += `<a href="${escapeHtml(href)}">${htmlOf(node.children)}</a>`;
      continue;
    }
    if (node.tag === 'code') {
      out += `<code>${htmlOf(node.children)}</code>`;
      continue;
    }
    if (['strong', 'b', 'em', 'i', 'del', 's', 'sub', 'sup'].includes(node.tag)) {
      out += `<${node.tag}>${htmlOf(node.children)}</${node.tag}>`;
      continue;
    }
    // Wrappers (p, span, li…) contribute their content only.
    out += htmlOf(node.children);
  }
  return out.replace(/\s+/g, ' ').trim();
}

/** Direct element children, optionally filtered by tag. */
export function childElements(node: ElementNode | HtmlNode[], ...tags: string[]): ElementNode[] {
  const children = Array.isArray(node) ? node : node.children;
  return children.filter((child): child is ElementNode => isElement(child, ...tags));
}

/** Every descendant element with one of the given tags, in document order. */
export function findAll(nodes: HtmlNode[] | ElementNode, ...tags: string[]): ElementNode[] {
  const list = Array.isArray(nodes) ? nodes : nodes.children;
  const out: ElementNode[] = [];
  for (const node of list) {
    if (!isElement(node)) continue;
    if (tags.includes(node.tag)) out.push(node);
    out.push(...findAll(node, ...tags));
  }
  return out;
}

export function findFirst(
  nodes: HtmlNode[] | ElementNode,
  ...tags: string[]
): ElementNode | undefined {
  return findAll(nodes, ...tags)[0];
}

/** The items of the first list at the top level of the rendered children. */
export function listItems(nodes: HtmlNode[]): ElementNode[] {
  const list = childElements(nodes, 'ul', 'ol')[0] ?? findFirst(nodes, 'ul', 'ol');
  return list ? childElements(list, 'li') : [];
}

/** The items of every top-level list, so `-` and `+` lists can be mixed. */
export function allListItems(nodes: HtmlNode[]): ElementNode[] {
  const lists = childElements(nodes, 'ul', 'ol');
  return lists.flatMap(list => childElements(list, 'li'));
}

export function paragraphs(nodes: HtmlNode[]): ElementNode[] {
  return childElements(nodes, 'p');
}

/**
 * The inline content of a list item: everything before a nested list, with a
 * wrapping paragraph (loose lists) unwrapped.
 */
export function itemContent(item: ElementNode): HtmlNode[] {
  // The explicit return type stops TypeScript inferring a `child is TextNode` guard here.
  const own = item.children.filter((child): boolean => !isElement(child, 'ul', 'ol'));
  const first = own[0];
  if (own.length === 1 && isElement(first, 'p')) return first.children;
  const inline = own.filter((child): boolean => !isElement(child, 'p'));
  const firstParagraph = own.find(child => isElement(child, 'p')) as ElementNode | undefined;
  return firstParagraph && inline.every(child => child.type === 'text' && !child.value.trim())
    ? firstParagraph.children
    : own;
}

/** Nested list directly under a list item, if any. */
export function nestedList(item: ElementNode): ElementNode | undefined {
  return childElements(item, 'ul', 'ol')[0];
}

export type Emphasis = 'strong' | 'em' | undefined;

/**
 * Whether the content is entirely wrapped in bold or italics — the figures use
 * `**bold**` to mark the current or accented row and `*italic*` for the next
 * or muted one. Returns the wrapper's content so the marker does not render.
 */
export function unwrapEmphasis(nodes: HtmlNode[]): { emphasis: Emphasis; nodes: HtmlNode[] } {
  const significant = nodes.filter(node => node.type !== 'text' || node.value.trim());
  const [only] = significant;
  if (significant.length === 1 && isElement(only, 'strong', 'b')) {
    return { emphasis: 'strong', nodes: only.children };
  }
  if (significant.length === 1 && isElement(only, 'em', 'i')) {
    return { emphasis: 'em', nodes: only.children };
  }
  return { emphasis: undefined, nodes };
}

/**
 * Splits inline content on the first `: ` (or ` — `) into a label and the
 * rest, keeping inline HTML on both sides. Used for `Date: label`,
 * `Label: value` and `label — meta` rows.
 */
export function splitLabel(
  nodes: HtmlNode[],
  separators: string[] = [': ', ' — ', ' – '],
): { head: string; tail: string } {
  const html = htmlOf(nodes);
  let best = -1;
  let length = 0;
  for (const separator of separators) {
    const index = html.indexOf(separator);
    if (index !== -1 && (best === -1 || index < best)) {
      best = index;
      length = separator.length;
    }
  }
  if (best === -1) return { head: html, tail: '' };
  return { head: html.slice(0, best).trim(), tail: html.slice(best + length).trim() };
}

export interface TableData {
  align: (string | undefined)[];
  footer: HtmlNode[][][] | undefined;
  headers: HtmlNode[][];
  rows: HtmlNode[][][];
}

/** The first Markdown table in the rendered children. */
export function tableOf(nodes: HtmlNode[]): TableData | undefined {
  const table = findFirst(nodes, 'table');
  if (!table) return undefined;

  const cellsOf = (row: ElementNode) => childElements(row, 'th', 'td');
  const rowsIn = (section: ElementNode | undefined) =>
    section ? childElements(section, 'tr') : [];

  const head = rowsIn(childElements(table, 'thead')[0]);
  const body = rowsIn(childElements(table, 'tbody')[0]);
  const foot = rowsIn(childElements(table, 'tfoot')[0]);
  const loose = childElements(table, 'tr');

  const headerRow =
    head[0] ?? (loose[0] && cellsOf(loose[0]).some(c => c.tag === 'th') ? loose[0] : undefined);
  const bodyRows = body.length > 0 ? body : loose.filter(row => row !== headerRow);
  const headerCells = headerRow ? cellsOf(headerRow) : [];

  return {
    align: headerCells.map(cell => cell.attrs.align ?? alignFromStyle(cell.attrs.style)),
    footer: foot.length > 0 ? foot.map(row => cellsOf(row).map(cell => cell.children)) : undefined,
    headers: headerCells.map(cell => cell.children),
    rows: bodyRows.map(row => cellsOf(row).map(cell => cell.children)),
  };
}

function alignFromStyle(style: string | undefined): string | undefined {
  const match = style?.match(/text-align:\s*(left|right|center)/);
  return match?.[1];
}

/** Reads a number out of a cell like `12,400`, `48 kb` or `+31`. */
export function numberOf(text: string): number | undefined {
  const match = text.replace(/,/g, '').match(/-?\d+(?:\.\d+)?/);
  return match ? Number.parseFloat(match[0]) : undefined;
}

export function formatNumber(value: number): string {
  return Number.isInteger(value)
    ? value.toLocaleString('en-US')
    : value.toLocaleString('en-US', { maximumFractionDigits: 2 });
}

/** Renders the slot to HTML and parses it. */
export async function slotNodes(astro: {
  slots: { has(n: string): boolean; render(n: string): Promise<string> };
}): Promise<HtmlNode[]> {
  if (!astro.slots.has('default')) return [];
  return parseHtml(await astro.slots.render('default'));
}
