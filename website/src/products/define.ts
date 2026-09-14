/**
 * The registry entry for one of the small product docs sites served from
 * this repo (Apollo Angular, GraphQL Modules, SOFA, …). Everything the
 * shared routes, layout, fetch and postbuild scripts need to know about a
 * product lives in its `src/products/<slug>/product.ts`; nothing else has
 * to be edited to add one.
 *
 * Self-contained (no extensionless src imports): loaded by Astro and by the
 * plain `node` scripts under scripts/products.
 */
export const SITE_ORIGIN = 'https://the-guild.dev';

export interface ProductSection {
  /** Mount-relative URL base of the section, e.g. "/docs". */
  base: string;
  /** Folder under the upstream website/content directory, e.g. "docs". */
  dir: string;
  /** Search badge and title suffix, e.g. "Documentation". */
  label: string;
  /** Section root label in the breadcrumb; defaults to "Docs". */
  breadcrumb?: string;
}

export interface LandingFeature {
  title: string;
  copy: string;
  href: string;
  /** File name (without extension) under src/products/assets/icons. */
  icon: string;
}

export interface LandingLink {
  title: string;
  copy: string;
  href: string;
  label: string;
}

export interface ProductLanding {
  /** Hero headline; the product name is the page title. */
  headline: string;
  /** One or two sentences under the headline. */
  tagline: string;
  /** Three short claims shown with checkmarks. */
  claims: [string, string, string];
  /** Primary call to action, mount-relative. */
  getStarted: string;
  /** Section title above the feature cards. */
  featuresTitle: string;
  featuresIntro?: string;
  features: LandingFeature[];
  /** Optional dark section with a code sample: title, copy, and code (with language). */
  codeSample?: {
    title: string;
    copy: string;
    code: string;
    lang: string;
    href: string;
    cta: string;
  };
  /** "Learn more" cards. */
  links: LandingLink[];
  /** Optional blurb tying the product to Hive. */
  hive?: { title: string; copy: string };
}

export interface ProductDefinition {
  /** Route segment under /graphql/, e.g. "apollo-angular"; its mark's glyph is src/products/<slug>/mark.svg (marks.ts). */
  slug: string;
  /** Product name as written, e.g. "Apollo Angular". */
  name: string;
  /** Short name shown next to the mark in the header, e.g. "Apollo Angular". */
  shortName: string;
  /** One-line description used in the footer and as the default meta description. */
  description: string;
  /** GitHub repository, "owner/name". */
  repo: string;
  /** Default branch of that repository. */
  branch: string;
  /**
   * Ref to fetch instead of the default branch, for the time between the
   * upstream content PR being opened and merged. TEMPORARY when set.
   */
  contentRef?: string;
  sections: ProductSection[];
  /**
   * A CHANGELOG.md in the repository rendered as the /changelog page (the old
   * sites rendered it from the package). Path relative to the repo root.
   */
  changelog?: string;
  /** Legacy redirects, mount-relative source → mount-relative or absolute target. */
  redirects: Record<string, string>;
  /** The blockquote of llms.txt. */
  llmsTagline: string;
  landing: ProductLanding;
}

export const productBasePath = (product: ProductDefinition) => `/graphql/${product.slug}`;
export const productSiteUrl = (product: ProductDefinition) =>
  `${SITE_ORIGIN}${productBasePath(product)}`;
export const productRepoUrl = (product: ProductDefinition) => `https://github.com/${product.repo}`;
/** Collection name in content.config.ts for a product's content. */
export const productCollection = (product: ProductDefinition) =>
  `product_${product.slug.replace(/-/g, '_')}`;
/** Environment variable prefix for local overrides: APOLLO_ANGULAR_REPO_DIR, …_REPO_REF. */
export const productEnvPrefix = (product: ProductDefinition) =>
  product.slug.replace(/-/g, '_').toUpperCase();

/** Prefix a root-relative path with the product's mount point. */
export function withProductBase(product: ProductDefinition, path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  if (path === '/graphql' || path.startsWith('/graphql/')) return path;
  const base = productBasePath(product);
  return path === '/' ? base : `${base}${path}`;
}
