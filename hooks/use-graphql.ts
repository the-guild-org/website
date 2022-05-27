import { useState, useCallback } from 'react';

type GraphQLResult<TResult> = {
  complete: boolean;
  loading: boolean;
  error?: string;
  data?: {
    data: TResult;
  };
};

const ENDPOINT_URL = 'https://guild-ms-slack-bot.vercel.app/api/graphql';

const DEFAULT_STATE = {
  complete: false,
  loading: false,
  error: null,
  data: null,
};

export function useMutation<TResult, TVariables = Record<string, unknown>>(
  query: string
): [GraphQLResult<TResult>, (variables: TVariables) => void] {
  const [state, setState] = useState<GraphQLResult<TResult>>(DEFAULT_STATE);

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState({ ...DEFAULT_STATE, loading: true });

      const response = await fetch(ENDPOINT_URL, {
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({ query, variables }),
      });

      try {
        const data = await response.json();
        if (data.errors) {
          throw new Error('Try Again');
        }

        setState({
          ...DEFAULT_STATE,
          complete: true,
          data,
        });
      } catch (error) {
        setState({
          ...DEFAULT_STATE,
          complete: true,
          error: error.toString ? error.toString() : error,
        });
      }
    },
    [query]
  );

  return [state, mutate];
}
