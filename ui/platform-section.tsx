import { FC } from 'react';
import NextLink from 'next/link';
import * as Tooltip from '@radix-ui/react-tooltip';
import { keyframes, styled } from '../stitches.config';
import { Anchor, Description, Heading } from './components';

const slideUpOrLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideDownOrRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const StyledContent = styled(Tooltip.Content, {
  borderRadius: 4,
  padding: '10px 15px',
  fontSize: 12,
  lineHeight: 1,
  color: '#fff',
  background: '#16171c',
  boxShadow: `hsl(206 22% 7% / 35%) 0 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px`,
  '@media (prefers-reduced-motion: no-preference)': {
    animationDuration: '400ms',
    animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    '&[data-state="delayed-open"]': {
      '&[data-side="top"], &[data-side="left"]': {
        animationName: slideDownOrRightAndFade,
      },
      '&[data-side="bottom"], &[data-side="right"]': {
        animationName: slideUpOrLeftAndFade,
      },
    },
  },
});

export const PlatformSection: FC = () => {
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
          <Heading>The Platform</Heading>
          <Description className="max-w-[400px] md:max-w-[700px]">
            Our advanced, modular solutions can be adopted gradually as
            individual open source libraries or as a complete unified API
            platform. Explore our suite of sustainable, open source API tools
            that covers everything you need to scale your API infrastructure:
          </Description>

          {/* TODO: Add this when we'll have `/products` route */}
          {/* <Anchor href="#">View All Products ➔</Anchor> */}
          <NextLink href="/about-us" passHref>
            <Anchor>Learn more about The Guild ➔</Anchor>
          </NextLink>

          <div className="mt-10 flex max-w-[900px] flex-wrap justify-center">
            {PRODUCTS.map((product) => (
              <Tooltip.Root key={product.name}>
                <Tooltip.Trigger asChild>
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
                    <img
                      src={`/static/shared-logos/products/${product.icon}`}
                      alt={`${product.name} logo`}
                      className="h-[60px] drag-none"
                    />
                    <h4 className="mt-2 mb-0 text-xs font-medium">
                      {product.name}
                    </h4>
                  </a>
                </Tooltip.Trigger>
                <StyledContent sideOffset={5}>
                  {product.description}
                </StyledContent>
              </Tooltip.Root>
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
  icon: `${string}.svg`;
}[] = [
  {
    name: 'Envelop',
    description: 'Modern GraphQL Framework',
    url: 'https://envelop.dev',
    icon: 'envelop.svg',
  },
  {
    name: 'Codegen',
    description: 'Generate anything from GraphQL',
    url: 'https://graphql-code-generator.com',
    icon: 'code-generator.svg',
  },
  {
    name: 'Mesh',
    description: 'Query anything, run anywhere',
    url: 'https://graphql-mesh.com',
    icon: 'mesh.svg',
  },
  {
    name: 'Tools',
    description: 'A set of utilities for faster GraphQL development',
    url: 'https://graphql-tools.com',
    icon: 'tools.svg',
  },
  {
    name: 'Yoga',
    description: `A Fully-featured, simple to set up, performant and extendable server`,
    url: 'https://graphql-yoga.com',
    icon: 'yoga.svg',
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
    name: 'Config',
    description: 'One configuration for all your GraphQL tools',
    url: 'https://graphql-config.com/docs/user/user-introduction',
    icon: 'config.svg',
  },
  {
    name: 'Swift',
    description: 'A GraphQL client that lets you forget about GraphQL',
    url: 'https://swift-graphql.com',
    icon: 'swift.svg',
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
    name: 'SOFA',
    description: 'Generate RESTful APIs from your GraphQL Server',
    url: 'https://sofa-api.com',
    icon: 'sofa.svg',
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
];
