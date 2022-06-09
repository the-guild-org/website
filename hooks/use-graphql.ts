import { useCallback } from 'react';
import { GraphQLError } from 'graphql';

const ENDPOINT_URL = 'https://guild-ms-slack-bot.vercel.app/api/graphql';

export function useMutation<TVariables = Record<string, unknown>>(
  query: string
): (variables: TVariables) => Promise<{ data: any; errors: GraphQLError[] }> {
  return useCallback(
    async (variables: TVariables) => {
      const response = await fetch(ENDPOINT_URL, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ query, variables }),
      });

      return response.json();
    },
    [query]
  );
}
