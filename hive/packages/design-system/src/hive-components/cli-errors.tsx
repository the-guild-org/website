import { ReactElement } from "react";
// TODO: Callout and Code are from nextra/components - need fumadocs equivalents
// For now using simple HTML equivalents
// import { Callout, Code } from 'nextra/components';
const Code = ({ children }: { children: React.ReactNode }) => (
  <code>{children}</code>
);
const Callout = ({
  children,
  emoji: _emoji,
  type: _type,
}: {
  children: React.ReactNode;
  emoji?: string;
  type?: string;
}) => (
  <div className="my-4 rounded-md border-l-4 border-blue-500 bg-blue-50 p-4 dark:bg-blue-900/20">
    {children}
  </div>
);

type CLIError = {
  code: string;
  example: string;
  exampleOutput: string;
  fix: string;
  title: string;
};

export function ErrorDetails(props: CLIError): ReactElement {
  return (
    <>
      <h3
        className="mt-8 text-2xl font-semibold tracking-[-0.015em] text-slate-900 dark:text-slate-100"
        id={`errors-${props.code}`}
      >
        {props.code} "{props.title}"{" "}
        <a
          aria-label="Permalink for this error code"
          className="nextra-focus subheading-anchor"
          href={`#errors-${props.code}`}
        />
      </h3>
      <h4 className="mt-8 text-xl font-semibold tracking-[-0.015em] text-slate-900 dark:text-slate-100">
        Example: <Code>{props.example}</Code>
      </h4>
      <Callout emoji=">" type="default">
        <pre>{props.exampleOutput}</pre>
      </Callout>
      <h4
        className="mt-8 text-xl font-semibold tracking-[-0.015em] text-slate-900 dark:text-slate-100"
        id={`errors-${props.code}-fix`}
      >
        Suggested Fix
      </h4>
      <p>{props.fix}</p>
    </>
  );
}

export function getErrorDescriptions(): CLIError[] {
  const examples: {
    example: string;
    fix: string;
    instance: { code: string; message: string; name: string };
  }[] = [
    // @note: cannot import the actual errors due to missing internal node modules.
    //   But structure it as if we can for the future.

    // { instance: new errors.APIError('Something went wrong', '12345'), ...}
    {
      example: "hive schema:fetch",
      fix: "A configuration file was found but the format does not match what is expected. See https://github.com/graphql-hive/console/blob/main/packages/libraries/cli/README.md#config-file-hivejson for structure details and try updating to the latest version if contents appear valid.",
      instance: {
        code: "100",
        message: 'The provided "hive.json" is invalid.',
        name: "InvalidConfigError",
      },
    },
    {
      example: "hive badcommand",
      fix: 'Use "hive help" for a list of available commands.',
      instance: {
        code: "101",
        message: 'The command, "badcommand", does not exist.',
        name: "InvalidCommandError",
      },
    },
    {
      example: "hive schema:delete",
      fix: 'Use "hive help [command]" for usage details.',
      instance: {
        code: "102",
        message: "Missing 1 required argument:\nSERVICE  name of the service",
        name: "MissingArgumentsError",
      },
    },
    {
      example: "HIVE_TOKEN='' hive schema:fetch",
      fix: 'A registry token can be set using the environment variable "HIVE_TOKEN", argument "--registry.accessToken", or config file "hive.json". For help generating a token, see https://the-guild.dev/graphql/hive/docs/management/targets#registry-access-tokens',
      instance: {
        code: "103",
        message:
          "A registry token is required to perform the action. For help generating an access token, see https://the-guild.dev/graphql/hive/docs/management/targets#registry-access-tokens",
        name: "MissingRegistryTokenError",
      },
    },
    {
      example: "hive artifact:fetch --artifact sdl",
      fix: 'A CDN key can be set using the argument "--cdn.accessToken" or config file "hive.json". For help generating a CDN key, see https://the-guild.dev/graphql/hive/docs/management/targets#cdn-access-tokens',
      instance: {
        code: "104",
        message:
          "A CDN key is required to perform the action. For help generating a CDN key, see https://the-guild.dev/graphql/hive/docs/management/targets#cdn-access-tokens",
        name: "MissingCdnKeyError",
      },
    },
    {
      example: "hive schema:delete --registry.endpoint= foo-service",
      fix: 'A registry endpoint is used when self hosting Hive, otherwise, use the default. The registry endpoint can be set using the environment variable "HIVE_REGISTRY", or argument "--registry.endpoint".',
      instance: {
        code: "105",
        message: "A registry endpoint is required to perform the action.",
        name: "MissingEndpointError",
      },
    },
    {
      example: "HIVE_TOKEN=badtoken hive schema:fetch",
      fix: 'A registry token can be set using the environment variable "HIVE_TOKEN", argument "--registry.accessToken", or config file "hive.json". For help generating a token, see https://the-guild.dev/graphql/hive/docs/management/targets#registry-access-tokens',
      instance: {
        code: "106",
        message:
          "A valid registry token is required to perform the action. The registry token used does not exist or has been revoked.",
        name: "InvalidRegistryTokenError",
      },
    },
    {
      example: "hive artifact:fetch --artifact sdl",
      fix: 'A CDN key can be set using the argument "--cdn.accessToken" or config file "hive.json". For help generating a CDN key, see https://the-guild.dev/graphql/hive/docs/management/targets#cdn-access-tokens',
      instance: {
        code: "107",
        message:
          "A valid CDN key is required to perform the action. The CDN key used does not exist or has been revoked.",
        name: "InvalidCdnKeyError",
      },
    },
    {
      example: "HIVE_CDN_ENDPOINT='' hive artifact:fetch",
      fix: 'A registry endpoint is used when self hosting Hive, otherwise, use the default. This error can happen if the CDN endpoint is set to an empty string. To set the CDN endpoint, use the argument "--cdn.endpoint" or environment variable "HIVE_CDN_ENDPOINT"',
      instance: {
        code: "108",
        message: "A CDN endpoint is required to perform the action.",
        name: "MissingCdnEndpointError",
      },
    },
    {
      example:
        "GITHUB_REPOSITORY='' hive schema:publish --author=username --commit=sha",
      fix: "If using the github integration, then a github repository must be set. This is provided by the default Github workflow and typically does not need manually set. For more information about the Github integration, see https://the-guild.dev/graphql/hive/docs/other-integrations/ci-cd",
      instance: {
        code: "109",
        message:
          "Missing required environment variable:\nGITHUB_REPOSITORY  Github repository full name, e.g. graphql-hive/console",
        name: "MissingEnvironmentError",
      },
    },
    {
      example: "hive schema:check FILE",
      fix: "Verify the file path is correct. For help generating a schema file, see your implemented GraphQL library's documentation.",
      instance: {
        code: "200",
        message: 'Error reading the schema file "${fileName}"',
        name: "SchemaFileNotFoundError",
      },
    },
    {
      example: "hive schema:check schema.graphql",
      fix: "Verify the file path and file contents are correct. For help generating a schema file, see your implemented GraphQL library's documentation.",
      instance: {
        code: "201",
        message: 'The schema file "schema.graphql" is empty.',
        name: "SchemaFileEmptyError",
      },
    },
    {
      example: "hive schema:check FILE --github",
      fix: "Make sure the command is called within a valid git repository directory or the '--commit' parameter is provided with a non-empty value.",
      instance: {
        code: "110",
        message:
          "Couldn't resolve required commit sha. Provide a non-empty author via the '--commit' parameter or execute the command within a git repository.",
        name: "CommitRequiredError",
      },
    },
    {
      example: "hive schema:check FILE --github",
      fix: "Make sure the command is called within a valid git repository directory. See https://the-guild.dev/graphql/hive/docs/management/organizations#github for more details about this integration.",
      instance: {
        code: "111",
        message:
          "Couldn't resolve git repository required for GitHub Application.",
        name: "GithubRepositoryRequiredError",
      },
    },
    {
      example: "hive schema:check FILE --github",
      fix: "Make sure the command is called within a valid git repository directory or the '--author' parameter is provided with a non-empty value.",
      instance: {
        code: "112",
        message:
          "Couldn't resolve required commit author. Provide a non-empty author via the '--author' parameter or execute the command within a git repository.",
        name: "AuthorRequiredError",
      },
    },
    {
      example: "hive schema:publish schema.graphql",
      fix: 'The schema failed checks during publish. If this is an older project, you may still be able to publish using the "--force" flag. "--force" is enabled by default for new projects. For more details about the schema registry behavior, see https://the-guild.dev/graphql/hive/docs/schema-registry',
      instance: {
        code: "300",
        message: "Schema publish failed.",
        name: "SchemaPublishFailedError",
      },
    },
    {
      example: "hive schema:fetch",
      fix: "Check your network connection and verify the value if using a custom CDN or registry endpoint. If the error status is >= 500, then there may be an issue with the Hive servers. Check the Hive service status for available details https://status.graphql-hive.com/ and if the issue persists then contact The Guild support.",
      instance: {
        code: "113",
        message:
          'A server error occurred while performing the action. A call to "${endpoint}" failed with Status: 500, Text: Server Unavailable.',
        name: "HTTPError",
      },
    },
    {
      example: "hive schema:fetch",
      fix: "Check your network connection and verify the value if using a custom CDN or registry endpoint. Confirm that your network settings allow outbound traffic to Hive's domain.",
      instance: {
        code: "114",
        message:
          'A network error occurred while performing the action: "${cause instanceof Error ? `${cause.name}: ${cause.message}` : cause}"',
        name: "NetworkError",
      },
    },
    {
      example: "hive schema:check --service foo schema.graphql",
      fix: "The operation was executed but an error response was returned from the API call. Follow the recommendation in the returned error message.",
      instance: {
        code: "115",
        message: 'Something went wrong. (Request ID: "12345678")',
        name: "APIError",
      },
    },
    {
      example:
        "hive dev --remote --service reviews --url http://localhost:3001/graphql",
      fix: 'Schema contents are required to perform composition. Either the URL provided must respond to to the request: "query { _service { sdl } }" to provide its schema, or a the SDL can be provided locally using the "--schema" argument.',
      instance: {
        code: "116",
        message:
          "Could not get introspection result from the service. Make sure introspection is enabled by the server.",
        name: "IntrospectionError",
      },
    },
    {
      example: "hive schema:publish schema.graphql",
      fix: "There is a syntax error in the SDL. Correct the syntax error mentioned and try again. If there are multiple syntax errors, only one may be mentioned at a time.",
      instance: {
        code: "301",
        message:
          "The SDL is not valid at line 0, column 1:\n Unexpected token '{'",
        name: "InvalidSDLError",
      },
    },
    {
      example: "hive schema:publish schema.graphql --url https://foo.service",
      fix: "A service name and url are required when publishing a subgraph schema.",
      instance: {
        code: "302",
        message:
          'The schema failed to publish. Please use the "--service <name>" parameter.',
        name: "SchemaPublishMissingServiceError",
      },
    },
    {
      example: "hive schema:publish schema.graphql --service foo",
      fix: "A service name and url are required when publishing a subgraph schema.",
      instance: {
        code: "303",
        message:
          'The schema failed to publish. Please use the "--url <url>" parameter.',
        name: "SchemaPublishMissingUrlError",
      },
    },
    {
      example: "hive operations:check operations/*.gql",
      fix: "Operations must be valid graphql. Address the operation syntax errors and then try again.",
      instance: {
        code: "700",
        message: "Invalid operation syntax:\n - [reason]",
        name: "InvalidDocumentsError",
      },
    },
    {
      example:
        "hive dev \n--service reviews --url http://localhost:3001/graphql \n--service products",
      fix: 'Composition requires a service and url pair per subgraph. Make sure both are provided for every subgraph using the "--service" and "--url" arguments. ',
      instance: {
        code: "600",
        message:
          "Not every services has a matching url. Got 2 services and 1 url.",
        name: "ServiceAndUrlLengthMismatch",
      },
    },
    {
      example:
        "hive dev \n--service reviews --url http://localhost:3001/graphql \n--service products --url http://localhost:3002/graphql",
      fix: "The provided schemas are not composable. This means that there are conflicting types between the two subgraphs. Review the provided reason to help determine the best path forward for the subgraph(s).",
      instance: {
        code: "601",
        message: "Local composition failed:\n[reason]",
        name: "LocalCompositionError",
      },
    },
    {
      example:
        "hive dev --remote\n--service reviews --url http://localhost:3001/graphql \n--service products --url http://localhost:3002/graphql",
      fix: "The provided schemas are not composable. This means that there are conflicting types between the two subgraphs. Review the provided reason to help determine the best path forward for the subgraph(s).",
      instance: {
        code: "602",
        message: "Remote composition failed:\nDetected 1 error\n- [reason]",
        name: "RemoteCompositionError",
      },
    },
    {
      example:
        "hive dev --remote\n--service reviews --url http://localhost:3001/graphql \n--service products --url http://localhost:3002/graphql",
      fix: "Composition passed but the resulting supergraph SDL was invalid. If using an external schema composer, verify the logic and make sure the version of federation being used is supported by Hive.",
      instance: {
        code: "603",
        message: "Composition resulted in an invalid supergraph: [supergraph]",
        name: "InvalidCompositionResultError",
      },
    },
    {
      example: "hive app:create --name ios --version 1.0.0 operations.json",
      fix: "The operations JSON could not be parsed and validated. Check for and address any syntax errors in this file.",
      instance: {
        code: "400",
        message: 'Persisted Operations file "operations.json" is malformed.',
        name: "PersistedOperationsMalformedError",
      },
    },
    {
      example: "hive introspect LOCATION --write schema.foo",
      fix: 'The file extension indicates the format to write. Try specifying one of the supported formats. Use "hive [command] help" for more information about the command\'s input.',
      instance: {
        code: "117",
        message: 'Got unsupported file extension: ".foo"',
        name: "UnsupportedFileExtensionError",
      },
    },
    {
      example: "hive app:create undefined",
      fix: "The file specified does not exist or cannot be read. Check that the path is correct.",
      instance: {
        code: "118",
        message: 'Failed to load file "undefined"',
        name: "FileMissingError",
      },
    },
    {
      example: "hive app:create schema.json",
      fix: "The file specified may not be valid JSON. Check that the file specified is correct and valid.",
      instance: {
        code: "119",
        message:
          'File "schema.json" could not be parsed. Please make sure the file is readable and contains a valid [expectedFormat].',
        name: "InvalidFileContentsError",
      },
    },
    {
      example: "hive schema:fetch --registry.accessToken=*** 12345",
      fix: "The actionId does not have a schema associated with it. Verify the action ID or do not provide an action ID to fetch the latest version.",
      instance: {
        code: "500",
        message: "No schema found.",
        name: "SchemaNotFoundError",
      },
    },
    {
      example: "hive schema:fetch --registry.accessToken=*** 12345",
      fix: "The action ID is associated with an invalid schema. Try another action ID.",
      instance: {
        code: "501",
        message: "Schema is invalid.",
        name: "InvalidSchemaError",
      },
    },
    {
      example: "hive schema:fetch --registry.accessToken=*** 12345",
      fix: "An issue occurred during execution that was not expected. Enable DEBUG=* to view debug logs which may provide more insight into the cause.",
      instance: {
        code: "199",
        message:
          "An unexpected error occurred: ${message}\n> Enable DEBUG=* for more details.",
        name: "UnexpectedError",
      },
    },
  ];
  return examples
    .sort((a, b) => a.instance.code?.localeCompare(b.instance.code!) ?? 0)
    .map(
      (e): CLIError => ({
        code: e.instance.code ?? "n/a",
        example: e.example,
        exampleOutput: e.instance.message,
        fix: e.fix,
        title: e.instance.name.replaceAll(/([a-z])([A-Z])/g, "$1 $2"),
      }),
    );
}

export function CLIErrorsSection() {
  const cliErrors = getErrorDescriptions();
  return (
    <>
      {cliErrors.map((item) => (
        <ErrorDetails key={item.code} {...item} />
      ))}
    </>
  );
}
