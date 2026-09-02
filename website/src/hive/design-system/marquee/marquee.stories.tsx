import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { Marquee, MarqueeProps, MarqueeRows, MarqueeRowsProps } from "./index";

export default {
  title: "Components/Marquee",
  component: Marquee,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
  },
  argTypes: {
    pauseOnHover: {
      type: "boolean",
    },
  },
} satisfies Meta<MarqueeProps>;

export const SingleRow: StoryObj<MarqueeProps> = {
  render: (props) => <Marquee className="w-[600px] max-w-full" {...props} />,
  args: {
    direction: "right",
    children: [
      "This text will scroll from left to right",
      "This text too",
      "And this one",
      "Have a great day!",
    ].map((text, i) => (
      <span
        className="rounded-lg bg-beige-100 px-2 py-1 dark:bg-beige-900/25"
        key={i}
      >
        {text}
      </span>
    )),
  },
};

const ENVELOP_PLUGINS: { title: string; href: `https://${string}` }[] = [
  {
    title: "useSentry",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/sentry",
  },
  {
    title: "useStatsD",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/statsd",
  },
  {
    title: "useSchema",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useSchemaByContext",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useValidationRule",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useErrorHandler",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useMaskedErrors",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useEngine",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useExtendContext",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useImmediateIntrospection",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/immediate-introspection",
  },
  {
    title: "useLogger",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "usePayloadFormatter",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/core",
  },
  {
    title: "useGraphQLJit",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/graphql-jit",
  },
  {
    title: "useParserCache",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/parser-cache",
  },
  {
    title: "useValidationCache",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/validation-cache",
  },
  {
    title: "useDataLoader",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/dataloader",
  },
  {
    title: "useApolloTracing",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/apollo-tracing",
  },
  {
    title: "useApolloDataSources",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/apollo-datasources",
  },
  {
    title: "useOpenTelemetry",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/opentelemetry",
  },
  {
    title: "useGenericAuth",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/generic-auth",
  },
  {
    title: "useAuth0",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/auth0",
  },
  {
    title: "useGraphQLModules",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/graphql-modules",
  },
  {
    title: "useRateLimiter",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/rate-limiter",
  },
  {
    title: "useDisableIntrospection",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/disable-introspection",
  },
  {
    title: "useFilterAllowedOperations",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/filter-operation-type",
  },
  {
    title: "usePreloadAssets",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/preload-assets",
  },
  {
    title: "usePersistedOperations",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/persisted-operations",
  },
  {
    title: "useHive",
    href: "https://the-guild.dev/graphql/hive/docs/other-integrations/envelop",
  },
  {
    title: "useNewRelic",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/newrelic",
  },
  {
    title: "useLiveQuery",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/live-query",
  },
  {
    title: "useFragmentArguments",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/fragment-arguments",
  },
  {
    title: "useApolloServerErrors",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/apollo-server-errors",
  },
  {
    title: "useOperationFieldPermissions",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/operation-field-permissions",
  },
  {
    title: "useExtendedValidation",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/extended-validation",
  },
  {
    title: "usePrometheus",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/prometheus",
  },
  {
    title: "useContextValuePerExecuteSubscriptionEvent",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/execute-subscription-event",
  },
  {
    title: "useResourceLimitations",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/resource-limitations",
  },
  {
    title: "useResponseCache",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/response-cache",
  },
  {
    title: "useApolloFederation",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/apollo-federation",
  },
  {
    title: "maxAliasesPlugin",
    href: "https://escape.tech/graphql-armor/docs/plugins/max-aliases",
  },
  {
    title: "maxDepthPlugin",
    href: "https://escape.tech/graphql-armor/docs/plugins/max-depth",
  },
  {
    title: "maxDirectivesPlugin",
    href: "https://escape.tech/graphql-armor/docs/plugins/max-directives",
  },
  {
    title: "maxTokensPlugin",
    href: "https://escape.tech/graphql-armor/docs/plugins/max-tokens",
  },
  {
    title: "blockFieldSuggestions",
    href: "https://escape.tech/graphql-armor/docs/plugins/block-field-suggestions",
  },
  {
    title: "useInngest",
    href: "https://github.com/inngest/envelop-plugin-inngest",
  },
  {
    title: "useDepthLimit",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/depth-limit",
  },
  {
    title: "useGraphQLMiddleware",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/graphql-middleware",
  },
  {
    title: "useOnResolve",
    href: "https://github.com/n1ru4l/envelop/tree/main/packages/plugins/on-resolve",
  },
];

export const EnvelopPlugins: StoryObj<MarqueeRowsProps> = {
  render: (props) => (
    <MarqueeRows
      className="w-[800px] max-w-full rounded-2xl bg-green-1000 p-4"
      {...props}
    />
  ),
  args: {
    rows: 10,
    pauseOnHover: true,
    speed: "slow",
    children: ENVELOP_PLUGINS.map((plugin) => (
      <a
        key={plugin.title}
        href={plugin.href}
        target="_blank"
        rel="noreferrer"
        className="hive-focus rounded bg-green-900 px-2 py-1.5 text-[10px] text-green-600 transition hover:bg-green-800 hover:text-white sm:rounded-lg sm:px-4 sm:py-3 sm:text-sm"
      >
        {plugin.title}
      </a>
    )),
  },
};
