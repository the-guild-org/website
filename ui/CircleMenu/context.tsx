import React, { useState, useMemo } from 'react';

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
  const value = useMemo(() => {
    return {
      text,
      setText(text: string) {
        if (text) {
          setText(text);
        }
      },
      resetText() {
        setText(defaults.text);
      },
    };
  }, [text, setText]);

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};
