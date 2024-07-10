import { ComponentProps, ReactElement, useState } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import hiveHero from '@/hive-hero.png';
import meshHero from '@/mesh-hero.svg';
import { PRODUCTS } from '@theguild/components';

const MotionNextImage = motion(NextImage);

export function GuildButton({
  children,
  className,
  // @ts-expect-error -- fixme
  as: Component = NextLink,
  ...props
}: ComponentProps<typeof NextLink>): ReactElement {
  return (
    // @ts-expect-error -- fixme
    <Component
      {...props}
      className={clsx(
        'text-dark relative inline-flex items-center gap-3 rounded-[10px] px-5 py-3 font-medium transition-none',
        'after:font-mono after:text-3xl after:leading-none after:transition after:delay-100 after:duration-500 after:content-["➔"]',
        'lg:hocus:after:opacity-100 lg:after:opacity-0',
        'lg:hocus:after:right-3 lg:hocus:pr-10 lg:after:absolute lg:after:-right-2',
        className,
      )}
    >
      {children}
    </Component>
  );
}

export function Hero() {
  const [isHive, setIsHive] = useState(true);

  const { primaryColor } = isHive ? PRODUCTS.HIVE : PRODUCTS.MESH;

  return (
    <div
      className="nextra-container pb-14 pt-20 lg:pb-44 lg:pt-36"
      // min-h-[calc(100vh-var(--nextra-navbar-height))] flex flex-col justify-center
    >
      <div className="mb-8 flex gap-10 font-medium max-lg:justify-center max-lg:text-sm lg:mb-12">
        <button
          className={clsx(
            'flex items-center gap-2.5 border-b-2 pb-3.5',
            !isHive && 'border-gray-500 text-gray-500',
          )}
          style={isHive ? { borderColor: primaryColor } : undefined}
          onClick={() => {
            setIsHive(prev => !prev);
          }}
        >
          <PRODUCTS.HIVE.logo className={clsx('h-7 w-auto', !isHive && 'fill-current')} />
          GraphQL-Hive
        </button>
        <button
          className={clsx(
            'flex items-center gap-2.5 border-b-2 pb-3.5',
            isHive && 'border-gray-500 text-gray-500',
          )}
          style={isHive ? undefined : { borderColor: primaryColor }}
          onClick={() => {
            setIsHive(prev => !prev);
          }}
        >
          <PRODUCTS.MESH.logo className={clsx('h-7 w-auto', isHive && 'fill-current')} />
          GraphQL-Mesh
        </button>
      </div>
      <div className="flex gap-24">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={isHive.toString()}
            className={clsx('max-lg:w-full max-lg:text-center', isHive ? 'lg:w-[45%]' : 'lg:w-1/3')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-4 text-4xl/snug font-medium lg:text-[3.625rem]/tight">
              {isHive ? (
                <>
                  Schema Registry
                  <br />
                  and Observability
                  <br />
                  for GraphQL
                </>
              ) : (
                <>
                  The Graph
                  <br />
                  of Everything
                </>
              )}
            </h2>
            <p className="mb-10 text-gray-500 lg:mb-12">
              {isHive
                ? 'Prevent breaking changes, monitor performance of your GraphQL API, and manage your API gateway'
                : 'Federate and serve any kind of API'}
            </p>
            <GuildButton
              href={isHive ? '/graphql/hive' : '/graphql/mesh'}
              style={{ background: primaryColor }}
            >
              Explore {isHive ? 'Hive' : 'Mesh'}
            </GuildButton>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="popLayout" initial={false}>
          <MotionNextImage
            key={isHive.toString()}
            className={clsx(
              'pointer-events-none h-full max-lg:hidden',
              isHive ? 'w-[55%]' : 'w-2/3',
            )}
            src={isHive ? hiveHero : meshHero}
            alt={isHive ? 'Hive dashboard' : 'Mesh diagram'}
            initial={{ x: isHive ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
