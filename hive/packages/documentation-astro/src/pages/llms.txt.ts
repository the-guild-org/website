import { getCollection } from "astro:content";

import { getDocsNav } from "../lib/docs-nav";
import { getLlmsText } from "../lib/llms";

export const prerender = true;

export async function GET() {
  const [entries, { tree }] = await Promise.all([
    getCollection("docs"),
    getDocsNav(),
  ]);

  return new Response(getLlmsText(entries, tree), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
