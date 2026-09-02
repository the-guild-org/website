import { Meta, StoryObj } from "@storybook/react";
import { designSystemDocsDecorator } from "../__storybook__/design-system-docs-decorator";
import { Heading, HeadingProps } from "../heading";

export default {
  title: "Design System/Typography",
  decorators: [designSystemDocsDecorator],
} satisfies Meta;

export const Typography: StoryObj = {
  render() {
    return (
      <div className="flex flex-col gap-6">
        <h1 className="my-6 text-2xl font-medium">Heading</h1>
        {(["xl", "lg", "md", "sm"] satisfies HeadingProps["size"][]).map(
          (size) => (
            <>
              <hr />
              <p className="text-sm font-medium uppercase tracking-[0.84px] text-[#525866]">
                heading {size}
              </p>
              <Heading key={size} size={size} as="h1">
                Open-source GraphQL management platform
              </Heading>
            </>
          ),
        )}
      </div>
    );
  },
};
