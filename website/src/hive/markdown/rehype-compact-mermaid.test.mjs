import { describe, expect, test } from 'vitest';
import {
  compactMermaidSvgs,
  compactPath,
  round,
  withCompactSvg,
} from './rehype-compact-mermaid.mjs';

describe('round', () => {
  test('keeps two decimals and drops trailing zeros', () => {
    expect(round('-15.855405447506715')).toBe('-15.86');
    expect(round('4.10')).toBe('4.1');
    expect(round('33')).toBe('33');
    expect(round('-0.001')).toBe('0');
  });
});

describe('compactPath', () => {
  test('rounds coordinates', () => {
    expect(compactPath('M-33.1171875 -15 L12.000001 3.14159265')).toBe('M-33.12 -15L12 3.14');
  });

  test('drops curves and moves that do not move the pen', () => {
    expect(
      compactPath(
        'M33.1171875 -15 C33.1171875 -15, 33.1171875 -15, 33.1171875 -15 M33.1171875 -15 C34 -14, 35 -13, 36 -12',
      ),
    ).toBe('M33.12 -15C34 -14 35 -13 36 -12');
  });

  test('keeps a move to a new point and closes paths', () => {
    expect(compactPath('M0 0 L10 0 Z M5 5 L6 6')).toBe('M0 0L10 0ZM5 5L6 6');
  });

  test('only rounds paths with commands it does not restructure', () => {
    expect(compactPath('M0 0 a1.23456 1.23456 0 0 1 2.5 2.5')).toBe(
      'M0 0 a1.23 1.23 0 0 1 2.5 2.5',
    );
  });
});

describe('compactMermaidSvgs', () => {
  test('compacts Mermaid SVGs and leaves other SVGs alone', () => {
    const path = d => ({ type: 'element', tagName: 'path', properties: { d }, children: [] });
    const tree = {
      type: 'root',
      children: [
        {
          type: 'element',
          tagName: 'svg',
          properties: { id: 'mermaid-0', viewBox: '0 0 986.5047607421875 1200.123456' },
          children: [path('M1.123456 2.123456 L3.987654 4.5')],
        },
        {
          type: 'element',
          tagName: 'svg',
          properties: { id: 'logo' },
          children: [path('M1.123456 2.123456')],
        },
      ],
    };
    compactMermaidSvgs(tree);
    expect(tree.children[0].properties.viewBox).toBe('0 0 986.5 1200.12');
    expect(tree.children[0].children[0].properties.d).toBe('M1.12 2.12L3.99 4.5');
    expect(tree.children[1].children[0].properties.d).toBe('M1.123456 2.123456');
  });
});

describe('compactPath subpaths', () => {
  test('returns to the subpath start after Z', () => {
    // The second moveto starts a new subpath at (10, 10); its Z must close there.
    expect(compactPath('M0 0 L10 0 L10 10 Z M10 10 L20 20 Z')).toBe(
      'M0 0L10 0L10 10ZM10 10L20 20Z',
    );
    // After Z the pen is back at (0, 0), so a line from there is not dropped.
    expect(compactPath('M0 0 L10 0 L10 10 Z L0 0 L5 5')).toBe('M0 0L10 0L10 10ZL5 5');
  });

  test('keeps a moveto that would change where a later Z closes', () => {
    expect(compactPath('M0 0 L10 0 M10 0 L10 10 Z')).toBe('M0 0L10 0M10 0L10 10Z');
  });

  test('treats coordinate pairs after a moveto as linetos', () => {
    expect(compactPath('M0 0 10 0 20 0')).toBe('M0 0L10 0L20 0');
  });
});

describe('withCompactSvg', () => {
  test('forwards context, options, tree and file, then compacts what the plugin added', async () => {
    const seen = {};
    const plugin = function (options) {
      seen.context = this;
      seen.options = options;
      return async (tree, file) => {
        seen.tree = tree;
        seen.file = file;
        await new Promise(resolve => setTimeout(resolve, 1));
        tree.children.push({
          type: 'element',
          tagName: 'svg',
          properties: { id: 'mermaid-1' },
          children: [
            {
              type: 'element',
              tagName: 'path',
              properties: { d: 'M0.123456 0 L1.987654 1' },
              children: [],
            },
          ],
        });
      };
    };
    const context = { name: 'processor' };
    const options = { strategy: 'inline-svg' };
    const tree = { type: 'root', children: [] };
    const file = { path: 'docs/page.mdx' };

    await withCompactSvg(plugin).call(context, options)(tree, file);

    expect(seen).toEqual({ context, options, tree, file });
    expect(tree.children[0].children[0].properties.d).toBe('M0.12 0L1.99 1');
  });
});
