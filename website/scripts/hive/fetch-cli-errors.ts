/**
 * Fetches the error reference (errors.json) of the latest released
 * @graphql-hive/cli into src/hive/generated/cli-errors.json (gitignored). The
 * "Errors" section of the CLI docs page renders it, so the listed error codes
 * always match the released CLI.
 *
 * npm says which version is the latest release, and the file comes from the
 * tag of that release in graphql-hive/console. The file on the main branch is
 * not used: a test in that repository keeps it in step with the source, so it
 * lists errors as soon as they are merged, before the CLI that has them is
 * released.
 *
 * It runs with every build (`fetch-all`), and the build fails if the reference
 * cannot be fetched or is not valid: the CLI links to this section from every
 * error it prints, so the page is not published without it.
 *
 * Set HIVE_CLI_ERRORS_FILE to a local errors.json, for example
 * packages/libraries/cli/errors.json in a console checkout, to skip the
 * network fetch.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchWithRetry } from '../lib/npm-info.ts';

const PACKAGE = '@graphql-hive/cli';
const REPOSITORY = 'graphql-hive/console';
const FILE = 'packages/libraries/cli/errors.json';
const outDir = fileURLToPath(new URL('../../src/hive/generated', import.meta.url));
const outFile = join(outDir, 'cli-errors.json');

mkdirSync(outDir, { recursive: true });

/**
 * The docs render every field below, and the CLI links to the anchors, so a
 * reference that does not match fails the build instead of rendering gaps.
 */
function validate(content: string, source: string): string {
  const reference = JSON.parse(content) as { exitCodes?: unknown; errors?: unknown };
  if (!Array.isArray(reference.exitCodes) || !Array.isArray(reference.errors)) {
    throw new Error(`${source} is not a CLI error reference`);
  }

  const hasFields = (entry: unknown, numbers: string[], strings: string[]) => {
    const fields = (entry ?? {}) as Record<string, unknown>;
    return (
      numbers.every(name => Number.isInteger(fields[name])) &&
      strings.every(name => typeof fields[name] === 'string' && fields[name] !== '')
    );
  };

  const exitCodes = new Set<unknown>();
  for (const exitCode of reference.exitCodes) {
    if (!hasFields(exitCode, ['code'], ['name', 'description'])) {
      throw new Error(`${source} has an invalid exit code: ${JSON.stringify(exitCode)}`);
    }
    exitCodes.add(exitCode.code);
  }

  const codes = new Set<unknown>();
  for (const error of reference.errors) {
    if (!hasFields(error, ['code', 'exitCode'], ['name', 'title', 'fix', 'anchor'])) {
      throw new Error(`${source} has an invalid error: ${JSON.stringify(error)}`);
    }
    if (codes.has(error.code)) {
      throw new Error(`${source} lists the error code ${error.code} more than once`);
    }
    if (!exitCodes.has(error.exitCode)) {
      throw new Error(
        `${source} does not describe the exit code ${error.exitCode} of the error ${error.code}`,
      );
    }
    codes.add(error.code);
  }

  return content;
}

const localFile = process.env.HIVE_CLI_ERRORS_FILE;
if (localFile) {
  validate(readFileSync(localFile, 'utf8'), localFile);
  copyFileSync(localFile, outFile);
  console.log(`Using the local CLI error reference at ${localFile}`);
} else {
  const latest = await fetchWithRetry(`https://registry.npmjs.org/${PACKAGE}/latest`);
  const { version } = (await latest.json()) as { version: string };
  // Releases are tagged "<package>@<version>".
  const release = `${PACKAGE}@${version}`;
  const url = `https://raw.githubusercontent.com/${REPOSITORY}/refs/tags/${encodeURIComponent(release)}/${FILE}`;

  let content: string;
  try {
    content = await (await fetchWithRetry(url)).text();
  } catch (error) {
    throw new Error(
      `Fetching the error reference of ${release} from ${url} failed. ` +
        `Either ${REPOSITORY} has no tag "${release}" yet, or that release has no ${FILE}.`,
      { cause: error },
    );
  }

  writeFileSync(outFile, validate(content, release));
  console.log(`Wrote the error reference of ${release}`);
}
