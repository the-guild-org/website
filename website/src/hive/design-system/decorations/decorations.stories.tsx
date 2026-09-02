import { Meta, StoryObj } from "@storybook/react";
import {
  ArchDecoration,
  ArchDecorationGradientDefs,
  DecorationIsolation,
  HighlightDecoration,
  LargeHiveIconDecoration,
} from "./index";

const meta: Meta = {
  title: "Components/Decorations",
  component: ArchDecoration,
  decorators: [
    (Story) => (
      <div className="h-screen bg-green-1000">
        <DecorationIsolation>
          <Story />
        </DecorationIsolation>
      </div>
    ),
  ],
};

export default meta;

export const ArchDecorationStory: StoryObj<typeof ArchDecoration> = {
  name: "ArchDecoration",
  render(args) {
    return (
      <>
        <ArchDecorationGradientDefs />
        <ArchDecoration {...args} />
      </>
    );
  },
};

export { HighlightDecoration, LargeHiveIconDecoration };
