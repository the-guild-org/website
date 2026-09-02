import { ComponentPropsWithoutRef } from "react";
import { Meta, StoryObj } from "@storybook/react";
import * as icons from "./index";

const meta: Meta = {
  title: "Components/Icons",
  component: () => null,
};

export default meta;

export const IconsGallery: StoryObj<
  ComponentPropsWithoutRef<typeof icons.CheckIcon>
> = {
  render() {
    return (
      <ul className="columns-[160px] space-y-2 p-4 [column-gap:0.5rem]">
        {Object.entries(icons).map(([name, Icon]) => (
          <li
            key={name}
            className="flex break-inside-avoid flex-col items-center rounded-md bg-beige-100 p-2"
          >
            <Icon className="size-6 text-green-1000" />
            <p className="mt-1 text-green-800">{name}</p>
          </li>
        ))}
      </ul>
    );
  },
};
