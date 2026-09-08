export interface TocHeading {
  depth: number;
  slug: string;
  text: string;
  html: string;
}

export function filterToc(headings: TocHeading[], minDepth = 2, maxDepth = 4) {
  return headings.filter(heading => heading.depth >= minDepth && heading.depth <= maxDepth);
}
