import { toString } from 'hast-util-to-string';
import { lintRule } from 'unified-lint-rule';
import { generated } from 'unist-util-generated';
import { visit } from 'unist-util-visit';

const remarkLintNoDotAtEndOfHeading = lintRule(
  {
    origin: 'remark-lint:no-dot-at-end-of-heading',
    url: '',
  },
  /** @type {import('unified-lint-rule').Rule<Root, void>} */
  (tree, file) => {
    visit(tree, 'heading', node => {
      if (generated(node)) {
        return;
      }
      const heading = toString(node);
      if (heading.endsWith('...') && heading.at(-4) !== '.') {
        return;
      }
      if (toString(node).endsWith('.')) {
        file.message('Heading should not ends with "."', node);
      }
    });
  },
);

// eslint-disable-next-line import/no-default-export
export default remarkLintNoDotAtEndOfHeading;
