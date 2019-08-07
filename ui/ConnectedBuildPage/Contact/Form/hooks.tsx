import { useState, useCallback } from 'react';
import fetchPonyfill from 'fetch-ponyfill';

const { fetch } = fetchPonyfill();

interface GraphQLResult<TResult> {
  loading: boolean;
  data?: {
    data: TResult;
  };
}

export function useMutation<TResult, TVariables = {}>(
  query: string,
): [GraphQLResult<TResult>, (variables: TVariables) => void] {
  const [state, setState] = useState<GraphQLResult<TResult>>({
    loading: false,
    data: null,
  });

  const mutate = useCallback(
    (variables: TVariables) => {
      setState({
        loading: true,
        data: null,
      });

      fetch('https://connected-build.now.sh/api/graphql', {
        mode: 'no-cors',
        cache: 'no-cache',
        method: 'POST',
        body: JSON.stringify({
          query,
          variables,
        }),
      })
        .then(data => {
          console.log('done');
          console.log(data);
        })
        .catch(e => {
          console.error(e);
        });
    },
    [query],
  );

  return [state, mutate];
}
