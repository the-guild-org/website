import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { CodegenIcon } from "../icons";
import { HiveFooter, HiveFooterProps } from "./index";

export default {
  title: "Hive/HiveFooter",
  component: HiveFooter,
  decorators: [hiveThemeDecorator],
  argTypes: {
    items: {
      resources: {
        name: "Resources Links",
        description: "Use this to add current site's links to the footer.",
      },
    },
    showSecurityBadges: {
      name: "Show Security Badges",
      description: "Show the security badges in the footer.",
    },
  },
} satisfies Meta<HiveFooterProps>;

export const Default: StoryObj<HiveFooterProps> = {
  name: "HiveFooter",
  args: {
    showSecurityBadges: true,
    items: {
      ...HiveFooter.DEFAULT_ITEMS,
      resources: [
        {
          children: "Privacy Policy",
          href: "https://the-guild.dev/graphql/hive/privacy-policy.pdf",
        },
        {
          children: "Terms of Use",
          href: "https://the-guild.dev/graphql/hive/terms-of-use.pdf",
        },
      ],
    },
  },
};

export const CodegenFooter: StoryObj<HiveFooterProps> = {
  ...Default,
  args: {
    logo: (
      <div className="flex items-center gap-3">
        <CodegenIcon className="size-8" />
        <span className="text-2xl/[1.2] font-medium tracking-[-0.16px]">
          Codegen
        </span>
      </div>
    ),
    description: "End-to-end type safety",
  },
};

export const WithoutSecurityBadges: StoryObj<HiveFooterProps> = {
  ...Default,
  args: {
    showSecurityBadges: false,
  },
};
