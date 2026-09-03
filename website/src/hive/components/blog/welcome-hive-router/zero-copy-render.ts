import {
  type ByteMapEntry,
  COLORS,
  type IdMapperInfo,
  type JsonValue,
} from "./zero-copy-data";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isPrimitive(v: unknown): v is boolean | number | string | null {
  return (
    v === null ||
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean"
  );
}

function idxValId(path: string, i: number) {
  return `${path}/${i}#value`;
}
function keyId(path: string, key: string) {
  return `${path}/${key}#key`;
}
function valId(path: string, key: string) {
  return `${path}/${key}#value`;
}

function coloredSpan(text: string, kind: keyof typeof COLORS, gid: string) {
  const color = COLORS[kind];
  return `<span class="zc-token" data-gid="${escapeHtml(gid)}" style="--zc-bg:${color}22;--zc-bg-hover:${color}55;--zc-border:${color}66;--zc-border-hover:${color};background:var(--zc-bg);border:1px solid var(--zc-border);border-radius:5px;padding:0 3px;">${escapeHtml(text)}</span>`;
}

function refChip(
  gid: string,
  sliceLookupFn?: (
    gid: string,
  ) => { len: number; src: "A" | "B"; start: number } | null,
) {
  if (!sliceLookupFn) return "";
  const info = sliceLookupFn(gid);
  if (!info) return "";
  return `<span class="zc-token" data-gid="${escapeHtml(gid)}" style="margin-left:0.25rem;border:1px solid #404040;background:#262626;border-radius:4px;padding:0 4px;vertical-align:middle;font-size:10px;" title="References ${info.src} slice(${info.start}, ${info.len})">${info.src}: ${info.start}&hellip;${info.start + info.len - 1}</span>`;
}

interface RenderOptions {
  idMapper?: (info: IdMapperInfo) => string | null | undefined;
  idPrefix?: string;
  pretty: boolean;
  sliceLookup?: (
    gid: string,
  ) => { len: number; src: "A" | "B"; start: number } | null;
}

function kindOf(v: boolean | number | string | null): keyof typeof COLORS {
  return typeof v === "string"
    ? "string"
    : typeof v === "number"
      ? "number"
      : typeof v === "boolean"
        ? "bool"
        : "null";
}

function renderVal(
  v: JsonValue,
  path: string,
  indent: number,
  opts: RenderOptions,
): string {
  const idPrefix = opts.idPrefix ?? "";
  const pad = "  ".repeat(indent);
  let out = "";

  if (Array.isArray(v)) {
    out += "[";
    if (opts.pretty) out += "\n";
    for (const [idx, item] of v.entries()) {
      if (opts.pretty) out += pad + "  ";
      if (isPrimitive(item)) {
        const localId = idxValId(path, idx);
        const globalId = opts.idMapper
          ? opts.idMapper({ index: idx, kind: "index", path }) ||
            `${idPrefix}${localId}`
          : `${idPrefix}${localId}`;
        const kind = kindOf(item);
        if (typeof item === "string") out += "&quot;";
        out += coloredSpan(String(item), kind, globalId);
        if (typeof item === "string") out += "&quot;";
        out += refChip(globalId, opts.sliceLookup);
      } else {
        out += renderVal(item, `${path}/${idx}`, indent + 1, opts);
      }
      out += idx < v.length - 1 ? "," : "";
      if (opts.pretty) out += "\n";
    }
    if (opts.pretty) out += pad;
    out += "]";
    return out;
  }

  if (v && typeof v === "object") {
    const keys = Object.keys(v);
    out += "{";
    if (opts.pretty) out += "\n";
    for (const [idx, k] of keys.entries()) {
      const localKeyId = keyId(path, k);
      const keyGlobalId = opts.idMapper
        ? opts.idMapper({ key: k, kind: "key", path }) ||
          `${idPrefix}${localKeyId}`
        : `${idPrefix}${localKeyId}`;
      if (opts.pretty) out += pad + "  ";
      out += `&quot;${coloredSpan(k, "key", keyGlobalId)}&quot;:`;
      const v2 = (v as Record<string, JsonValue>)[k]!;
      if (isPrimitive(v2)) {
        const localValId = valId(path, k);
        const valGlobalId = opts.idMapper
          ? opts.idMapper({ key: k, kind: "value", path }) ||
            `${idPrefix}${localValId}`
          : `${idPrefix}${localValId}`;
        const kind = kindOf(v2);
        if (typeof v2 === "string") out += "&quot;";
        out += coloredSpan(String(v2), kind, valGlobalId);
        if (typeof v2 === "string") out += "&quot;";
        out += refChip(valGlobalId, opts.sliceLookup);
      } else {
        out += renderVal(v2, `${path}/${k}`, indent + 1, opts);
      }
      out += idx < keys.length - 1 ? "," : "";
      if (opts.pretty) out += "\n";
    }
    if (opts.pretty) out += pad;
    out += "}";
    return out;
  }

  const localId = `${path}#value`;
  const globalId = opts.idMapper
    ? opts.idMapper({ kind: "value", path }) || `${idPrefix}${localId}`
    : `${idPrefix}${localId}`;
  const kind = kindOf(v);
  if (typeof v === "string") out += "&quot;";
  out += coloredSpan(String(v), kind, globalId);
  if (typeof v === "string") out += "&quot;";
  out += refChip(globalId, opts.sliceLookup);
  return out;
}

export function renderJsonBlock(
  value: JsonValue,
  title: string,
  opts: RenderOptions,
) {
  const body = renderVal(value, "", 0, opts);
  return `<div class="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-slate-100 shadow-sm">
    <h3 class="mb-1 text-sm font-medium tracking-wide text-slate-200">${escapeHtml(title)}</h3>
    <pre class="max-h-40 overflow-auto rounded-lg border border-neutral-800 bg-[#111111] p-2 font-mono text-[12px]/5 text-neutral-200">${body}</pre>
  </div>`;
}

export function renderByteBuffer(
  entries: ByteMapEntry[],
  json: string,
  title: string,
  idPrefix: "A:" | "B:",
) {
  const bytes = new TextEncoder().encode(json);
  const PX = 6;
  const H = 12;
  const viewW = Math.max(bytes.length * PX, 1);

  const backgroundRects = Array.from(
    bytes,
    (_, i) =>
      `<rect fill="#111111" height="${H}" width="${PX - 1}" x="${i * PX}" y="4"></rect>`,
  ).join("");
  const entryRects = entries
    .map((e) => {
      const x = e.start * PX;
      const w = Math.max(2, e.len * PX);
      const gid = `${idPrefix}${e.localId}`;
      const color = COLORS[e.kind];
      return `<rect class="zc-byte" data-gid="${escapeHtml(gid)}" style="--zc-fill:${color}33;--zc-fill-hover:${color}66;--zc-stroke:${color};" fill="var(--zc-fill)" height="${H}" stroke="var(--zc-stroke)" stroke-width="1" width="${w}" x="${x}" y="4"></rect>`;
    })
    .join("");

  return `<div class="rounded-xl border border-neutral-800 bg-neutral-900 p-3 text-neutral-100">
    <h3 class="mb-1 text-sm font-medium tracking-wide text-slate-200">${escapeHtml(title)}</h3>
    <div class="mt-2 border border-neutral-800 bg-[#111111]">
      <svg class="block" height="${H + 8}" preserveAspectRatio="none" viewBox="0 0 ${viewW} ${H + 8}" width="100%">
        <rect fill="#111111" height="${H + 8}" width="${viewW}" x="0" y="0"></rect>
        ${backgroundRects}
        ${entryRects}
      </svg>
    </div>
    <p class="mt-1 text-xs text-neutral-400">Colored bars are <strong>byte slices</strong>. Final response references these offsets; no copies.</p>
  </div>`;
}
