import { useState, useCallback } from 'react';
import fetchPonyfill from 'fetch-ponyfill';

const { fetch } = fetchPonyfill();

interface GraphQLResult<TResult> {
  complete: boolean;
  loading: boolean;
  error?: string;
  data?: {
    data: TResult;
  };
}

const endpoint = '/api/graphql';

export function useMutation<TResult, TVariables = {}>(
  query: string
): [GraphQLResult<TResult>, (variables: TVariables) => void] {
  const [state, setState] = useState<GraphQLResult<TResult>>({
    complete: false,
    loading: false,
    error: null,
    data: null,
  });

  const mutate = useCallback(
    (variables: TVariables) => {
      setState({
        complete: false,
        loading: true,
        data: null,
        error: null,
      });

      fetch(endpoint, {
        mode: 'no-cors',
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({
          query,
          variables,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.errors) {
            return Promise.reject(new Error('Try Again'));
          }

          setState({
            complete: true,
            loading: false,
            error: null,
            data,
          });
        })
        .catch((error) => {
          setState({
            complete: true,
            loading: false,
            data: null,
            error: error.toString ? error.toString() : error,
          });
        });
    },
    [query]
  );

  return [state, mutate];
}
