export const projects = {
  codegen: {
    featured: true,
    title: 'GraphQL Code Generator',
    image:
      'https://www.graphql-code-generator.com/assets/illustrations/gql-codegen-cover.svg',
    link: 'https://graphql-code-generator.com',
    description: (
      <>
        <p>
          GraphQL Code Generator is a tool that generates code out of your
          GraphQL schema and Operations.
        </p>
        <p>
          Official support for TypeScript, Flow, React, Angular, MongoDB,
          Stencil, Reason, and more.
        </p>
      </>
    ),
  },
  envelop: {
    featured: true,
    title: 'Envelop: The missing GraphQL plugin system',
    image: 'https://www.envelop.dev/assets/home-claw.png',
    link: 'https://www.envelop.dev/',
    description: (
      <>
        <p>
          Develop and share plugins that are usable with any GraphQL server
          framework or schema.
        </p>
      </>
    ),
  },
  yoga: {
    featured: true,
    title: 'GraphQL-Yoga: Modern GraphQL Server',
    image: 'https://graphql-yoga.com/assets/logo.svg',
    link: 'https://graphql-yoga.com/',
    description: (
      <>
        <p>
          Fully-featured GraphQL Server with focus on easy setup, performance
          and great developer experience
        </p>
      </>
    ),
  },
  'graphql-eslint': {
    featured: true,
    title: 'GraphQL-ESLint',
    image:
      'https://raw.githubusercontent.com/dotansimha/graphql-eslint/master/logo.png',
    link: 'https://github.com/dotansimha/graphql-eslint',
    description: (
      <>
        <p>
          GraphQL-ESLint integrates GraphQL AST in the ESLint core (as a
          parser).
        </p>
        <p>
          Works on schema and operations, easily customizable, supports custom
          rules, visualize lint issues in real-time in IDEs.
        </p>
      </>
    ),
  },
  inspector: {
    featured: true,
    title: 'GraphQL-Inspector',
    image: 'https://graphql-inspector.com/img/logo.svg',
    link: 'https://graphql-inspector.com',
    description: (
      <>
        <p>
          GraphQL Inspector is a set of tools to help you better maintain and
          improve GraphQL API as well as GraphQL consumers.
        </p>
        <p>
          Integrates with GitHub and runs in any Continous Integration and
          Delivery pipeline.
        </p>
      </>
    ),
  },
  mesh: {
    featured: true,
    title: 'GraphQL-Mesh',
    image: 'https://www.graphql-mesh.com/assets/subheader-logo.svg',
    link: 'https://graphql-mesh.com',
    description: (
      <p>
        GraphQL Mesh allows you to use GraphQL query language to access data in
        remote APIs that don&apos;t run GraphQL (and also ones that do run
        GraphQL). It can be used as a gateway to other services, or run as a
        local GraphQL schema that aggregates data from remote APIs.
      </p>
    ),
  },
  modules: {
    featured: true,
    title: 'GraphQL-Modules',
    image: '/img/logos/modules.svg',
    link: 'https://graphql-modules.com',
    description: (
      <p>
        GraphQL Modules lets you separate your backend implementation to small,
        reusable, easy-to-implement and easy-to-test pieces.
      </p>
    ),
  },
  tools: {
    featured: true,
    title: 'Utilities for GraphQL',
    image: '/img/logos/tools.svg',
    link: 'https://graphql-tools.com',
    description: (
      <>
        <p>
          A set of utilities to build your JavaScript GraphQL schema in a
          concise and powerful way.
        </p>
        <p>
          Use GraphQL-first philosophy, mock your API or stitch multiple GraphQL
          Schemas
        </p>
      </>
    ),
  },
  cli: {
    featured: false,
    title: 'GraphQL CLI',
    image: '/img/logos/cli.svg',
    link: 'https://github.com/Urigo/graphql-cli',
    description: (
      <>
        <p>Command line tool for common GraphQL development workflows</p>
        <p>
          Improve your workflows. Compatible with editors and IDEs. Powerful
          plugin system.
        </p>
      </>
    ),
  },
  sofa: {
    featured: false,
    title: 'REST API from GraphQL - with SOFA',
    image: '/img/logos/sofa.svg',
    link: 'https://sofa-api.com',
    description: (
      <>
        <p>Generate RESTful APIs from your GraphQL Server</p>
        <p>
          Sofa takes your GraphQL Schema, looks for available queries, mutations
          and subscriptions and turns all of that into REST API.
        </p>
      </>
    ),
  },
  config: {
    featured: false,
    title: 'One Configuration for all Tools - GraphQL Config',
    image: '/img/logos/config.svg',
    link: 'https://graphql-config.com',
    description: (
      <>
        <p>One configuration for all your GraphQL tools</p>
        <p>
          The easiest way to configure your development environment with your
          GraphQL Schema. Supported by most tools, editors and IDEs.
        </p>
      </>
    ),
  },
  scalars: {
    featured: false,
    title: 'Collection of GraphQL Scalars',
    image: '/img/logos/scalars.svg',
    link: 'https://www.graphql-scalars.dev',
    description: (
      <>
        <p>
          A library of custom GraphQL Scalars for creating precise type-safe
          GraphQL schemas.
        </p>
        <p>
          GraphQL has a limited set of scalar types and we have found there are
          some additional scalar types that are useful in being more precise in
          our schemas
        </p>
      </>
    ),
  },
  apolloAngular: {
    featured: false,
    title: 'Apollo-Angular: GraphQL in Angular',
    image: '/img/logos/apollo-angular.svg',
    link: 'https://apollo-angular.com',
    description: (
      <>
        <p>
          A fully-featured, production ready caching GraphQL client for Angular
          and every GraphQL server.
        </p>
        <p>
          Apollo Angular allows you to fetch data from your GraphQL server and
          use it in building complex and reactive UIs using the Angular
          framework. Apollo Angular may be used in any context that Angular may
          be used. In the browser, in NativeScript, or in Node.js when you want
          to do server-side rendering.
        </p>
      </>
    ),
  },
  stencilApollo: {
    featured: false,
    title: 'GraphQL in WebComponents - Stencil Apollo',
    image: '/img/logos/stencil-apollo.svg',
    link: 'https://github.com/ardatan/stencil-apollo',
    description: (
      <>
        <p>Stencil-Apollo lets you easily use GraphQL in Web Components.</p>
        <p>
          Stencil-Apollo has the same functionalities as its React sibling
          React-Apollo, and the usage is really simple. You're able to take
          advantage of an entire ecosystem of Apollo Links and Cache
          implementations
        </p>
      </>
    ),
  },
  swiftGraphql: {
    featured: true,
    title: 'SwiftGraphQL - A GraphQL client for Swift lovers',
    image: '/static/shared-logos/products/swift.svg',
    link: 'https://github.com/maticzav/swift-graphql',
    description: (
      <>
        <p>SwiftGraphQL - A GraphQL client for Swift lovers.</p>
        <p>
          SwiftGraphQL is centred around the core principle that every query you
          can possibly make is valid. If your project compiles, your queries
          work. We've mirrored all GraphQL structures and made them better by
          adding type-safety. You have to try it!
        </p>
      </>
    ),
  },
  graphqlShield: {
    featured: true,
    title:
      'GraphQLShield - GraphQL Permissions Framework For Complex Authorisation Systems',
    image: '/static/shared-logos/products/shield.svg',
    link: 'https://github.com/maticzav/graphql-shield',
    description: (
      <>
        <p>GraphQLShield - GraphQL permissions made easy!</p>
        <p>
          Shield is a GraphQL library that helps you create a permission layer
          for your server. Its main focus is creating a meaningful, well-rounded
          and scalable API that will make you confident about your permission
          layer.
        </p>
      </>
    ),
  },
};
