import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'ws',
  name: 'GraphQL over WebSocket',
  shortName: 'WS',
  mark: 'WS ',
  description:
    'Coherent, zero-dependency, lazy, simple, GraphQL over WebSocket spec compliant server and client.',
  repo: 'enisdenjo/graphql-ws',
  branch: 'master',
  // TEMPORARY: until enisdenjo/graphql-ws's website-content-only branch merges
  // (https://github.com/enisdenjo/graphql-ws/pull/685, opened from a fork).
  contentRef: 'refs/pull/685/head',
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
    'graphql-ws is the reference implementation of the GraphQL over WebSocket protocol: a zero-dependency server and client for queries, mutations and subscriptions over WebSocket, with adapters for ws, uWebSockets.js, Fastify, Bun, Deno and crossws.',
  landing: {
    headline: 'GraphQL over WebSocket, done by the book',
    tagline:
      'Zero-dependency, lazy, simple, spec compliant server and client. graphql-ws is the reference implementation of the GraphQL over WebSocket protocol, with adapters for every popular WebSocket server.',
    claims: [
      'Spec compliant, as the reference implementation',
      'Server and client in one small library',
      'Adapters for ws, uWebSockets.js, Fastify, Bun and Deno',
    ],
    getStarted: '/guides',
    featuresTitle: 'Resilient subscriptions, without the ceremony',
    features: [
      {
        title: 'Spec compliant',
        copy: 'Fully compliant with the GraphQL over WebSocket protocol, with strong authentication rules through an easy API and pings and pongs to measure latency and keep connections alive.',
        href: '/docs/common',
        icon: 'safe-line',
      },
      {
        title: 'Server and client',
        copy: 'One zero-dependency library ships both sides. Tree-shaking and module separation keep the bundle small, and smart retry strategies let you shape reconnection to your needs.',
        href: '/docs/client/functions/createClient',
        icon: 'pulse-line',
      },
      {
        title: 'Choose your server',
        copy: 'Ready-made handlers for ws, uWebSockets.js, @fastify/websocket, Bun, Deno and crossws, or plug the protocol-only server into any WebSocket implementation.',
        href: '/docs/server/functions/makeServer',
        icon: 'server-line',
      },
    ],
    codeSample: {
      title: 'Subscribe in a few lines',
      copy: 'Start a server on top of ws, then iterate over subscription events on the client with an async iterator; queries and mutations go through the same connection.',
      code: `import { createClient } from 'graphql-ws';

const client = createClient({
  url: 'ws://localhost:4000/graphql',
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
        copy: 'Short and concise code snippets for common use cases: Relay, urql, Apollo, auth, pings and pongs, persisted queries and more.',
        href: '/guides/recipes',
        label: 'Browse the recipes',
      },
      {
        title: 'API reference',
        copy: 'Every module, function, interface and type of the client, the server, the protocol messages and the server adapters.',
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
