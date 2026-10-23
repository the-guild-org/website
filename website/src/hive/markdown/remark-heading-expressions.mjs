/**
 * Drops MDX expressions that carry no content from headings: empty ones
 * (`{ }`) and comment-only ones, i.e. a JS block or line comment wrapped in
 * braces, which Nextra content used to silence `eslint-disable-line` rules.
 *
 * They render nothing, but Astro builds the heading id and the table of
 * contents from the expression source, so `## Sharing envelops { }` got the
 * id `sharing-envelops--` and a `{ }` in the sidebar. Removing the node
 * before the heading ids are collected keeps both clean.
 */
export function remarkHeadingExpressions() {
  return tree => {
    visit(tree, node => {
      if (node.type !== 'heading' || !node.children) return;
      node.children = node.children.filter(child => !isEmptyExpression(child));
      const last = node.children.at(-1);
      if (last?.type === 'text') {
        last.value = last.value.replace(/\s+$/, '');
        if (!last.value) node.children.pop();
      }
    });
  };
}

const BLOCK_COMMENT = /^\/\*[\s\S]*\*\/$/;
const LINE_COMMENT = /^\/\/[^\n]*$/;

function isEmptyExpression(node) {
  if (node.type !== 'mdxTextExpression') return false;
  const value = node.value.trim();
  return value === '' || BLOCK_COMMENT.test(value) || LINE_COMMENT.test(value);
}

function visit(node, visitor) {
  visitor(node);
  if (node.children) {
    for (const child of node.children) visit(child, visitor);
  }
}
