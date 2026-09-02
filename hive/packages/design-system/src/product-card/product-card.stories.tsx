import { Meta, StoryObj } from "@storybook/react";
import { ProductCard } from "..";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { PRODUCTS } from "../products";

export default {
  title: "Hive/ProductCard",
  component: ProductCard,
  decorators: [hiveThemeDecorator],
  parameters: {
    forcedLightMode: true,
  },
} satisfies Meta;

// interweaved to make sure main product cards look good alongside ancillary product cards
const productsLexicographically = Object.values(PRODUCTS).sort((a, b) =>
  a.name.localeCompare(b.name),
);

export const Default: StoryObj<typeof ProductCard> = {
  name: "ProductCard",
  render() {
    return (
      <ul className="mt-5 grid grid-cols-1 gap-5 overflow-x-auto p-4 last-of-type:mb-24 sm:grid-cols-4">
        {productsLexicographically.map((product) => (
          <ProductCard as="li" key={product.name} product={product} />
        ))}
      </ul>
    );
  },
};
