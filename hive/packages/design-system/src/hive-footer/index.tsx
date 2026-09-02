import { ComponentType, ReactNode } from "react";

import { Anchor } from "../anchor";
import { cn } from "../cn";
import { siteOrigin } from "../constants";
import { ContactTextLink } from "../contact-us";
import {
  DiscordIcon,
  GitHubIcon,
  LinkedInIcon,
  TwitterIcon,
  YouTubeIcon,
} from "../icons/index";
import { HiveCombinationMark } from "../logos";
import { FIVE_MAIN_PRODUCTS, SIX_HIGHLIGHTED_PRODUCTS } from "../products";
import { ILink } from "../types/components";
import { SecurityBadges } from "./security-badges";

export type HiveFooterProps = {
  className?: string;
  description?: string;
  href?: string;
  items?: HiveFooterItems;
  logo?: ReactNode;
  /**
   * In case this component is used outside of Hive Platform in a design-consistent but less related context,
   */
  showSecurityBadges?: boolean;
};

export function HiveFooter({
  className,
  description = "Open-source GraphQL management platform",
  href = `${siteOrigin}/`,
  items,
  logo = <HiveCombinationMark className="h-8 w-auto" />,
  showSecurityBadges,
}: HiveFooterProps) {
  items = { ...HiveFooter.DEFAULT_ITEMS, ...items };

  return (
    <footer
      className={cn(
        "relative flex justify-center px-4 pb-6 pt-18 xl:px-30",
        className,
      )}
    >
      <div className="grid w-full grid-cols-1 gap-x-6 text-green-800 max-lg:gap-y-16 sm:grid-cols-4 lg:gap-x-8 xl:gap-x-10 dark:text-neutral-400 max-w-360">
        <div className="max-lg:col-span-full">
          <Anchor
            className="hive-focus -m-1.5 flex rounded-sm p-1.5 text-green-1000 dark:text-white"
            href={href}
          >
            {logo}
          </Anchor>
          <p className="mt-6 lg:mt-8">{description}</p>
        </div>
        <div className="col-span-full grid grid-flow-row grid-cols-2 justify-stretch gap-6 text-sm sm:col-span-4 sm:grid-cols-3 lg:col-span-3 lg:pb-12 lg:text-base">
          <List heading="Products" links={productLinks} />

          <div className="flex flex-col gap-[inherit]">
            <List heading="Developer" links={items.developer} />
            <List heading="Resources" links={items.resources} />
          </div>

          <div className="flex flex-col gap-[inherit]">
            <List heading="Company" links={items.company} />
            {items.links?.map((link, i) => (
              <Anchor
                className="hive-focus -m-2 rounded-sm p-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-100"
                key={i}
                {...link}
              />
            ))}
            <ContactTextLink />
          </div>
          <div className="sm:-col-start-1 lg:-col-start-2">
            {showSecurityBadges && <SecurityBadges />}
          </div>
        </div>

        <div className="col-span-full flex flex-wrap justify-between gap-x-[inherit] gap-y-8 lg:w-full lg:pb-2 lg:pt-8">
          <div className="flex gap-6 lg:order-1">
            {SOCIAL_ICONS.map(({ icon: Icon, ...iconProps }) => (
              <Anchor
                className="hive-focus -m-1 rounded-md p-1 hover:text-blue-700 dark:hover:text-blue-100"
                key={iconProps.title}
                {...iconProps}
              >
                <Icon className="h-5 w-auto" />
              </Anchor>
            ))}
          </div>
          <p className="text-sm">© {new Date().getFullYear()} The Guild</p>
        </div>
      </div>

      <DecorationArch className="pointer-events-none absolute bottom-0 left-0 hidden mix-blend-multiply lg:block dark:opacity-5 dark:mix-blend-normal" />
    </footer>
  );
}

function List({
  className,
  heading,
  links,
}: {
  className?: string;
  heading: string;
  links: ILink[] | undefined;
}) {
  if (!links?.length) return null;

  return (
    <div
      className={cn("flex flex-col gap-y-3 text-nowrap lg:gap-y-4", className)}
    >
      <h3 className="font-medium dark:text-white">{heading}</h3>
      <ul className="contents">
        {links.map((link, i) => (
          <li key={i}>
            <Anchor
              {...link}
              className="hive-focus -m-2 block rounded-sm p-2 hover:text-blue-700 hover:underline dark:hover:text-blue-100"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface HiveFooterItems {
  company?: ILink[];
  developer?: ILink[];
  links?: ILink[];
  resources?: ILink[];
}

const DEFAULT_ITEMS: HiveFooterItems = {
  company: [
    {
      children: "About",
      href: "https://the-guild.dev/about-us",
      title: "Learn more about us",
    },
    {
      children: "Brand Assets",
      href: "https://the-guild.dev/logos",
      title: "Brand Assets",
    },
    {
      children: "Newsletter",
      href: "https://the-guild.dev/newsletter",
      title: "Newsletter",
    },
  ],
  developer: [
    {
      children: "Documentation",
      href: "/docs",
      title: "Read the docs",
    },
    {
      children: "Hive Status",
      href: "https://status.graphql-hive.com/",
      title: "Check Hive status",
    },
    {
      children: "Hive Updates",
      href: "/product-updates",
      title: "Read most recent developments from Hive",
    },
    {
      children: "Blog",
      href: "/blog",
      title: "Read our blog",
    },
  ],
  links: [
    {
      children: "OSS Friends",
      href: "/oss-friends",
    },
    {
      children: "Pricing",
      href: "/pricing",
    },
  ],
  resources: [],
};

HiveFooter.DEFAULT_ITEMS = DEFAULT_ITEMS;

interface SocialLink extends Omit<ILink, "children"> {
  icon: ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SOCIAL_ICONS: SocialLink[] = [
  {
    href: "https://github.com/the-guild-org",
    icon: GitHubIcon,
    title: "Check our GitHub account",
  },
  {
    href: "https://twitter.com/TheGuildDev",
    icon: TwitterIcon,
    title: "Visit our Twitter",
  },
  {
    href: "https://linkedin.com/company/the-guild-software",
    icon: LinkedInIcon,
    title: "Visit our LinkedIn",
  },
  {
    href: "https://discord.com/invite/xud7bH9",
    icon: DiscordIcon,
    title: "Reach us on Discord",
  },
  {
    href: "https://youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd",
    icon: YouTubeIcon,
    title: "Watch Our Videos",
  },
];

const productLinks = [...FIVE_MAIN_PRODUCTS, ...SIX_HIGHLIGHTED_PRODUCTS].map(
  ({ href, name, title }) => ({
    children: name,
    href,
    title,
  }),
);

function DecorationArch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      height={360}
      viewBox="0 0 360 360"
      width={360}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M360 159.793a39.152 39.152 0 00-11.468-27.672l-56.99-56.99-6.673-6.673-56.99-56.99A39.153 39.153 0 00200.207 0H0v75.131h226.157c32.428 0 58.712 26.284 58.712 58.712V360H360V159.793z"
        fill="url(#paint0_linear_711_2541)"
      />
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_711_2541"
          x1={180}
          x2={180}
          y1={-0.000_007_868_05}
          y2={360}
        >
          <stop stopColor="#C1D3D7" />
          <stop offset={1} stopColor="#86B6C1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
