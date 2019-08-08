import { useState, useCallback } from 'react';

export function useToggle(initValue: boolean): [boolean, () => void] {
  const [state, setState] = useState(initValue);
  const toggle = useCallback(() => {
    setState(!state);
  }, [state, setState]);

  return [state, toggle];
}
