import { ComponentProps } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { ModulesLogo } from "../logos";
import { CallToAction } from "../call-to-action";
import { GitHubIcon, HiveGatewayIcon } from "../icons";
import { Hero, HeroDecorationFromLogo, HeroLogo } from "./index";

export default {
  title: "Hive/Hero",
  component: Hero,
  decorators: [hiveThemeDecorator],
  argTypes: {
    className: {
      name: "className",
    },
    heading: {
      name: "Heading text",
    },
    checkmarks: {
      name: "Checkmarks text",
    },
    text: {
      name: "Hero text",
    },
  },
  parameters: {
    padding: true,
    forcedLightMode: true,
  },
} satisfies Meta<ComponentProps<typeof Hero>>;

export const Default: StoryObj<ComponentProps<typeof Hero>> = {
  args: {
    heading: "Enterprise Grade Tooling for Your GraphQL Server",
    text: "GraphQL Modules is a toolset of libraries and guidelines dedicated to create reusable, maintainable, testable and extendable modules out of your GraphQL server.",
    top: (
      <HeroLogo>
        <HiveGatewayIcon />
      </HeroLogo>
    ),
    checkmarks: ["Fully open source", "No vendor lock"],
    children: (
      <>
        <CallToAction variant="primary-inverted" href="/docs">
          Get started
        </CallToAction>
        <CallToAction variant="secondary-inverted" href="/changelog">
          Changelog
        </CallToAction>
        <CallToAction
          variant="tertiary"
          href="https://github.com/Urigo/graphql-modules"
        >
          <GitHubIcon className="size-6" />
          GitHub
        </CallToAction>
        <HeroDecorationFromLogo logo={<ModulesLogo />} />
      </>
    ),
  },
};
