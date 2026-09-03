export function headingSlug(text) {
  return text.replaceAll(/[\s.,]+/g, "-").toLowerCase();
}
