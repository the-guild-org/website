import React from "react";
import {
  createBrowserHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { useDarkMode } from "storybook-dark-mode";
import { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "./global.css";

export const parameters: Preview["parameters"] = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      method: "alphabetical",
      order: ["Components", ["Headers"], "Projects"],
    },
  },
  darkMode: {
    dark: themes.dark,
    light: themes.light,
    classTarget: "html",
  },
  // Remove padding from storybook in mobile
  layout: "fullscreen",
};

export const decorators: Preview["decorators"] = [
  (Story) => {
    const theme = useDarkMode() ? "dark" : "light";
    const router = React.useMemo(() => {
      const routeTree = createRootRoute({
        component: Story,
      });

      return createRouter({
        basepath: globalThis.location.pathname,
        history: createBrowserHistory(),
        routeTree,
      });
    }, [Story]);

    return (
      <ThemeProvider attribute="class" forcedTheme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    );
  },
];
