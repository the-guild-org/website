import { withGuildDocs } from '@theguild/components/next.config';

export default withGuildDocs({
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    // needs for canonical <link />
    SITE_URL: 'https://the-guild.dev',
  },
  output: 'export',
  redirects: () =>
    Object.entries({
      '/contact': '/#get-in-touch',
      '/solutions': '/#platform',
      '/connected-build': '/',
      '/services': '/#services',
      '/blog/announcing-graphql-hive-public': '/blog/announcing-graphql-hive-release',
      '/blog/announcing-graphql-yoga-2': '/blog/announcing-graphql-yoga-v2',
      '/blog/graphql-eslint-3': '/blog/graphql-eslint-3.14',
      '/blog/graphql-cli': '/blog/graphql-cli-is-back',
      '/open-source': '/about-us',
      // #region Blog posts moved to the Hive blog
      '/blog/graphql-eslint-3.14': 'https://the-guild.dev/graphql/hive/blog/graphql-eslint-3.14',
      '/blog/supercharge-your-subgraph-with-hive':
        'https://the-guild.dev/graphql/hive/blog/supercharge-your-subgraph-with-hive',
      '/blog/state-of-graphql-gateways-in-2023':
        'https://the-guild.dev/graphql/hive/blog/state-of-graphql-gateways-in-2023',
      '/blog/introducing-envelop': 'https://the-guild.dev/graphql/hive/blog/introducing-envelop',
      '/blog/graphql-hive-and-clickhouse':
        'https://the-guild.dev/graphql/hive/blog/graphql-hive-and-clickhouse',
      '/blog/migrating-from-rest': 'https://the-guild.dev/graphql/hive/blog/migrating-from-rest',
      '/blog/graphql-hive-improvements-in-schema-registry':
        'https://the-guild.dev/graphql/hive/blog/graphql-hive-improvements-in-schema-registry',
      '/blog/sofa': 'https://the-guild.dev/graphql/hive/blog/sofa',
      '/blog/unleash-the-power-of-fragments-with-graphql-codegen':
        'https://the-guild.dev/graphql/hive/blog/unleash-the-power-of-fragments-with-graphql-codegen',
      '/blog/graphql-mesh': 'https://the-guild.dev/graphql/hive/blog/graphql-mesh',
      '/blog/graphql-cursor-pagination-with-postgresql':
        'https://the-guild.dev/graphql/hive/blog/graphql-cursor-pagination-with-postgresql',
      '/blog/swift-graphql': 'https://the-guild.dev/graphql/hive/blog/swift-graphql',
      '/blog/graphql-authentication-with-envelop-and-auth0':
        'https://the-guild.dev/graphql/hive/blog/graphql-authentication-with-envelop-and-auth0',
      '/blog/graphql-request-cancellation':
        'https://the-guild.dev/graphql/hive/blog/graphql-request-cancellation',
      '/blog/remote-control-graphql-inspector':
        'https://the-guild.dev/graphql/hive/blog/remote-control-graphql-inspector',
      '/blog/fetch-for-servers': 'https://the-guild.dev/graphql/hive/blog/fetch-for-servers',
      '/blog/collecting-graphql-live-query-resource-identifier-with-graphql-tools':
        'https://the-guild.dev/graphql/hive/blog/collecting-graphql-live-query-resource-identifier-with-graphql-tools',
      '/blog/graphql-response-caching-with-envelop':
        'https://the-guild.dev/graphql/hive/blog/graphql-response-caching-with-envelop',
      '/blog/offline-graphql-the-easy-parts':
        'https://the-guild.dev/graphql/hive/blog/offline-graphql-the-easy-parts',
      '/blog/graphql-scalars': 'https://the-guild.dev/graphql/hive/blog/graphql-scalars',
      '/blog/accountsjs-graphql-modules':
        'https://the-guild.dev/graphql/hive/blog/accountsjs-graphql-modules',
      '/blog/graphql-codegen-plugin-typescript-swr':
        'https://the-guild.dev/graphql/hive/blog/graphql-codegen-plugin-typescript-swr',
      '/blog/new-graphql-inspector':
        'https://the-guild.dev/graphql/hive/blog/new-graphql-inspector',
      '/blog/hive-introducing-schema-policy':
        'https://the-guild.dev/graphql/hive/blog/hive-introducing-schema-policy',
      '/blog/improved-security-with-graphql-armor-support-for-yoga-server-2':
        'https://the-guild.dev/graphql/hive/blog/improved-security-with-graphql-armor-support-for-yoga-server-2',
      '/blog/graphql-modules-scoped-providers':
        'https://the-guild.dev/graphql/hive/blog/graphql-modules-scoped-providers',
      '/blog/hive-summer-update-2023':
        'https://the-guild.dev/graphql/hive/blog/hive-summer-update-2023',
      '/blog/codegen-typescript-react-apollo':
        'https://the-guild.dev/graphql/hive/blog/codegen-typescript-react-apollo',
      '/blog/graphql-codegen-hooks-support-react-apollo':
        'https://the-guild.dev/graphql/hive/blog/graphql-codegen-hooks-support-react-apollo',
      '/blog/schema-change-notifications':
        'https://the-guild.dev/graphql/hive/blog/schema-change-notifications',
      '/blog/graphql-code-generator-and-prisma':
        'https://the-guild.dev/graphql/hive/blog/graphql-code-generator-and-prisma',
      '/blog/joining-graphql-foundation':
        'https://the-guild.dev/graphql/hive/blog/joining-graphql-foundation',
      '/blog/add-reactivity-to-an-existing-source':
        'https://the-guild.dev/graphql/hive/blog/add-reactivity-to-an-existing-source',
      '/blog/graphqlconf-2023-recap':
        'https://the-guild.dev/graphql/hive/blog/graphqlconf-2023-recap',
      '/blog/graphql-mesh-subscriptions':
        'https://the-guild.dev/graphql/hive/blog/graphql-mesh-subscriptions',
      '/blog/graphql-tools-v8': 'https://the-guild.dev/graphql/hive/blog/graphql-tools-v8',
      '/blog/open-source-graphql-security':
        'https://the-guild.dev/graphql/hive/blog/open-source-graphql-security',
      '/blog/optimize-bundle-size-with-swc-and-graphql-codegen':
        'https://the-guild.dev/graphql/hive/blog/optimize-bundle-size-with-swc-and-graphql-codegen',
      '/blog/defer-support-codegen':
        'https://the-guild.dev/graphql/hive/blog/defer-support-codegen',
      '/blog/graphqxl-language': 'https://the-guild.dev/graphql/hive/blog/graphqxl-language',
      '/blog/whats-new-in-graphql-codegen-v2':
        'https://the-guild.dev/graphql/hive/blog/whats-new-in-graphql-codegen-v2',
      '/blog/stellate-acquisition': 'https://the-guild.dev/graphql/hive/blog/stellate-acquisition',
      '/blog/graphql-modules': 'https://the-guild.dev/graphql/hive/blog/graphql-modules',
      '/blog/a-new-year-for-schema-stitching':
        'https://the-guild.dev/graphql/hive/blog/a-new-year-for-schema-stitching',
      '/blog/on-demand-shared-graphql-subscriptions-with-rxjs':
        'https://the-guild.dev/graphql/hive/blog/on-demand-shared-graphql-subscriptions-with-rxjs',
      '/blog/dependency-injection-library-in-graphql-modules':
        'https://the-guild.dev/graphql/hive/blog/dependency-injection-library-in-graphql-modules',
      '/blog/graphql-error-handling-with-fp':
        'https://the-guild.dev/graphql/hive/blog/graphql-error-handling-with-fp',
      '/blog/how-we-shipped-cdn-access-tokens-with-cloudflare-workers-and-r2':
        'https://the-guild.dev/graphql/hive/blog/how-we-shipped-cdn-access-tokens-with-cloudflare-workers-and-r2',
      '/blog/build-realtime-graphql-backends-with-grafbase':
        'https://the-guild.dev/graphql/hive/blog/build-realtime-graphql-backends-with-grafbase',
      '/blog/graphql-geo-strike': 'https://the-guild.dev/graphql/hive/blog/graphql-geo-strike',
      '/blog/graphql-with-typescript-done-right':
        'https://the-guild.dev/graphql/hive/blog/graphql-with-typescript-done-right',
      '/blog/scalable-apis-with-graphql-server-codegen-preset':
        'https://the-guild.dev/graphql/hive/blog/scalable-apis-with-graphql-server-codegen-preset',
      '/blog/whatsapp-clone-apollo-angular-graphql-typescript-and-postgresql':
        'https://the-guild.dev/graphql/hive/blog/whatsapp-clone-apollo-angular-graphql-typescript-and-postgresql',
      '/blog/graphql-yoga-v3': 'https://the-guild.dev/graphql/hive/blog/graphql-yoga-v3',
      '/blog/manage-circular-imports-hell-in-graphql-modules':
        'https://the-guild.dev/graphql/hive/blog/manage-circular-imports-hell-in-graphql-modules',
      '/blog/graphql-over-sse': 'https://the-guild.dev/graphql/hive/blog/graphql-over-sse',
      '/blog/typescript-graphql-unions-types':
        'https://the-guild.dev/graphql/hive/blog/typescript-graphql-unions-types',
      '/blog/graphql-code-generator-011':
        'https://the-guild.dev/graphql/hive/blog/graphql-code-generator-011',
      '/blog/graphql-codegen-and-apollo-client-3':
        'https://the-guild.dev/graphql/hive/blog/graphql-codegen-and-apollo-client-3',
      '/blog/typed-document-node': 'https://the-guild.dev/graphql/hive/blog/typed-document-node',
      '/blog/extending-your-graphql-service':
        'https://the-guild.dev/graphql/hive/blog/extending-your-graphql-service',
      '/blog/how-to-write-graphql-resolvers-effectively':
        'https://the-guild.dev/graphql/hive/blog/how-to-write-graphql-resolvers-effectively',
      '/blog/graphql-config': 'https://the-guild.dev/graphql/hive/blog/graphql-config',
      '/blog/houdini-and-kitql': 'https://the-guild.dev/graphql/hive/blog/houdini-and-kitql',
      '/blog/federation-gateway-audit':
        'https://the-guild.dev/graphql/hive/blog/federation-gateway-audit',
      '/blog/the-complete-graphql-scalar-guide':
        'https://the-guild.dev/graphql/hive/blog/the-complete-graphql-scalar-guide',
      '/blog/graphql-authz': 'https://the-guild.dev/graphql/hive/blog/graphql-authz',
      '/blog/graphql-yoga-worker': 'https://the-guild.dev/graphql/hive/blog/graphql-yoga-worker',
      '/blog/caching-data-with-dataloader':
        'https://the-guild.dev/graphql/hive/blog/caching-data-with-dataloader',
      '/blog/announcing-graphql-yoga-v2':
        'https://the-guild.dev/graphql/hive/blog/announcing-graphql-yoga-v2',
      '/blog/graphql-yoga-nestjs-v9':
        'https://the-guild.dev/graphql/hive/blog/graphql-yoga-nestjs-v9',
      '/blog/graphql-as-a-best-practice-for-modern-angular-apps':
        'https://the-guild.dev/graphql/hive/blog/graphql-as-a-best-practice-for-modern-angular-apps',
      '/blog/graphql-stencil-apollo':
        'https://the-guild.dev/graphql/hive/blog/graphql-stencil-apollo',
      '/blog/better-type-safety-for-resolvers-with-graphql-codegen':
        'https://the-guild.dev/graphql/hive/blog/better-type-safety-for-resolvers-with-graphql-codegen',
      '/blog/graphql-tools-v6': 'https://the-guild.dev/graphql/hive/blog/graphql-tools-v6',
      '/blog/accounts.js-1.0-rc': 'https://the-guild.dev/graphql/hive/blog/accounts.js-1.0-rc',
      '/blog/graphql-modules-auth': 'https://the-guild.dev/graphql/hive/blog/graphql-modules-auth',
      '/blog/graphql-tools-v7': 'https://the-guild.dev/graphql/hive/blog/graphql-tools-v7',
      '/blog/announcing-graphql-hive-release':
        'https://the-guild.dev/graphql/hive/blog/announcing-graphql-hive-release',
      '/blog/building-graphql-servers-in-2022':
        'https://the-guild.dev/graphql/hive/blog/building-graphql-servers-in-2022',
      '/blog/introducing-graphql-eslint':
        'https://the-guild.dev/graphql/hive/blog/introducing-graphql-eslint',
      '/blog/announcing-free-single-sign-on-for-graphql-hive':
        'https://the-guild.dev/graphql/hive/blog/announcing-free-single-sign-on-for-graphql-hive',
      '/blog/whats-new-in-graphql-cli-4.1.0':
        'https://the-guild.dev/graphql/hive/blog/whats-new-in-graphql-cli-4.1.0',
      '/blog/announcing-self-hosted-graphql-hive':
        'https://the-guild.dev/graphql/hive/blog/announcing-self-hosted-graphql-hive',
      '/blog/introducing-graphql-inspector':
        'https://the-guild.dev/graphql/hive/blog/introducing-graphql-inspector',
      '/blog/graphql-deep-dive-6': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-6',
      '/blog/graphql-over-internet':
        'https://the-guild.dev/graphql/hive/blog/graphql-over-internet',
      '/blog/subscriptions-and-live-queries-real-time-with-graphql':
        'https://the-guild.dev/graphql/hive/blog/subscriptions-and-live-queries-real-time-with-graphql',
      '/blog/graphql-typescript-modules-codegen':
        'https://the-guild.dev/graphql/hive/blog/graphql-typescript-modules-codegen',
      '/blog/graphql-codegen-best-practices':
        'https://the-guild.dev/graphql/hive/blog/graphql-codegen-best-practices',
      '/blog/taking-over-merge-graphql-schemas':
        'https://the-guild.dev/graphql/hive/blog/taking-over-merge-graphql-schemas',
      '/blog/apollo-angular-12': 'https://the-guild.dev/graphql/hive/blog/apollo-angular-12',
      '/blog/graphql-code-generator':
        'https://the-guild.dev/graphql/hive/blog/graphql-code-generator',
      '/blog/graphql-let': 'https://the-guild.dev/graphql/hive/blog/graphql-let',
      '/blog/modular-encapsulation-graphql-modules':
        'https://the-guild.dev/graphql/hive/blog/modular-encapsulation-graphql-modules',
      '/blog/graphql-deep-dive-5': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-5',
      '/blog/announcing-graphql-network-inspector':
        'https://the-guild.dev/graphql/hive/blog/announcing-graphql-network-inspector',
      '/blog/graphql-cli-is-back': 'https://the-guild.dev/graphql/hive/blog/graphql-cli-is-back',
      '/blog/understanding-the-differences-between-graphql-and-rest-api-gateways':
        'https://the-guild.dev/graphql/hive/blog/understanding-the-differences-between-graphql-and-rest-api-gateways',
      '/blog/ci-ci-graphql-inspector':
        'https://the-guild.dev/graphql/hive/blog/ci-ci-graphql-inspector',
      '/blog/graphql-hive-preview': 'https://the-guild.dev/graphql/hive/blog/graphql-hive-preview',
      '/blog/graphql-deep-dive-4': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-4',
      '/blog/graphql-codegen-relay-compiler':
        'https://the-guild.dev/graphql/hive/blog/graphql-codegen-relay-compiler',
      '/blog/apollo-angular-011': 'https://the-guild.dev/graphql/hive/blog/apollo-angular-011',
      '/blog/graphql-codegen-java': 'https://the-guild.dev/graphql/hive/blog/graphql-codegen-java',
      '/blog/graphql-mesh-v1-hive-gateway-v1':
        'https://the-guild.dev/graphql/hive/blog/graphql-mesh-v1-hive-gateway-v1',
      '/blog/slack-bot-with-cloudflare':
        'https://the-guild.dev/graphql/hive/blog/slack-bot-with-cloudflare',
      '/blog/graphql-modules-v1': 'https://the-guild.dev/graphql/hive/blog/graphql-modules-v1',
      '/blog/graphql-deep-dive-1': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-1',
      '/blog/how-not-to-learn-graphql':
        'https://the-guild.dev/graphql/hive/blog/how-not-to-learn-graphql',
      '/blog/graphql-deep-dive-3': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-3',
      '/blog/open-source-apollo-federation':
        'https://the-guild.dev/graphql/hive/blog/open-source-apollo-federation',
      '/blog/graphql-over-websockets':
        'https://the-guild.dev/graphql/hive/blog/graphql-over-websockets',
      '/blog/the-anatomy-of-a-graphql-request':
        'https://the-guild.dev/graphql/hive/blog/the-anatomy-of-a-graphql-request',
      '/blog/graphql-code-generator-090':
        'https://the-guild.dev/graphql/hive/blog/graphql-code-generator-090',
      '/blog/whatsapp-clone-react-hooks-graphql-typescript-and-postgresql':
        'https://the-guild.dev/graphql/hive/blog/whatsapp-clone-react-hooks-graphql-typescript-and-postgresql',
      '/blog/multiple-environments-endpoints-graphql-inspector':
        'https://the-guild.dev/graphql/hive/blog/multiple-environments-endpoints-graphql-inspector',
      '/blog/graphql-deep-dive-2': 'https://the-guild.dev/graphql/hive/blog/graphql-deep-dive-2',
      // #endregion Blog posts moved to the Hive blog
    }).map(([from, to]) => ({
      source: from,
      destination: to,
      permanent: true,
    })),
});
