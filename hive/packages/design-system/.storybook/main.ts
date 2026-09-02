import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "storybook-dark-mode",
  ],
  typescript: {
    reactDocgen: false,
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: ["./public"],
  async viteFinal(config) {
    config.resolve ||= {};
    config.resolve.alias ||= {};
    config.plugins ||= [];

    const aliases = config.resolve.alias as Record<string, string>;

    // Resolve @hive/design-system to src
    aliases["@hive/design-system"] = path.resolve(process.cwd(), "src");

    // Resolve nextra/icons to local icons
    aliases["nextra/icons"] = path.resolve(process.cwd(), "src/icons");

    // Add Tailwind CSS plugin
    config.plugins.push(tailwindcss());

    return config;
  },
} satisfies StorybookConfig;
