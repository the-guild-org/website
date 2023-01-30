/* eslint-disable no-console */
import { basename } from 'node:path';
import { defineConfig } from 'tsup';

const [, , filePath] = process.argv;
const outPath = './dist/' + basename(filePath).replace('.ts', '.mjs');

export default defineConfig({
  entry: [filePath],
  outDir: 'dist',
  async onSuccess() {
    console.info(`✅ Build done, loading script "${outPath}"...`);
    await import(outPath);
  },
  platform: 'node',
  target: 'node18',
  format: 'esm',
  bundle: true,
  banner: {
    js: [
      'import { createRequire as topLevelCreateRequire } from "module";',
      'const require = topLevelCreateRequire(import.meta.url);',
    ].join('\n'),
  },
});
