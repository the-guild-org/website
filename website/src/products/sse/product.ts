import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'sse',
  name: 'GraphQL over Server-Sent Events',
  shortName: 'SSE',
  mark: 'SSE',
  description:
    'Zero-dependency, HTTP/1 safe, simple, GraphQL over Server-Sent Events spec compliant server and client.',
  repo: 'enisdenjo/graphql-sse',
  branch: 'master',
  // TEMPORARY: until enisdenjo/graphql-sse's website-content-only branch merges
  // (https://github.com/enisdenjo/graphql-sse/pull/129, opened from a fork).
  contentRef: 'refs/pull/129/head',
  sections: [
    { base: '/guides', dir: 'guides', label: 'Guides', breadcrumb: 'Guides' },
    { base: '/docs', dir: 'docs', label: 'API Reference', breadcrumb: 'API Reference' },
    { base: '/changelog', dir: 'changelog', label: 'Changelog', breadcrumb: 'Changelog' },
  ],
  changelog: 'CHANGELOG.md',
  redirects: {
    '/get-started': '/guides',
    '/recipes': '/guides/recipes',
  },
  llmsTagline:
    'graphql-sse is the reference implementation of the GraphQL over Server-Sent Events protocol: a zero-dependency, HTTP/1 safe server handler and client for queries, mutations and subscriptions over SSE, with adapters for http, http2, express, fastify, koa and fetch.',
  landing: {
    headline: 'GraphQL subscriptions over plain HTTP',
    tagline:
      'Zero-dependency, HTTP/1 safe, simple, spec compliant server and client. graphql-sse is the reference implementation of the GraphQL over Server-Sent Events protocol, and runs wherever a request handler does.',
    claims: [
      'Spec compliant, as the reference implementation',
      'Single and distinct connection modes',
      'Server and client in one small library',
    ],
    getStarted: '/guides',
    featuresTitle: 'Streaming results, no WebSocket required',
    features: [
      {
        title: 'Spec compliant',
        copy: 'Fully compliant with the GraphQL over SSE protocol: a single connection mode that is safe for HTTP/1 servers and subscription-heavy apps, a distinct connection mode where each connection is its own subscription, and improvements over plain SSE for clarity and stability.',
        href: '/docs/modules/common',
        icon: 'safe-line',
      },
      {
        title: 'Server and client',
        copy: 'One zero-dependency library ships both sides. Tree-shaking and module separation keep the bundle small, and smart retry strategies let you shape reconnection to your needs.',
        href: '/docs/modules/client',
        icon: 'pulse-line',
      },
      {
        title: 'Run everywhere',
        copy: 'The handler is completely server agnostic, with ready-made adapters for http, http2, express, fastify, koa and the fetch API, so it runs in Node, Bun, Deno and edge runtimes alike.',
        href: '/docs/modules/handler',
        icon: 'server-line',
      },
    ],
    codeSample: {
      title: 'Subscribe in a few lines',
      copy: 'Mount the handler on any HTTP server, then iterate over subscription events on the client with an async iterator; queries and mutations go through the same client.',
      code: `import { createClient } from 'graphql-sse';

const client = createClient({
  url: 'http://localhost:4000/graphql/stream',
});

const subscription = client.iterate({
  query: 'subscription { greetings }',
});

for await (const event of subscription) {
  console.log(event.data); // { greetings: 'Hi' }, { greetings: 'Bonjour' }, ...
}`,
      lang: 'ts',
      href: '/guides',
      cta: 'Get started',
    },
    links: [
      {
        title: 'Recipes',
        copy: 'Short and concise code snippets for common use cases: EventSource, Relay, urql, Apollo, auth, dynamic schemas, persisted queries and more.',
        href: '/guides/recipes',
        label: 'Browse the recipes',
      },
      {
        title: 'API reference',
        copy: 'Every module, function, class and interface of the client, the handler, the protocol messages and the server adapters.',
        href: '/docs',
        label: 'API reference',
      },
      {
        title: 'Changelog',
        copy: 'Every release and the changes it brought.',
        href: '/changelog',
        label: 'Changelog',
      },
    ],
  },
} satisfies ProductDefinition;
