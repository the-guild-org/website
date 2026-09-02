"use client";

import type { Type } from "arktype";

/**
 * Hook for client components to access frontmatter.
 * TODO: Needs TanStack Start implementation
 *
 * @param schema - An arktype schema to validate the frontmatter
 * @returns The validated frontmatter data
 */
export function useFrontmatter<T>(schema: Type<T>): T {
  // TODO: useConfig needs to be implemented for TanStack Start
  // The original implementation used nextra-theme-docs useConfig()
  // to get frontmatter from the page context.
  //
  // For TanStack Start, this should:
  // 1. Get frontmatter from route loader data or context
  // 2. Validate with arktype schema
  // 3. Return typed data
  //
  // Example future implementation:
  // const { frontmatter } = useRouteContext()
  // const result = schema(frontmatter)
  // if (result instanceof type.errors) {
  //   throw new Error(`Invalid frontmatter: ${result.summary}`)
  // }
  // return result

  void schema; // suppress unused warning
  throw new Error("useFrontmatter not yet implemented for TanStack Start");
}
