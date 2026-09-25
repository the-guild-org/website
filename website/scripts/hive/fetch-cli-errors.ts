/**
 * Fetches the error reference (errors.json) of the published @graphql-hive/cli
 * package into src/hive/generated/cli-errors.json (gitignored). The "Errors"
 * section of the CLI docs page renders it, so the listed error codes always
 * match the released CLI.
 *
 * Set HIVE_CLI_ERRORS_FILE to a local errors.json, for example
 * packages/libraries/cli/errors.json in a console checkout, to skip the
 * network fetch. If the latest release does not contain errors.json, the
 * section keeps linking to the CLI source instead.
 */
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE = '@graphql-hive/cli';
const outDir = fileURLToPath(new URL('../../src/hive/generated', import.meta.url));
const outFile = join(outDir, 'cli-errors.json');

mkdirSync(outDir, { recursive: true });

function validate(content: string, source: string): string {
  const reference = JSON.parse(content) as { exitCodes?: unknown; errors?: unknown };
  if (!Array.isArray(reference.exitCodes) || !Array.isArray(reference.errors)) {
    throw new Error(`${source} is not a CLI error reference`);
  }
  return content;
}

const localFile = process.env.HIVE_CLI_ERRORS_FILE;
if (localFile) {
  validate(readFileSync(localFile, 'utf8'), localFile);
  copyFileSync(localFile, outFile);
  console.log(`Using the local CLI error reference at ${localFile}`);
} else {
  const response = await fetch(`https://registry.npmjs.org/${PACKAGE}/latest`);
  if (!response.ok) {
    throw new Error(`Fetching ${PACKAGE} from npm failed with status ${response.status}`);
  }
  const metadata = (await response.json()) as { version: string; dist: { tarball: string } };
  const tarballResponse = await fetch(metadata.dist.tarball);
  if (!tarballResponse.ok) {
    throw new Error(
      `Downloading ${PACKAGE}@${metadata.version} failed with status ${tarballResponse.status}`,
    );
  }
  const tarball = Buffer.from(await tarballResponse.arrayBuffer());

  let content: string | null = null;
  try {
    content = execFileSync('tar', ['-xzOf', '-', 'package/errors.json'], {
      input: tarball,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'ignore'],
    });
  } catch {
    content = null;
  }

  if (content) {
    writeFileSync(outFile, validate(content, `${PACKAGE}@${metadata.version}`));
    console.log(`Wrote the error reference of ${PACKAGE}@${metadata.version}`);
  } else {
    rmSync(outFile, { force: true });
    console.warn(
      `${PACKAGE}@${metadata.version} does not contain errors.json; the CLI errors section links to the CLI source instead.`,
    );
  }
}
