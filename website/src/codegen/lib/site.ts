import { basePath, CODEGEN_SITE_URL } from './base-path';

/** BaseHead identity for the Codegen docs product. */
export const CODEGEN_SITE = {
  mountPath: basePath,
  name: 'GraphQL Code Generator',
  url: CODEGEN_SITE_URL,
};

/**
 * Top-left identity for the shared SiteNavigation — the header is Hive's;
 * only the logo differs.
 */
// An <img>, not inline SVG: the icon's internal gradient id would collide
// between the header's hidden-mobile and desktop copies, and a gradient
// referenced from a display:none subtree paints nothing.
export const CODEGEN_LOGO = {
  href: basePath,
  label: 'GraphQL Codegen home',
  html: `<img alt="" aria-hidden="true" class="h-8 w-auto max-sm:h-6" src="${basePath}/assets/img/gql-codegen-icon.svg" /><span class="text-green-1000 dark:text-neutral-200 ml-2 text-xl font-medium tracking-tight">Codegen</span>`,
};
