import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { CallToAction, CallToActionProps } from "./call-to-action";

export default {
  title: "Components/CallToAction",
  component: CallToAction,
  decorators: [hiveThemeDecorator],
  args: {
    children: "Click me",
    onClick: () => alert("Clicked!"),
  },
  argTypes: {
    as: {
      control: "select",
      options: [undefined, "span", "div"],
    },
    variant: {
      control: "select",
      options: [
        "primary",
        "primary-inverted",
        "secondary",
        "secondary-inverted",
        "tertiary",
      ],
    },
  },
  parameters: {
    padding: true,
  },
} satisfies Meta<CallToActionProps>;

export const Primary: StoryObj<CallToActionProps> = {
  args: {
    variant: "primary",
  },
};

export const PrimaryInverted: StoryObj<CallToActionProps> = {
  args: {
    variant: "primary-inverted",
  },
};

export const Secondary: StoryObj<CallToActionProps> = {
  args: {
    variant: "secondary",
  },
};

export const SecondaryInverted: StoryObj<CallToActionProps> = {
  args: {
    variant: "secondary-inverted",
  },
};

export const Tertiary: StoryObj<CallToActionProps> = {
  args: {
    variant: "tertiary",
  },
};

export const AsSpan: StoryObj<CallToActionProps> = {
  args: {
    as: "span",
    children: "Show More",
    onClick: () => {
      // no alert
    },
  },
  decorators: [
    (Story: React.FC) => (
      <details>
        <summary className="list-none pb-4">
          <Story />
        </summary>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </details>
    ),
  ],
};

export const Link: StoryObj<CallToActionProps> = {
  args: {
    href: "https://the-guild.dev/graphql/hive/ecosystem",
    children: "Explore the Ecosystem",
    variant: "secondary-inverted",
  },
};

export const Submit: StoryObj<CallToActionProps> = {
  args: {
    type: "submit",
    children: "Submit",
  },
};
