import guildRaw from '../../hive/design-system/logos/guild.svg?raw';
import { basePath, INSPECTOR_SITE_URL } from './base-path';

/** BaseHead identity for the Inspector docs product. */
export const INSPECTOR_SITE = {
  mountPath: basePath,
  name: 'GraphQL Inspector',
  url: INSPECTOR_SITE_URL,
};

export const INSPECTOR_REPO_URL = 'https://github.com/graphql-hive/graphql-inspector';

/**
 * The Inspector mark in the Hive brand: the octagonal product ring shared
 * with Mesh and Envelop, holding a magnifying glass. Paths in a 52×53 box.
 */
export const INSPECTOR_MARK_PATHS: string[] = [
  'M52 15.386 44.915 8.3l-.69-.691L37.138.525H14.86L7.774 7.61l-.69.69L0 15.387v22.28l7.085 7.085.69.69 7.086 7.086h22.28l7.085-7.085.69-.69 7.086-7.086v-22.28H52ZM40.173 44.749H11.827a4.05 4.05 0 0 1-4.051-4.05V12.351a4.05 4.05 0 0 1 4.05-4.051h28.347a4.05 4.05 0 0 1 4.051 4.05v28.347a4.05 4.05 0 0 1-4.05 4.051Z',
  'M23.5 14.5a8.5 8.5 0 1 1 0 17 8.5 8.5 0 0 1 0-17Zm0 3.4a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2Z',
  'm29.9 30.9 2.4-2.4 7.2 7.2-2.4 2.4-7.2-7.2Z',
];
export const INSPECTOR_MARK_VIEWBOX = '0 0 52 53';

/** Inline SVG of the mark; `attrs` lands on the root element (class, fill, stroke…). */
export const inspectorMark = (attrs: string) =>
  `<svg ${attrs} viewBox="${INSPECTOR_MARK_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${INSPECTOR_MARK_PATHS.map(d => `<path d="${d}"/>`).join('')}</svg>`;

/** SiteFooter identity for Inspector pages. */
export const INSPECTOR_FOOTER = {
  description: 'GraphQL schema management and evolution tools.',
  logo: {
    href: basePath,
    html:
      `<span class="flex items-center gap-2">${inspectorMark('class="h-8 w-auto" fill="currentColor"')}` +
      `<span class="text-2xl font-medium tracking-[-0.16px]">Inspector</span></span>`,
  },
};

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
 * The Guild / Hive / Inspector — where each mark navigates a level up.
 */
export const INSPECTOR_LOGO = {
  html:
    `<span class="flex items-center gap-1 max-sm:gap-1">` +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev" title="The Guild" aria-label="The Guild">${guildGlyph}</a>` +
    separator +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev/graphql/hive" title="Hive" aria-label="Hive">${hiveGlyph}</a>` +
    separator +
    `<a class="hive-focus text-green-1000 dark:text-neutral-200 -my-1 flex items-center gap-1.5 rounded-md p-0.5" href="${basePath}" aria-label="GraphQL Inspector home">` +
    inspectorMark('class="h-6 w-auto max-sm:h-5" fill="currentColor"') +
    `<span class="text-lg font-medium tracking-tight max-sm:hidden">Inspector</span>` +
    `</a>` +
    `</span>`,
};
