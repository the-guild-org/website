import { MouseEvent, useCallback, useState } from 'react';
import NextImage from 'next/image';
import { clsx } from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { GuildButton } from '@/components';
import hiveHero from '@/hive-hero.png';
import meshHero from '@/mesh-hero.svg';
import { PRODUCTS } from '@theguild/components';

const MotionNextImage = motion(NextImage);

export function Hero() {
  const [isHive, setIsHive] = useState(true);

  const { primaryColor } = isHive ? PRODUCTS.HIVE : PRODUCTS.MESH;

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    const isHive = e.currentTarget.dataset.name === 'hive';
    setIsHive(isHive);
  }, []);

  return (
    <div
      className="nextra-container pb-14 pt-20 lg:pb-36 lg:pt-28"
      // min-h-[calc(100vh-var(--nextra-navbar-height))] flex flex-col justify-center
    >
      <div className="mb-8 flex gap-10 text-sm font-medium max-lg:justify-center lg:mb-12 lg:text-lg">
        <button
          className={clsx(
            'flex items-center gap-2.5 border-b-2 pb-2.5 lg:pb-3.5',
            !isHive && 'border-gray-500 text-gray-500',
          )}
          style={isHive ? { borderColor: primaryColor } : undefined}
          data-name="hive"
          onClick={handleClick}
        >
          <PRODUCTS.HIVE.logo className={clsx('h-7 w-auto', !isHive && 'fill-current')} />
          GraphQL Hive
        </button>
        <button
          className={clsx(
            'flex items-center gap-2.5 border-b-2 pb-3.5',
            isHive && 'border-gray-500 text-gray-500',
          )}
          style={isHive ? undefined : { borderColor: primaryColor }}
          onClick={handleClick}
        >
          <PRODUCTS.MESH.logo className={clsx('h-7 w-auto', isHive && 'fill-current')} />
          GraphQL Mesh
        </button>
      </div>
      <div className="flex gap-24">
        <div
          className={clsx('max-lg:w-full max-lg:text-center', isHive ? 'lg:w-[45%]' : 'lg:w-1/3')}
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
            title={
              isHive
                ? 'Hive - Open Source GraphQL Federation Platform'
                : 'Mesh - Federated architecture for every API'
            }
          >
            Explore {isHive ? 'Hive' : 'Mesh'}
          </GuildButton>
        </div>
        <AnimatePresence mode="popLayout" initial={false}>
          <MotionNextImage
            key={isHive.toString()}
            className={clsx(
              'pointer-events-none h-full max-lg:hidden',
              isHive ? 'w-[55%]' : 'w-2/3',
            )}
            src={isHive ? hiveHero : meshHero}
            alt={isHive ? 'Hive dashboard' : 'Mesh diagram'}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
