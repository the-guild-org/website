import { ComponentProps, ReactElement, useEffect, useState } from 'react';
import { clsx } from 'clsx';
import { PRODUCTS } from '../lib/future-components/products';
import { Description, Heading, Link } from './components';

const classes = {
  title: clsx(
    'font-medium text-lg sm:pb-3.5 list-none sm:pointer-events-none',
    'max-sm:cursor-pointer max-sm:flex max-sm:items-center max-sm:gap-2 transition-colors',
    'max-sm:-m-5 max-sm:p-5 max-sm:rounded-[10px]', // for better focus
  ),
  section: clsx('mt-8 flex flex-wrap gap-5 items-start'),
  divider: clsx('border-0 h-0.5 bg-gradient-to-r from-gray-500 to-transparent max-sm:hidden'),
  arrow: clsx('ml-auto sm:hidden [details[open]>*>&]:rotate-180 transition-transform duration-300'),
  details: clsx(
    'max-sm:bg-zinc-800/20 dark:max-sm:bg-zinc-800/70 max-sm:p-5 max-sm:rounded-[10px]',
  ),
};

function ArrowDownIcon(props: ComponentProps<'svg'>) {
  return (
    <svg width="10" height="7" viewBox="0 0 10 7" fill="currentColor" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.231629 0.409675C0.522428 0.143109 0.974262 0.162754 1.24083 0.453553L5 4.55447L8.75917 0.453553C9.02574 0.162754 9.47757 0.143109 9.76837 0.409675C10.0592 0.676241 10.0788 1.12807 9.81225 1.41887L5 6.6686L0.187751 1.41887C-0.0788147 1.12807 -0.0591698 0.676241 0.231629 0.409675Z"
      />
    </svg>
  );
}

function renderProduct(product: (typeof PRODUCTS)[keyof typeof PRODUCTS]) {
  return (
    <Link
      key={product.name}
      href={product.href}
      title={`${product.name} - ${product.title}`}
      className={clsx(
        'rounded-[10px] py-3.5 transition-all duration-300',
        'sm:hocus:bg-[#f1f1f1] sm:hocus:dark:bg-zinc-800/70 hocus:no-underline',
        'sm:hocus:pl-3.5 sm:hocus:pr-0 sm:hocus:text-current w-full max-sm:pl-3.5 sm:pr-3.5 sm:text-gray-500',
        'max-sm:bg-zinc-800/20 max-sm:text-current max-sm:dark:bg-gray-500/30',
      )}
    >
      <span className="mb-2 flex items-center gap-2.5 text-lg">
        <product.logo
          className={clsx(
            'h-7 w-auto transition-[fill,stroke]',
            'sm:[a:not(:hover,:focus)>span>&]:fill-gray-500',
            product.name === 'GraphQL-ESLint' && 'sm:[a:not(:hover,:focus)>span>&]:stroke-gray-500',
          )}
        />
        {product.name}
      </span>
      <p className="pr-4 text-sm">{product.title}</p>
    </Link>
  );
}

export function Ecosystem({ className }: { className?: string }): ReactElement {
  const [isDetailsOpen, setIsDetailsOpen] = useState(true);
  useEffect(() => {
    function onResize() {
      setIsDetailsOpen(window.innerWidth > 639);
    }

    // on mount
    onResize();
    // on change
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={clsx('nextra-container py-16 lg:py-32', className)}>
      <div className="md:text-center">
        <Heading id="platform">The Ecosystem</Heading>
        <Description className="mx-auto !mb-10 md:!mb-24 md:max-w-xl">
          Our advanced, modular solutions can be adopted gradually as individual open source
          libraries or as a complete unified API platform. Explore our suite of sustainable, open
          source API tools that covers everything you need to scale your API infrastructure:
        </Description>
      </div>
      <div className="grid w-full gap-3.5 sm:gap-y-10 lg:grid-cols-6">
        <details className={classes.details} open={isDetailsOpen}>
          <summary className={classes.title} tabIndex={isDetailsOpen ? -1 : 0}>
            Schema Evolution
            <ArrowDownIcon className={classes.arrow} />
          </summary>
          <hr className={classes.divider} />
          <div className={classes.section}>
            {[
              PRODUCTS.HIVE,
              {
                ...PRODUCTS.INSPECTOR,
                title: 'GraphQL API Management and Schema Governance',
              },
            ].map(renderProduct)}
          </div>
        </details>
        <details className={classes.details} open={isDetailsOpen}>
          <summary className={classes.title} tabIndex={isDetailsOpen ? -1 : 0}>
            Gateway
            <ArrowDownIcon className={classes.arrow} />
          </summary>
          <hr className={classes.divider} />
          <div className={classes.section}>
            {[PRODUCTS.HIVE_ROUTER, PRODUCTS.HIVE_GATEWAY, PRODUCTS.MESH].map(renderProduct)}
          </div>
        </details>
        <details className={clsx(classes.details, 'md:col-span-2')} open={isDetailsOpen}>
          <summary className={classes.title} tabIndex={isDetailsOpen ? -1 : 0}>
            Subgraph / Schema
            <ArrowDownIcon className={classes.arrow} />
          </summary>
          <hr className={classes.divider} />
          <div className={clsx(classes.section, 'sm:[&>a]:w-[calc(50%-10px)]')}>
            {[
              PRODUCTS.MESH,
              PRODUCTS.YOGA,
              {
                ...PRODUCTS.ENVELOP,
                title: 'The simple yet flexible GraphQL plugin system that powers Yoga and Mesh',
              },
              PRODUCTS.SOFA,
              { ...PRODUCTS.SCALARS, name: 'GraphQL-Scalars' },
            ].map(renderProduct)}
          </div>
        </details>
        <details className={clsx(classes.details, 'md:col-span-2')} open={isDetailsOpen}>
          <summary className={classes.title} tabIndex={isDetailsOpen ? -1 : 0}>
            Developer Experience
            <ArrowDownIcon className={classes.arrow} />
          </summary>
          <hr className={classes.divider} />
          <div className={clsx(classes.section, 'sm:[&>a]:w-[calc(50%-10px)]')}>
            {[
              { ...PRODUCTS.CODEGEN, name: 'GraphQL-Codegen' },
              { ...PRODUCTS.ESLINT, name: 'GraphQL-ESLint' },
            ].map(renderProduct)}
          </div>
        </details>
      </div>
    </div>
  );
}
