/**
 * Author pictures served from our own origin. scripts/hive/fetch-avatars.ts
 * saves one PNG per GitHub login under src/hive/assets/avatars; an author
 * without a saved file (a login used only in one post's front matter, or a
 * GitHub account that no longer exists) gets an initials badge instead of a
 * hot-linked image that ad and tracker blockers drop.
 *
 * Vite-only because of import.meta.glob; keep it out of node scripts.
 */
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('../assets/avatars/*.png', {
  eager: true,
  import: 'default',
});

export function authorAvatar(github: string): ImageMetadata | undefined {
  return files[`../assets/avatars/${github}.png`];
}

/** "Uri Goldshtein" → "UG"; a single word gives its first two letters. */
export function authorInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters =
    words.length > 1 ? words.slice(0, 2).map(word => word[0]) : [...(words[0] ?? '?')].slice(0, 2);
  return letters.join('').toUpperCase();
}
