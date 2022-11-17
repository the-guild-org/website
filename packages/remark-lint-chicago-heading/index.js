import { lintRule } from 'unified-lint-rule';
import { visit } from 'unist-util-visit';
import { generated } from 'unist-util-generated';
import title from 'title';
import { toString } from 'hast-util-to-string';

const remarkLintChicagoHeading = lintRule(
  {
    origin: 'remark-lint:chicago-heading',
    url: 'https://github.com/remarkjs/remark-lint/tree/main/packages/remark-lint-heading-increment#readme',
  },
  /** @type {import('unified-lint-rule').Rule<Root, void>} */
  (tree, file, settings) => {
    visit(tree, 'heading', node => {
      if (generated(node)) {
        return;
      }
      const heading = toString(node);
      const capitalizedHeading = title(heading, { special: settings });
      if (heading !== capitalizedHeading) {
        file.message(`Unexpected heading "${heading}", should be "${capitalizedHeading}"`, node);
      }
    });
  }
);

export default remarkLintChicagoHeading;
