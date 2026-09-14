/**
 * The product mark in the Hive brand: the octagonal ring shared by the
 * product tiles on the Hive landing page, holding the product's glyph.
 *
 * Each registry product draws its glyph in src/products/<slug>/mark.svg: a
 * single-colour (currentColor) drawing in the ring's 52×53 box, kept inside
 * the ring's inner square (8 to 45 on both axes), at the weight of the
 * Envelop, Inspector and Mesh marks. Vite-only (import.meta.glob), so the
 * node scripts never load it.
 */
const glyphs = import.meta.glob<string>('./*/mark.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const RING =
  'M52 15.386 44.915 8.3l-.69-.691L37.138.525H14.86L7.774 7.61l-.69.69L0 15.387v22.28l7.085 7.085.69.69 7.086 7.086h22.28l7.085-7.085.69-.69 7.086-7.086v-22.28H52ZM40.173 44.749H11.827a4.05 4.05 0 0 1-4.051-4.05V12.351a4.05 4.05 0 0 1 4.05-4.051h28.347a4.05 4.05 0 0 1 4.051 4.05v28.347a4.05 4.05 0 0 1-4.05 4.051Z';

/** The glyph's inner markup, without its <svg> wrapper. */
function glyphFor(slug: string): string {
  const file = glyphs[`./${slug}/mark.svg`];
  if (!file) throw new Error(`src/products/${slug}/mark.svg is missing`);
  return file.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
}

/**
 * The full mark as inline SVG; `attrs` land on the root element. With
 * `glyph: false` only the ring is drawn (the landing hero's decoration).
 */
export function productMark(slug: string, attrs: string, { glyph = true } = {}): string {
  return (
    `<svg ${attrs} viewBox="0 0 52 53" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">` +
    `<path d="${RING}"/>` +
    (glyph ? glyphFor(slug) : '') +
    `</svg>`
  );
}
