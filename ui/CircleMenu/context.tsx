import React, { useState, useMemo, useCallback } from 'react';

type SetTextFn = (text: string) => void;
type ResetFn = () => void;

interface MenuContextValue {
  text: string;
  setText: SetTextFn;
  resetText: ResetFn;
}

const defaults = {
  text: 'The Guild',
};

export const MenuContext = React.createContext<MenuContextValue>({
  ...defaults,
  setText: () => {},
  resetText: () => {},
});

export const MenuProvider: React.FunctionComponent = ({ children }) => {
  const [text, setText] = useState(defaults.text);
  
  const updateText = useCallback((text: string) => {
    if (text) {
      setText(text);
    }
  }, [setText]);

  const resetText = useCallback(() => {
    setText(defaults.text)
  }, [setText]);

  const value = useMemo(() => {
    return {
      text,
      setText: updateText,
      resetText,
    };
  }, [text, updateText, resetText]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
