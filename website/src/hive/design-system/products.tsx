import { FC, HTMLProps, ReactElement, SVGProps } from "react";

import { cn } from "./cn";
import {
  CodegenIcon,
  HiveGatewayIcon,
  HiveIcon,
  HiveRouterIcon,
  MeshIcon,
  StellateIcon,
  YogaIcon,
} from "./icons";
import {
  AngularLettermark,
  ConductorLettermark,
  ConfigLettermark,
  EnvelopLettermark,
  FetsLettermark,
  GraphQLESlintLettermark,
  HeltinLettermark,
  InspectorLettermark,
  KitQLLettermark,
  ModulesLettermark,
  NextraLogo,
  ScalarsLettermark,
  SofaLettermark,
  SSELettermark,
  StitchingLettermark,
  ToolsLettermark,
  WhatsAppLettermark,
  WSLettermark,
} from "./logos";

export type ProductType =
  | "ANGULAR"
  | "CODEGEN"
  | "CONDUCTOR"
  | "CONFIG"
  | "ENVELOP"
  | "ESLINT"
  | "FETS"
  | "HELTIN"
  | "HIVE"
  | "HIVE_GATEWAY"
  | "HIVE_ROUTER"
  | "INSPECTOR"
  | "KITQL"
  | "MESH"
  | "MODULES"
  | "NEXTRA"
  | "SCALARS"
  | "SOFA"
  | "SSE"
  | "STELLATE"
  | "STITCHING"
  | "TOOLS"
  | "WHATSAPP"
  | "WS"
  | "YOGA";

export interface ProductInfo {
  href: `https://${string}`;
  logo: FC<HTMLProps<HTMLElement>> | FC<SVGProps<SVGSVGElement>>;
  name: string;
  primaryColor: `#${string}`;
  title: string;
}

export const PRODUCTS: Record<ProductType, ProductInfo> = {
  ANGULAR: {
    href: "https://the-guild.dev/graphql/apollo-angular",
    logo: AngularLettermark,
    name: "Angular",
    primaryColor: "#ff1035",
    title: "A fully-featured GraphQL client for Angular",
  },
  CODEGEN: {
    href: "https://the-guild.dev/graphql/codegen",
    logo: CodegenIcon,
    name: "Codegen",
    primaryColor: "#0284c7",
    title:
      "Generation of typed queries, mutations, subscriptions and typed GraphQL resolvers",
  },
  CONDUCTOR: {
    href: "https://the-guild.dev/graphql/gateway",
    logo: ConductorLettermark,
    name: "Conductor",
    primaryColor: "#0f766e",
    title: "All-in-one GraphQL Gateway",
  },
  CONFIG: {
    href: "https://the-guild.dev/graphql/config",
    logo: ConfigLettermark,
    name: "Config",
    primaryColor: "#6d7a99",
    title: "One configuration for all your GraphQL projects",
  },
  ENVELOP: {
    href: "https://the-guild.dev/graphql/envelop",
    logo: EnvelopLettermark,
    name: "Envelop",
    primaryColor: "#ff00e5",
    title:
      "Develop and share plugins that are usable with any GraphQL server framework or schema",
  },
  ESLINT: {
    href: "https://the-guild.dev/graphql/eslint",
    logo: GraphQLESlintLettermark,
    name: "GraphQL ESLint",
    primaryColor: "#5639ca",
    title: "Customizable ESLint parser, plugin, and rule set for GraphQL",
  },
  FETS: {
    href: "https://the-guild.dev/fets",
    logo: FetsLettermark,
    name: "feTS",
    primaryColor: "#3178c6",
    title:
      "Build and consume REST APIs with the e2e type safety using TypeScript and OpenAPI",
  },
  HELTIN: {
    href: "https://the-guild.dev/heltin",
    logo: HeltinLettermark,
    name: "heltin",
    primaryColor: "#1d90ff",
    title: "Mental healthcare registry",
  },
  HIVE: {
    href: "https://the-guild.dev/graphql/hive",
    logo: HiveIcon,
    name: "Hive",
    primaryColor: "#ffb21d",
    title:
      "Open Source GraphQL Federation Platform (Schema Registry, Gateway, Analytics)",
  },
  HIVE_GATEWAY: {
    href: "https://the-guild.dev/graphql/hive/gateway",
    logo: HiveGatewayIcon,
    name: "Hive Gateway",
    primaryColor: "#ffb21d",
    title:
      "GraphQL Gateway (Router) for federated GraphQL with Subscriptions support and built-in security features",
  },
  HIVE_ROUTER: {
    href: "https://github.com/graphql-hive/router",
    logo: HiveRouterIcon,
    name: "Hive Router",
    primaryColor: "#ffb21d",
    title:
      "Open-source (MIT) GraphQL Federation Router. Built with Rust for maximum performance and robustness.",
  },
  INSPECTOR: {
    href: "https://the-guild.dev/graphql/inspector",
    logo: InspectorLettermark,
    name: "Inspector",
    primaryColor: "#59f79d",
    title: "Schema management tool",
  },
  KITQL: {
    href: "https://kitql.dev",
    logo: KitQLLettermark,
    name: "KitQL",
    primaryColor: "#ff3e00",
    title: "A set of tools, helping you building efficient apps in a fast way",
  },
  MESH: {
    href: "https://the-guild.dev/graphql/mesh",
    logo: MeshIcon,
    name: "Mesh",
    primaryColor: "#1bcbe2",
    title: "A fully-featured GraphQL federation framework",
  },
  MODULES: {
    href: "https://the-guild.dev/graphql/modules",
    logo: ModulesLettermark,
    name: "Modules",
    primaryColor: "#e535ab",
    title: "Enterprise grade tooling for your GraphQL server",
  },
  NEXTRA: {
    href: "https://nextra.site",
    logo: NextraLogo,
    name: "Nextra",
    primaryColor: "#000",
    title:
      "Simple, powerful and flexible site generation framework with everything you love from Next.js",
  },
  SCALARS: {
    href: "https://the-guild.dev/graphql/scalars",
    logo: ScalarsLettermark,
    name: "Scalars",
    primaryColor: "#f38",
    title:
      "Common custom GraphQL Scalars for precise type-safe GraphQL schemas",
  },
  SOFA: {
    href: "https://the-guild.dev/graphql/sofa-api",
    logo: SofaLettermark,
    name: "SOFA",
    primaryColor: "#e873ff",
    title: "Generate RESTful APIs from your GraphQL server",
  },
  SSE: {
    href: "https://the-guild.dev/graphql/sse",
    logo: SSELettermark,
    name: "SSE",
    primaryColor: "#08e045",
    title: "Reference implementation of the GraphQL over SSE spec",
  },
  STELLATE: {
    href: "https://stellate.co",
    logo: StellateIcon,
    name: "Stellate",
    primaryColor: "#FF7752",
    title: "The GraphQL Edge Platform for security, caching, and observability",
  },
  STITCHING: {
    href: "https://the-guild.dev/graphql/stitching",
    logo: StitchingLettermark,
    name: "Stitching",
    primaryColor: "#f95428",
    title:
      "Automatically stitch multiple schemas together into one larger API in a simple, fast and powerful way",
  },
  TOOLS: {
    href: "https://the-guild.dev/graphql/tools",
    logo: ToolsLettermark,
    name: "Tools",
    primaryColor: "#184ae8",
    title: "A set of utilities for faster GraphQL development",
  },
  WHATSAPP: {
    href: "https://github.com/Urigo/WhatsApp-Clone-Tutorial",
    logo: WhatsAppLettermark,
    name: "WhatsApp",
    primaryColor: "#31eb14",
    title: "Full stack, open source tutorial",
  },
  WS: {
    href: "https://the-guild.dev/graphql/ws",
    logo: WSLettermark,
    name: "WS",
    primaryColor: "#0bf2e7",
    title: "Reference implementation of the GraphQL over WS spec",
  },
  YOGA: {
    href: "https://the-guild.dev/graphql/yoga-server",
    logo: YogaIcon,
    name: "Yoga",
    primaryColor: "#c026d3",
    title:
      "A fully-featured, simple to set up, performant and extendable server",
  },
};

export const FIVE_MAIN_PRODUCTS = [
  PRODUCTS.HIVE,
  PRODUCTS.HIVE_GATEWAY,
  PRODUCTS.HIVE_ROUTER,
  PRODUCTS.YOGA,
  PRODUCTS.MESH,
];

export const SIX_HIGHLIGHTED_PRODUCTS = [
  PRODUCTS.CODEGEN,
  PRODUCTS.INSPECTOR,
  PRODUCTS.ENVELOP,
  PRODUCTS.SOFA,
  PRODUCTS.SCALARS,
  PRODUCTS.ESLINT,
];

/** List of products displayed in hamburger menu. */
export const PRODUCTS_MENU_LIST = Object.fromEntries<
  | {
      href: string;
      title: ReactElement;
    }
  | {
      title: ReactElement;
      type: "separator";
    }
>(
  (
    [
      "The GraphQL Stack",
      ...FIVE_MAIN_PRODUCTS,
      "Libraries",
      ...SIX_HIGHLIGHTED_PRODUCTS,
    ] as const
  ).map((item, i) => {
    if (typeof item === "string") {
      return [
        i,
        {
          title: (
            <>
              {/* This is a one-off class. The margins and paddings of the parent list item are were large. */}
              <style className="hive-label-separator">
                {
                  ":is(a,li):has(>.hive-label-separator) { margin: 0.75rem 0 0.25rem 0; padding: 0 }"
                }
              </style>
              <span className="ml-2 font-medium text-gray-500 dark:text-neutral-400">
                {item}
              </span>
            </>
          ),
          type: "separator",
        },
      ];
    }
    return [
      i,
      {
        href: item.href,
        title: (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex translate-y-[0.25px]",
                i > 7 && "rounded-xs bg-gray-500 text-white dark:bg-white/10",
              )}
            >
              <item.logo className="size-4 text-[8px]" />
            </div>
            {item.name}
          </div>
        ),
      },
    ];
  }),
);
