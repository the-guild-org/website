import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import {
  ContactButton,
  ContactButtonProps,
  ContactTextLink,
  ContactTextLinkProps,
} from "./contact-us";

export default {
  title: "Components/ContactUs",
  component: ContactButton,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
  },
} satisfies Meta<ContactButtonProps>;

export const Default: StoryObj<ContactButtonProps> = {
  name: "ContactButton",
  args: {
    // `children` is optional
    children: "Contact us",
    variant: "secondary-inverted",
  },
};

export const TextLink: StoryObj<ContactTextLinkProps> = {
  name: "ContactTextLink",
  render: (args) => <ContactTextLink {...args} />,
  args: {
    children: "Reach out to us about the Enterprise plan",
  },
};
