import guildRaw from '../../hive/design-system/logos/guild.svg?raw';
import { basePath, MESH_SITE_URL } from './base-path';

/** BaseHead identity for the Mesh docs product. */
export const MESH_SITE = {
  mountPath: basePath,
  name: 'GraphQL Mesh',
  url: MESH_SITE_URL,
};

export const MESH_REPO_URL = 'https://github.com/ardatan/graphql-mesh';

/** Mesh v1 is current and lives under /v1; the v0 docs stay under /docs with a banner. */
export const CURRENT_VERSION = 'v1';
export const LEGACY_VERSION = 'v0';

/** The Mesh mark in the Hive brand, as a path in a 52×52 box (the icon of the stylized logo). */
export const MESH_MARK_PATH =
  'M44.913 7.776l7.085 7.084H52v22.28l-7.085 7.085-.69.69L37.14 52H14.86l-7.084-7.085-.691-.69L0 37.14V14.86l7.083-7.084.69-.691L14.858 0h22.28l7.084 7.085.691.69zM11.826 44.222h28.346a4.05 4.05 0 004.05-4.051V11.826a4.05 4.05 0 00-4.05-4.05H11.826a4.05 4.05 0 00-4.05 4.05v28.346a4.05 4.05 0 004.05 4.05zm2.955-11.017V18.792a4.05 4.05 0 014.051-4.051h14.334a4.05 4.05 0 014.05 4.05v14.415a4.05 4.05 0 01-4.05 4.051H18.832a4.05 4.05 0 01-4.05-4.05zm14.66-3.724v-6.966h-6.884v6.966h6.884z';
export const MESH_MARK_VIEWBOX = '0 0 52 52';

/** Inline SVG of the mark; `attrs` lands on the root element (class, fill, stroke…). */
export const meshMark = (attrs: string) =>
  `<svg ${attrs} viewBox="${MESH_MARK_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="${MESH_MARK_PATH}"/></svg>`;

const ancestorLinkClass =
  'hive-focus -my-1 rounded-md p-0.5 text-green-800 transition-colors hover:text-green-1000 dark:text-neutral-400 dark:hover:text-neutral-200';
const separator =
  '<span class="text-beige-600 dark:text-neutral-600 select-none" aria-hidden="true">/</span>';
const guildGlyph = guildRaw.replace('<svg', '<svg class="h-4 w-auto"');
const hiveGlyph =
  '<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-4 w-auto">' +
  '<path d="M22.402 0H9.598L0 9.598v12.804L9.598 32h12.804L32 22.402V9.598L22.402 0Zm7.554 17.746L17.744 29.958a2.468 2.468 0 0 1-3.49 0L2.044 17.746a2.468 2.468 0 0 1 0-3.49l12.21-12.212a2.468 2.468 0 0 1 3.49 0l12.212 12.212a2.468 2.468 0 0 1 0 3.49Z"/><path d="M16 12.65 12.65 16 16 19.35 19.35 16 16 12.65Z"/></svg>';

/** Top-left corner of the shared SiteNavigation: The Guild / Hive / Mesh. */
export const MESH_LOGO = {
  html:
    `<span class="flex items-center gap-1 max-sm:gap-1">` +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev" title="The Guild" aria-label="The Guild">${guildGlyph}</a>` +
    separator +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev/graphql/hive" title="Hive" aria-label="Hive">${hiveGlyph}</a>` +
    separator +
    `<a class="hive-focus text-green-1000 dark:text-neutral-200 -my-1 flex items-center gap-1.5 rounded-md p-0.5" href="${basePath}" aria-label="GraphQL Mesh home">` +
    meshMark('class="h-6 w-auto max-sm:h-5" fill="currentColor"') +
    `<span class="text-lg font-medium tracking-tight max-sm:hidden">Mesh</span>` +
    `</a>` +
    `</span>`,
};

/** SiteFooter identity for Mesh pages. */
export const MESH_FOOTER = {
  description: 'A fully-featured GraphQL federation framework.',
  logo: {
    href: basePath,
    html:
      `<span class="flex items-center gap-2">${meshMark('class="h-8 w-auto" fill="currentColor"')}` +
      `<span class="text-2xl font-medium tracking-[-0.16px]">Mesh</span></span>`,
  },
};
