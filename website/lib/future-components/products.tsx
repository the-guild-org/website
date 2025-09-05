import { FC, HTMLProps, ReactElement, SVGProps } from 'react';
import { cn } from './cn';
import {
  CodegenIcon,
  HiveGatewayIcon,
  HiveIcon,
  HiveRouterIcon,
  MeshIcon,
  StellateIcon,
  YogaIcon,
} from './components/icons';
import {
  AngularLettermark,
  ConfigLettermark,
  EnvelopLettermark,
  FetsLettermark,
  GraphQLESlintLettermark,
  HeltinLettermark,
  InspectorLettermark,
  KitQLLettermark,
  ModulesLettermark,
  ScalarsLettermark,
  SofaLettermark,
  SSELettermark,
  StitchingLettermark,
  ToolsLettermark,
  WhatsAppLettermark,
  WSLettermark,
} from './logos';

export type ProductType =
  | 'HIVE'
  | 'HIVE_GATEWAY'
  | 'HIVE_ROUTER'
  | 'CONDUCTOR'
  | 'YOGA'
  | 'ENVELOP'
  | 'INSPECTOR'
  | 'CODEGEN'
  | 'MESH'
  | 'TOOLS'
  | 'MODULES'
  | 'ESLINT'
  | 'CONFIG'
  | 'SCALARS'
  | 'SOFA'
  | 'STITCHING'
  | 'ANGULAR'
  | 'WHATSAPP'
  | 'KITQL'
  | 'SSE'
  | 'WS'
  | 'FETS'
  | 'HELTIN'
  | 'NEXTRA';

export interface ProductInfo {
  name: string;
  title: string;
  href: `https://${string}`;
  logo: FC<SVGProps<SVGElement>> | FC<HTMLProps<HTMLElement>>;
}

export const PRODUCTS: Record<ProductType, ProductInfo> = {
  HIVE: {
    name: 'Hive Console',
    title: 'Open Source GraphQL Federation Platform (Schema Registry, Gateway, Analytics)',
    href: 'https://the-guild.dev/graphql/hive',
    logo: HiveIcon,
  },
  HIVE_GATEWAY: {
    name: 'Hive Gateway',
    title:
      'GraphQL Gateway (Router) for federated GraphQL with Subscriptions support and built-in security features',
    href: 'https://the-guild.dev/graphql/hive/gateway',
    logo: HiveGatewayIcon,
  },
  HIVE_ROUTER: {
    name: 'Hive Router',
    title:
      'Open-source (MIT) GraphQL Federation Router. Built with Rust for maximum performance and robustness.',
    href: 'https://github.com/graphql-hive/router',
    logo: HiveRouterIcon,
  },
  MESH: {
    name: 'Mesh',
    title: 'A fully-featured GraphQL federation framework',
    href: 'https://the-guild.dev/graphql/mesh',
    logo: MeshIcon,
  },
  YOGA: {
    name: 'Yoga',
    title: 'A fully-featured, simple to set up, performant and extendable server',
    href: 'https://the-guild.dev/graphql/yoga-server',
    logo: YogaIcon,
  },
  CODEGEN: {
    name: 'Codegen',
    title: 'Generation of typed queries, mutations, subscriptions and typed GraphQL resolvers',
    href: 'https://the-guild.dev/graphql/codegen',
    logo: CodegenIcon,
  },
  STELLATE: {
    name: 'Stellate',
    title: 'The GraphQL Edge Platform for security, caching, and observability',
    href: 'https://stellate.co',
    logo: StellateIcon,
    primaryColor: '#FF7752',
  },
  ENVELOP: {
    name: 'Envelop',
    title: 'Develop and share plugins that are usable with any GraphQL server framework or schema',
    href: 'https://the-guild.dev/graphql/envelop',
    logo: EnvelopLettermark,
  },
  STITCHING: {
    name: 'Stitching',
    title:
      'Automatically stitch multiple schemas together into one larger API in a simple, fast and powerful way',
    href: 'https://the-guild.dev/graphql/stitching',
    logo: StitchingLettermark,
  },
  INSPECTOR: {
    name: 'Inspector',
    title: 'Schema management tool',
    href: 'https://the-guild.dev/graphql/inspector',
    logo: InspectorLettermark,
  },
  TOOLS: {
    name: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://the-guild.dev/graphql/tools',
    logo: ToolsLettermark,
  },
  MODULES: {
    name: 'Modules',
    title: 'Enterprise grade tooling for your GraphQL server',
    href: 'https://the-guild.dev/graphql/modules',
    logo: ModulesLettermark,
  },
  ESLINT: {
    name: 'GraphQL ESLint',
    title: 'Customizable ESLint parser, plugin, and rule set for GraphQL',
    href: 'https://the-guild.dev/graphql/eslint',
    logo: GraphQLESlintLettermark,
  },
  CONFIG: {
    name: 'Config',
    title: 'One configuration for all your GraphQL projects',
    href: 'https://the-guild.dev/graphql/config',
    logo: ConfigLettermark,
  },
  FETS: {
    name: 'feTS',
    title: 'Build and consume REST APIs with the e2e type safety using TypeScript and OpenAPI',
    href: 'https://the-guild.dev/fets',
    logo: FetsLettermark,
  },
  SCALARS: {
    name: 'Scalars',
    title: 'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://the-guild.dev/graphql/scalars',
    logo: ScalarsLettermark,
  },
  SOFA: {
    name: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL server',
    href: 'https://the-guild.dev/graphql/sofa-api',
    logo: SofaLettermark,
  },
  ANGULAR: {
    name: 'Angular',
    title: 'A fully-featured GraphQL client for Angular',
    href: 'https://the-guild.dev/graphql/apollo-angular',
    logo: AngularLettermark,
  },
  WHATSAPP: {
    name: 'WhatsApp',
    title: 'Full stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    logo: WhatsAppLettermark,
  },
  KITQL: {
    name: 'KitQL',
    title: 'A set of tools, helping you building efficient apps in a fast way',
    href: 'https://kitql.dev',
    logo: KitQLLettermark,
  },
  WS: {
    name: 'WS',
    title: 'Reference implementation of the GraphQL over WS spec',
    href: 'https://the-guild.dev/graphql/ws',
    logo: WSLettermark,
  },
  SSE: {
    name: 'SSE',
    title: 'Reference implementation of the GraphQL over SSE spec',
    href: 'https://the-guild.dev/graphql/sse',
    logo: SSELettermark,
  },
  HELTIN: {
    name: 'heltin',
    title: 'Mental healthcare registry',
    href: 'https://the-guild.dev/heltin',
    logo: HeltinLettermark,
  },
};

/** List of products displayed in hamburger menu. */
export const PRODUCTS_MENU_LIST = Object.fromEntries<
  | {
      type: 'separator';
      title: ReactElement;
    }
  | {
      href: string;
      title: ReactElement;
    }
>(
  Object.values(PRODUCTS).map((item, i) => {
    return [
      i,
      {
        href: item.href,
        title: (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                'flex translate-y-[0.25px]',
                i > 6 && 'rounded-sm bg-gray-500 text-white dark:bg-white/10',
              )}
            >
              <item.logo className="size-5 whitespace-pre font-mono text-[9px]" />
            </div>
            {item.name}
          </div>
        ),
      },
    ];
  }),
);
