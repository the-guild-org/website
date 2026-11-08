/**
 * Shrinks the inline SVG that rehype-mermaid renders at build time.
 *
 * Mermaid writes every coordinate with full float precision
 * (`-15.855405447506715`) and draws node outlines and edges with many
 * zero-length curve segments. The Hive Router plugin hooks chart came out at
 * 571 KB of HTML on its own, the page at 1.4 MB, which Ahrefs reported as
 * "HTML file size too large" (November 2026). Rounding to two decimals is
 * invisible at any zoom a reader uses, and segments that do not move the pen
 * draw nothing.
 */

const LONG_DECIMAL = /-?\d*\.\d{3,}(?:e[-+]?\d+)?/gi;
/** Geometry attributes (hast property names) whose numbers can be rounded. */
const NUMERIC_PROPERTIES = new Set([
  'cx',
  'cy',
  'height',
  'points',
  'r',
  'rx',
  'ry',
  'transform',
  'viewBox',
  'width',
  'x',
  'x1',
  'x2',
  'y',
  'y1',
  'y2',
]);

/** `12.3456` -> `12.35`, `-0.001` -> `0`, `4.10` -> `4.1`. */
export function round(value) {
  const text = Number(value)
    .toFixed(2)
    .replace(/\.?0+$/, '');
  return text === '-0' || text === '' ? '0' : text;
}

/**
 * Rounds a path's coordinates and drops segments that do not move the pen.
 * Only absolute M, L, C and Z commands (all Mermaid emits) are restructured;
 * any other path only has its numbers rounded.
 */
export function compactPath(d) {
  const tokens = d.match(/[a-z]|-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?/gi) ?? [];
  if (tokens.some(token => /^[a-z]$/i.test(token) && !'MLCZ'.includes(token))) {
    return d.replace(LONG_DECIMAL, round);
  }
  const arity = { C: 6, L: 2, M: 2 };
  const out = [];
  // The pen position, and where the current subpath started (Z returns there).
  let current;
  let subpathStart;
  let command;
  let index = 0;
  while (index < tokens.length) {
    if (/^[a-z]$/i.test(tokens[index])) command = tokens[index++];
    if (command === 'Z') {
      out.push('Z');
      current = subpathStart;
      continue;
    }
    if (!command || !(command in arity)) return d.replace(LONG_DECIMAL, round);
    const values = tokens.slice(index, index + arity[command]).map(round);
    index += arity[command];
    if (values.length < arity[command]) break;
    const points = [];
    for (let k = 0; k < values.length; k += 2) points.push(`${values[k]} ${values[k + 1]}`);
    if (command === 'M') {
      // A moveto may be dropped only when it changes neither the pen nor the
      // point a later Z closes to.
      if (out.length === 0 || points[0] !== current || points[0] !== subpathStart) {
        out.push(`M${points[0]}`);
      }
      subpathStart = points[0];
      // Further coordinate pairs after a moveto are implicit linetos.
      command = 'L';
    } else {
      if (points.every(point => point === current)) continue;
      out.push(`${command}${points.join(' ')}`);
    }
    current = points.at(-1);
  }
  return out.join('');
}

function compactNode(node) {
  if (node.type !== 'element') return;
  const properties = node.properties ?? {};
  for (const [name, value] of Object.entries(properties)) {
    if (name === 'd' && typeof value === 'string') properties.d = compactPath(value);
    else if (NUMERIC_PROPERTIES.has(name) && typeof value === 'string') {
      properties[name] = value.replace(LONG_DECIMAL, round);
    } else if (NUMERIC_PROPERTIES.has(name) && typeof value === 'number') {
      properties[name] = Number(round(value));
    }
  }
  for (const child of node.children ?? []) compactNode(child);
}

/** Compacts every Mermaid SVG (`<svg id="mermaid-…">`) in a hast tree. */
export function compactMermaidSvgs(tree) {
  const visit = node => {
    if (node.type === 'element' && node.tagName === 'svg') {
      if (String(node.properties?.id ?? '').startsWith('mermaid')) compactNode(node);
      return;
    }
    for (const child of node.children ?? []) visit(child);
  };
  visit(tree);
}

/** Wraps a rehype-mermaid style plugin so its SVG output is compacted. */
export function withCompactSvg(plugin) {
  return function (options) {
    const transform = plugin.call(this, options);
    return async (tree, file) => {
      await transform(tree, file);
      compactMermaidSvgs(tree);
    };
  };
}
