/**
 * Strips trailing "[!toc]" markers from headings. Some content annotates
 * deep headings with the marker (intended as a TOC-exclusion hint); the
 * table of contents already only lists depths 2–4, but the marker text was
 * rendered literally on the page and leaked into search results.
 */
export function remarkTocMarkers() {
  return tree => {
    visit(tree, node => {
      if (node.type !== 'heading') return;
      const last = node.children?.at(-1);
      if (last?.type === 'text' && /\[!toc\]\s*$/.test(last.value)) {
        last.value = last.value.replace(/\s*\[!toc\]\s*$/, '');
        if (!last.value) node.children.pop();
      }
    });
  };
}

function visit(node, visitor) {
  visitor(node);
  if (node.children) {
    for (const child of node.children) visit(child, visitor);
  }
}
