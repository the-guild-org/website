/**
 * A command that triggers each Hive CLI error, and what the CLI then prints.
 *
 * The codes, titles and fixes of the error reference come from the released
 * CLI (scripts/hive/fetch-cli-errors.ts); that reference has no examples, so
 * they are kept here, keyed by the class name of the error. An error without
 * an entry is listed without an example.
 *
 * The outputs are the messages of @graphql-hive/cli@0.66.0. "[reason]" and
 * the like stand for text that depends on the schema or the server.
 */
export interface CLIErrorExample {
  /** A command that can produce the error. */
  example: string;
  /** What the CLI prints, without the "[code]" that follows it. */
  exampleOutput: string;
}

export const cliErrorExamples: Record<string, CLIErrorExample> = {
  InvalidConfigError: {
    example: 'hive schema:fetch',
    exampleOutput:
      'The configuration file "/project/hive.json" is invalid: Expected a JSON object.',
  },
  InvalidCommandError: {
    example: 'hive badcommand',
    exampleOutput: 'The command, "badcommand", does not exist.',
  },
  MissingArgumentsError: {
    example: 'hive schema:publish',
    exampleOutput: 'Missing 1 required argument:\nFILE \tPath to the schema file(s)',
  },
  MissingRegistryTokenError: {
    example: "HIVE_TOKEN='' hive schema:fetch",
    exampleOutput:
      'A registry token is required to perform the action. For help generating an access token, see https://the-guild.dev/graphql/hive/docs/management/targets#registry-access-tokens',
  },
  MissingCdnKeyError: {
    example: 'hive artifact:fetch --artifact sdl',
    exampleOutput:
      'A CDN key is required to perform the action. For help generating a CDN key, see https://the-guild.dev/graphql/hive/docs/management/targets#cdn-access-tokens',
  },
  MissingEndpointError: {
    example: "HIVE_REGISTRY='' hive schema:fetch",
    exampleOutput: 'A registry endpoint is required to perform the action.',
  },
  InvalidRegistryTokenError: {
    example: 'HIVE_TOKEN=badtoken hive schema:fetch',
    exampleOutput:
      'The registry access token was rejected. It does not exist, has expired, or has been revoked.',
  },
  InvalidCdnKeyError: {
    example: 'hive artifact:fetch --artifact sdl --cdn.accessToken badtoken',
    exampleOutput:
      'A valid CDN key is required to perform the action. The CDN key used does not exist, has expired, or has been revoked.',
  },
  MissingCdnEndpointError: {
    example: "HIVE_CDN_ENDPOINT='' hive artifact:fetch --artifact sdl",
    exampleOutput: 'A CDN endpoint is required to perform the action.',
  },
  MissingEnvironmentError: {
    example: "GITHUB_REPOSITORY='' hive schema:publish schema.graphql --github",
    exampleOutput:
      'Missing required environment variable:\n\tGITHUB_REPOSITORY \tGithub repository full name, e.g. graphql-hive/console',
  },
  CommitRequiredError: {
    example: 'hive schema:check schema.graphql --github',
    exampleOutput:
      "Couldn't resolve required commit sha. Provide a non-empty commit via the '--commit' parameter or execute the command within a git repository.",
  },
  GithubRepositoryRequiredError: {
    example: 'hive schema:check schema.graphql --github --commit abc123',
    exampleOutput: "Couldn't resolve git repository required for GitHub Application.",
  },
  AuthorRequiredError: {
    example: 'hive schema:publish schema.graphql --commit abc123',
    exampleOutput:
      "Couldn't resolve required commit author. Provide a non-empty author via the '--author' parameter or execute the command within a git repository.",
  },
  HTTPError: {
    example: 'hive schema:fetch',
    exampleOutput:
      'A server error occurred while performing the action. A call to "https://app.graphql-hive.com/graphql" failed with Status: 503, Text: Service Unavailable',
  },
  NetworkError: {
    example: 'hive schema:fetch',
    exampleOutput:
      'A network error occurred while performing the action: "TypeError: fetch failed"',
  },
  APIError: {
    example: 'hive schema:check --service reviews schema.graphql',
    exampleOutput: 'Something went wrong.  (Request ID: "12345678")',
  },
  IntrospectionError: {
    example: 'hive dev --remote --service reviews --url http://localhost:3001/graphql',
    exampleOutput:
      "Could not get introspection result from the service 'reviews'. Make sure introspection is enabled by the server.",
  },
  UnsupportedFileExtensionError: {
    example: 'hive introspect http://localhost:4000/graphql --write schema.foo',
    exampleOutput:
      'Got unsupported file extension: ".foo". Try using one of the supported extensions: .graphql,.gql,.gqls,.graphqls,.json',
  },
  FileMissingError: {
    example: 'hive app:create --name ios --version 1.0.0 operations.json',
    exampleOutput: 'Failed to load file "operations.json": The file does not exist.',
  },
  InvalidFileContentsError: {
    example: 'hive app:create --name ios --version 1.0.0 operations.json',
    exampleOutput:
      'File "operations.json" could not be parsed. Please make sure the file is readable and contains a valid JSON persisted operations manifest.',
  },
  InvalidTargetError: {
    example: 'hive schema:push --target staging --revision abc123 schema.graphql',
    exampleOutput:
      'Invalid slug or ID provided for option "--target". Must match target slug "$organization_slug/$project_slug/$target_slug" (e.g. "the-guild/graphql-hive/staging") or UUID (e.g. c8164307-0b42-473e-a8c5-2860bb4beff6).',
  },
  InvalidFederationSubgraphError: {
    example: 'hive dev --remote --service reviews --url http://localhost:3001/graphql',
    exampleOutput:
      'The provided service URL does not point to a valid Federation subgraph.\nThe GraphQL server responded with the following errors:\n- Cannot query field "_service" on type "Query".\n',
  },
  InvalidVersionIdError: {
    example: 'hive schema:promote --to my-org/my-project/production --version 1.0.0',
    exampleOutput: 'Invalid version id provided for "--version".',
  },
  ConflictingOptionsError: {
    example:
      'hive schema:promote --to my-org/my-project/production --from my-org/my-project/staging --version c8164307-0b42-473e-a8c5-2860bb4beff6',
    exampleOutput: 'The options "--from", "--version" conflict. Please only provide one.',
  },
  AccessDeniedError: {
    example: 'hive schema:publish --target my-org/my-project/production schema.graphql',
    exampleOutput:
      'Access denied: the access token is missing the "schemaVersion:publish" permission, or the target does not exist or is not accessible to this token.  (Request ID: "12345678")',
  },
  UnsupportedServerError: {
    example:
      'hive schema:push --registry.endpoint https://hive.example.com/graphql --revision abc123 schema.graphql',
    exampleOutput:
      'The Hive server at "https://hive.example.com/graphql" does not support this version of the CLI. The request was rejected before it ran:\n- Cannot query field "schemaPush" on type "Mutation".',
  },
  RequestTimeoutError: {
    example: 'hive schema:publish schema.graphql',
    exampleOutput:
      'The request to "https://app.graphql-hive.com/graphql" timed out. The operation may still have completed on the server. Check its result before retrying.',
  },
  InvalidInputError: {
    example: 'hive schema:check schema.graphql --unknown',
    exampleOutput: 'Nonexistent flag: --unknown\nSee more help with --help',
  },
  InvalidHeaderError: {
    example: 'hive schema:fetch --registry.header "x-team: platform"',
    exampleOutput: 'Invalid header "x-team: platform". Expected Name=Value.',
  },
  UnexpectedError: {
    example: 'hive schema:fetch',
    exampleOutput: 'An unexpected error occurred: [message]\n> Enable DEBUG=* for more details.',
  },
  SchemaFileNotFoundError: {
    example: 'hive schema:check schema.graphql',
    exampleOutput: 'Error reading the schema file "schema.graphql": The file does not exist.',
  },
  SchemaFileEmptyError: {
    example: 'hive schema:check schema.graphql',
    exampleOutput: 'No GraphQL type definitions were found in "schema.graphql".',
  },
  SchemaCheckFailedError: {
    example: 'hive schema:check schema.graphql',
    exampleOutput: 'Schema check failed.',
  },
  SchemaCheckApprovalFailedError: {
    example: 'hive schema:check --target my-org/my-project/production --forceSafe schema.graphql',
    exampleOutput:
      'Failed to auto-approve the schema check: The registry did not store this schema check, so it cannot be approved.',
  },
  SchemaPublishFailedError: {
    example: 'hive schema:publish schema.graphql',
    exampleOutput: 'Schema publish failed.',
  },
  InvalidSDLError: {
    example: 'hive schema:publish schema.graphql',
    exampleOutput:
      'The SDL is not valid at line 3, column 1:\n Syntax Error: Expected Name, found <EOF>.',
  },
  SchemaPublishMissingServiceError: {
    example: 'hive schema:publish schema.graphql --url http://localhost:3001/graphql',
    exampleOutput: 'Missing service name Please use the "--service <name>" parameter.',
  },
  SchemaPublishMissingUrlError: {
    example: 'hive schema:publish schema.graphql --service reviews',
    exampleOutput: 'Missing service url Please use the "--url <url>" parameter.',
  },
  PersistedOperationsMalformedError: {
    example: 'hive app:create --name ios --version 1.0.0 operations.json',
    exampleOutput:
      'Persisted Operations file "operations.json" is malformed. Please make sure it follows either the GraphQL Code Generator, Relay or Apollo Persisted Query Manifest Format.',
  },
  SchemaNotFoundError: {
    example: 'hive schema:fetch abc123',
    exampleOutput: 'No schema found for commit abc123.',
  },
  InvalidSchemaError: {
    example: 'hive schema:fetch abc123',
    exampleOutput: 'Schema is invalid for commit abc123.',
  },
  ServiceAndUrlLengthMismatch: {
    example:
      'hive dev \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products',
    exampleOutput: 'Not every services has a matching url. Got 2 services and 1 urls.',
  },
  LocalCompositionError: {
    example:
      'hive dev \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products --url http://localhost:3002/graphql',
    exampleOutput: 'Local composition failed:\n✖ Detected 1 error\n\n   - [reason]\n',
  },
  RemoteCompositionError: {
    example:
      'hive dev --remote \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products --url http://localhost:3002/graphql',
    exampleOutput: 'Remote composition failed:\n✖ Detected 1 error\n\n   - [reason]\n',
  },
  InvalidCompositionResultError: {
    example:
      'hive dev --remote \\\n  --service reviews --url http://localhost:3001/graphql \\\n  --service products --url http://localhost:3002/graphql',
    exampleOutput: 'Composition resulted in an invalid supergraph: [supergraph]',
  },
  InvalidDocumentsError: {
    example: "hive operations:check 'operations/*.graphql'",
    exampleOutput: 'Invalid operation syntax:\n✖ operations/user.graphql\n - [reason]',
  },
};
