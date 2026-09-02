import { Meta, StoryObj } from "@storybook/react";
import { ToolsAndLibrariesCards } from ".";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";

export default {
  title: "Hive/ToolsAndLibrariesCards",
  component: ToolsAndLibrariesCards,
  decorators: [hiveThemeDecorator],
  parameters: {
    forcedLightMode: true,
  },
} satisfies Meta;

export const Default: StoryObj<typeof ToolsAndLibrariesCards> = {
  name: "ToolsAndLibrariesCards",
};
