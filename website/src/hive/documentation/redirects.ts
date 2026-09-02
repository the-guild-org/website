/**
 * Redirects ported from the old hive-console Next.js docs setup.
 * Preserves old URLs so bookmarks and external links don't break.
 * (The rule shape matches nitro's NitroRouteRules, which the previous
 * deployment consumed directly.)
 */
interface RouteRule {
  redirect: { status: 301 | 302; to: string };
}

function redirect(destination: string, code: 301 | 302 = 301): RouteRule {
  return { redirect: { status: code, to: destination } };
}

export const routeRules: Record<string, RouteRule> = {
  // Legacy feature paths
  "/docs/access-tokens": redirect(
    "/docs/schema-registry/management/access-tokens",
  ),
  "/docs/features/alerts-notifications": redirect(
    "/docs/schema-registry/management/projects#alerts-and-notifications",
  ),
  "/docs/features/app-deployments": redirect(
    "/docs/schema-registry/app-deployments",
  ),
  "/docs/features/checking-schema": redirect(
    "/docs/schema-registry#check-a-schema",
  ),
  "/docs/features/delete-schema": redirect(
    "/docs/schema-registry#delete-a-service",
  ),
  "/docs/features/external-schema-composition": redirect(
    "/docs/schema-registry/external-schema-composition",
  ),
  "/docs/features/high-availability-cdn": redirect(
    "/docs/schema-registry/high-availability-cdn",
  ),
  "/docs/features/integrations": redirect(
    "/docs/schema-registry/management/organizations#integrations",
  ),
  "/docs/features/laboratory": redirect("/docs/schema-registry/laboratory"),
  "/docs/features/laboratory/**": redirect("/docs/schema-registry/laboratory"),
  "/docs/features/monitoring": redirect(
    "/docs/schema-registry/usage-reporting",
  ),
  "/docs/features/publish-schema": redirect(
    "/docs/schema-registry#publish-a-schema",
  ),
  "/docs/features/registry-usage": redirect(
    "/docs/schema-registry/high-availability-cdn",
  ),
  "/docs/features/schema-history": redirect(
    "/docs/schema-registry#schema-history-and-changelog",
  ),
  "/docs/features/schema-policy": redirect(
    "/docs/schema-registry/schema-policy",
  ),
  "/docs/features/schema-registry": redirect("/docs/schema-registry"),
  "/docs/features/sso-oidc-provider": redirect(
    "/docs/schema-registry/management/sso-oidc-provider",
  ),
  "/docs/features/tokens": redirect(
    "/docs/schema-registry/management/targets#manage-tokens",
  ),
  "/docs/features/usage-reporting": redirect(
    "/docs/schema-registry/usage-reporting",
  ),
  "/docs/management/sso-oidc-provider": redirect(
    "/docs/schema-registry/management/sso-oidc-provider",
  ),

  // Spec paths
  "/docs/specs/link-specifications": redirect(
    "/docs/api-reference/link-specifications",
  ),
  "/docs/specs/schema-reports": redirect(
    "/docs/api-reference/cli#publish-a-schema",
  ),
  "/docs/specs/usage-reports": redirect("/docs/api-reference/usage-reports"),

  // High-availability CDN (top level)
  "/docs/high-availability-cdn": redirect(
    "/docs/schema-registry/high-availability-cdn",
  ),

  // GraphQL API
  "/docs/graphql-api": redirect("/docs/api-reference/graphql-api"),
  "/docs/graphql-api/**": redirect("/docs/api-reference/graphql-api"),

  // Schema registry link specifications
  "/docs/schema-registry/link-specifications": redirect(
    "/docs/api-reference/link-specifications",
  ),

  // Management paths → schema-registry/management
  "/docs/management/**": redirect("/docs/schema-registry/management"),
  "/docs/management/contracts": redirect("/docs/schema-registry/contracts"),
  "/docs/management/external-schema-composition": redirect(
    "/docs/schema-registry/external-schema-composition",
  ),

  // Get started paths
  "/docs/get-started/**": redirect("/docs/schema-registry/get-started"),
  "/docs/get-started/organizations": redirect(
    "/docs/schema-registry/management/organizations",
  ),
  "/docs/get-started/projects": redirect(
    "/docs/schema-registry/management/projects",
  ),
  "/docs/get-started/targets": redirect(
    "/docs/schema-registry/management/targets",
  ),

  // Self-hosting
  "/docs/self-hosting": redirect(
    "/docs/schema-registry/self-hosting/get-started",
  ),
  "/docs/self-hosting/**": redirect("/docs/schema-registry/self-hosting"),
  "/docs/self-hosting/apollo-federation-2": redirect(
    "/docs/schema-registry/self-hosting/external-composition",
  ),
  "/docs/self-hosting/federation-2": redirect(
    "/docs/schema-registry/self-hosting/external-composition",
  ),

  // Dashboard
  "/docs/dashboard": redirect("/docs/schema-registry/usage-reporting"),
  "/docs/dashboard/explorer": redirect("/docs/schema-registry/explorer"),
  "/docs/dashboard/insights": redirect("/docs/schema-registry/usage-reporting"),
  "/docs/dashboard/laboratory/**": redirect("/docs/schema-registry/laboratory"),

  // Integrations
  "/docs/integrations": redirect("/docs/other-integrations"),
  "/docs/integrations/**": redirect("/docs/other-integrations"),

  // API reference
  "/docs/api-reference/gateway/cli": redirect(
    "/docs/api-reference/gateway-cli",
  ),

  // Use cases
  "/docs/use-cases/apollo-studio": redirect("/docs/use-cases/apollo-graphos"),

  // Gateway
  "/docs/gateway/deployment/node-frameworks": redirect(
    "/docs/gateway/deployment/runtimes/nodejs",
  ),
  "/docs/gateway/other-features/performance/deduplicate-request": redirect(
    "/docs/gateway/other-features/performance/deduplicate-inflight-requests",
  ),
  "/docs/gateway/other-features/router-runtime": redirect(
    "/docs/gateway/other-features/rust-query-planner",
  ),

  // Support pages moved after introducing coprocessors
  "/docs/router/configuration/graphiql": redirect(
    "/docs/router/configuration/laboratory",
  ),
  "/docs/router/guides/extending-the-router": redirect(
    "/docs/router/customizations",
  ),
  "/docs/router/plugin-system": redirect(
    "/docs/router/customizations/plugin-system",
  ),
  "/docs/router/plugin-system/execution-and-lifecycle": redirect(
    "/docs/router/customizations/plugin-system/execution-and-lifecycle",
  ),
  "/docs/router/plugin-system/hooks": redirect(
    "/docs/router/customizations/plugin-system/hooks",
  ),

  // Typo in old URL (linked from blog posts)
  "/docs/schema-registry/high-availability-resilence": redirect(
    "/docs/schema-registry/high-availability-resilience",
  ),

  // Product updates
  "/product-updates/2024-01-25-schema-contracts-for-federation": redirect(
    "/product-updates/2024-02-06-schema-contracts-for-federation",
  ),

  // Tag casing was unified to lowercase (content used both "DI" and "di")
  "/blog/tag/DI": redirect("/blog/tag/di"),
};
