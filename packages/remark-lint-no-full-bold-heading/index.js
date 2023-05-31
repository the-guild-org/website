import { toString } from 'hast-util-to-string';
import { lintRule } from 'unified-lint-rule';
import { generated } from 'unist-util-generated';
import { visit } from 'unist-util-visit';

const remarkLintNoFullBoldHeading = lintRule(
  {
    origin: 'remark-lint:no-full-bold-heading',
    url: '',
  },
  /** @type {import('unified-lint-rule').Rule<Root, void>} */
  (tree, file) => {
    visit(tree, 'heading', node => {
      if (generated(node)) {
        return;
      }
      const heading = toString(node);
      if (node.children[0].type === 'strong' && node.children[1].type === 'text') {
        return;
      }
      if (node.children[0].type === 'strong') {
        file.message(`Heading is Bold by default. Heading "${heading}" - shouldn't be bold`, node);
      }
    });
  },
);

// eslint-disable-next-line import/no-default-export
export default remarkLintNoFullBoldHeading;
