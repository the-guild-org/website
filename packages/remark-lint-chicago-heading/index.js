import { toString } from 'hast-util-to-string';
import title from 'title';
import { lintRule } from 'unified-lint-rule';
import { generated } from 'unist-util-generated';
import { visit } from 'unist-util-visit';

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
        file.message(`Unexpected heading "${heading}", should be "${capitalizedHeading}".

Note: If you want to add an exception - add your word inside \`.remarkrc.cjs\` in the root of monorepo`, node);
      }
    });
  },
);

// eslint-disable-next-line import/no-default-export
export default remarkLintChicagoHeading;
