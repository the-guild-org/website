export type JsonValue =
  | JsonValue[]
  | { [key: string]: JsonValue }
  | boolean
  | number
  | string
  | null;

export const COLORS = {
  bool: "#60a5fa",
  key: "#8b93ff",
  null: "#9ca3af",
  number: "#f59e0b",
  string: "#34d399",
} as const;

function enc(str: string) {
  return new TextEncoder().encode(str);
}

function isPrimitive(v: unknown): v is boolean | number | string | null {
  return (
    v === null ||
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "boolean"
  );
}

function keyId(path: string, key: string) {
  return `${path}/${key}#key`;
}
function valId(path: string, key: string) {
  return `${path}/${key}#value`;
}
function idxValId(path: string, i: number) {
  return `${path}/${i}#value`;
}

function escapeJSONString(s: string) {
  return s.replaceAll("\\", "\\\\").replaceAll('"', String.raw`\"`);
}

export interface ByteMapEntry {
  kind: keyof typeof COLORS;
  len: number;
  localId: string;
  start: number;
}

export function serializeWithByteMap(val: JsonValue) {
  const entries: ByteMapEntry[] = [];
  let out = "";
  let bytePos = 0;
  const push = (chunk: string) => {
    out += chunk;
    bytePos += enc(chunk).length;
  };

  const walk = (v: JsonValue, path: string) => {
    if (Array.isArray(v)) {
      push("[");
      for (const [idx, item] of v.entries()) {
        if (isPrimitive(item)) {
          if (typeof item === "string") {
            push('"');
            const content = escapeJSONString(item);
            const start = bytePos;
            push(content);
            entries.push({
              kind: "string",
              len: enc(content).length,
              localId: idxValId(path, idx),
              start,
            });
            push('"');
          } else if (typeof item === "number") {
            const text = String(item);
            const start = bytePos;
            push(text);
            entries.push({
              kind: "number",
              len: enc(text).length,
              localId: idxValId(path, idx),
              start,
            });
          } else if (typeof item === "boolean") {
            const text = item ? "true" : "false";
            const start = bytePos;
            push(text);
            entries.push({
              kind: "bool",
              len: enc(text).length,
              localId: idxValId(path, idx),
              start,
            });
          } else if (item === null) {
            const text = "null";
            const start = bytePos;
            push(text);
            entries.push({
              kind: "null",
              len: enc(text).length,
              localId: idxValId(path, idx),
              start,
            });
          }
        } else {
          walk(item, `${path}/${idx}`);
        }
        if (idx < v.length - 1) push(",");
      }
      push("]");
      return;
    }

    if (v && typeof v === "object") {
      push("{");
      const keys = Object.keys(v);
      for (const [i, k] of keys.entries()) {
        push('"');
        const kEsc = escapeJSONString(k);
        const kStart = bytePos;
        push(kEsc);
        entries.push({
          kind: "key",
          len: enc(kEsc).length,
          localId: keyId(path, k),
          start: kStart,
        });
        push('"');
        push(":");
        const child = (v as Record<string, JsonValue>)[k]!;
        if (isPrimitive(child)) {
          if (typeof child === "string") {
            push('"');
            const content = escapeJSONString(child);
            const start = bytePos;
            push(content);
            entries.push({
              kind: "string",
              len: enc(content).length,
              localId: valId(path, k),
              start,
            });
            push('"');
          } else if (typeof child === "number") {
            const text = String(child);
            const start = bytePos;
            push(text);
            entries.push({
              kind: "number",
              len: enc(text).length,
              localId: valId(path, k),
              start,
            });
          } else if (typeof child === "boolean") {
            const text = child ? "true" : "false";
            const start = bytePos;
            push(text);
            entries.push({
              kind: "bool",
              len: enc(text).length,
              localId: valId(path, k),
              start,
            });
          } else if (child === null) {
            const text = "null";
            const start = bytePos;
            push(text);
            entries.push({
              kind: "null",
              len: enc(text).length,
              localId: valId(path, k),
              start,
            });
          }
        } else {
          walk(child, `${path}/${k}`);
        }
        if (i < keys.length - 1) push(",");
      }
      push("}");
      return;
    }

    if (typeof v === "string") {
      push('"');
      const content = escapeJSONString(v);
      const start = bytePos;
      push(content);
      entries.push({
        kind: "string",
        len: enc(content).length,
        localId: `${path}#value`,
        start,
      });
      push('"');
    } else if (typeof v === "number") {
      const text = String(v);
      const start = bytePos;
      push(text);
      entries.push({
        kind: "number",
        len: enc(text).length,
        localId: `${path}#value`,
        start,
      });
    } else if (typeof v === "boolean") {
      const text = v ? "true" : "false";
      const start = bytePos;
      push(text);
      entries.push({
        kind: "bool",
        len: enc(text).length,
        localId: `${path}#value`,
        start,
      });
    } else if (v === null) {
      const text = "null";
      const start = bytePos;
      push(text);
      entries.push({
        kind: "null",
        len: enc(text).length,
        localId: `${path}#value`,
        start,
      });
    }
  };

  walk(val, "");
  return { entries, json: out };
}

export const subgraphA: JsonValue = {
  active: true,
  user: { email: "ada@lab", id: 1, name: "Ada" },
};

export const finalJson: JsonValue = {
  active: true,
  user: { id: 1, name: "Ada" },
};

export const FINAL_MAP = new Map<string, string>([
  ["/active#key", "A:/active#key"],
  ["/active#value", "A:/active#value"],
  ["/price#key", "B:/price#key"],
  ["/price#value", "B:/price#value"],
  ["/user#key", "A:/user#key"],
  ["/user/id#key", "A:/user/id#key"],
  ["/user/id#value", "A:/user/id#value"],
  ["/user/name#key", "A:/user/name#key"],
  ["/user/name#value", "A:/user/name#value"],
  ["/user/tags#key", "B:/user/tags#key"],
  ["/user/tags/0#value", "B:/user/tags/0#value"],
  ["/user/tags/1#value", "B:/user/tags/1#value"],
]);

export interface IdMapperInfo {
  index?: number;
  key?: string;
  kind: "index" | "key" | "value";
  path: string;
}

export function idMapperFinal(info: IdMapperInfo) {
  if (info.kind === "key" && info.key)
    return FINAL_MAP.get(`${info.path}/${info.key}#key`);
  if (info.kind === "value" && info.key)
    return FINAL_MAP.get(`${info.path}/${info.key}#value`);
  if (info.kind === "index" && typeof info.index === "number")
    return FINAL_MAP.get(`${info.path}/${info.index}#value`);
  return undefined;
}

const adata = serializeWithByteMap(subgraphA);
const mapA = new Map<
  string,
  { kind: keyof typeof COLORS; len: number; start: number }
>();
for (const e of adata.entries)
  mapA.set(e.localId, { kind: e.kind, len: e.len, start: e.start });

export function getAdata() {
  return adata;
}

export function sliceLookup(gid: string) {
  if (gid.startsWith("A:")) {
    const local = gid.slice(2);
    const e = mapA.get(local);
    if (!e) return null;
    return { len: e.len, src: "A" as const, start: e.start };
  }
  return null;
}
