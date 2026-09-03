import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "./__storybook__/hive-theme-decorator";
import { PRODUCTS_MENU_LIST } from "./products";

export default {
  title: "Components/PRODUCTS_MENU_LIST",
  component: () => null,
  decorators: [hiveThemeDecorator],
  parameters: {
    padding: true,
  },
} satisfies Meta;

export const Default: StoryObj = {
  name: "PRODUCTS_MENU_LIST",
  render() {
    return (
      <div className="flex flex-col gap-2">
        {Object.values(PRODUCTS_MENU_LIST).map((product) => product.title)}
      </div>
    );
  },
};
