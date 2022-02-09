import { FC } from 'react';
import NextLink from 'next/link';
import styled, { css, keyframes } from 'styled-components';
import tw from 'twin.macro';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useColorModeValue } from '@chakra-ui/react';
import { Anchor, Description, Heading } from './index';

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(2px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-2px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-2px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(2px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledContent = styled(Tooltip.Content)`
  border-radius: 4px;
  padding: 10px 15px;
  font-size: 12px;
  line-height: 1;
  color: #fff;
  background: #16171c;
  box-shadow: hsl(206 22% 7% / 35%) 0 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;

  @media (prefers-reduced-motion: no-preference) {
    animation-duration: 400ms;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
    will-change: transform, opacity;

    &[data-state='delayed-open'] {
      &[data-side='top'] {
        animation-name: ${slideDownAndFade};
      }

      &[data-side='right'] {
        animation-name: ${slideLeftAndFade};
      }

      &[data-side='bottom'] {
        animation-name: ${slideUpAndFade};
      }

      &[data-side='left'] {
        animation-name: ${slideRightAndFade};
      }
    }
  }
`;

export const PlatformSection: FC = () => {
  const bg = useColorModeValue('white', 'var(--colors-background)');
  return (
    <Tooltip.Provider>
      <div
        id="platform"
        css={css`
          background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0) 0%,
              rgba(41, 40, 40, 0.2) 100%
            ),
            ${bg};
        `}
      >
        <div
          css={tw`container mx-auto pt-20 flex flex-col items-center text-center pb-28`}
        >
          <Heading>The Platform</Heading>
          <Description css={tw`max-w-[400px] md:max-w-[700px]`}>
            Our advanced, modular solutions can be adopted gradually as
            individual open source libraries or as a complete unified API
            platform. Explore our suite of sustainable, open source API tools
            that covers everything you need to scale your API infrastructure:
          </Description>

          {/* TODO: Add this when we'll have `/products` route */}
          {/* <Anchor href="#">View All Products ➔</Anchor> */}
          <NextLink href="/about-us">
            <Anchor>Learn more about The Guild ➔</Anchor>
          </NextLink>

          <div css={tw`flex flex-wrap mt-10 max-w-[900px] justify-center`}>
            {PRODUCTS.map((product) => (
              <Tooltip.Root key={product.name}>
                <Tooltip.Trigger asChild>
                  <a
                    css={[
                      css`
                        // 'grayscale' and 'contrast' don't work with tailwind
                        filter: grayscale(100%) contrast(0%);
                      `,
                      tw`
                      hover:text-gray-600
                      dark:hover:text-white
                      hover:filter-none!
                      border
                      border-transparent
                      border-solid
                      dark:hover:border-gray-800
                      transition-all
                      ease-linear
                      duration-200
                      rounded
                      py-3
                      px-5
                      m-2
                      lg:first:ml-6`,
                    ]}
                    // title={}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`/static/shared-logos/products/${product.icon}`}
                      alt={`${product.name} logo`}
                      css={tw`h-[60px] drag-none`}
                    />
                    <h4 css={tw`font-medium mb-0 mt-2 text-xs`}>
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
    url: 'https://graphql-yoga.vercel.app',
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
