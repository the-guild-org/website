import { useState } from 'react';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { clsx } from 'clsx';
import hiveHero from '@/hive-hero.png';
import meshHero from '@/mesh-hero.svg';
import { PRODUCTS } from '@theguild/components';

export function Hero() {
  const [isHive, setIsHive] = useState(true);

  const { primaryColor } = isHive ? PRODUCTS.HIVE : PRODUCTS.MESH;

  return (
    <div className="nextra-container py-[10vh]">
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
        <div className={clsx(isHive ? 'w-[45%]' : '1/3')}>
          <h2 className="mb-4 text-[64px] font-medium">
            {isHive ? 'Schema Registry and observability for GraphQL' : 'The Graph of Everything'}
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
        </div>
        <NextImage
          className={clsx(isHive ? 'w-[55%]' : 'w-2/3')}
          src={isHive ? hiveHero : meshHero}
          alt={isHive ? 'Hive dashboard' : 'Mesh diagram'}
        />
      </div>
    </div>
  );
}
