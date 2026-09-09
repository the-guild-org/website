import type { ProductDefinition } from '../define';

// Type-only import and `satisfies`: node's type stripping drops both, so the
// plain scripts under scripts/products can load this file without a bundler.
export default {
  slug: 'apollo-angular',
  name: 'Apollo Angular',
  shortName: 'Apollo Angular',
  mark: 'ANG',
  description: 'GraphQL client for the Angular framework.',
  repo: 'the-guild-org/apollo-angular',
  branch: 'master',
  sections: [{ base: '/docs', dir: 'docs', label: 'Documentation' }],
  redirects: {
    '/docs/features/subscriptions.html': '/docs/data/subscriptions',
    '/docs/basics/*': '/docs/data/:splat',
    '/docs/features/developer-tooling': '/docs/development-and-testing/developer-tools',
    '/docs/features/developer-tooling.html': '/docs/development-and-testing/developer-tools',
    '/docs/features/multiple-clients.html': '/docs/recipes/multiple-clients',
    '/docs/features/optimistic-ui.html': '/docs/performance/optimistic-ui',
    '/docs/recipes/pagination.html': '/docs/data/pagination',
    '/docs/recipes/prefetching.html': '/docs',
    '/docs/recipes/prefetching': '/docs',
    '/docs/recipes/server-side-rendering.html': '/docs/performance/server-side-rendering',
    '/docs/features/static-typing.html': '/docs',
    '/docs/features/caching.html': '/docs',
    '/docs/features/cache-updates': '/docs',
    '/docs/features/subscriptions': '/docs/data/subscriptions',
    '/docs/features/cache-updates.html': '/docs',
    '/docs/features/fragments.html': '/docs/data/fragments',
    '/docs/guides/testing.html': '/docs/development-and-testing/testing',
    '/docs/guides/testing': '/docs/development-and-testing/testing',
    '/docs/data': '/docs/data/queries',
    '/docs/caching': '/docs/caching/configuration',
    '/docs/local-state': '/docs/local-state/management',
    '/docs/development-and-testing': '/docs/development-and-testing/using-typescript',
    '/docs/performance': '/docs/performance/improving-performance',
    '/docs/recipes': '/docs/recipes/automatic-persisted-queries',
  },
  llmsTagline:
    'The GraphQL client for Angular applications: Apollo Client integrated with Angular services, RxJS observables, dependency injection, and server-side rendering.',
  landing: {
    headline: 'GraphQL for Angular',
    tagline:
      'Apollo Angular brings Apollo Client to Angular: queries, mutations and subscriptions as RxJS observables, injectable services, and a normalized cache.',
    claims: ['Idiomatic Angular services', 'RxJS observables', 'SSR and caching built in'],
    getStarted: '/docs',
    featuresTitle: 'Why Apollo Angular',
    features: [
      {
        title: 'Easy to use',
        copy: 'Designed from the ground up to be easily configured and used, to get your application up and running quickly.',
        href: '/docs/get-started',
        icon: 'timer-line',
      },
      {
        title: 'Customisable',
        copy: 'Extend or customize your GraphQL setup. Apollo Angular can be extended on every level, from links to the cache.',
        href: '/docs/recipes/automatic-persisted-queries',
        icon: 'puzzle',
      },
      {
        title: 'Production-ready',
        copy: 'Used with success and proven by many large-scale applications, with server-side rendering and performance guides included.',
        href: '/docs/performance/improving-performance',
        icon: 'safe-line',
      },
    ],
    codeSample: {
      title: 'Queries as observables',
      copy: 'Inject Apollo, write a query, and subscribe like any other Angular data source. Types flow through with GraphQL Code Generator.',
      code: `import { Component, inject } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

const GET_POSTS = gql\`
  query GetPosts {
    posts {
      id
      title
    }
  }
\`;

@Component({ selector: 'app-posts', template: '...' })
export class PostsComponent {
  posts$ = inject(Apollo).watchQuery({ query: GET_POSTS }).valueChanges;
}`,
      lang: 'ts',
      href: '/docs/data/queries',
      cta: 'Learn about queries',
    },
    links: [
      {
        title: 'Get started',
        copy: 'Install the packages, create the Apollo module, and run your first query.',
        href: '/docs/get-started',
        label: 'Setup guide',
      },
      {
        title: 'Caching',
        copy: 'Configure the normalized cache, control field behavior, and keep the UI in sync after mutations.',
        href: '/docs/caching/configuration',
        label: 'Caching docs',
      },
      {
        title: 'Testing',
        copy: 'Mock the GraphQL layer and test components and services in isolation.',
        href: '/docs/development-and-testing/testing',
        label: 'Testing guide',
      },
    ],
  },
} satisfies ProductDefinition;
