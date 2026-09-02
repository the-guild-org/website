import { Meta, StoryObj } from "@storybook/react";
import { hiveThemeDecorator } from "../__storybook__/hive-theme-decorator";
import { siteOrigin } from "../constants";
import { PRODUCTS } from "../products";
import { Anchor } from "../anchor";
import {
  CodegenIcon,
  GitHubIcon,
  PaperIcon,
  PencilIcon,
  RightCornerIcon,
  TargetIcon,
} from "../icons";
import { VersionDropdown } from "../version-dropdown";
import { GraphQLConfCard } from "./graphql-conf-card";
import {
  CompanyMenu,
  DeveloperMenu,
  EnterpriseMenu,
  HiveNavigation,
  HiveNavigationProps,
  ProductsMenu,
} from "./index";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";
import graphQLConfLocalImage from "./local-image-for-stories.png";

const HIVE_DEVELOPER_MENU: HiveNavigationProps["developerMenu"] = [
  {
    href: "/docs",
    icon: <PaperIcon />,
    children: "Documentation",
  },
  {
    href: "https://status.graphql-hive.com/",
    icon: <TargetIcon />,
    children: "Status",
  },
  {
    href: "/product-updates",
    icon: <RightCornerIcon />,
    children: "Product Updates",
  },
  {
    href: `${siteOrigin}/graphql/hive/blog`,
    icon: <PencilIcon />,
    children: "Blog",
  },
  {
    href: "https://github.com/dotansimha/graphql-code-generator",
    icon: <GitHubIcon />,
    children: "GitHub",
  },
];

export default {
  title: "Hive/HiveNavigation",
  component: HiveNavigation,
  decorators: [hiveThemeDecorator],
  args: {
    productName: "Hive",
    developerMenu: HIVE_DEVELOPER_MENU,
  },
} satisfies Meta<HiveNavigationProps>;

export const Default: StoryObj = {
  name: "HiveNavigation",
  decorators: [
    // to test sticky header
    (Story) => (
      <div className="h-[120vh] bg-gradient-to-b from-beige-500/15 to-transparent">
        <Story />
      </div>
    ),
  ],
  args: {
    developerMenu: HIVE_DEVELOPER_MENU,
    children: (
      <VersionDropdown
        currentVersion="1.x"
        versions={[
          { label: "Hive v1 Docs", href: "#v1", value: "1.x" },
          { label: "Hive v2 Docs", href: "#v2", value: "2.x" },
        ]}
      />
    ),
  },
};

export const NarrowMaxWidth: StoryObj = {
  ...Default,
  args: {
    className: "max-w-[75rem]",
  },
};

export const ForcedLightMode: StoryObj = {
  ...Default,
  decorators: [
    (Story) => (
      <div className="light" style={{ "--nextra-bg": "255 255 255" }}>
        <Story />
      </div>
    ),
  ],
};

export const BackgroundFromCSSProperty: StoryObj = {
  ...Default,
  decorators: [
    (Story) => (
      // eslint-disable-next-line tailwindcss/no-custom-classname
      <div className="background-vars">
        <style>{`
          .background-vars {
            --nextra-bg: 250 250 250;
          }
          .dark .background-vars {
            --nextra-bg: 30 30 30;
          }
        `}</style>
        <Story />
      </div>
    ),
  ],
};

export const Viewport: StoryObj = {
  render() {
    return (
      <NavigationMenu forceMount>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu Item</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ProductsMenu productName={PRODUCTS.CODEGEN.name} />
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    );
  },
  play(ctx) {
    ctx.canvasElement?.querySelector("button")?.click();
  },
};

export const Products: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <ProductsMenu productName={PRODUCTS.YOGA.name} />
      </NavigationMenu>
    );
  },
};

export const Developer: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <DeveloperMenu developerMenu={HIVE_DEVELOPER_MENU} />
      </NavigationMenu>
    );
  },
};

export const Enterprise: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <EnterpriseMenu />
      </NavigationMenu>
    );
  },
};

export const Company: StoryObj = {
  render() {
    return (
      <NavigationMenu>
        <CompanyMenu>
          <GraphQLConfCard image={graphQLConfLocalImage} />
        </CompanyMenu>
      </NavigationMenu>
    );
  },
};

export const CodegenNavmenu: StoryObj<HiveNavigationProps> = {
  ...Default,
  args: {
    navLinks: [
      {
        href: "/plugins",
        children: "Plugins",
      },
    ],
    developerMenu: [
      {
        href: "/docs",
        icon: <PaperIcon />,
        children: "Documentation",
      },
      {
        href: "https://the-guild.dev/graphql/hive/blog",
        icon: <PencilIcon />,
        children: "Blog",
      },
      {
        href: "https://github.com/dotansimha/graphql-code-generator",
        icon: <GitHubIcon />,
        children: "GitHub",
      },
    ],
    productName: PRODUCTS.CODEGEN.name,
    logo: (
      <Anchor
        href="/"
        className="hive-focus -m-2 flex items-center gap-3 rounded-md p-2"
      >
        <CodegenIcon className="size-8" />
        <span className="text-2xl font-medium tracking-[-0.16px]">Codegen</span>
      </Anchor>
    ),
  },
};
