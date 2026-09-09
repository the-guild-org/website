import guildRaw from '../../hive/design-system/logos/guild.svg?raw';
import { basePath, ENVELOP_SITE_URL } from './base-path';

/** BaseHead identity for the Envelop docs product. */
export const ENVELOP_SITE = {
  mountPath: basePath,
  name: 'Envelop',
  url: ENVELOP_SITE_URL,
};

/** Envelop lives in the Yoga monorepo (packages/envelop, envelop-website). */
export const ENVELOP_REPO_URL = 'https://github.com/graphql-hive/graphql-yoga';
export const ENVELOP_SOURCE_URL = `${ENVELOP_REPO_URL}/tree/main/packages/envelop`;

/**
 * The Envelop mark in the Hive brand: the octagonal product ring shared with
 * Mesh, holding an envelope flap. Paths in a 52×53 box.
 */
export const ENVELOP_MARK_PATHS: string[] = [
  'M52 15.386 44.915 8.3l-.69-.691L37.138.525H14.86L7.774 7.61l-.69.69L0 15.387v22.28l7.085 7.085.69.69 7.086 7.086h22.28l7.085-7.085.69-.69 7.086-7.086v-22.28H52ZM40.173 44.749H11.827a4.05 4.05 0 0 1-4.051-4.05V12.351a4.05 4.05 0 0 1 4.05-4.051h28.347a4.05 4.05 0 0 1 4.051 4.05v28.347a4.05 4.05 0 0 1-4.05 4.051Z',
  'M13.2 17.6h5.6L26 25.3l7.2-7.7h5.6L26 34 13.2 17.6Z',
];
export const ENVELOP_MARK_VIEWBOX = '0 0 52 53';

/** Inline SVG of the mark; `attrs` lands on the root element (class, fill, stroke…). */
export const envelopMark = (attrs: string) =>
  `<svg ${attrs} viewBox="${ENVELOP_MARK_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${ENVELOP_MARK_PATHS.map(d => `<path d="${d}"/>`).join('')}</svg>`;

/** SiteFooter identity for Envelop pages. */
export const ENVELOP_FOOTER = {
  description: 'The missing GraphQL plugin system.',
  logo: {
    href: basePath,
    html:
      `<span class="flex items-center gap-2">${envelopMark('class="h-8 w-auto" fill="currentColor"')}` +
      `<span class="text-2xl font-medium tracking-[-0.16px]">Envelop</span></span>`,
  },
};

/** Current major; older majors keep their docs under /v<n>. */
export const CURRENT_VERSION = 'v4';
export const LEGACY_VERSIONS = ['v3', 'v2'] as const;
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
 * The Guild / Hive / Envelop — where each mark navigates a level up.
 */
export const ENVELOP_LOGO = {
  html:
    `<span class="flex items-center gap-1 max-sm:gap-1">` +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev" title="The Guild" aria-label="The Guild">${guildGlyph}</a>` +
    separator +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev/graphql/hive" title="Hive" aria-label="Hive">${hiveGlyph}</a>` +
    separator +
    `<a class="hive-focus text-green-1000 dark:text-neutral-200 -my-1 flex items-center gap-1.5 rounded-md p-0.5" href="${basePath}" aria-label="Envelop home">` +
    envelopMark('class="h-6 w-auto max-sm:h-5" fill="currentColor"') +
    `<span class="text-lg font-medium tracking-tight max-sm:hidden">Envelop</span>` +
    `</a>` +
    `</span>`,
};
