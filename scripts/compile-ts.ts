import { build } from 'esbuild';

const [, , filePath, outPath] = process.argv;

build({
  entryPoints: [filePath],
  outfile: outPath,
  bundle: true,
  platform: 'node',
  format: 'esm',
  banner: {
    js: [
      'import { createRequire as topLevelCreateRequire } from "module";',
      'const require = topLevelCreateRequire(import.meta.url);',
    ].join('\n'),
  },
});
