"use client";

import { useTheme } from "next-themes";
import { FC, ReactNode } from "react";

export const ThemeSwitcherButton: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      className="self-center rounded-xs p-2 outline-hidden focus-visible:ring-3"
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
    >
      {children}
    </button>
  );
};
