import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { ArrowIcon } from "./icons";
import { TextLink, TextLinkProps } from "./text-link";

export default {
  title: "Components/TextLink",
  component: TextLink,
  decorators: [hiveThemeDecorator],
  args: {
    href: "#",
  },
} satisfies Meta;

export const WithUnderline: StoryObj<TextLinkProps> = {
  args: {
    children: "The Guild",
  },
};

export const WithArrow: StoryObj<TextLinkProps> = {
  args: {
    children: (
      <>
        Learn more
        <ArrowIcon />
      </>
    ),
  },
};
