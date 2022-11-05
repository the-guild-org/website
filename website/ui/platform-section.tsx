import { ReactElement } from 'react';
import { PRODUCTS, Anchor } from '@theguild/components';
import { Description, Heading, Tooltip, Link } from './components';

export const PlatformSection = ({ className }: { className?: string }): ReactElement => {
  return (
    <Tooltip.Provider>
      <div id="platform" className={className}>
        <div className="container flex flex-col items-center px-4 pt-20 pb-28 text-center sm:px-6 md:px-8">
          <Heading>The Ecosystem</Heading>
          <Description className="max-w-[400px] md:max-w-[700px]">
            Our advanced, modular solutions can be adopted gradually as individual open source libraries or as a
            complete unified API platform. Explore our suite of sustainable, open source API tools that covers
            everything you need to scale your API infrastructure:
          </Description>

          {/* TODO: Add this when we'll have `/products` route */}
          {/* <Link href="#">View All Products ➔</Link> */}
          <Link
            href="/about-us"
            className="font-bold !text-gray-500 hover:!text-gray-600 hover:no-underline dark:hover:!text-gray-300"
          >
            Learn more about The Guild ➔
          </Link>

          <div className="mt-10 flex max-w-[900px] flex-wrap justify-center">
            {Object.values(PRODUCTS).map(product => (
              <Tooltip key={product.name} content={product.title}>
                <Anchor
                  className="
                  m-2
                  flex
                  flex-col
                  gap-2
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
                  href={product.href}
                >
                  <product.logo className="h-16 w-auto" />
                  <h4 className="text-xs font-medium">{product.name}</h4>
                </Anchor>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};
