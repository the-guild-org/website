import { StoryContext } from "@storybook/react";
import React from "react";

import { cn } from "../cn";

export const hiveThemeDecorator = (
  Story: () => React.ReactNode,
  ctx: StoryContext,
) => {
  return (
    <>
      <div
        className={cn(
          "text-green-1000",
          ctx.parameters["forcedLightMode"] ? "light" : "dark:text-white",
        )}
        data-hive-theme-decorator
        style={{
          backgroundColor: ctx.parameters["forcedLightMode"] ? "white" : "",
          fontFamily: "var(--font-sans)",
          padding:
            ctx.parameters["padding"] === true
              ? "2rem"
              : ctx.parameters["padding"],
        }}
      >
        <Story />
        <style>{`
        :root, .light {
          --nextra-bg: 255, 255, 255;
          --nextra-primary-hue: 191deg;
          --nextra-primary-saturation: 40%;
        }
        .dark {
          --nextra-primary-hue: 67.1deg;
          --nextra-primary-saturation: 100%;
          --nextra-bg: 17, 17, 17;
        }
      `}</style>
      </div>
      {ctx.parameters["forcedLightMode"] && (
        <small className="absolute right-2 top-2 hidden text-[10px] text-black dark:block">
          forced light mode
        </small>
      )}
    </>
  );
};
