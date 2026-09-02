import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { VersionDropdown, VersionDropdownProps } from "./version-dropdown";

const decorator = (Story: React.FC<object>) => (
  <div className="flex items-center justify-center">
    <Story />
  </div>
);

export default {
  title: "Components/VersionDropdown",
  component: VersionDropdown,
  decorators: [hiveThemeDecorator, decorator],
} satisfies Meta<VersionDropdownProps>;

export const Default: StoryObj<VersionDropdownProps> = {
  name: "VersionDropdown",
  args: {
    currentVersion: "1.0.0",
    versions: [
      { value: "1.0.0", label: "Hive Docs 1.0.0", href: "/1.0.0" },
      { value: "1.1.0", label: "Hive Docs 1.1.0", href: "/1.1.0" },
    ],
  },
};
