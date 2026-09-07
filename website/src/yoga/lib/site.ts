import guildRaw from '../../hive/design-system/logos/guild.svg?raw';
import { basePath, YOGA_SITE_URL } from './base-path';

/** BaseHead identity for the Yoga docs product. */
export const YOGA_SITE = {
  mountPath: basePath,
  name: 'GraphQL Yoga',
  url: YOGA_SITE_URL,
};

export const YOGA_REPO_URL = 'https://github.com/graphql-hive/graphql-yoga';

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
