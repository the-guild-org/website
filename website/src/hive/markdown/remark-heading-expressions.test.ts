import { describe, expect, it } from 'vitest';
import { remarkHeadingExpressions } from './remark-heading-expressions.mjs';

const heading = (...children: object[]) => ({ type: 'heading', depth: 2, children });
const text = (value: string) => ({ type: 'text', value });
const expression = (value: string) => ({ type: 'mdxTextExpression', value });

function run(node: object) {
  const tree = { type: 'root', children: [node] };
  remarkHeadingExpressions()(tree);
  return tree.children[0];
}

describe('remarkHeadingExpressions', () => {
  it('drops an empty expression and the whitespace before it', () => {
    expect(run(heading(text('Sharing envelops '), expression(' ')))).toEqual(
      heading(text('Sharing envelops')),
    );
  });

  it('drops comment-only expressions', () => {
    expect(
      run(heading(text('Exports were removed'), expression('/* eslint-disable-line */'))),
    ).toEqual(heading(text('Exports were removed')));
    expect(run(heading(text('Title '), expression('// note')))).toEqual(heading(text('Title')));
  });

  it('keeps an expression that has renderable text between two comments', () => {
    const kept = heading(text('Title '), expression("/* before */ 'Visible' /* after */"));
    expect(run(kept)).toEqual(kept);
  });

  it('keeps expressions that render something', () => {
    const kept = heading(text('Ensure to use '), expression("'Node.js >= 18'"));
    expect(run(kept)).toEqual(kept);
  });

  it('leaves other nodes alone', () => {
    const paragraph = { type: 'paragraph', children: [text('a '), expression(' ')] };
    expect(run(paragraph)).toEqual(paragraph);
  });
});
