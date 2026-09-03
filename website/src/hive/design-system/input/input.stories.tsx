import { useArgs } from "@storybook/preview-api";
import { Meta, StoryObj } from "@storybook/react";
import { Input, InputProps } from ".";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";

export default {
  title: "Components/Input",
  component: Input,
  argTypes: {
    severity: {
      control: "select",
      options: ["critical", "warning", "positive", undefined],
    },
    message: {
      control: "text",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
    disabled: {
      control: "boolean",
    },
    required: {
      control: "boolean",
    },
  },
  parameters: {
    padding: true,
  },
  decorators: [
    hiveThemeDecorator,
    (Story: React.FC) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<InputProps>;

export const Default: StoryObj<InputProps> = {
  args: {
    placeholder: "Email",
    type: "text",
  },
};

export const Critical: StoryObj<InputProps> = {
  args: {
    severity: "critical",
    message: "Please enter a valid email address",
    type: "email",
    value: "+48 222 500 151",
  },
  render: () => {
    const [args, update] = useArgs<InputProps>();

    return (
      <Input
        {...args}
        onChange={(event) => {
          if (
            event.target.value
              .toString()
              .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
          ) {
            update({ severity: undefined, message: undefined });
          } else {
            update({
              severity: "critical",
              message: "Please enter a valid email address",
            });
          }

          update({ value: event.target.value });
        }}
      />
    );
  },
};

export const Warning: StoryObj<InputProps> = {
  args: {
    severity: "warning",
    message: "Weak password",
    type: "password",
    value: "1234",
  },
};

export const Positive: StoryObj<InputProps> = {
  args: {
    severity: "positive",
    message: "Very strong password",
    type: "password",
    value: "Wednesday, 2 April 2025, GraphQL will prevail!",
  },
};

export const Neutral: StoryObj<InputProps> = {
  args: {
    severity: "neutral",
    message: "Retrying...",
    type: "email",
    value: "contact@the-guild.dev",
  },
};

export const Disabled: StoryObj<InputProps> = {
  args: {
    disabled: true,
    placeholder: "Disabled input",
  },
};

export const Required: StoryObj<InputProps> = {
  args: {
    required: true,
    placeholder: "This should not be empty",
  },
};
