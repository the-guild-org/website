import { useState } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import hiveHero from '@/hive-hero.png';
import meshHero from '@/mesh-hero.svg';
import { PRODUCTS } from '@theguild/components';

const MotionNextImage = motion(NextImage);

export function Hero() {
  const [isHive, setIsHive] = useState(true);

  const { primaryColor } = isHive ? PRODUCTS.HIVE : PRODUCTS.MESH;

  return (
    <div
      className="nextra-container py-[10vh]"
      // min-h-[calc(100vh-var(--nextra-navbar-height))] flex flex-col justify-center
    >
      <div className="mb-12 flex gap-10">
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
            className={isHive ? 'w-[45%]' : 'w-1/3'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="mb-4 text-[3.625rem]/[4.5rem] font-medium">
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
            <p className="mb-12 text-gray-500">
              {isHive
                ? 'Prevent breaking changes, monitor performance of your GraphQL API, and manage your API gateway'
                : 'Federate and serve any kind of API'}
            </p>
            <NextLink
              href={isHive ? '/graphql/hive' : '/graphql/mesh'}
              className={clsx(
                'text-dark inline-flex items-center gap-3 rounded-[10px] px-5 py-3 font-medium',
                'after:font-mono after:text-2xl after:leading-none after:transition-transform after:duration-100 after:content-["➔"] hover:after:translate-x-1.5',
              )}
              style={{ background: primaryColor }}
            >
              Explore {isHive ? 'Hive' : 'Mesh'}
            </NextLink>
          </motion.div>
        </AnimatePresence>
        <MotionNextImage
          key={isHive.toString()}
          className={clsx('h-full', isHive ? 'w-[55%]' : 'w-2/3')}
          src={isHive ? hiveHero : meshHero}
          alt={isHive ? 'Hive dashboard' : 'Mesh diagram'}
          initial={{ x: isHive ? -100 : 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 0, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}
