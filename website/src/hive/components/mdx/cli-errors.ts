/**
 * The Hive CLI's error codes, mirrored from
 * packages/libraries/cli/src/helpers/errors.ts in graphql-hive/console. The
 * CLI prints "[code]" after every error and points at
 * /docs/api-reference/cli#errors, so keep the codes and anchors stable.
 *
 * The codes are grouped by command: 1xx generic, 2xx schema:check,
 * 3xx schema:publish, 4xx app:create, 5xx artifact:fetch, 6xx dev,
 * 7xx operations:check.
 */
export interface CLIError {
  code: string;
  /** A command that can produce the error. */
  example: string;
  /** What the CLI prints. */
  exampleOutput: string;
  fix: string;
  /** The error class in the CLI source, e.g. `InvalidConfigError`. */
  name: string;
}

const REGISTRY_TOKEN_FIX =
  'A registry token can be set using the environment variable "HIVE_TOKEN", the argument "--registry.accessToken", or the config file "hive.json". For help generating a token, see https://the-guild.dev/graphql/hive/docs/management/targets#registry-access-tokens';
const CDN_KEY_FIX =
  'A CDN key can be set using the argument "--cdn.accessToken" or the config file "hive.json". For help generating a CDN key, see https://the-guild.dev/graphql/hive/docs/management/targets#cdn-access-tokens';
const COMPOSITION_FIX =
  'The provided schemas are not composable. This means that there are conflicting types between the subgraphs. Review the provided reason to help determine the best path forward for the subgraph(s).';
const SERVICE_AND_URL_FIX =
  'A service name and URL are required when publishing a subgraph schema.';

export const cliErrors: CLIError[] = [
  {
    code: '100',
    name: 'InvalidConfigError',
    example: 'hive schema:fetch',
    exampleOutput: 'The provided "hive.json" is invalid.',
    fix: 'A configuration file was found but the format does not match what is expected. See https://github.com/graphql-hive/console/blob/main/packages/libraries/cli/README.md#config-file-hivejson for structure details and try updating to the latest version if contents appear valid.',
  },
  {
    code: '101',
    name: 'InvalidCommandError',
    example: 'hive badcommand',
    exampleOutput: 'The command, "badcommand", does not exist.',
    fix: 'Use "hive help" for a list of available commands.',
  },
  {
    code: '102',
    name: 'MissingArgumentsError',
    example: 'hive schema:delete',
    exampleOutput: 'Missing 1 required argument:\nSERVICE  name of the service',
    fix: 'Use "hive help [command]" for usage details.',
  },
  {
    code: '103',
    name: 'MissingRegistryTokenError',
    example: "HIVE_TOKEN='' hive schema:fetch",
    exampleOutput:
      'A registry token is required to perform the action. For help generating an access token, see https://the-guild.dev/graphql/hive/docs/management/targets#registry-access-tokens',
    fix: REGISTRY_TOKEN_FIX,
  },
  {
    code: '104',
    name: 'MissingCdnKeyError',
    example: 'hive artifact:fetch --artifact sdl',
    exampleOutput:
      'A CDN key is required to perform the action. For help generating a CDN key, see https://the-guild.dev/graphql/hive/docs/management/targets#cdn-access-tokens',
    fix: CDN_KEY_FIX,
  },
  {
    code: '105',
    name: 'MissingEndpointError',
    example: 'hive schema:delete --registry.endpoint= foo-service',
    exampleOutput: 'A registry endpoint is required to perform the action.',
    fix: 'A registry endpoint is used when self-hosting Hive; otherwise, use the default. The registry endpoint can be set using the environment variable "HIVE_REGISTRY" or the argument "--registry.endpoint".',
  },
  {
    code: '106',
    name: 'InvalidRegistryTokenError',
    example: 'HIVE_TOKEN=badtoken hive schema:fetch',
    exampleOutput:
      'A valid registry token is required to perform the action. The registry token used does not exist or has been revoked.',
    fix: REGISTRY_TOKEN_FIX,
  },
  {
    code: '107',
    name: 'InvalidCdnKeyError',
    example: 'hive artifact:fetch --artifact sdl',
    exampleOutput:
      'A valid CDN key is required to perform the action. The CDN key used does not exist or has been revoked.',
    fix: CDN_KEY_FIX,
  },
  {
    code: '108',
    name: 'MissingCdnEndpointError',
    example: "HIVE_CDN_ENDPOINT='' hive artifact:fetch",
    exampleOutput: 'A CDN endpoint is required to perform the action.',
    fix: 'A CDN endpoint is used when self-hosting Hive; otherwise, use the default. This error can happen if the CDN endpoint is set to an empty string. To set the CDN endpoint, use the argument "--cdn.endpoint" or the environment variable "HIVE_CDN_ENDPOINT".',
  },
  {
    code: '109',
    name: 'MissingEnvironmentError',
    example: "GITHUB_REPOSITORY='' hive schema:publish --author=username --commit=sha",
    exampleOutput:
      'Missing required environment variable:\nGITHUB_REPOSITORY  Github repository full name, e.g. graphql-hive/console',
    fix: 'If using the GitHub integration, then a GitHub repository must be set. This is provided by the default GitHub workflow and typically does not need to be set manually. For more information about the GitHub integration, see https://the-guild.dev/graphql/hive/docs/other-integrations/ci-cd',
  },
  {
    code: '110',
    name: 'CommitRequiredError',
    example: 'hive schema:check FILE --github',
    exampleOutput:
      "Couldn't resolve required commit sha. Provide a non-empty author via the '--commit' parameter or execute the command within a git repository.",
    fix: "Make sure the command is called within a valid git repository directory or the '--commit' parameter is provided with a non-empty value.",
  },
  {
    code: '111',
    name: 'GithubRepositoryRequiredError',
    example: 'hive schema:check FILE --github',
    exampleOutput: "Couldn't resolve git repository required for GitHub Application.",
    fix: 'Make sure the command is called within a valid git repository directory. See https://the-guild.dev/graphql/hive/docs/management/organizations#github for more details about this integration.',
  },
  {
    code: '112',
    name: 'AuthorRequiredError',
    example: 'hive schema:check FILE --github',
    exampleOutput:
      "Couldn't resolve required commit author. Provide a non-empty author via the '--author' parameter or execute the command within a git repository.",
    fix: "Make sure the command is called within a valid git repository directory or the '--author' parameter is provided with a non-empty value.",
  },
  {
    code: '113',
    name: 'HTTPError',
    example: 'hive schema:fetch',
    exampleOutput:
      'A server error occurred while performing the action. A call to "https://app.graphql-hive.com/registry" failed with Status: 500, Text: Server Unavailable.',
    fix: 'Check your network connection and verify the value if using a custom CDN or registry endpoint. If the error status is >= 500, then there may be an issue with the Hive servers. Check the Hive service status for available details at https://status.graphql-hive.com/ and if the issue persists then contact The Guild support.',
  },
  {
    code: '114',
    name: 'NetworkError',
    example: 'hive schema:fetch',
    exampleOutput:
      'A network error occurred while performing the action: "TypeError: fetch failed"',
    fix: "Check your network connection and verify the value if using a custom CDN or registry endpoint. Confirm that your network settings allow outbound traffic to Hive's domain.",
  },
  {
    code: '115',
    name: 'APIError',
    example: 'hive schema:check --service foo schema.graphql',
    exampleOutput: 'Something went wrong. (Request ID: "12345678")',
    fix: 'The operation was executed but an error response was returned from the API call. Follow the recommendation in the returned error message.',
  },
  {
    code: '116',
    name: 'IntrospectionError',
    example: 'hive dev --remote --service reviews --url http://localhost:3001/graphql',
    exampleOutput:
      'Could not get introspection result from the service. Make sure introspection is enabled by the server.',
    fix: 'Schema contents are required to perform composition. Either the URL provided must respond to the request "query { _service { sdl } }" to provide its schema, or the SDL can be provided locally using the "--schema" argument.',
  },
  {
    code: '117',
    name: 'UnsupportedFileExtensionError',
    example: 'hive introspect LOCATION --write schema.foo',
    exampleOutput: 'Got unsupported file extension: ".foo"',
    fix: 'The file extension indicates the format to write. Try specifying one of the supported formats. Use "hive [command] help" for more information about the command\'s input.',
  },
  {
    code: '118',
    name: 'FileMissingError',
    example: 'hive app:create undefined',
    exampleOutput: 'Failed to load file "undefined"',
    fix: 'The file specified does not exist or cannot be read. Check that the path is correct.',
  },
  {
    code: '119',
    name: 'InvalidFileContentsError',
    example: 'hive app:create schema.json',
    exampleOutput:
      'File "schema.json" could not be parsed. Please make sure the file is readable and contains a valid JSON.',
    fix: 'The file specified may not be valid JSON. Check that the file specified is correct and valid.',
  },
  {
    code: '120',
    name: 'InvalidTargetError',
    example: 'hive schema:push --target staging schema.graphql',
    exampleOutput:
      'Invalid slug or ID provided for option "--target". Must match target slug "$organization_slug/$project_slug/$target_slug" (e.g. "the-guild/graphql-hive/staging") or UUID (e.g. c8164307-0b42-473e-a8c5-2860bb4beff6).',
    fix: 'Pass the full target slug, "organization/project/target", or the target\'s UUID. Both are shown on the target\'s settings page in Hive Console. The option is "--to" or "--from" for "schema:promote".',
  },
  {
    code: '121',
    name: 'InvalidFederationSubgraphError',
    example: 'hive dev --remote --service reviews --url http://localhost:3001/graphql',
    exampleOutput:
      'The provided service URL does not point to a valid Federation subgraph.\nThe GraphQL server responded with the following errors:\n- Cannot query field "_service" on type "Query"',
    fix: 'The server at the URL is not a Federation subgraph: it does not answer "query { _service { sdl } }". Check that the URL is correct and that the server implements the Federation subgraph specification, or pass the SDL locally with "--schema".',
  },
  {
    code: '121',
    name: 'InvalidVersionIdError',
    example: 'hive schema:promote --to my-org/my-project/production --version 1.0.0',
    exampleOutput: 'Invalid version id provided for "--version".',
    fix: '"--version" takes the ID of a schema version, which is a UUID such as "c8164307-0b42-473e-a8c5-2860bb4beff6". Copy it from the version\'s page in Hive Console, or promote the latest version of another target with "--from" instead.',
  },
  {
    code: '121',
    name: 'ConflictingOptionsError',
    example:
      'hive schema:promote --to my-org/my-project/production --from my-org/my-project/staging --version c8164307-0b42-473e-a8c5-2860bb4beff6',
    exampleOutput: 'The options "--from", "--version" conflict. Please only provide one.',
    fix: 'The listed options cannot be combined. "schema:promote" takes either "--from", to promote the latest version of another target, or "--version", to promote one specific schema version. Remove one of them and run the command again.',
  },
  {
    code: '199',
    name: 'UnexpectedError',
    example: 'hive schema:fetch --registry.accessToken=*** 12345',
    exampleOutput: 'An unexpected error occurred: [message]\n> Enable DEBUG=* for more details.',
    fix: 'An issue occurred during execution that was not expected. Enable DEBUG=* to view debug logs which may provide more insight into the cause.',
  },
  {
    code: '200',
    name: 'SchemaFileNotFoundError',
    example: 'hive schema:check FILE',
    exampleOutput: 'Error reading the schema file "FILE"',
    fix: "Verify the file path is correct. For help generating a schema file, see your implemented GraphQL library's documentation.",
  },
  {
    code: '201',
    name: 'SchemaFileEmptyError',
    example: 'hive schema:check schema.graphql',
    exampleOutput: 'The schema file "schema.graphql" is empty.',
    fix: "Verify the file path and file contents are correct. For help generating a schema file, see your implemented GraphQL library's documentation.",
  },
  {
    code: '300',
    name: 'SchemaPublishFailedError',
    example: 'hive schema:publish schema.graphql',
    exampleOutput: 'Schema publish failed.',
    fix: 'The schema failed checks during publish. If this is an older project, you may still be able to publish using the "--force" flag. "--force" is enabled by default for new projects. For more details about the schema registry behavior, see https://the-guild.dev/graphql/hive/docs/schema-registry',
  },
  {
    code: '301',
    name: 'InvalidSDLError',
    example: 'hive schema:publish schema.graphql',
    exampleOutput: "The SDL is not valid at line 0, column 1:\n Unexpected token '{'",
    fix: 'There is a syntax error in the SDL. Correct the syntax error mentioned and try again. If there are multiple syntax errors, only one may be mentioned at a time.',
  },
  {
    code: '302',
    name: 'SchemaPublishMissingServiceError',
    example: 'hive schema:publish schema.graphql --url https://foo.service',
    exampleOutput: 'The schema failed to publish. Please use the "--service <name>" parameter.',
    fix: SERVICE_AND_URL_FIX,
  },
  {
    code: '303',
    name: 'SchemaPublishMissingUrlError',
    example: 'hive schema:publish schema.graphql --service foo',
    exampleOutput: 'The schema failed to publish. Please use the "--url <url>" parameter.',
    fix: SERVICE_AND_URL_FIX,
  },
  {
    code: '400',
    name: 'PersistedOperationsMalformedError',
    example: 'hive app:create --name ios --version 1.0.0 operations.json',
    exampleOutput: 'Persisted Operations file "operations.json" is malformed.',
    fix: 'The operations JSON could not be parsed and validated. Check for and address any syntax errors in this file.',
  },
  {
    code: '500',
    name: 'SchemaNotFoundError',
    example: 'hive schema:fetch --registry.accessToken=*** 12345',
    exampleOutput: 'No schema found for commit 12345.',
    fix: 'The action ID does not have a schema associated with it. Verify the action ID or do not provide an action ID to fetch the latest version.',
  },
  {
    code: '501',
    name: 'InvalidSchemaError',
    example: 'hive schema:fetch --registry.accessToken=*** 12345',
    exampleOutput: 'Schema is invalid.',
    fix: 'The action ID is associated with an invalid schema. Try another action ID.',
  },
  {
    code: '600',
    name: 'ServiceAndUrlLengthMismatch',
    example:
      'hive dev \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products',
    exampleOutput: 'Not every services has a matching url. Got 2 services and 1 url.',
    fix: 'Composition requires a service and URL pair per subgraph. Make sure both are provided for every subgraph using the "--service" and "--url" arguments.',
  },
  {
    code: '601',
    name: 'LocalCompositionError',
    example:
      'hive dev \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products --url http://localhost:3002/graphql',
    exampleOutput: 'Local composition failed:\n[reason]',
    fix: COMPOSITION_FIX,
  },
  {
    code: '602',
    name: 'RemoteCompositionError',
    example:
      'hive dev --remote \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products --url http://localhost:3002/graphql',
    exampleOutput: 'Remote composition failed:\nDetected 1 error\n- [reason]',
    fix: COMPOSITION_FIX,
  },
  {
    code: '603',
    name: 'InvalidCompositionResultError',
    example:
      'hive dev --remote \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products --url http://localhost:3002/graphql',
    exampleOutput: 'Composition resulted in an invalid supergraph: [supergraph]',
    fix: 'Composition passed but the resulting supergraph SDL was invalid. If using an external schema composer, verify the logic and make sure the version of federation being used is supported by Hive.',
  },
  {
    code: '700',
    name: 'InvalidDocumentsError',
    example: 'hive operations:check operations/*.gql',
    exampleOutput: 'Invalid operation syntax:\n - [reason]',
    fix: 'Operations must be valid GraphQL. Address the operation syntax errors and then try again.',
  },
];

/** `InvalidConfigError` → `Invalid Config Error`. */
export const titleOf = (error: CLIError) => error.name.replaceAll(/([a-z])([A-Z])/g, '$1 $2');

/**
 * Anchor per error. The CLI links to `#errors`, and older links used
 * `#errors-<code>`; classes that share a code get the class name appended.
 */
export function anchorOf(error: CLIError, all: CLIError[] = cliErrors): string {
  const sameCode = all.filter(other => other.code === error.code);
  if (sameCode.length === 1 || sameCode[0] === error) return `errors-${error.code}`;
  return `errors-${error.code}-${error.name.replaceAll(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
}
