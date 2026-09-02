import { getCollection } from "astro:content";

import { getDocsNav } from "../../../hive/lib/docs-nav";
import { getLlmsText } from "../../../hive/lib/llms";

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
