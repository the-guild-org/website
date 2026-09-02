import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { RightCornerIcon } from "./icons";
import { Stud, StudProps } from "./stud";

export default {
  title: "Components/Stud",
  component: Stud,
  decorators: [hiveThemeDecorator],
} satisfies Meta<StudProps>;

export const Default: StoryObj<StudProps> = {
  name: "Stud",
  args: {
    children: <RightCornerIcon />,
  },
};
