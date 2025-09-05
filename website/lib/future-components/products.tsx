import { FC, HTMLProps, ReactElement, SVGProps } from 'react';
import { PRODUCTS as OLD_PRODUCTS } from '@theguild/components';
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

export type ProductType =
  | 'HIVE'
  | 'HIVE_GATEWAY'
  | 'HIVE_ROUTER'
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
  | 'STELLATE';

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
      'GraphQL Gateway for federated GraphQL with Subscriptions support and built-in security features',
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
  },
  ENVELOP: {
    name: 'Envelop',
    title: 'Develop and share plugins that are usable with any GraphQL server framework or schema',
    href: 'https://the-guild.dev/graphql/envelop',
    logo: OLD_PRODUCTS.ENVELOP.logo,
  },
  STITCHING: {
    name: 'Stitching',
    title:
      'Automatically stitch multiple schemas together into one larger API in a simple, fast and powerful way',
    href: 'https://the-guild.dev/graphql/stitching',
    logo: OLD_PRODUCTS.STITCHING.logo,
  },
  INSPECTOR: {
    name: 'Inspector',
    title: 'Schema management tool',
    href: 'https://the-guild.dev/graphql/inspector',
    logo: OLD_PRODUCTS.INSPECTOR.logo,
  },
  TOOLS: {
    name: 'Tools',
    title: 'A set of utilities for faster GraphQL development',
    href: 'https://the-guild.dev/graphql/tools',
    logo: OLD_PRODUCTS.TOOLS.logo,
  },
  MODULES: {
    name: 'Modules',
    title: 'Enterprise grade tooling for your GraphQL server',
    href: 'https://the-guild.dev/graphql/modules',
    logo: OLD_PRODUCTS.MODULES.logo,
  },
  ESLINT: {
    name: 'GraphQL ESLint',
    title: 'Customizable ESLint parser, plugin, and rule set for GraphQL',
    href: 'https://the-guild.dev/graphql/eslint',
    logo: OLD_PRODUCTS.ESLINT.logo,
  },
  CONFIG: {
    name: 'Config',
    title: 'One configuration for all your GraphQL projects',
    href: 'https://the-guild.dev/graphql/config',
    logo: OLD_PRODUCTS.CONFIG.logo,
  },
  FETS: {
    name: 'feTS',
    title: 'Build and consume REST APIs with the e2e type safety using TypeScript and OpenAPI',
    href: 'https://the-guild.dev/fets',
    logo: OLD_PRODUCTS.FETS.logo,
  },
  SCALARS: {
    name: 'Scalars',
    title: 'Common custom GraphQL Scalars for precise type-safe GraphQL schemas',
    href: 'https://the-guild.dev/graphql/scalars',
    logo: OLD_PRODUCTS.SCALARS.logo,
  },
  SOFA: {
    name: 'SOFA',
    title: 'Generate RESTful APIs from your GraphQL server',
    href: 'https://the-guild.dev/graphql/sofa-api',
    logo: OLD_PRODUCTS.SOFA.logo,
  },
  ANGULAR: {
    name: 'Angular',
    title: 'A fully-featured GraphQL client for Angular',
    href: 'https://the-guild.dev/graphql/apollo-angular',
    logo: OLD_PRODUCTS.ANGULAR.logo,
  },
  WHATSAPP: {
    name: 'WhatsApp',
    title: 'Full stack, open source tutorial',
    href: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    logo: OLD_PRODUCTS.WHATSAPP.logo,
  },
  KITQL: {
    name: 'KitQL',
    title: 'A set of tools, helping you building efficient apps in a fast way',
    href: 'https://kitql.dev',
    logo: OLD_PRODUCTS.KITQL.logo,
  },
  WS: {
    name: 'WS',
    title: 'Reference implementation of the GraphQL over WS spec',
    href: 'https://the-guild.dev/graphql/ws',
    logo: OLD_PRODUCTS.WS.logo,
  },
  SSE: {
    name: 'SSE',
    title: 'Reference implementation of the GraphQL over SSE spec',
    href: 'https://the-guild.dev/graphql/sse',
    logo: OLD_PRODUCTS.SSE.logo,
  },
  HELTIN: {
    name: 'heltin',
    title: 'Mental healthcare registry',
    href: 'https://the-guild.dev/heltin',
    logo: OLD_PRODUCTS.HELTIN.logo,
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
            <div className="flex translate-y-[0.25px]">
              <item.logo
                className={cn(
                  'size-5 whitespace-pre font-mono text-[9px] text-gray-500 dark:text-gray-400 [[data-headlessui-state=active]_&]:text-gray-900 dark:[[data-headlessui-state=active]_&]:text-white',
                  (item.name === PRODUCTS.ESLINT.name || item.name === PRODUCTS.SSE.name) &&
                    '[&_path]:stroke-current',
                )}
                fill="currentColor"
              />
            </div>
            {item.name}
          </div>
        ),
      },
    ];
  }),
);
