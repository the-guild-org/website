import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import {
  ExploreMainProductCards,
  ExploreMainProductCardsProps,
} from "./explore-main-product-cards";

export default {
  title: "Hive/ExploreMainProductCards",
  component: ExploreMainProductCards,
  decorators: [hiveThemeDecorator],
  parameters: {
    forcedLightMode: true,
  },
} satisfies Meta;

export const Default: StoryObj<ExploreMainProductCardsProps> = {
  name: "ExploreMainProductCards",
};
