import { ReactElement } from 'react';
import { clsx } from 'clsx';
import { PRODUCTS } from '@theguild/components';
import { Description, Heading, Link } from './components';

const classes = {
  title: clsx('font-medium text-lg pb-3.5'),
  section: clsx('mt-8 flex flex-wrap gap-5 items-start'),
  divider: clsx('border-0 h-0.5 bg-gradient-to-r from-gray-500 to-transparent'),
};

function renderProduct(product: (typeof PRODUCTS)[keyof typeof PRODUCTS]) {
  return (
    <Link
      key={product.name}
      href={product.href}
      className={clsx(
        'rounded-[10px] py-3.5 text-gray-500 transition-all duration-300',
        'hocus:bg-zinc-800/20 hocus:dark:bg-zinc-800/70 hocus:pl-3.5 hocus:pr-0 hocus:text-current hocus:no-underline pr-3.5',
      )}
    >
      <span className="mb-2 flex items-center gap-2.5 text-lg">
        <product.logo className="h-7 w-auto transition-colors duration-300 [a:not(:hover,:focus)>span>&]:fill-gray-500" />
        {product.name}
      </span>
      <p className="pr-4 text-sm">{product.title}</p>
    </Link>
  );
}

export function Ecosystem({ className }: { className?: string }): ReactElement {
  return (
    <div id="platform" className={clsx('py-32', className)}>
      <div className="nextra-container mb-24 text-center">
        <Heading>The Ecosystem</Heading>
        <Description className="mx-auto mb-24 max-w-xl">
          Our advanced, modular solutions can be adopted gradually as individual open source
          libraries or as a complete unified API platform. Explore our suite of sustainable, open
          source API tools that covers everything you need to scale your API infrastructure:
        </Description>
      </div>
      <div className="nextra-container grid w-full grid-cols-6 gap-3.5">
        <div>
          <h3 className={classes.title}>Schema Evolution</h3>
          <hr className={classes.divider} />
          <div className={classes.section}>
            {[PRODUCTS.HIVE, PRODUCTS.INSPECTOR].map(renderProduct)}
          </div>
        </div>
        <div>
          <h3 className={classes.title}>Gateway</h3>
          <hr className={classes.divider} />
          <div className={classes.section}>{[PRODUCTS.MESH].map(renderProduct)}</div>
        </div>
        <div className="col-span-2">
          <h3 className={classes.title}>Subgraph / Schema</h3>
          <hr className={classes.divider} />
          <div className={clsx(classes.section, '[&>a]:w-[calc(50%-10px)]')}>
            {[PRODUCTS.YOGA, PRODUCTS.ENVELOP, PRODUCTS.SOFA, PRODUCTS.SCALARS].map(renderProduct)}
          </div>
        </div>
        <div className="col-span-2">
          <h3 className={classes.title}>Developer Experience</h3>
          <hr className={classes.divider} />
          <div className={clsx(classes.section, '[&>a]:w-[calc(50%-10px)]')}>
            {[PRODUCTS.CODEGEN, PRODUCTS.ESLINT, PRODUCTS.NEXTRA].map(renderProduct)}
          </div>
        </div>
      </div>
    </div>
  );
}
