import React from "react";
import { StoryContext } from "@storybook/react";
import { ArrowIcon } from "@hive/design-system/icons";
import { hiveThemeDecorator } from "./hive-theme-decorator";

export function designSystemDocsDecorator(
  Story: () => React.ReactNode,
  ctx: StoryContext,
) {
  return hiveThemeDecorator(
    () => (
      <div className="h-screen overflow-auto bg-white p-8 text-green-1000 xl:p-16 dark:bg-green-1000 dark:text-white">
        <header className="flex flex-row items-center text-5xl tracking-[-0.288px]">
          <HiveIconMark className="mr-6" />
          <p>Core Elements</p>
          <ArrowIcon className="mx-4 shrink font-medium" />
          <h1 className="font-medium">{ctx.title.split("/").pop()}</h1>
          <p className="ml-auto text-sm leading-6 tracking-[-0.084px]">Hive</p>
        </header>
        <hr className="my-6 border-t border-t-beige-200" />
        <section className="flex flex-col xl:px-6">
          <Story />
        </section>
      </div>
    ),
    ctx,
  );
}

function HiveIconMark(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" {...props}>
      <rect width="80" height="80" rx="16" fill="url(#paint0_linear_630_754)" />
      <path
        d="M48.4021 19H31.5979L19 31.5979V48.4021L31.5979 61H48.4021L61 48.4021V31.5979L48.4021 19ZM58.3178 42.291L42.2894 58.3194C41.0244 59.5844 38.9739 59.5844 37.709 58.3194L21.6822 42.291C20.4172 41.0261 20.4172 38.9755 21.6822 37.7106L37.709 21.6822C38.9739 20.4172 41.0244 20.4172 42.2894 21.6822L58.3178 37.7106C59.5828 38.9755 59.5828 41.0261 58.3178 42.291Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_630_754"
          x1="40"
          y1="0"
          x2="40"
          y2="80"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#217164" />
          <stop offset="1" stopColor="#08594E" />
        </linearGradient>
      </defs>
    </svg>
  );
}
