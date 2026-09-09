/**
 * Runs every content fetch (`fetch:*` in package.json) at once. They are
 * independent — each clones its own repo and writes its own directories —
 * and the two plugin hubs spend most of their time waiting on the npm
 * registry, so running them side by side roughly halves the fetch phase.
 * Output is prefixed per fetch; the first failure stops the rest.
 */
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const projectDir = fileURLToPath(new URL('..', import.meta.url));
const { scripts } = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
) as {
  scripts: Record<string, string>;
};
const fetches = Object.keys(scripts).filter(name => name.startsWith('fetch:'));

const children = fetches.map(name => {
  const label = `[${name.slice('fetch:'.length)}]`;
  const child = spawn('pnpm', ['run', '--silent', name], {
    cwd: projectDir,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  const prefix = (stream: NodeJS.ReadableStream, write: (line: string) => void) => {
    let rest = '';
    stream.on('data', (chunk: Buffer) => {
      rest += chunk.toString();
      const lines = rest.split('\n');
      rest = lines.pop() ?? '';
      for (const line of lines) write(`${label} ${line}`);
    });
    stream.on('end', () => rest && write(`${label} ${rest}`));
  };
  prefix(child.stdout, line => console.log(line));
  prefix(child.stderr, line => console.error(line));
  return { name, child };
});

let firstFailure: string | undefined;
await Promise.all(
  children.map(
    ({ name, child }) =>
      new Promise<void>(resolve => {
        child.on('close', code => {
          // No point finishing the other clones once one fetch has failed.
          if (code !== 0 && !firstFailure) {
            firstFailure = name;
            for (const other of children) other.child.kill();
          }
          resolve();
        });
      }),
  ),
);
if (firstFailure) {
  console.error(`${firstFailure} failed; the other fetches were stopped`);
  process.exit(1);
}
