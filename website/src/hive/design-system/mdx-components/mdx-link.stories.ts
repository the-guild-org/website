import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { MDXLink, MDXLinkProps } from "./mdx-link";

export default {
  title: "Components/MDXLink",
  component: MDXLink,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
  },
} satisfies Meta<MDXLinkProps>;

export const Default: StoryObj<MDXLinkProps> = {
  args: {
    href: "https://the-guild.dev/graphql/stitching",
    children: "Schema stitching",
  },
};
