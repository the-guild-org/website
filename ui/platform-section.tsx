import { ReactElement } from 'react';
import { StaticImageData } from 'next/image';
import NextLink from 'next/link';
import { Image } from '@theguild/components';
import { Description, Heading, Tooltip } from './components';
import envelop from '../public/static/shared-logos/products/envelop.svg';
import codegen from '../public/static/shared-logos/products/code-generator.svg';
import mesh from '../public/static/shared-logos/products/mesh.svg';
import tools from '../public/static/shared-logos/products/tools.svg';
import yoga from '../public/static/shared-logos/products/yoga.svg';
import hive from '../public/static/shared-logos/products/hive.svg';
import inspector from '../public/static/shared-logos/products/inspector.svg';
import helix from '../public/static/shared-logos/products/helix.svg';
import eslint from '../public/static/shared-logos/products/eslint.svg';
import config from '../public/static/shared-logos/products/config.svg';
import swift from '../public/static/shared-logos/products/swift.svg';
import modules from '../public/static/shared-logos/products/modules.svg';
import scalars from '../public/static/shared-logos/products/scalars.svg';
import shield from '../public/static/shared-logos/products/shield.svg';
import sofa from '../public/static/shared-logos/products/sofa.svg';
import cli from '../public/static/shared-logos/products/cli.svg';
import angular from '../public/static/shared-logos/products/angular.svg';
import whatsapp from '../public/static/shared-logos/products/whatsapp.svg';
import kitql from '../public/static/shared-logos/products/kitql-wow.svg';
import stencil from '../public/static/shared-logos/products/stencil.svg';

export const PlatformSection = (): ReactElement => {
  return (
    <Tooltip.Provider>
      <div
        id="platform"
        className="
        [background:linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(41,40,40,0.1)100%)]
        dark:[background:linear-gradient(180deg,rgba(0,0,0,0)0%,rgba(41,40,40,0.2)100%),#0b0d11]
        "
      >
        <div className="container flex flex-col items-center px-4 pt-20 pb-28 text-center sm:px-6 md:px-8">
          <Heading>The Ecosystem</Heading>
          <Description className="max-w-[400px] md:max-w-[700px]">
            Our advanced, modular solutions can be adopted gradually as
            individual open source libraries or as a complete unified API
            platform. Explore our suite of sustainable, open source API tools
            that covers everything you need to scale your API infrastructure:
          </Description>

          {/* TODO: Add this when we'll have `/products` route */}
          {/* <Anchor href="#">View All Products ➔</Anchor> */}
          <NextLink href="/about-us">Learn more about The Guild ➔</NextLink>

          <div className="mt-10 flex max-w-[900px] flex-wrap justify-center">
            {PRODUCTS.map((product) => (
              <Tooltip key={product.name} content={product.description}>
                <a
                  className="
                  m-2
                  rounded
                  border
                  border-solid
                  border-transparent
                  py-3
                  px-5
                  contrast-0
                  grayscale
                  transition-all
                  duration-200
                  ease-linear
                  hover:text-gray-600
                  hover:filter-none
                  dark:hover:border-gray-800
                  dark:hover:text-white
                  lg:first:ml-6
                "
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={product.icon}
                    alt={`${product.name} logo`}
                    placeholder="empty"
                    className="h-16 w-auto"
                  />
                  <h4 className="mt-2 text-xs font-medium">{product.name}</h4>
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

const PRODUCTS: {
  name: string;
  description: string;
  url: `https://${string}`;
  icon: StaticImageData;
}[] = [
  {
    name: 'Envelop',
    description: 'Modern GraphQL Framework',
    url: 'https://envelop.dev',
    icon: envelop,
  },
  {
    name: 'Codegen',
    description: 'Generate anything from GraphQL',
    url: 'https://graphql-code-generator.com',
    icon: codegen,
  },
  {
    name: 'Mesh',
    description: 'Query anything, run anywhere',
    url: 'https://graphql-mesh.com',
    icon: mesh,
  },
  {
    name: 'Tools',
    description: 'A set of utilities for faster GraphQL development',
    url: 'https://graphql-tools.com',
    icon: tools,
  },
  {
    name: 'Yoga',
    description: `A Fully-featured, simple to set up, performant and extendable server`,
    url: 'https://graphql-yoga.com',
    icon: yoga,
  },
  {
    name: 'Hive',
    description: 'Schema Registry for your GraphQL Workflows',
    url: 'https://graphql-hive.com',
    icon: hive,
  },
  {
    name: 'Inspector',
    description: 'Schema management tool',
    url: 'https://graphql-inspector.com',
    icon: inspector,
  },
  {
    name: 'Helix',
    description: 'A highly evolved GraphQL HTTP Server',
    url: 'https://graphql-helix.com',
    icon: helix,
  },
  {
    name: 'ESLint',
    description: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    url: 'https://github.com/dotansimha/graphql-eslint',
    icon: eslint,
  },
  {
    name: 'Config',
    description: 'One configuration for all your GraphQL tools',
    url: 'https://graphql-config.com/docs/user/user-introduction',
    icon: config,
  },
  {
    name: 'Swift',
    description: 'A GraphQL client that lets you forget about GraphQL',
    url: 'https://swift-graphql.com',
    icon: swift,
  },
  {
    name: 'Modules',
    description: 'Enterprise Grade Tooling For Your GraphQL Server',
    url: 'https://graphql-modules.com',
    icon: modules,
  },
  {
    name: 'Scalars',
    description: `Common custom GraphQL Scalars for precise type-safe GraphQL schemas`,
    url: 'https://graphql-scalars.dev',
    icon: scalars,
  },
  {
    name: 'Shield',
    description: `GraphQL Permissions Framework For Complex Authorisation Systems`,
    url: 'https://graphql-shield.com',
    icon: shield,
  },
  {
    name: 'SOFA',
    description: 'Generate RESTful APIs from your GraphQL Server',
    url: 'https://sofa-api.com',
    icon: sofa,
  },
  {
    name: 'CLI',
    description: 'Command line tool for common GraphQL workflows',
    url: 'https://github.com/Urigo/graphql-cli',
    icon: cli,
  },
  {
    name: 'Angular',
    description: `A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server`,
    url: 'https://apollo-angular.com',
    icon: angular,
  },
  {
    name: 'WhatsApp',
    description: 'Full Stack, open source tutorial',
    url: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    icon: whatsapp,
  },
  {
    name: 'KitQL',
    description:
      'A set of tools, helping you building efficient apps in a fast way. >> SvelteKit & GraphQL <<',
    url: 'https://kitql.dev',
    icon: kitql,
  },
  {
    name: 'Stencil',
    description: `A fully-featured, production ready caching GraphQL client for Stencil and every GraphQL server`,
    url: 'https://github.com/ardatan/stencil-apollo',
    icon: stencil,
  },
];
