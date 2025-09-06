import { ReactNode, useState } from 'react';
import NextImage, { StaticImageData } from 'next/image';
import { clsx } from 'clsx';
import { AnimatePresence, AnimationProps, motion } from 'framer-motion';
import { GuildButton } from '@/components';
import { ProductInfo, PRODUCTS } from '../../lib/future-components/products';
import diagram from './diagram.svg';
import hiveHero from './hive-hero.png';
import meshHero from './mesh-hero.svg';

const MotionNextImage = motion(NextImage);

interface HeroProductInfo extends Pick<ProductInfo, 'name' | 'href' | 'logo'> {
  title: string;
  color: string;
  description: string;
  heading: ReactNode;
  illustration: {
    src: StaticImageData;
    alt: string;
    className?: string;
  };
}

const animationConfig: AnimationProps = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 0, opacity: 0 },
  transition: { duration: 0.5 },
};

const products: HeroProductInfo[] = [
  {
    ...PRODUCTS.HIVE,
    description:
      'Prevent breaking changes, monitor performance of your GraphQL API, and manage your API gateway',
    title: 'Hive - Open Source GraphQL Federation Platform',
    color: '#FFB21E', // outdated, but it matches the screenshot.
    heading: (
      <>
        Schema Registry
        <br />
        and Observability
        <br />
        for GraphQL
      </>
    ),
    illustration: {
      src: hiveHero,
      alt: 'Hive dashboard',
      className: 'w-[55%]',
    },
  },
  {
    ...PRODUCTS.MESH,
    description: 'Federate and serve any kind of API',
    title: 'Mesh - Federated architecture for every API',
    color: '#FFB21E',
    heading: (
      <>
        The Graph
        <br />
        of Everything
      </>
    ),
    illustration: {
      src: meshHero,
      alt: 'Mesh diagram',
      className: 'w-2/3',
    },
  },
  {
    name: 'Hive Gateway',
    href: PRODUCTS.HIVE_GATEWAY.href,
    logo: PRODUCTS.HIVE_GATEWAY.logo, // todo: show both logos of gateway and router
    color: '#E1FF00',
    description: PRODUCTS.HIVE_GATEWAY.title,
    title: '',
    heading: (
      <>
        The Gateway
        <br />
        for your API
      </>
    ),
    illustration: {
      src: diagram,
      alt: 'GraphQL architecture diagram',
      className: 'w-[2/3]',
    },
  },
];

export function Hero() {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const currentProduct = products[currentTab];
  return (
    <div className="nextra-container pb-14 pt-20 lg:pb-36 lg:pt-28">
      <div className="mb-8 flex gap-10 text-sm font-medium max-lg:justify-center lg:mb-12 lg:text-lg">
        {products.map((product, index) => {
          const isCurrent = currentTab === index;
          return (
            <HeroTabButton
              key={index}
              isActive={isCurrent}
              color={product.color}
              onClick={() => setCurrentTab(index)}
            >
              <product.logo className="h-7 w-auto" />
              {product.name}
            </HeroTabButton>
          );
        })}
      </div>
      <div className="flex gap-24">
        <div className="max-lg:w-full max-lg:text-center">
          <h2 className="mb-4 text-4xl/snug font-medium lg:text-[3.625rem]/tight">
            {currentProduct.heading}
          </h2>
          <p className="mb-10 text-gray-500 lg:mb-12">{currentProduct.description}</p>
          <GuildButton
            as="a"
            style={{ background: currentProduct.color }}
            href={currentProduct.href}
            title={currentProduct.title}
          >
            Explore {currentProduct.name}
          </GuildButton>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          {products.map((product, i) => {
            if (i !== currentTab) return null;
            return (
              <MotionNextImage
                key={i}
                {...animationConfig}
                {...product.illustration}
                className={clsx(
                  'pointer-events-none h-full w-1/2 max-lg:hidden',
                  product.illustration.className,
                )}
              />
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

interface HeroTabButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive: boolean;
  color: string;
}

function HeroTabButton({ isActive, color, ...rest }: HeroTabButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'flex items-center gap-2.5 border-b-2 pb-2.5 lg:pb-3.5',
        isActive ? 'border-[--color] [&_svg]:fill-[--color]' : 'border-gray-500 text-gray-500',
        rest.className,
      )}
      style={{ '--color': color }}
    />
  );
}
