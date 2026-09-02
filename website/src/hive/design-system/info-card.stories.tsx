import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { AccountBox } from "./icons";
import { InfoCard, InfoCardProps } from "./info-card";

export default {
  title: "Components/InfoCard",
  component: InfoCard,
  decorators: [hiveThemeDecorator],
  argTypes: {
    scheme: {
      control: {
        type: "select",
      },
      options: ["neutral", "green"],
    },
  },
} satisfies Meta<InfoCardProps>;

export const Default: StoryObj<InfoCardProps.InfoCardInertProps> = {
  args: {
    icon: <AccountBox />,
    as: "div",
    heading: "Customizable User Roles and Permissions",
    children:
      "Control user access with detailed, role-based permissions for enhanced security and flexibility.",
  },
};

export const Link: StoryObj<InfoCardProps.InfoCardLinkProps> = {
  args: {
    icon: <AccountBox />,
    href: "#",
    heading: "Customizable User Roles and Permissions",
    children:
      "Control user access with detailed, role-based permissions for enhanced security and flexibility.",
  },
};
