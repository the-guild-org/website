import guildRaw from '../../hive/design-system/logos/guild.svg?raw';
import { basePath, CODEGEN_SITE_URL } from './base-path';

/** BaseHead identity for the Codegen docs product. */
export const CODEGEN_SITE = {
  mountPath: basePath,
  name: 'GraphQL Code Generator',
  url: CODEGEN_SITE_URL,
};

const ancestorLinkClass =
  'hive-focus -m-1 rounded-md p-1 text-green-800 transition-colors hover:text-green-1000 dark:text-neutral-400 dark:hover:text-neutral-200';
const separator =
  '<span class="text-beige-600 dark:text-neutral-600 select-none" aria-hidden="true">/</span>';
const guildGlyph = guildRaw.replace('<svg', '<svg class="h-5 w-auto"');
const hiveGlyph =
  '<svg viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="h-5 w-auto">' +
  '<path d="M22.402 0H9.598L0 9.598v12.804L9.598 32h12.804L32 22.402V9.598L22.402 0Zm7.554 17.746L17.744 29.958a2.468 2.468 0 0 1-3.49 0L2.044 17.746a2.468 2.468 0 0 1 0-3.49l12.21-12.212a2.468 2.468 0 0 1 3.49 0l12.212 12.212a2.468 2.468 0 0 1 0 3.49ZM49.771 5.836v8.242h9.413V5.836h3.313v19.911h-3.313V16.92H49.77v8.827h-3.313V5.836h3.313ZM65.195 7.562c0-1.003.836-1.531 1.643-1.531.864 0 1.67.53 1.67 1.531 0 1.002-.806 1.56-1.67 1.56-.807 0-1.643-.558-1.643-1.56Zm3.119 3.954v14.23H65.39v-14.23h2.924ZM72.391 11.516l3.593 11.14h.028l3.592-11.14h3.092l-5.04 14.23h-3.314l-5.04-14.23h3.092-.003ZM93.046 21.402h2.923c-.724 2.702-2.84 4.762-6.488 4.762-4.428 0-7.13-3.062-7.13-7.519 0-4.456 2.702-7.518 6.99-7.518 4.595 0 6.85 3.202 6.85 8.27H85.275c0 2.395 1.531 4.372 4.122 4.372 2.422 0 3.397-1.503 3.648-2.367Zm-7.77-4.177h7.992c0-2.2-1.56-3.787-3.927-3.787s-4.066 1.587-4.066 3.787h.001Z"/><path d="M16 12.65 12.65 16 16 19.35 19.35 16 16 12.65Z"/></svg>';

/**
 * Top-left corner of the shared SiteNavigation: a product breadcrumb —
 * The Guild / Hive / Codegen — where each mark navigates a level up.
 * The Codegen icon is an <img>, not inline SVG: its internal gradient id
 * would collide between the header's hidden-mobile and desktop copies,
 * and a gradient referenced from a display:none subtree paints nothing.
 */
export const CODEGEN_LOGO = {
  html:
    `<span class="flex items-center gap-2 max-sm:gap-1.5">` +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev" title="The Guild" aria-label="The Guild">${guildGlyph}</a>` +
    separator +
    `<a class="${ancestorLinkClass}" href="https://the-guild.dev/graphql/hive" title="Hive" aria-label="Hive">${hiveGlyph}</a>` +
    separator +
    `<a class="hive-focus -m-1 flex items-center gap-2 rounded-md p-1" href="${basePath}" aria-label="GraphQL Codegen home">` +
    `<img alt="" aria-hidden="true" class="h-7 w-auto max-sm:h-6" src="${basePath}/assets/img/gql-codegen-icon.svg" />` +
    `<span class="text-green-1000 dark:text-neutral-200 text-xl font-medium tracking-tight max-sm:hidden">Codegen</span>` +
    `</a>` +
    `</span>`,
};
