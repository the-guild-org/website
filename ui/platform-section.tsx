import { FC } from 'react';
import NextLink from 'next/link';
import { css } from 'styled-components';
import tw from 'twin.macro';
import { Anchor, Description, Heading } from './index';

export const PlatformSection: FC = () => {
  return (
    <div
      id="platform"
      css={css`
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0) 0%,
            rgba(41, 40, 40, 0.2) 100%
          ),
          #0b0d11;
      `}
    >
      <div
        css={tw`container mx-auto pt-20 flex flex-col items-center text-center pb-28`}
      >
        <Heading>The Platform</Heading>
        <Description css={tw`max-w-[400px] md:max-w-[700px]`}>
          Our advanced, modular solutions can be adopted gradually as individual
          open source libraries or as a complete unified API platform. Explore
          our suite of sustainable, open source API tools that covers everything
          you need to scale your API infrastructure:
        </Description>

        {/* TODO: Add this when we'll have `/products` route */}
        {/* <Anchor href="#">View All Products ➔</Anchor> */}
        <NextLink href="/about-us">
          <Anchor>Learn more about The Guild ➔</Anchor>
        </NextLink>

        <div css={tw`flex flex-wrap mt-10 max-w-[900px] justify-center`}>
          {PRODUCTS.map((product) => (
            <a
              key={product.name}
              css={[
                css`
                  // 'grayscale' and 'contrast' don't work with tailwind
                  filter: grayscale(100%) contrast(0%);
                `,
                tw`w-[60px] text-gray-500 hover:text-white hover:filter-none! border border-transparent border-solid hover:border-gray-800 transition-all ease-linear duration-200 rounded py-4 px-6 mb-2 lg:first:ml-6`,
              ]}
              title={product.description}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={`/static/shared-logos/products/${product.icon}`}
                alt={`${product.name} logo`}
                css={tw`h-[60px]`}
              />
              <h4 css={tw`font-medium mb-0 text-xs`}>{product.name}</h4>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

const PRODUCTS: {
  name: string;
  description: string;
  url: `https://${string}`;
  icon: `${string}.svg`;
}[] = [
  {
    name: 'Envelop',
    description: 'Modern GraphQL Framework',
    url: 'https://envelop.dev',
    icon: 'envelop.svg',
  },
  {
    name: 'Code Generator',
    description: 'Generate anything from GraphQL',
    url: 'https://graphql-code-generator.com',
    icon: 'code-generator.svg',
  },
  {
    name: 'Tools',
    description: 'A set of utilities for faster GraphQL development',
    url: 'https://graphql-tools.com',
    icon: 'tools.svg',
  },
  {
    name: 'Swift',
    description: 'A GraphQL client that lets you forget about GraphQL',
    url: 'https://swift-graphql.com',
    icon: 'swift.svg',
  },
  {
    name: 'Mesh',
    description: 'Query anything, run anywhere',
    url: 'https://graphql-mesh.com',
    icon: 'mesh.svg',
  },
  {
    name: 'Modules',
    description: 'Enterprise Grade Tooling For Your GraphQL Server',
    url: 'https://graphql-modules.com',
    icon: 'modules.svg',
  },
  {
    name: 'Scalars',
    description: `Common custom GraphQL Scalars for precise type-safe GraphQL schemas`,
    url: 'https://graphql-scalars.dev',
    icon: 'scalars.svg',
  },
  {
    name: 'Shield',
    description: `GraphQL Permissions Framework For Complex Authorisation Systems`,
    url: 'https://graphql-shield.com',
    icon: 'shield.svg',
  },
  {
    name: 'Hive',
    description: 'Schema Registry for your GraphQL Workflows',
    url: 'https://graphql-hive.com',
    icon: 'hive.svg',
  },
  {
    name: 'Inspector',
    description: 'Schema management tool',
    url: 'https://graphql-inspector.com',
    icon: 'inspector.svg',
  },
  {
    name: 'SOFA',
    description: 'Generate RESTful APIs from your GraphQL Server',
    url: 'https://sofa-api.com',
    icon: 'sofa.svg',
  },
  {
    name: 'Config',
    description: 'One configuration for all your GraphQL tools',
    url: 'https://graphql-config.com/introduction',
    icon: 'config.svg',
  },
  {
    name: 'Helix',
    description: 'A highly evolved GraphQL HTTP Server',
    url: 'https://graphql-helix.com',
    icon: 'helix.svg',
  },
  {
    name: 'ESLint',
    description: 'Customisable ESLint parser, plugin and set rules for GraphQL',
    url: 'https://github.com/dotansimha/graphql-eslint',
    icon: 'eslint.svg',
  },
  {
    name: 'CLI',
    description: 'Command line tool for common GraphQL workflows',
    url: 'https://github.com/Urigo/graphql-cli',
    icon: 'cli.svg',
  },
  {
    name: 'Angular',
    description: `A fully-featured, production ready caching GraphQL client for Angular and every GraphQL server`,
    url: 'https://apollo-angular.com',
    icon: 'angular.svg',
  },
  {
    name: 'WhatsApp',
    description: 'Full Stack, open source tutorial',
    url: 'https://github.com/Urigo/WhatsApp-Clone-Tutorial',
    icon: 'whatsapp.svg',
  },
  {
    name: 'Stencil',
    description: `A fully-featured, production ready caching GraphQL client for Stencil and every GraphQL server`,
    url: 'https://github.com/ardatan/stencil-apollo',
    icon: 'stencil.svg',
  },
  {
    name: 'Yoga',
    description: `A Fully-featured, simple to set up, performant and extendable server`,
    url: 'https://graphql-yoga.vercel.app',
    icon: 'yoga.svg',
  },
];
