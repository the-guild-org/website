import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { IMarketplaceSearchProps } from "./types/components";
import { MarketplaceSearch } from "./marketplace-search";

export default {
  title: "Components/MarketplaceSearch",
  component: MarketplaceSearch,
  argTypes: {
    title: {
      name: "Title",
    },
    placeholder: {
      name: "Input Placeholder",
    },
    colorScheme: {
      control: {
        type: "select",
      },
      options: ["green", "neutral"],
    },
  },
  decorators: [hiveThemeDecorator],
} satisfies Meta<typeof MarketplaceSearch>;

type Story = StoryObj<typeof MarketplaceSearch>;

export const Default: Story = {
  name: "MarketplaceSearch",
  args: dummyMarketplaceSearch(),
};

export const Green: Story = {
  ...Default,
  name: "MarketplaceSearch Green",
  args: {
    ...Default.args,
    colorScheme: "green",
  },
};

function dummyMarketplaceSearch(): IMarketplaceSearchProps {
  const ICON_PREFIX =
    "https://raw.githubusercontent.com/dotansimha/graphql-code-generator/42b2224199041a5f768041cce1e8eff2816f1797/website/src/lib/plugins/icons";
  return {
    title: "Explore Plugins & Presets",
    tagsFilter: [
      "preset",
      "plugin",
      "typescript",
      "csharp",
      "dart",
      "flutter",
      "flow",
      "java",
      "utilities",
      "mongodb",
      "nhost",
      "angular",
      "react",
      "svelte",
      "next",
      "apollo",
      "urql",
      "vue",
      "kotlin",
      "android",
      "reason",
      "relay",
      "jsdoc",
      "resolvers",
      "hasura",
      "validation",
      "yup",
      "zod",
    ],
    placeholder: "Search plugins...",
    primaryList: {
      title: "Trending",
      items: [
        {
          title: "TypeScript",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript",
            title: "TypeScript plugin details",
          },
          update: "2024-10-22T16:31:00.380Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript",
          },
          weeklyNPMDownloads: 2_700_869,
        },
        {
          title: "Schema AST",
          description:
            "GraphQL Code Generator plugin for generating a .graphql file from a given schema",
          tags: ["plugin", "utilities"],
          link: {
            href: "/plugins/other/schema-ast",
            title: "Schema AST plugin details",
          },
          update: "2024-06-30T06:20:59.195Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Schema AST",
          },
          weeklyNPMDownloads: 2_388_871,
        },
        {
          title: "TypeScript Operations",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types for GraphQL queries, mutations, subscriptions and fragments",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-operations",
            title: "TypeScript Operations plugin details",
          },
          update: "2024-10-22T16:31:00.240Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Operations",
          },
          weeklyNPMDownloads: 2_343_520,
        },
        {
          title: "Add",
          description:
            "GraphQL Code Generator plugin for adding custom content to your output file",
          tags: ["plugin"],
          link: {
            href: "/plugins/other/add",
            title: "Add plugin details",
          },
          update: "2024-06-13T10:03:13.074Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Add",
          },
          weeklyNPMDownloads: 2_184_576,
        },
        {
          title: "TypedDocumentNode",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use TypedDocumentNode based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typed-document-node",
            title: "TypedDocumentNode plugin details",
          },
          update: "2024-10-22T16:30:59.901Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypedDocumentNode",
          },
          weeklyNPMDownloads: 1_505_771,
        },
        {
          title: "Client preset",
          description: "GraphQL Code Generator preset for client.",
          tags: ["preset", "next", "react", "urql", "typescript", "vue"],
          link: {
            href: "/plugins/presets/preset-client",
            title: "Client preset plugin details",
          },
          update: "2024-10-22T16:30:59.708Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Client preset",
          },
          weeklyNPMDownloads: 1_418_639,
        },
        {
          title: "TypeScript React Apollo",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use React Components/HOC/Hooks based on GraphQL operations",
          tags: ["plugin", "typescript", "react", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-react-apollo",
            title: "TypeScript React Apollo plugin details",
          },
          update: "2024-09-09T16:02:01.569Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript React Apollo",
          },
          weeklyNPMDownloads: 626_234,
        },
        {
          title: "Introspection",
          description:
            "GraphQL Code Generator plugin for generating an introspection JSON file for a GraphQLSchema",
          tags: ["plugin", "utilities"],
          link: {
            href: "/plugins/other/introspection",
            title: "Introspection plugin details",
          },
          update: "2024-02-20T17:55:16.397Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Introspection",
          },
          weeklyNPMDownloads: 584_826,
        },
        {
          title: "TypeScript Resolvers",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types for resolvers signature",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-resolvers",
            title: "TypeScript Resolvers plugin details",
          },
          update: "2024-10-22T16:31:00.428Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Resolvers",
          },
          weeklyNPMDownloads: 561_241,
        },
        {
          title: "Fragment Matcher",
          description:
            "graphql-code-generate plugin for generating fragments matcher introspection file",
          tags: ["plugin", "apollo"],
          link: {
            href: "/plugins/other/fragment-matcher",
            title: "Fragment Matcher plugin details",
          },
          update: "2024-02-06T14:57:00.701Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Fragment Matcher",
          },
          weeklyNPMDownloads: 413_296,
        },
        {
          title: "Near Operation File Preset",
          description:
            "GraphQL Code Generator preset for generating operation code near the operation file",
          tags: ["preset", "utilities"],
          link: {
            href: "/plugins/presets/near-operation-file-preset",
            title: "Near Operation File Preset plugin details",
          },
          update: "2024-09-05T15:10:27.955Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Near Operation File Preset",
          },
          weeklyNPMDownloads: 366_677,
        },
        {
          title: "TypeScript GraphQL-Request",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use SDK based on graphql-request and GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-graphql-request",
            title: "TypeScript GraphQL-Request plugin details",
          },
          update: "2024-09-05T15:10:17.068Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript GraphQL-Request",
          },
          weeklyNPMDownloads: 239_883,
        },
        {
          title: "Import Types Preset",
          description:
            "GraphQL Code Generator preset for importing types to operation file",
          tags: ["preset", "utilities"],
          link: {
            href: "/plugins/presets/import-types-preset",
            title: "Import Types Preset plugin details",
          },
          update: "2024-09-05T15:10:26.972Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Import Types Preset",
          },
          weeklyNPMDownloads: 136_150,
        },
        {
          title: "TypeScript React-Query",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use React-Query Hooks based on GraphQL operations",
          tags: ["plugin", "typescript", "react"],
          link: {
            href: "/plugins/typescript/typescript-react-query",
            title: "TypeScript React-Query plugin details",
          },
          update: "2024-09-05T15:10:19.961Z",
          image: {
            src: `${ICON_PREFIX}/react-query.svg`,
            height: 190,
            width: 190,
            alt: "TypeScript React-Query",
          },
          weeklyNPMDownloads: 132_664,
        },
        {
          title: "Apollo-Client Helpers",
          description:
            "GraphQL Code Generator plugin for generating TypeScript helpers for Apollo Client > 3",
          tags: ["plugin", "typescript", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-apollo-client-helpers",
            title: "Apollo-Client Helpers plugin details",
          },
          update: "2024-09-05T15:10:12.499Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "Apollo-Client Helpers",
          },
          weeklyNPMDownloads: 101_861,
        },
        {
          title: "TypeScript Document Nodes",
          description:
            "GraphQL Code Generator plugin for generating TypeScript modules with embedded GraphQL document nodes",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-document-nodes",
            title: "TypeScript Document Nodes plugin details",
          },
          update: "2024-10-22T16:31:00.199Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Document Nodes",
          },
          weeklyNPMDownloads: 97_604,
        },
        {
          title: "TypeScript GraphQL Files Modules",
          description:
            "GraphQL Code Generator plugin for generating TypeScript module declarations based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-graphql-files-modules",
            title: "TypeScript GraphQL Files Modules plugin details",
          },
          update: "2024-09-05T15:10:17.923Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript GraphQL Files Modules",
          },
          weeklyNPMDownloads: 84_278,
        },
        {
          title: "TypeScript Generic SDK",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use client-agnostic SDK based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-generic-sdk",
            title: "TypeScript Generic SDK plugin details",
          },
          update: "2024-09-05T15:10:15.539Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Generic SDK",
          },
          weeklyNPMDownloads: 69_954,
        },
        {
          title: "TypeScript Mock Data",
          description: "GraphQL Codegen plugin for building mock data",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-mock-data",
            title: "TypeScript Mock Data plugin details",
          },
          update: "2024-09-20T15:27:47.529Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Mock Data",
          },
          weeklyNPMDownloads: 68_847,
        },
        {
          title: "Named Operations Object",
          description:
            "GraphQL Code Generator plugin for generating an enum with all loaded operations, for simpler and type-safe access",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/named-operations-object",
            title: "Named Operations Object plugin details",
          },
          update: "2024-09-05T15:10:16.755Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "Named Operations Object",
          },
          weeklyNPMDownloads: 63_871,
        },
        {
          title: "TypeScript Msw",
          description:
            "GraphQL Code Generator plugin for generating MSW mock handlers based on GraphQL operations",
          tags: ["plugin", "typescript", "utilities"],
          link: {
            href: "/plugins/typescript/typescript-msw",
            title: "TypeScript Msw plugin details",
          },
          update: "2024-09-05T15:10:16.927Z",
          image: {
            src: "https://raw.githubusercontent.com/mswjs/msw/HEAD/media/msw-logo.svg",
            height: 256,
            width: 256,
            alt: "TypeScript Msw",
          },
          weeklyNPMDownloads: 56_269,
        },
        {
          title: "TypeScript Apollo Angular",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Angular Components based on GraphQL operations",
          tags: ["plugin", "typescript", "apollo", "angular"],
          link: {
            href: "/plugins/typescript/typescript-apollo-angular",
            title: "TypeScript Apollo Angular plugin details",
          },
          update: "2024-09-05T15:10:14.736Z",
          image: {
            src: `${ICON_PREFIX}/angular.svg`,
            alt: "TypeScript Apollo Angular",
          },
          weeklyNPMDownloads: 56_033,
        },
        {
          title: "TypeScript Urql",
          description:
            "GraphQL Code Generator plugin for generating an introspection file for Urql's Schema Awareness",
          tags: ["plugin", "typescript", "urql", "react"],
          link: {
            href: "/plugins/typescript/typescript-urql",
            title: "TypeScript Urql plugin details",
          },
          update: "2024-09-05T15:10:24.887Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Urql",
          },
          weeklyNPMDownloads: 55_577,
        },
        {
          title: "GraphQL Modules Preset",
          description: "GraphQL Code Generator preset for modularized schema",
          tags: ["preset", "utilities", "resolvers"],
          link: {
            href: "/plugins/presets/graphql-modules-preset",
            title: "GraphQL Modules Preset plugin details",
          },
          update: "2024-10-22T16:30:59.640Z",
          image: {
            src: `${ICON_PREFIX}/graphql-modules.svg`,
            height: 71,
            width: 67,
            alt: "GraphQL Modules Preset",
          },
          weeklyNPMDownloads: 34_251,
        },
        {
          title: "TypeScript Validation Schema",
          description:
            "GraphQL Code Generator plugin to generate form validation schema from your GraphQL schema",
          tags: ["plugin", "validation", "yup", "zod", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-validation-schema",
            title: "TypeScript Validation Schema plugin details",
          },
          update: "2024-07-13T13:53:18.286Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "TypeScript Validation Schema",
          },
          weeklyNPMDownloads: 26_819,
        },
        {
          title: "Urql Introspection for Schema Awareness",
          description:
            "graphql-code-generate plugin for generating fragments matcher introspection file",
          tags: ["plugin", "urql", "typescript"],
          link: {
            href: "/plugins/other/urql-introspection",
            title: "Urql Introspection for Schema Awareness plugin details",
          },
          update: "2024-09-05T15:10:10.696Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Urql Introspection for Schema Awareness",
          },
          weeklyNPMDownloads: 23_147,
        },
        {
          title: "TypeScript Vue Apollo Composition API",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Vue-Apollo composition functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-vue-apollo",
            title: "TypeScript Vue Apollo Composition API plugin details",
          },
          update: "2024-09-05T15:10:23.878Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Apollo Composition API",
          },
          weeklyNPMDownloads: 21_672,
        },
        {
          title: "TypeScript RTK-Query",
          description:
            "GraphQL Code Generator plugin for injecting graphql endpoints into a preconfigured RTK Query api",
          tags: ["plugin", "typescript", "react"],
          link: {
            href: "/plugins/typescript/typescript-rtk-query",
            title: "TypeScript RTK-Query plugin details",
          },
          update: "2024-09-05T15:10:20.011Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript RTK-Query",
          },
          weeklyNPMDownloads: 21_249,
        },
        {
          title: "Flow Operations",
          description:
            "GraphQL Code Generator plugin for generating Flow types for GraphQL operations (query/mutation/subscription/fragment)",
          tags: ["plugin", "flow"],
          link: {
            href: "/plugins/flow/flow-operations",
            title: "Flow Operations plugin details",
          },
          update: "2024-09-05T15:10:08.086Z",
          image: {
            src: `${ICON_PREFIX}/flow.svg`,
            height: 2500,
            width: 2019,
            alt: "Flow Operations",
          },
          weeklyNPMDownloads: 9197,
        },
        {
          title: "Typescript Apollo Next.js",
          description:
            "GraphQL Code Generator plugin for generating a functions to read and write from the apollo cache",
          tags: ["plugin", "typescript", "apollo", "next"],
          link: {
            href: "/plugins/typescript/typescript-apollo-next",
            title: "Typescript Apollo Next.js plugin details",
          },
          update: "2022-07-11T20:58:42.183Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "Typescript Apollo Next.js",
          },
          weeklyNPMDownloads: 5839,
        },
        {
          title: "Flow Resolvers",
          description:
            "GraphQL Code Generator plugin for generating Flow types for GraphQL resolvers signature",
          tags: ["plugin", "flow"],
          link: {
            href: "/plugins/flow/flow-resolvers",
            title: "Flow Resolvers plugin details",
          },
          update: "2024-09-05T15:10:08.415Z",
          image: {
            src: `${ICON_PREFIX}/flow.svg`,
            height: 2500,
            width: 2019,
            alt: "Flow Resolvers",
          },
          weeklyNPMDownloads: 5833,
        },
        {
          title: "JSDoc",
          description:
            "GraphQL Code Generator plugin for generating JSDoc based types for GraphQL queries, mutations, subscriptions and fragments",
          tags: ["plugin", "jsdoc"],
          link: {
            href: "/plugins/other/jsdoc",
            title: "JSDoc plugin details",
          },
          update: "2024-09-05T15:10:08.472Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "JSDoc",
          },
          weeklyNPMDownloads: 5111,
        },
        {
          title: "TypeScript MongoDB",
          description:
            "GraphQL Code Generator plugin for generting a ready-to-use ORM types for MongoDB",
          tags: ["plugin", "typescript", "mongodb"],
          link: {
            href: "/plugins/typescript/typescript-mongodb",
            title: "TypeScript MongoDB plugin details",
          },
          update: "2024-09-05T15:10:19.127Z",
          image: {
            src: `${ICON_PREFIX}/mongodb.png`,
            height: 2892,
            width: 1296,
            alt: "TypeScript MongoDB",
          },
          weeklyNPMDownloads: 4621,
        },
        {
          title: "Time",
          description:
            "GraphQL Code Generator plugin for adding the current time for an output file",
          tags: ["plugin", "utilities"],
          link: {
            href: "/plugins/other/time",
            title: "Time plugin details",
          },
          update: "2024-03-27T11:16:18.633Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Time",
          },
          weeklyNPMDownloads: 4383,
        },
        {
          title: "Kotlin",
          description:
            "GraphQL Code Generator plugin for generating Kotlin code based on a GraphQL schema",
          tags: ["plugin", "java", "kotlin"],
          link: {
            href: "/plugins/java/kotlin",
            title: "Kotlin plugin details",
          },
          update: "2024-09-05T15:10:08.726Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Kotlin",
          },
          weeklyNPMDownloads: 3487,
        },
        {
          title: "TypeScript TypeGraphQL",
          description:
            "GraphQL Code Generator plugin for generating TypeGraphQL compatible TypeScript types",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-type-graphql",
            title: "TypeScript TypeGraphQL plugin details",
          },
          update: "2024-09-05T15:10:23.491Z",
          image: {
            src: `${ICON_PREFIX}/type-graphql.png`,
            height: 365,
            width: 365,
            alt: "TypeScript TypeGraphQL",
          },
          weeklyNPMDownloads: 1943,
        },
        {
          title: "Hasura Allow List",
          description:
            "GraphQL Code Generator plugin to generate hasura allow liste metadata from graphql files",
          tags: ["plugin", "utilities", "hasura"],
          link: {
            href: "/plugins/other/hasura-allow-list",
            title: "Hasura Allow List plugin details",
          },
          update: "2024-09-05T15:10:07.875Z",
          image: {
            src: `${ICON_PREFIX}/hasura.svg`,
            height: 160,
            width: 155,
            alt: "Hasura Allow List",
          },
          weeklyNPMDownloads: 1911,
        },
        {
          title: "TypeScript Mock Data Factory",
          description:
            "GraphQL Code Generator Plugin to define mock data factory.",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-fabbrica",
            title: "TypeScript Mock Data Factory plugin details",
          },
          update: "2024-09-19T15:08:48.961Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Mock Data Factory",
          },
          weeklyNPMDownloads: 1764,
        },
        {
          title: "Relay Operation Optimizer",
          description:
            "GraphQL Code Generator plugin for optimizing your GraphQL operations relay style.",
          tags: ["plugin", "relay"],
          link: {
            href: "/plugins/typescript/relay-operation-optimizer",
            title: "Relay Operation Optimizer plugin details",
          },
          update: "2022-04-05T15:48:04.705Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Relay Operation Optimizer",
          },
          weeklyNPMDownloads: 1755,
        },
        {
          title: "TypeScript Svelte Apollo",
          description:
            "GraphQL Code Generator plugin to generate client queries from graphql",
          tags: ["plugin", "typescript", "svelte", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-svelte-apollo",
            title: "TypeScript Svelte Apollo plugin details",
          },
          update: "2022-05-04T02:48:38.489Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript Svelte Apollo",
          },
          weeklyNPMDownloads: 1669,
        },
        {
          title: "TypeScript Vue Urql",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Vue-Urql composition functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "urql"],
          link: {
            href: "/plugins/typescript/typescript-vue-urql",
            title: "TypeScript Vue Urql plugin details",
          },
          update: "2024-09-05T15:10:23.452Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Urql",
          },
          weeklyNPMDownloads: 1300,
        },
        {
          title: "TypeScript Vue Apollo Smart Operations",
          description:
            "GraphQL Code Generator plugin for generating typed Vue-Apollo Smart Query and mutation functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-vue-apollo-smart-ops",
            title: "TypeScript Vue Apollo Smart Operations plugin details",
          },
          update: "2024-09-05T15:10:23.336Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Apollo Smart Operations",
          },
          weeklyNPMDownloads: 1276,
        },
        {
          title: "C# Operations",
          description:
            "GraphQL Code Generator plugin for generating CSharp code based on GraphQL operations",
          tags: ["plugin", "csharp"],
          link: {
            href: "/plugins/c-sharp/c-sharp-operations",
            title: "C# Operations plugin details",
          },
          update: "2024-09-05T15:10:05.074Z",
          image: {
            src: `${ICON_PREFIX}/csharp.svg`,
            height: 2500,
            width: 2500,
            alt: "C# Operations",
          },
          weeklyNPMDownloads: 1148,
        },
        {
          title: "Java",
          description:
            "GraphQL Code Generator plugin for generating Java code based on a GraphQL schema",
          tags: ["plugin", "java"],
          link: {
            href: "/plugins/java/java",
            title: "Java plugin details",
          },
          update: "2024-09-05T15:10:07.627Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java",
          },
          weeklyNPMDownloads: 642,
        },
        {
          title: "Java Apollo Android",
          description:
            "GraphQL Code Generator plugin for generating Java classes for Apollo-Android",
          tags: ["plugin", "java", "apollo", "android"],
          link: {
            href: "/plugins/java/java-apollo-android",
            title: "Java Apollo Android plugin details",
          },
          update: "2024-09-05T15:10:06.777Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java Apollo Android",
          },
          weeklyNPMDownloads: 223,
        },
        {
          title: "TypeScript Stencil Apollo",
          description:
            "GraphQL Code Generator plugin for generating Stencil Components based on GraphQL operations",
          tags: ["plugin", "typescript", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-stencil-apollo",
            title: "TypeScript Stencil Apollo plugin details",
          },
          update: "2024-09-05T15:10:22.682Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript Stencil Apollo",
          },
          weeklyNPMDownloads: 189,
        },
        {
          title: "Java Resolvers",
          description:
            "GraphQL Code Generator plugin for generating resolvers signature for Java backends",
          tags: ["plugin", "java"],
          link: {
            href: "/plugins/java/java-resolvers",
            title: "Java Resolvers plugin details",
          },
          update: "2024-09-05T15:10:09.783Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java Resolvers",
          },
          weeklyNPMDownloads: 181,
        },
        {
          title: "Dart Flutter Freezed Classes",
          description:
            "GraphQL Code Generator plugin to generate Freezed models from your GraphQL schema",
          tags: ["plugin", "dart", "flutter"],
          link: {
            href: "/plugins/dart/flutter-freezed",
            title: "Dart Flutter Freezed Classes plugin details",
          },
          update: "2024-09-05T15:10:05.522Z",
          image: {
            src: `${ICON_PREFIX}/dart.svg`,
            height: 256,
            width: 256,
            alt: "Dart Flutter Freezed Classes",
          },
          weeklyNPMDownloads: 150,
        },
        {
          title: "TypeScript Oclif",
          description:
            "GraphQL Code Generator plugin for generating a CLI tool with oclif",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-oclif",
            title: "TypeScript Oclif plugin details",
          },
          update: "2024-09-05T15:10:19.824Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Oclif",
          },
          weeklyNPMDownloads: 71,
        },
        {
          title: "TypeScript Nhost",
          description:
            "GraphQL Code Generator plugin for the Typescript Nhost SDK",
          tags: ["plugin", "typescript", "nhost"],
          link: {
            href: "/plugins/undefined/typescript-nhost",
            title: "TypeScript Nhost plugin details",
          },
          update: "2024-09-05T15:10:17.648Z",
          image: {
            src: `${ICON_PREFIX}/nhost.svg`,
            height: 40,
            width: 40,
            alt: "TypeScript Nhost",
          },
          weeklyNPMDownloads: 56,
        },
        {
          title: "Reason Client",
          description: "A GraphQL Codegen plugin to generate ReasonML types",
          tags: ["plugin", "reason"],
          link: {
            href: "/plugins/other/reason-client",
            title: "Reason Client plugin details",
          },
          update: "2022-05-04T02:48:20.194Z",
          image: {
            src: "https://the-guild.dev/graphql/codegen/_next/static/media/ImZxrDWf_400x400.0adde43d.jpg",
            height: 400,
            width: 400,
            alt: "Reason Client",
          },
          weeklyNPMDownloads: 12,
        },
      ],
      placeholder: "0 items",
      pagination: 10,
    },
    secondaryList: {
      title: "Recently Updated",
      items: [
        {
          title: "TypeScript Resolvers",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types for resolvers signature",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-resolvers",
            title: "TypeScript Resolvers plugin details",
          },
          update: "2024-10-22T16:31:00.428Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Resolvers",
          },
          weeklyNPMDownloads: 561_241,
        },
        {
          title: "TypeScript",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript",
            title: "TypeScript plugin details",
          },
          update: "2024-10-22T16:31:00.380Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript",
          },
          weeklyNPMDownloads: 2_700_869,
        },
        {
          title: "TypeScript Operations",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types for GraphQL queries, mutations, subscriptions and fragments",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-operations",
            title: "TypeScript Operations plugin details",
          },
          update: "2024-10-22T16:31:00.240Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Operations",
          },
          weeklyNPMDownloads: 2_343_520,
        },
        {
          title: "TypeScript Document Nodes",
          description:
            "GraphQL Code Generator plugin for generating TypeScript modules with embedded GraphQL document nodes",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-document-nodes",
            title: "TypeScript Document Nodes plugin details",
          },
          update: "2024-10-22T16:31:00.199Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Document Nodes",
          },
          weeklyNPMDownloads: 97_604,
        },
        {
          title: "TypedDocumentNode",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use TypedDocumentNode based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typed-document-node",
            title: "TypedDocumentNode plugin details",
          },
          update: "2024-10-22T16:30:59.901Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypedDocumentNode",
          },
          weeklyNPMDownloads: 1_505_771,
        },
        {
          title: "Client preset",
          description: "GraphQL Code Generator preset for client.",
          tags: ["preset", "next", "react", "urql", "typescript", "vue"],
          link: {
            href: "/plugins/presets/preset-client",
            title: "Client preset plugin details",
          },
          update: "2024-10-22T16:30:59.708Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Client preset",
          },
          weeklyNPMDownloads: 1_418_639,
        },
        {
          title: "GraphQL Modules Preset",
          description: "GraphQL Code Generator preset for modularized schema",
          tags: ["preset", "utilities", "resolvers"],
          link: {
            href: "/plugins/presets/graphql-modules-preset",
            title: "GraphQL Modules Preset plugin details",
          },
          update: "2024-10-22T16:30:59.640Z",
          image: {
            src: `${ICON_PREFIX}/graphql-modules.svg`,
            height: 71,
            width: 67,
            alt: "GraphQL Modules Preset",
          },
          weeklyNPMDownloads: 34_251,
        },
        {
          title: "TypeScript Mock Data",
          description: "GraphQL Codegen plugin for building mock data",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-mock-data",
            title: "TypeScript Mock Data plugin details",
          },
          update: "2024-09-20T15:27:47.529Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Mock Data",
          },
          weeklyNPMDownloads: 68_847,
        },
        {
          title: "TypeScript Mock Data Factory",
          description:
            "GraphQL Code Generator Plugin to define mock data factory.",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-fabbrica",
            title: "TypeScript Mock Data Factory plugin details",
          },
          update: "2024-09-19T15:08:48.961Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Mock Data Factory",
          },
          weeklyNPMDownloads: 1764,
        },
        {
          title: "TypeScript React Apollo",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use React Components/HOC/Hooks based on GraphQL operations",
          tags: ["plugin", "typescript", "react", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-react-apollo",
            title: "TypeScript React Apollo plugin details",
          },
          update: "2024-09-09T16:02:01.569Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript React Apollo",
          },
          weeklyNPMDownloads: 626_234,
        },
        {
          title: "Near Operation File Preset",
          description:
            "GraphQL Code Generator preset for generating operation code near the operation file",
          tags: ["preset", "utilities"],
          link: {
            href: "/plugins/presets/near-operation-file-preset",
            title: "Near Operation File Preset plugin details",
          },
          update: "2024-09-05T15:10:27.955Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Near Operation File Preset",
          },
          weeklyNPMDownloads: 366_677,
        },
        {
          title: "Import Types Preset",
          description:
            "GraphQL Code Generator preset for importing types to operation file",
          tags: ["preset", "utilities"],
          link: {
            href: "/plugins/presets/import-types-preset",
            title: "Import Types Preset plugin details",
          },
          update: "2024-09-05T15:10:26.972Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Import Types Preset",
          },
          weeklyNPMDownloads: 136_150,
        },
        {
          title: "TypeScript Urql",
          description:
            "GraphQL Code Generator plugin for generating an introspection file for Urql's Schema Awareness",
          tags: ["plugin", "typescript", "urql", "react"],
          link: {
            href: "/plugins/typescript/typescript-urql",
            title: "TypeScript Urql plugin details",
          },
          update: "2024-09-05T15:10:24.887Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Urql",
          },
          weeklyNPMDownloads: 55_577,
        },
        {
          title: "TypeScript Vue Apollo Composition API",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Vue-Apollo composition functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-vue-apollo",
            title: "TypeScript Vue Apollo Composition API plugin details",
          },
          update: "2024-09-05T15:10:23.878Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Apollo Composition API",
          },
          weeklyNPMDownloads: 21_672,
        },
        {
          title: "TypeScript TypeGraphQL",
          description:
            "GraphQL Code Generator plugin for generating TypeGraphQL compatible TypeScript types",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-type-graphql",
            title: "TypeScript TypeGraphQL plugin details",
          },
          update: "2024-09-05T15:10:23.491Z",
          image: {
            src: `${ICON_PREFIX}/type-graphql.png`,
            height: 365,
            width: 365,
            alt: "TypeScript TypeGraphQL",
          },
          weeklyNPMDownloads: 1943,
        },
        {
          title: "TypeScript Vue Urql",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Vue-Urql composition functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "urql"],
          link: {
            href: "/plugins/typescript/typescript-vue-urql",
            title: "TypeScript Vue Urql plugin details",
          },
          update: "2024-09-05T15:10:23.452Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Urql",
          },
          weeklyNPMDownloads: 1300,
        },
        {
          title: "TypeScript Vue Apollo Smart Operations",
          description:
            "GraphQL Code Generator plugin for generating typed Vue-Apollo Smart Query and mutation functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-vue-apollo-smart-ops",
            title: "TypeScript Vue Apollo Smart Operations plugin details",
          },
          update: "2024-09-05T15:10:23.336Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Apollo Smart Operations",
          },
          weeklyNPMDownloads: 1276,
        },
        {
          title: "TypeScript Stencil Apollo",
          description:
            "GraphQL Code Generator plugin for generating Stencil Components based on GraphQL operations",
          tags: ["plugin", "typescript", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-stencil-apollo",
            title: "TypeScript Stencil Apollo plugin details",
          },
          update: "2024-09-05T15:10:22.682Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript Stencil Apollo",
          },
          weeklyNPMDownloads: 189,
        },
        {
          title: "TypeScript React-Query",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use React-Query Hooks based on GraphQL operations",
          tags: ["plugin", "typescript", "react"],
          link: {
            href: "/plugins/typescript/typescript-react-query",
            title: "TypeScript React-Query plugin details",
          },
          update: "2024-09-05T15:10:19.961Z",
          image: {
            src: `${ICON_PREFIX}/react-query.svg`,
            height: 190,
            width: 190,
            alt: "TypeScript React-Query",
          },
          weeklyNPMDownloads: 132_664,
        },
        {
          title: "TypeScript Oclif",
          description:
            "GraphQL Code Generator plugin for generating a CLI tool with oclif",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-oclif",
            title: "TypeScript Oclif plugin details",
          },
          update: "2024-09-05T15:10:19.824Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Oclif",
          },
          weeklyNPMDownloads: 71,
        },
        {
          title: "TypeScript MongoDB",
          description:
            "GraphQL Code Generator plugin for generting a ready-to-use ORM types for MongoDB",
          tags: ["plugin", "typescript", "mongodb"],
          link: {
            href: "/plugins/typescript/typescript-mongodb",
            title: "TypeScript MongoDB plugin details",
          },
          update: "2024-09-05T15:10:19.127Z",
          image: {
            src: `${ICON_PREFIX}/mongodb.png`,
            height: 2892,
            width: 1296,
            alt: "TypeScript MongoDB",
          },
          weeklyNPMDownloads: 4621,
        },
        {
          title: "TypeScript GraphQL Files Modules",
          description:
            "GraphQL Code Generator plugin for generating TypeScript module declarations based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-graphql-files-modules",
            title: "TypeScript GraphQL Files Modules plugin details",
          },
          update: "2024-09-05T15:10:17.923Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript GraphQL Files Modules",
          },
          weeklyNPMDownloads: 84_278,
        },
        {
          title: "TypeScript Nhost",
          description:
            "GraphQL Code Generator plugin for the Typescript Nhost SDK",
          tags: ["plugin", "typescript", "nhost"],
          link: {
            href: "/plugins/undefined/typescript-nhost",
            title: "TypeScript Nhost plugin details",
          },
          update: "2024-09-05T15:10:17.648Z",
          image: {
            src: `${ICON_PREFIX}/nhost.svg`,
            height: 40,
            width: 40,
            alt: "TypeScript Nhost",
          },
          weeklyNPMDownloads: 56,
        },
        {
          title: "TypeScript GraphQL-Request",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use SDK based on graphql-request and GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-graphql-request",
            title: "TypeScript GraphQL-Request plugin details",
          },
          update: "2024-09-05T15:10:17.068Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript GraphQL-Request",
          },
          weeklyNPMDownloads: 239_883,
        },
        {
          title: "TypeScript Msw",
          description:
            "GraphQL Code Generator plugin for generating MSW mock handlers based on GraphQL operations",
          tags: ["plugin", "typescript", "utilities"],
          link: {
            href: "/plugins/typescript/typescript-msw",
            title: "TypeScript Msw plugin details",
          },
          update: "2024-09-05T15:10:16.927Z",
          image: {
            src: "https://raw.githubusercontent.com/mswjs/msw/HEAD/media/msw-logo.svg",
            height: 256,
            width: 256,
            alt: "TypeScript Msw",
          },
          weeklyNPMDownloads: 56_269,
        },
        {
          title: "Named Operations Object",
          description:
            "GraphQL Code Generator plugin for generating an enum with all loaded operations, for simpler and type-safe access",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/named-operations-object",
            title: "Named Operations Object plugin details",
          },
          update: "2024-09-05T15:10:16.755Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "Named Operations Object",
          },
          weeklyNPMDownloads: 63_871,
        },
        {
          title: "TypeScript Generic SDK",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use client-agnostic SDK based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-generic-sdk",
            title: "TypeScript Generic SDK plugin details",
          },
          update: "2024-09-05T15:10:15.539Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Generic SDK",
          },
          weeklyNPMDownloads: 69_954,
        },
        {
          title: "TypeScript Apollo Angular",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Angular Components based on GraphQL operations",
          tags: ["plugin", "typescript", "apollo", "angular"],
          link: {
            href: "/plugins/typescript/typescript-apollo-angular",
            title: "TypeScript Apollo Angular plugin details",
          },
          update: "2024-09-05T15:10:14.736Z",
          image: {
            src: `${ICON_PREFIX}/angular.svg`,
            alt: "TypeScript Apollo Angular",
          },
          weeklyNPMDownloads: 56_033,
        },
        {
          title: "Apollo-Client Helpers",
          description:
            "GraphQL Code Generator plugin for generating TypeScript helpers for Apollo Client > 3",
          tags: ["plugin", "typescript", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-apollo-client-helpers",
            title: "Apollo-Client Helpers plugin details",
          },
          update: "2024-09-05T15:10:12.499Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "Apollo-Client Helpers",
          },
          weeklyNPMDownloads: 101_861,
        },
        {
          title: "Urql Introspection for Schema Awareness",
          description:
            "graphql-code-generate plugin for generating fragments matcher introspection file",
          tags: ["plugin", "urql", "typescript"],
          link: {
            href: "/plugins/other/urql-introspection",
            title: "Urql Introspection for Schema Awareness plugin details",
          },
          update: "2024-09-05T15:10:10.696Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Urql Introspection for Schema Awareness",
          },
          weeklyNPMDownloads: 23_147,
        },
        {
          title: "Java Resolvers",
          description:
            "GraphQL Code Generator plugin for generating resolvers signature for Java backends",
          tags: ["plugin", "java"],
          link: {
            href: "/plugins/java/java-resolvers",
            title: "Java Resolvers plugin details",
          },
          update: "2024-09-05T15:10:09.783Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java Resolvers",
          },
          weeklyNPMDownloads: 181,
        },
        {
          title: "Kotlin",
          description:
            "GraphQL Code Generator plugin for generating Kotlin code based on a GraphQL schema",
          tags: ["plugin", "java", "kotlin"],
          link: {
            href: "/plugins/java/kotlin",
            title: "Kotlin plugin details",
          },
          update: "2024-09-05T15:10:08.726Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Kotlin",
          },
          weeklyNPMDownloads: 3487,
        },
        {
          title: "JSDoc",
          description:
            "GraphQL Code Generator plugin for generating JSDoc based types for GraphQL queries, mutations, subscriptions and fragments",
          tags: ["plugin", "jsdoc"],
          link: {
            href: "/plugins/other/jsdoc",
            title: "JSDoc plugin details",
          },
          update: "2024-09-05T15:10:08.472Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "JSDoc",
          },
          weeklyNPMDownloads: 5111,
        },
        {
          title: "Flow Resolvers",
          description:
            "GraphQL Code Generator plugin for generating Flow types for GraphQL resolvers signature",
          tags: ["plugin", "flow"],
          link: {
            href: "/plugins/flow/flow-resolvers",
            title: "Flow Resolvers plugin details",
          },
          update: "2024-09-05T15:10:08.415Z",
          image: {
            src: `${ICON_PREFIX}/flow.svg`,
            height: 2500,
            width: 2019,
            alt: "Flow Resolvers",
          },
          weeklyNPMDownloads: 5833,
        },
        {
          title: "Flow Operations",
          description:
            "GraphQL Code Generator plugin for generating Flow types for GraphQL operations (query/mutation/subscription/fragment)",
          tags: ["plugin", "flow"],
          link: {
            href: "/plugins/flow/flow-operations",
            title: "Flow Operations plugin details",
          },
          update: "2024-09-05T15:10:08.086Z",
          image: {
            src: `${ICON_PREFIX}/flow.svg`,
            height: 2500,
            width: 2019,
            alt: "Flow Operations",
          },
          weeklyNPMDownloads: 9197,
        },
        {
          title: "Hasura Allow List",
          description:
            "GraphQL Code Generator plugin to generate hasura allow liste metadata from graphql files",
          tags: ["plugin", "utilities", "hasura"],
          link: {
            href: "/plugins/other/hasura-allow-list",
            title: "Hasura Allow List plugin details",
          },
          update: "2024-09-05T15:10:07.875Z",
          image: {
            src: `${ICON_PREFIX}/hasura.svg`,
            height: 160,
            width: 155,
            alt: "Hasura Allow List",
          },
          weeklyNPMDownloads: 1911,
        },
        {
          title: "Java",
          description:
            "GraphQL Code Generator plugin for generating Java code based on a GraphQL schema",
          tags: ["plugin", "java"],
          link: {
            href: "/plugins/java/java",
            title: "Java plugin details",
          },
          update: "2024-09-05T15:10:07.627Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java",
          },
          weeklyNPMDownloads: 642,
        },
        {
          title: "Java Apollo Android",
          description:
            "GraphQL Code Generator plugin for generating Java classes for Apollo-Android",
          tags: ["plugin", "java", "apollo", "android"],
          link: {
            href: "/plugins/java/java-apollo-android",
            title: "Java Apollo Android plugin details",
          },
          update: "2024-09-05T15:10:06.777Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java Apollo Android",
          },
          weeklyNPMDownloads: 223,
        },
        {
          title: "Dart Flutter Freezed Classes",
          description:
            "GraphQL Code Generator plugin to generate Freezed models from your GraphQL schema",
          tags: ["plugin", "dart", "flutter"],
          link: {
            href: "/plugins/dart/flutter-freezed",
            title: "Dart Flutter Freezed Classes plugin details",
          },
          update: "2024-09-05T15:10:05.522Z",
          image: {
            src: `${ICON_PREFIX}/dart.svg`,
            height: 256,
            width: 256,
            alt: "Dart Flutter Freezed Classes",
          },
          weeklyNPMDownloads: 150,
        },
        {
          title: "TypeScript Oclif",
          description:
            "GraphQL Code Generator plugin for generating a CLI tool with oclif",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-oclif",
            title: "TypeScript Oclif plugin details",
          },
          update: "2024-09-05T15:10:19.824Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Oclif",
          },
          weeklyNPMDownloads: 71,
        },
        {
          title: "TypeScript Nhost",
          description:
            "GraphQL Code Generator plugin for the Typescript Nhost SDK",
          tags: ["plugin", "typescript", "nhost"],
          link: {
            href: "/plugins/undefined/typescript-nhost",
            title: "TypeScript Nhost plugin details",
          },
          update: "2024-09-05T15:10:17.648Z",
          image: {
            src: `${ICON_PREFIX}/nhost.svg`,
            height: 40,
            width: 40,
            alt: "TypeScript Nhost",
          },
          weeklyNPMDownloads: 56,
        },
        {
          title: "Reason Client",
          description: "A GraphQL Codegen plugin to generate ReasonML types",
          tags: ["plugin", "reason"],
          link: {
            href: "/plugins/other/reason-client",
            title: "Reason Client plugin details",
          },
          update: "2022-05-04T02:48:20.194Z",
          image: {
            src: "https://the-guild.dev/graphql/codegen/_next/static/media/ImZxrDWf_400x400.0adde43d.jpg",
            height: 400,
            width: 400,
            alt: "Reason Client",
          },
          weeklyNPMDownloads: 12,
        },
      ],
      placeholder: "0 items",
      pagination: 10,
    },
    queryList: {
      title: "Search Results",
      items: [
        {
          title: "Add",
          description:
            "GraphQL Code Generator plugin for adding custom content to your output file",
          tags: ["plugin"],
          link: {
            href: "/plugins/other/add",
            title: "Add plugin details",
          },
          update: "2024-06-13T10:03:13.074Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Add",
          },
          weeklyNPMDownloads: 2_184_576,
        },
        {
          title: "C# Operations",
          description:
            "GraphQL Code Generator plugin for generating CSharp code based on GraphQL operations",
          tags: ["plugin", "csharp"],
          link: {
            href: "/plugins/c-sharp/c-sharp-operations",
            title: "C# Operations plugin details",
          },
          update: "2024-09-05T15:10:05.074Z",
          image: {
            src: `${ICON_PREFIX}/csharp.svg`,
            height: 2500,
            width: 2500,
            alt: "C# Operations",
          },
          weeklyNPMDownloads: 1148,
        },
        {
          title: "Flow Operations",
          description:
            "GraphQL Code Generator plugin for generating Flow types for GraphQL operations (query/mutation/subscription/fragment)",
          tags: ["plugin", "flow"],
          link: {
            href: "/plugins/flow/flow-operations",
            title: "Flow Operations plugin details",
          },
          update: "2024-09-05T15:10:08.086Z",
          image: {
            src: `${ICON_PREFIX}/flow.svg`,
            height: 2500,
            width: 2019,
            alt: "Flow Operations",
          },
          weeklyNPMDownloads: 9197,
        },
        {
          title: "Flow Resolvers",
          description:
            "GraphQL Code Generator plugin for generating Flow types for GraphQL resolvers signature",
          tags: ["plugin", "flow"],
          link: {
            href: "/plugins/flow/flow-resolvers",
            title: "Flow Resolvers plugin details",
          },
          update: "2024-09-05T15:10:08.415Z",
          image: {
            src: `${ICON_PREFIX}/flow.svg`,
            height: 2500,
            width: 2019,
            alt: "Flow Resolvers",
          },
          weeklyNPMDownloads: 5833,
        },
        {
          title: "Fragment Matcher",
          description:
            "graphql-code-generate plugin for generating fragments matcher introspection file",
          tags: ["plugin", "apollo"],
          link: {
            href: "/plugins/other/fragment-matcher",
            title: "Fragment Matcher plugin details",
          },
          update: "2024-02-06T14:57:00.701Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Fragment Matcher",
          },
          weeklyNPMDownloads: 413_296,
        },
        {
          title: "GraphQL Modules Preset",
          description: "GraphQL Code Generator preset for modularized schema",
          tags: ["preset", "utilities", "resolvers"],
          link: {
            href: "/plugins/presets/graphql-modules-preset",
            title: "GraphQL Modules Preset plugin details",
          },
          update: "2024-10-22T16:30:59.640Z",
          image: {
            src: `${ICON_PREFIX}/graphql-modules.svg`,
            height: 71,
            width: 67,
            alt: "GraphQL Modules Preset",
          },
          weeklyNPMDownloads: 34_251,
        },
        {
          title: "Hasura Allow List",
          description:
            "GraphQL Code Generator plugin to generate hasura allow liste metadata from graphql files",
          tags: ["plugin", "utilities", "hasura"],
          link: {
            href: "/plugins/other/hasura-allow-list",
            title: "Hasura Allow List plugin details",
          },
          update: "2024-09-05T15:10:07.875Z",
          image: {
            src: `${ICON_PREFIX}/hasura.svg`,
            height: 160,
            width: 155,
            alt: "Hasura Allow List",
          },
          weeklyNPMDownloads: 1911,
        },
        {
          title: "Import Types Preset",
          description:
            "GraphQL Code Generator preset for importing types to operation file",
          tags: ["preset", "utilities"],
          link: {
            href: "/plugins/presets/import-types-preset",
            title: "Import Types Preset plugin details",
          },
          update: "2024-09-05T15:10:26.972Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Import Types Preset",
          },
          weeklyNPMDownloads: 136_150,
        },
        {
          title: "Client preset",
          description: "GraphQL Code Generator preset for client.",
          tags: ["preset", "next", "react", "urql", "typescript", "vue"],
          link: {
            href: "/plugins/presets/preset-client",
            title: "Client preset plugin details",
          },
          update: "2024-10-22T16:30:59.708Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Client preset",
          },
          weeklyNPMDownloads: 1_418_639,
        },
        {
          title: "Introspection",
          description:
            "GraphQL Code Generator plugin for generating an introspection JSON file for a GraphQLSchema",
          tags: ["plugin", "utilities"],
          link: {
            href: "/plugins/other/introspection",
            title: "Introspection plugin details",
          },
          update: "2024-02-20T17:55:16.397Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Introspection",
          },
          weeklyNPMDownloads: 584_826,
        },
        {
          title: "Java",
          description:
            "GraphQL Code Generator plugin for generating Java code based on a GraphQL schema",
          tags: ["plugin", "java"],
          link: {
            href: "/plugins/java/java",
            title: "Java plugin details",
          },
          update: "2024-09-05T15:10:07.627Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java",
          },
          weeklyNPMDownloads: 642,
        },
        {
          title: "Java Apollo Android",
          description:
            "GraphQL Code Generator plugin for generating Java classes for Apollo-Android",
          tags: ["plugin", "java", "apollo", "android"],
          link: {
            href: "/plugins/java/java-apollo-android",
            title: "Java Apollo Android plugin details",
          },
          update: "2024-09-05T15:10:06.777Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java Apollo Android",
          },
          weeklyNPMDownloads: 223,
        },
        {
          title: "Java Resolvers",
          description:
            "GraphQL Code Generator plugin for generating resolvers signature for Java backends",
          tags: ["plugin", "java"],
          link: {
            href: "/plugins/java/java-resolvers",
            title: "Java Resolvers plugin details",
          },
          update: "2024-09-05T15:10:09.783Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Java Resolvers",
          },
          weeklyNPMDownloads: 181,
        },
        {
          title: "JSDoc",
          description:
            "GraphQL Code Generator plugin for generating JSDoc based types for GraphQL queries, mutations, subscriptions and fragments",
          tags: ["plugin", "jsdoc"],
          link: {
            href: "/plugins/other/jsdoc",
            title: "JSDoc plugin details",
          },
          update: "2024-09-05T15:10:08.472Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "JSDoc",
          },
          weeklyNPMDownloads: 5111,
        },
        {
          title: "Kotlin",
          description:
            "GraphQL Code Generator plugin for generating Kotlin code based on a GraphQL schema",
          tags: ["plugin", "java", "kotlin"],
          link: {
            href: "/plugins/java/kotlin",
            title: "Kotlin plugin details",
          },
          update: "2024-09-05T15:10:08.726Z",
          image: {
            src: `${ICON_PREFIX}/java.svg`,
            height: 2500,
            width: 1344,
            alt: "Kotlin",
          },
          weeklyNPMDownloads: 3487,
        },
        {
          title: "Named Operations Object",
          description:
            "GraphQL Code Generator plugin for generating an enum with all loaded operations, for simpler and type-safe access",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/named-operations-object",
            title: "Named Operations Object plugin details",
          },
          update: "2024-09-05T15:10:16.755Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "Named Operations Object",
          },
          weeklyNPMDownloads: 63_871,
        },
        {
          title: "Near Operation File Preset",
          description:
            "GraphQL Code Generator preset for generating operation code near the operation file",
          tags: ["preset", "utilities"],
          link: {
            href: "/plugins/presets/near-operation-file-preset",
            title: "Near Operation File Preset plugin details",
          },
          update: "2024-09-05T15:10:27.955Z",
          image: {
            src: `${ICON_PREFIX}/codegen.svg`,
            height: 54,
            width: 50,
            alt: "Near Operation File Preset",
          },
          weeklyNPMDownloads: 366_677,
        },
        {
          title: "Reason Client",
          description: "A GraphQL Codegen plugin to generate ReasonML types",
          tags: ["plugin", "reason"],
          link: {
            href: "/plugins/other/reason-client",
            title: "Reason Client plugin details",
          },
          update: "2022-05-04T02:48:20.194Z",
          image: {
            src: "https://the-guild.dev/graphql/codegen/_next/static/media/ImZxrDWf_400x400.0adde43d.jpg",
            height: 400,
            width: 400,
            alt: "Reason Client",
          },
          weeklyNPMDownloads: 12,
        },
        {
          title: "Relay Operation Optimizer",
          description:
            "GraphQL Code Generator plugin for optimizing your GraphQL operations relay style.",
          tags: ["plugin", "relay"],
          link: {
            href: "/plugins/typescript/relay-operation-optimizer",
            title: "Relay Operation Optimizer plugin details",
          },
          update: "2022-04-05T15:48:04.705Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Relay Operation Optimizer",
          },
          weeklyNPMDownloads: 1755,
        },
        {
          title: "Schema AST",
          description:
            "GraphQL Code Generator plugin for generating a .graphql file from a given schema",
          tags: ["plugin", "utilities"],
          link: {
            href: "/plugins/other/schema-ast",
            title: "Schema AST plugin details",
          },
          update: "2024-06-30T06:20:59.195Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Schema AST",
          },
          weeklyNPMDownloads: 2_388_871,
        },
        {
          title: "Time",
          description:
            "GraphQL Code Generator plugin for adding the current time for an output file",
          tags: ["plugin", "utilities"],
          link: {
            href: "/plugins/other/time",
            title: "Time plugin details",
          },
          update: "2024-03-27T11:16:18.633Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Time",
          },
          weeklyNPMDownloads: 4383,
        },
        {
          title: "TypedDocumentNode",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use TypedDocumentNode based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typed-document-node",
            title: "TypedDocumentNode plugin details",
          },
          update: "2024-10-22T16:30:59.901Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypedDocumentNode",
          },
          weeklyNPMDownloads: 1_505_771,
        },
        {
          title: "TypeScript",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript",
            title: "TypeScript plugin details",
          },
          update: "2024-10-22T16:31:00.380Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript",
          },
          weeklyNPMDownloads: 2_700_869,
        },
        {
          title: "TypeScript Apollo Angular",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Angular Components based on GraphQL operations",
          tags: ["plugin", "typescript", "apollo", "angular"],
          link: {
            href: "/plugins/typescript/typescript-apollo-angular",
            title: "TypeScript Apollo Angular plugin details",
          },
          update: "2024-09-05T15:10:14.736Z",
          image: {
            src: `${ICON_PREFIX}/angular.svg`,
            alt: "TypeScript Apollo Angular",
          },
          weeklyNPMDownloads: 56_033,
        },
        {
          title: "Apollo-Client Helpers",
          description:
            "GraphQL Code Generator plugin for generating TypeScript helpers for Apollo Client > 3",
          tags: ["plugin", "typescript", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-apollo-client-helpers",
            title: "Apollo-Client Helpers plugin details",
          },
          update: "2024-09-05T15:10:12.499Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "Apollo-Client Helpers",
          },
          weeklyNPMDownloads: 101_861,
        },
        {
          title: "Typescript Apollo Next.js",
          description:
            "GraphQL Code Generator plugin for generating a functions to read and write from the apollo cache",
          tags: ["plugin", "typescript", "apollo", "next"],
          link: {
            href: "/plugins/typescript/typescript-apollo-next",
            title: "Typescript Apollo Next.js plugin details",
          },
          update: "2022-07-11T20:58:42.183Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "Typescript Apollo Next.js",
          },
          weeklyNPMDownloads: 5839,
        },
        {
          title: "TypeScript Document Nodes",
          description:
            "GraphQL Code Generator plugin for generating TypeScript modules with embedded GraphQL document nodes",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-document-nodes",
            title: "TypeScript Document Nodes plugin details",
          },
          update: "2024-10-22T16:31:00.199Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Document Nodes",
          },
          weeklyNPMDownloads: 97_604,
        },
        {
          title: "TypeScript Mock Data Factory",
          description:
            "GraphQL Code Generator Plugin to define mock data factory.",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-fabbrica",
            title: "TypeScript Mock Data Factory plugin details",
          },
          update: "2024-09-19T15:08:48.961Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Mock Data Factory",
          },
          weeklyNPMDownloads: 1764,
        },
        {
          title: "TypeScript Generic SDK",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use client-agnostic SDK based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-generic-sdk",
            title: "TypeScript Generic SDK plugin details",
          },
          update: "2024-09-05T15:10:15.539Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Generic SDK",
          },
          weeklyNPMDownloads: 69_954,
        },
        {
          title: "TypeScript GraphQL Files Modules",
          description:
            "GraphQL Code Generator plugin for generating TypeScript module declarations based on GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-graphql-files-modules",
            title: "TypeScript GraphQL Files Modules plugin details",
          },
          update: "2024-09-05T15:10:17.923Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript GraphQL Files Modules",
          },
          weeklyNPMDownloads: 84_278,
        },
        {
          title: "TypeScript GraphQL-Request",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use SDK based on graphql-request and GraphQL operations",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-graphql-request",
            title: "TypeScript GraphQL-Request plugin details",
          },
          update: "2024-09-05T15:10:17.068Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript GraphQL-Request",
          },
          weeklyNPMDownloads: 239_883,
        },
        {
          title: "TypeScript Mock Data",
          description: "GraphQL Codegen plugin for building mock data",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-mock-data",
            title: "TypeScript Mock Data plugin details",
          },
          update: "2024-09-20T15:27:47.529Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Mock Data",
          },
          weeklyNPMDownloads: 68_847,
        },
        {
          title: "TypeScript MongoDB",
          description:
            "GraphQL Code Generator plugin for generting a ready-to-use ORM types for MongoDB",
          tags: ["plugin", "typescript", "mongodb"],
          link: {
            href: "/plugins/typescript/typescript-mongodb",
            title: "TypeScript MongoDB plugin details",
          },
          update: "2024-09-05T15:10:19.127Z",
          image: {
            src: `${ICON_PREFIX}/mongodb.png`,
            height: 2892,
            width: 1296,
            alt: "TypeScript MongoDB",
          },
          weeklyNPMDownloads: 4621,
        },
        {
          title: "TypeScript Nhost",
          description:
            "GraphQL Code Generator plugin for the Typescript Nhost SDK",
          tags: ["plugin", "typescript", "nhost"],
          link: {
            href: "/plugins/undefined/typescript-nhost",
            title: "TypeScript Nhost plugin details",
          },
          update: "2024-09-05T15:10:17.648Z",
          image: {
            src: `${ICON_PREFIX}/nhost.svg`,
            height: 40,
            width: 40,
            alt: "TypeScript Nhost",
          },
          weeklyNPMDownloads: 56,
        },
        {
          title: "TypeScript Msw",
          description:
            "GraphQL Code Generator plugin for generating MSW mock handlers based on GraphQL operations",
          tags: ["plugin", "typescript", "utilities"],
          link: {
            href: "/plugins/typescript/typescript-msw",
            title: "TypeScript Msw plugin details",
          },
          update: "2024-09-05T15:10:16.927Z",
          image: {
            src: "https://raw.githubusercontent.com/mswjs/msw/HEAD/media/msw-logo.svg",
            height: 256,
            width: 256,
            alt: "TypeScript Msw",
          },
          weeklyNPMDownloads: 56_269,
        },
        {
          title: "TypeScript Oclif",
          description:
            "GraphQL Code Generator plugin for generating a CLI tool with oclif",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-oclif",
            title: "TypeScript Oclif plugin details",
          },
          update: "2024-09-05T15:10:19.824Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Oclif",
          },
          weeklyNPMDownloads: 71,
        },
        {
          title: "TypeScript Operations",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types for GraphQL queries, mutations, subscriptions and fragments",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-operations",
            title: "TypeScript Operations plugin details",
          },
          update: "2024-10-22T16:31:00.240Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Operations",
          },
          weeklyNPMDownloads: 2_343_520,
        },
        {
          title: "TypeScript React Apollo",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use React Components/HOC/Hooks based on GraphQL operations",
          tags: ["plugin", "typescript", "react", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-react-apollo",
            title: "TypeScript React Apollo plugin details",
          },
          update: "2024-09-09T16:02:01.569Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript React Apollo",
          },
          weeklyNPMDownloads: 626_234,
        },
        {
          title: "TypeScript React-Query",
          description:
            "GraphQL Code Generator plugin for generating a ready-to-use React-Query Hooks based on GraphQL operations",
          tags: ["plugin", "typescript", "react"],
          link: {
            href: "/plugins/typescript/typescript-react-query",
            title: "TypeScript React-Query plugin details",
          },
          update: "2024-09-05T15:10:19.961Z",
          image: {
            src: `${ICON_PREFIX}/react-query.svg`,
            height: 190,
            width: 190,
            alt: "TypeScript React-Query",
          },
          weeklyNPMDownloads: 132_664,
        },
        {
          title: "TypeScript Resolvers",
          description:
            "GraphQL Code Generator plugin for generating TypeScript types for resolvers signature",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-resolvers",
            title: "TypeScript Resolvers plugin details",
          },
          update: "2024-10-22T16:31:00.428Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Resolvers",
          },
          weeklyNPMDownloads: 561_241,
        },
        {
          title: "TypeScript RTK-Query",
          description:
            "GraphQL Code Generator plugin for injecting graphql endpoints into a preconfigured RTK Query api",
          tags: ["plugin", "typescript", "react"],
          link: {
            href: "/plugins/typescript/typescript-rtk-query",
            title: "TypeScript RTK-Query plugin details",
          },
          update: "2024-09-05T15:10:20.011Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript RTK-Query",
          },
          weeklyNPMDownloads: 21_249,
        },
        {
          title: "TypeScript Stencil Apollo",
          description:
            "GraphQL Code Generator plugin for generating Stencil Components based on GraphQL operations",
          tags: ["plugin", "typescript", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-stencil-apollo",
            title: "TypeScript Stencil Apollo plugin details",
          },
          update: "2024-09-05T15:10:22.682Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript Stencil Apollo",
          },
          weeklyNPMDownloads: 189,
        },
        {
          title: "TypeScript Svelte Apollo",
          description:
            "GraphQL Code Generator plugin to generate client queries from graphql",
          tags: ["plugin", "typescript", "svelte", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-svelte-apollo",
            title: "TypeScript Svelte Apollo plugin details",
          },
          update: "2022-05-04T02:48:38.489Z",
          image: {
            src: `${ICON_PREFIX}/apollo.svg`,
            height: 2430,
            width: 2500,
            alt: "TypeScript Svelte Apollo",
          },
          weeklyNPMDownloads: 1669,
        },
        {
          title: "TypeScript TypeGraphQL",
          description:
            "GraphQL Code Generator plugin for generating TypeGraphQL compatible TypeScript types",
          tags: ["plugin", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-type-graphql",
            title: "TypeScript TypeGraphQL plugin details",
          },
          update: "2024-09-05T15:10:23.491Z",
          image: {
            src: `${ICON_PREFIX}/type-graphql.png`,
            height: 365,
            width: 365,
            alt: "TypeScript TypeGraphQL",
          },
          weeklyNPMDownloads: 1943,
        },
        {
          title: "TypeScript Urql",
          description:
            "GraphQL Code Generator plugin for generating an introspection file for Urql's Schema Awareness",
          tags: ["plugin", "typescript", "urql", "react"],
          link: {
            href: "/plugins/typescript/typescript-urql",
            title: "TypeScript Urql plugin details",
          },
          update: "2024-09-05T15:10:24.887Z",
          image: {
            src: `${ICON_PREFIX}/typescript.svg`,
            height: 2500,
            width: 2500,
            alt: "TypeScript Urql",
          },
          weeklyNPMDownloads: 55_577,
        },
        {
          title: "TypeScript Validation Schema",
          description:
            "GraphQL Code Generator plugin to generate form validation schema from your GraphQL schema",
          tags: ["plugin", "validation", "yup", "zod", "typescript"],
          link: {
            href: "/plugins/typescript/typescript-validation-schema",
            title: "TypeScript Validation Schema plugin details",
          },
          update: "2024-07-13T13:53:18.286Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "TypeScript Validation Schema",
          },
          weeklyNPMDownloads: 26_819,
        },
        {
          title: "TypeScript Vue Apollo Composition API",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Vue-Apollo composition functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-vue-apollo",
            title: "TypeScript Vue Apollo Composition API plugin details",
          },
          update: "2024-09-05T15:10:23.878Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Apollo Composition API",
          },
          weeklyNPMDownloads: 21_672,
        },
        {
          title: "TypeScript Vue Apollo Smart Operations",
          description:
            "GraphQL Code Generator plugin for generating typed Vue-Apollo Smart Query and mutation functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "apollo"],
          link: {
            href: "/plugins/typescript/typescript-vue-apollo-smart-ops",
            title: "TypeScript Vue Apollo Smart Operations plugin details",
          },
          update: "2024-09-05T15:10:23.336Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Apollo Smart Operations",
          },
          weeklyNPMDownloads: 1276,
        },
        {
          title: "TypeScript Vue Urql",
          description:
            "GraphQL Code Generator plugin for generating ready-to-use Vue-Urql composition functions based on GraphQL operations",
          tags: ["plugin", "typescript", "vue", "urql"],
          link: {
            href: "/plugins/typescript/typescript-vue-urql",
            title: "TypeScript Vue Urql plugin details",
          },
          update: "2024-09-05T15:10:23.452Z",
          image: {
            src: `${ICON_PREFIX}/vue.svg`,
            height: 2158,
            width: 2500,
            alt: "TypeScript Vue Urql",
          },
          weeklyNPMDownloads: 1300,
        },
        {
          title: "Urql Introspection for Schema Awareness",
          description:
            "graphql-code-generate plugin for generating fragments matcher introspection file",
          tags: ["plugin", "urql", "typescript"],
          link: {
            href: "/plugins/other/urql-introspection",
            title: "Urql Introspection for Schema Awareness plugin details",
          },
          update: "2024-09-05T15:10:10.696Z",
          image: {
            src: `${ICON_PREFIX}/graphql.svg`,
            height: 2500,
            width: 2222,
            alt: "Urql Introspection for Schema Awareness",
          },
          weeklyNPMDownloads: 23_147,
        },
        {
          title: "Dart Flutter Freezed Classes",
          description:
            "GraphQL Code Generator plugin to generate Freezed models from your GraphQL schema",
          tags: ["plugin", "dart", "flutter"],
          link: {
            href: "/plugins/dart/flutter-freezed",
            title: "Dart Flutter Freezed Classes plugin details",
          },
          update: "2024-09-05T15:10:05.522Z",
          image: {
            src: `${ICON_PREFIX}/dart.svg`,
            height: 256,
            width: 256,
            alt: "Dart Flutter Freezed Classes",
          },
          weeklyNPMDownloads: 150,
        },
      ],
      placeholder: "No results for {query}",
      pagination: 10,
    },
  };
}
