import guildRaw from '../../hive/design-system/logos/guild.svg?raw';
import { basePath, YOGA_SITE_URL } from './base-path';

/** BaseHead identity for the Yoga docs product. */
export const YOGA_SITE = {
  mountPath: basePath,
  name: 'GraphQL Yoga',
  url: YOGA_SITE_URL,
};

export const YOGA_REPO_URL = 'https://github.com/graphql-hive/graphql-yoga';

/** The Yoga mark in the Hive brand (three chevrons), as a path in a 334×340 box. */
export const YOGA_MARK_PATH =
  'M222.174 67.0744H169.727L201.223 35.5783L166.657 1L132.079 35.5783L163.575 67.0744H111.128C104.378 67.0744 97.8956 69.7617 93.1196 74.5377L1 166.657L35.5783 201.236L148.649 88.1653C158.595 78.2184 174.719 78.2184 184.666 88.1653L297.736 201.236L332.315 166.657L240.182 74.525C235.406 69.749 228.924 67.0617 222.174 67.0617V67.0744ZM166.656 269.854L132.083 304.427L166.656 339L201.229 304.427L166.656 269.854ZM111.141 201.239H166.657H166.683H222.199C228.949 201.239 235.432 203.927 240.208 208.703L266.788 235.283L232.21 269.861L184.679 222.33C174.732 212.383 158.608 212.383 148.661 222.33L101.131 269.861L66.5522 235.283L93.1323 208.703C97.9083 203.927 104.391 201.239 111.141 201.239Z';
export const YOGA_MARK_VIEWBOX = '0 0 334 340';

/** Inline SVG of the mark; `attrs` lands on the root element (class, fill, stroke…). */
export const yogaMark = (attrs: string) =>
  `<svg ${attrs} viewBox="${YOGA_MARK_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="${YOGA_MARK_PATH}"/></svg>`;

/** SiteFooter identity for Yoga pages. */
export const YOGA_FOOTER = {
  description: 'A fully-featured, simple to set up, performant and extendable GraphQL server.',
  logo: {
    href: basePath,
    html:
      `<span class="flex items-center gap-2">${yogaMark('class="h-8 w-auto" fill="currentColor"')}` +
      `<span class="text-2xl font-medium tracking-[-0.16px]">Yoga</span></span>`,
  },
};

/** Current major; older majors keep their docs under /v<n>. */
export const CURRENT_VERSION = 'v5';
export const LEGACY_VERSIONS = ['v4', 'v3', 'v2'] as const;
export type LegacyVersion = (typeof LEGACY_VERSIONS)[number];

const ancestorLinkClass =
  'hive-focus -my-1 rounded-md p-0.5 text-green-800 transition-colors hover:text-green-1000 dark:text-neutral-400 dark:hover:text-neutral-200';
const separator =
  '<span class="text-beige-600 dark:text-neutral-600 select-none" aria-hidden="true">/</span>';
const guildGlyph = guildRaw.replace('<svg', '<svg class="h-4 w-auto"');
const hiveGlyph =
  '<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto">' +
  '<path d="M22.402 0H9.598L0 9.598v12.804L9.598 32h12.804L32 22.402V9.598L22.402 0Zm7.554 17.746L17.744 29.958a2.468 2.468 0 0 1-3.49 0L2.044 17.746a2.468 2.468 0 0 1 0-3.49l12.21-12.212a2.468 2.468 0 0 1 3.49 0l12.212 12.212a2.468 2.468 0 0 1 0 3.49Z"/><path d="M16 12.65 12.65 16 16 19.35 19.35 16 16 12.65Z"/></svg>';

/**
 * Top-left corner of the shared SiteNavigation: a product breadcrumb —
 * The Guild / Hive / Yoga — where each mark navigates a level up. The Yoga
 * mark is the logo the docs content ships under assets/.
 */
export const YOGA_LOGO = {
  html:
    `<span class="flex items-center gap-1 max-sm:gap-1">` +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev" title="The Guild" aria-label="The Guild">${guildGlyph}</a>` +
    separator +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev/graphql/hive" title="Hive" aria-label="Hive">${hiveGlyph}</a>` +
    separator +
    `<a class="hive-focus -my-1 flex items-center gap-1.5 rounded-md p-0.5" href="${basePath}" aria-label="GraphQL Yoga home">` +
    `<img alt="" aria-hidden="true" class="h-6 w-auto max-sm:h-5" src="${basePath}/assets/logo.svg" />` +
    `<span class="text-green-1000 dark:text-neutral-200 text-lg font-medium tracking-tight max-sm:hidden">Yoga</span>` +
    `</a>` +
    `</span>`,
};
