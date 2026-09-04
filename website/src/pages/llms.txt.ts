import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_ORIGIN as SITE } from '../hive/lib/base-path';

// Root-level llms.txt: an index of The Guild's ecosystem for agents and
// crawlers. The Hive docs ship their own, much deeper one under
// /graphql/hive/llms.txt; the product sites are separate deployments and are
// linked rather than inlined.
export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );

  const body = `# The Guild

> Open-source GraphQL infrastructure for enterprises: the Hive federation
> platform (schema registry, gateway, observability) and the most-used
> open-source GraphQL libraries (GraphQL Codegen, Yoga, GraphQL-Tools, Mesh).

## Hive — GraphQL Federation Platform

- [Hive](${SITE}/graphql/hive): open-source schema registry, gateway and observability
- [Hive documentation index for LLMs](${SITE}/graphql/hive/llms.txt)
- [Full Hive documentation as one file](${SITE}/graphql/hive/llms-full.txt)
- [Pricing](${SITE}/graphql/hive/pricing)
- [GraphQL federation explained](${SITE}/graphql/hive/federation)

## Open-source libraries

- [GraphQL Codegen](${SITE}/graphql/codegen): typed code from GraphQL schemas and operations
- [GraphQL Yoga](${SITE}/graphql/yoga-server): spec-compliant GraphQL server
- [GraphQL-Tools](${SITE}/graphql/tools): schema building and stitching utilities
- [GraphQL Mesh](${SITE}/graphql/mesh): compose any API into a graph
- [GraphQL Scalars](${SITE}/graphql/scalars): custom scalar types
- [GraphQL Inspector](${SITE}/graphql/inspector): schema change validation

## Blog

${posts.map(post => `- [${post.data.title}](${SITE}/blog/${post.id}): ${post.data.description}`).join('\n')}
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
