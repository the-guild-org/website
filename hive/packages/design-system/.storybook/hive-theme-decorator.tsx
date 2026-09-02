import React from "react";
import { StoryContext } from "@storybook/react";
import { cn } from "@hive/design-system/cn";

export const hiveThemeDecorator = (
  Story: () => React.ReactNode,
  ctx: StoryContext,
) => {
  return (
    <>
      <div
        data-hive-theme-decorator
        className={cn(
          "text-green-1000",
          ctx.parameters.forcedLightMode ? "light" : "dark:text-white",
        )}
        style={{
          fontFamily: "var(--font-sans)",
          padding:
            ctx.parameters.padding === true ? "2rem" : ctx.parameters.padding,
          backgroundColor: ctx.parameters.forcedLightMode ? "white" : "",
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
      {ctx.parameters.forcedLightMode && (
        <small className="absolute right-2 top-2 hidden text-[10px] text-black dark:block">
          forced light mode
        </small>
      )}
    </>
  );
};
