"use client";

import { useLocation } from "@tanstack/react-router";
import React, {
  ComponentProps,
  FC,
  forwardRef,
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useEffectEvent,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { Anchor } from "../anchor";
import { CallToAction } from "../call-to-action";
import { cn } from "../cn";
import { siteOrigin } from "../constants";
import {
  AccountBox,
  AppsIcon,
  ArrowIcon,
  BardIcon,
  GroupIcon,
  HiveIcon,
  HonourIcon,
  ShieldFlashIcon,
} from "../icons";
import {
  GraphQLFoundationLogo,
  GuildLogo,
  HiveCombinationMark,
  TheGuild,
} from "../logos";
import { PRODUCTS, SIX_HIGHLIGHTED_PRODUCTS } from "../products";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./navigation-menu";

export * from "./graphql-conf-card";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- standard useMounted pattern
  useEffect(() => setMounted(true), []);
  return mounted;
}

export function HiveNavigationMenuIcon({
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height="24"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        className="origin-center transition-transform in-[.open]:translate-y-1.25 in-[.open]:rotate-45"
        d="M4 7h16"
      />
      <path className="transition-opacity in-[.open]:opacity-0" d="M4 12h16" />
      <path
        className="origin-center transition-transform in-[.open]:-translate-y-1.25 in-[.open]:-rotate-45"
        d="M4 17h16"
      />
    </svg>
  );
}

const ENTERPRISE_MENU_HIDDEN = true;

export type HiveNavigationProps = {
  children?: ReactNode;
  className?: string;
  companyMenuChildren?: ReactNode;
  /**
   * We change links to relative based on what product we're in.
   */
  developerMenu: DeveloperMenuProps["developerMenu"];
  logo?: ReactNode;
  navLinks?: { children: ReactNode; href: string }[];
  noBorder?: boolean;
  productName: string;
  search?: ReactElement;
  sidebarTrigger?: ReactElement;
};

/**
 *
 * @example
 * ```tsx
 * <HiveNavigation
 *   companyMenuChildren={<GraphQLConfCard image={graphQLConfLocalImage} />}
 *   items={items}
 * >
 *   {extraContent}
 * </HiveNavigation>
 * ```
 */
export function HiveNavigation({
  children,
  className,
  companyMenuChildren,
  developerMenu,
  logo,
  navLinks,
  noBorder,
  productName,
  search,
  sidebarTrigger,
}: HiveNavigationProps) {
  // Default values that depend on productName need to be set here
  const resolvedLogo = logo ?? <HiveLogoLink isHive={productName === "Hive"} />;
  const resolvedNavLinks = navLinks ?? [
    {
      children: "Pricing",
      href:
        productName === "Hive"
          ? "/pricing"
          : "https://the-guild.dev/graphql/hive/pricing",
    },
  ];
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="sticky top-0 z-20 border-b border-beige-400/(--border-opacity) bg-[rgb(var(--nextra-bg))] text-green-1000 transition-[border-color] duration-500 dark:border-neutral-700/(--border-opacity) dark:text-neutral-200 row-1 [grid-area:nav]"
      id="hive-navigation"
      ref={containerRef}
      style={{ "--border-opacity": "0%" } as React.CSSProperties}
    >
      {!noBorder && (
        <TopOfSiteMarker
          onChange={(scrolled) => {
            const container = containerRef.current;
            if (!container) {
              return;
            }
            container.style.setProperty(
              "--border-opacity",
              scrolled ? "100%" : "0%",
            );
          }}
        />
      )}

      {/* mobile menu */}
      <div
        className={cn(
          "flex items-center justify-between md:hidden p-4",
          className,
        )}
      >
        {resolvedLogo}
        <div className="flex items-center gap-1">
          {search}
          {sidebarTrigger}
        </div>
      </div>

      {/* desktop menu */}
      <NavigationMenu
        className={cn(
          "mx-auto py-4 px-6 hidden md:flex w-360 max-w-full",
          className,
        )}
        delayDuration={0}
        forceMount
      >
        {resolvedLogo}
        <NavigationMenuList className="ml-4 bg-white dark:bg-transparent [@media(min-width:1180px)]:ml-16">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ProductsMenu productName={productName} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Developer</NavigationMenuTrigger>
            <NavigationMenuContent>
              <DeveloperMenu developerMenu={developerMenu} />
            </NavigationMenuContent>
          </NavigationMenuItem>
          {!ENTERPRISE_MENU_HIDDEN && (
            <NavigationMenuItem>
              <NavigationMenuTrigger>Enterprise</NavigationMenuTrigger>
              <NavigationMenuContent>
                <EnterpriseMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>
          )}
          <NavigationMenuItem>
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>
              <CompanyMenu>{companyMenuChildren}</CompanyMenu>
            </NavigationMenuContent>
          </NavigationMenuItem>
          {resolvedNavLinks.map(({ children, href }) => (
            <NavigationMenuItem className="flex" key={href}>
              <NavigationMenuLink className="font-medium" href={href}>
                {children}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>

        <div className="flex-1" />

        {children}

        {search}

        <CallToAction
          className="ml-4 max-lg:hidden"
          href={`${siteOrigin}/contact`}
          onClick={(event) => {
            if (
              (
                globalThis as unknown as {
                  $crisp?: { push(args: unknown[]): void };
                }
              ).$crisp
            ) {
              (
                globalThis as unknown as {
                  $crisp: { push(args: unknown[]): void };
                }
              ).$crisp.push(["do", "chat:open"]);
              event.preventDefault();
            }
          }}
          rel="noopener noreferrer"
          target="_blank"
          variant="tertiary"
        >
          Contact <span className="hidden xl:contents">us</span>
        </CallToAction>
        {productName === "Hive" ? (
          <CallToAction
            className="ml-4"
            href="https://app.graphql-hive.com/"
            variant="primary"
          >
            Sign in
          </CallToAction>
        ) : (
          <CallToAction className="ml-4" href="/docs" variant="primary">
            Docs
          </CallToAction>
        )}
      </NavigationMenu>
    </div>
  );
}

interface ProductsMenuProps extends MenuContentColumnsProps {
  productName: string;
}

/**
 * @internal
 */
export const ProductsMenu = React.forwardRef<HTMLDivElement, ProductsMenuProps>(
  ({ productName, ...rest }, ref) => {
    const { pathname } = useLocation();

    const bidirectionalProductLink = (
      product: (typeof PRODUCTS)[keyof typeof PRODUCTS],
    ) => {
      if (productName === product.name) {
        // We link bidirectionally between the landing page and the docs.
        return pathname === "/" ? "/docs" : "/";
      }
      return product.href;
    };

    return (
      <MenuContentColumns ref={ref} {...rest}>
        <div className="w-55">
          <ColumnLabel>Platform</ColumnLabel>
          <NavigationMenuLink
            className="p-4"
            href={bidirectionalProductLink(PRODUCTS.HIVE)}
          >
            <div className="w-fit rounded-lg bg-green-800 p-3 dark:bg-white/10">
              <HiveIcon className="size-10 text-white" />
            </div>
            <p className="mt-4 text-base/normal font-medium text-green-1000 dark:text-neutral-200">
              Hive
            </p>
            <p className="mt-1 text-sm/5 text-green-800 dark:text-neutral-400">
              GraphQL Federation Platform with Schema Registry and Analytics
            </p>
          </NavigationMenuLink>
          <Anchor
            className="hive-focus -my-2 ml-2 flex items-center gap-2 rounded-lg p-2 font-medium text-green-800 transition-colors hover:bg-beige-100 hover:text-green-1000 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-200"
            href="https://app.graphql-hive.com/"
            title="Discover the Hive platform"
          >
            <span>Get started</span> <ArrowIcon />
          </Anchor>
        </div>
        <div className="w-68 xl:w-70.25">
          <ColumnLabel>The GraphQL Stack</ColumnLabel>
          <ul>
            {(
              [
                [PRODUCTS.HIVE_GATEWAY, "GraphQL Federation Gateway"],
                [PRODUCTS.MESH, "Anything to GraphQL"],
                [PRODUCTS.YOGA, "GraphQL Server & Subgraph"],
              ] as const
            ).map(([product, description]) => {
              const Logo = product.logo;
              return (
                <li key={product.name}>
                  <NavigationMenuLink
                    className="flex items-center gap-4 p-4"
                    href={bidirectionalProductLink(product)}
                    title={product.title}
                  >
                    <div className="size-12 rounded-lg bg-blue-400 p-2.5">
                      <Logo className="size-7 text-green-1000" />
                    </div>
                    <div>
                      <p className="text-base/normal font-medium text-green-1000 dark:text-neutral-200">
                        {product.name}
                      </p>
                      <p className="col-start-2 mt-1 text-sm/5 text-green-800 dark:text-neutral-300">
                        {description}
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-91">
          <ColumnLabel>Libraries</ColumnLabel>
          <ul className="grid grid-cols-2 gap-x-4">
            {SIX_HIGHLIGHTED_PRODUCTS.map((product) => {
              const Logo = product.logo;
              return (
                <li key={product.name}>
                  <NavigationMenuLink
                    arrow
                    className="flex items-center gap-3 px-4 py-2"
                    href={bidirectionalProductLink(product)}
                  >
                    <div className="flex size-8 items-center justify-center rounded-sm bg-beige-200 p-1.25 dark:bg-white/5">
                      <Logo className="size-8 text-green-1000 dark:text-neutral-300" />
                    </div>
                    <div>
                      <p className="text-base/normal font-medium text-green-1000 dark:text-neutral-200">
                        {/* shortened to one word */}
                        {product.name === PRODUCTS.ESLINT.name
                          ? "ESLint"
                          : product.name}
                      </p>
                    </div>
                  </NavigationMenuLink>
                </li>
              );
            })}
          </ul>
          <Anchor
            className="hive-focus -my-2 ml-2 flex items-center gap-2 rounded-lg p-2 font-medium text-green-800 transition-colors hover:bg-beige-100 hover:text-green-1000 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-200"
            href={
              productName === "Hive"
                ? "/ecosystem"
                : "https://the-guild.dev/graphql/hive/ecosystem"
            }
          >
            <span>Explore all libraries</span> <ArrowIcon />
          </Anchor>
        </div>
      </MenuContentColumns>
    );
  },
);
ProductsMenu.displayName = "ProductsMenu";

type MenuContentColumnsProps = ComponentProps<"div">;

const MenuContentColumns = forwardRef(
  (props: MenuContentColumnsProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    return (
      <div
        className="flex gap-x-6 *:flex *:flex-col *:gap-4"
        ref={ref}
        {...props}
      >
        {React.Children.toArray(props.children)
          .filter(Boolean)
          .map((child, index, array) => {
            const childKey = React.isValidElement(child) ? child.key : null;
            return (
              <Fragment key={childKey ?? `column-${typeof child}`}>
                {child}
                {index < array.length - 1 && (
                  <div className="w-px bg-beige-200 dark:bg-neutral-800" />
                )}
              </Fragment>
            );
          })}
      </div>
    );
  },
);
MenuContentColumns.displayName = "MenuContentColumns";

interface DeveloperMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  developerMenu: {
    children: ReactNode;
    href: string;
    icon: ReactNode;
    title?: string;
  }[];
}

/**
 * @internal
 */
export const DeveloperMenu = React.forwardRef<
  HTMLDivElement,
  DeveloperMenuProps
>(({ developerMenu, ...rest }, ref) => {
  return (
    <MenuContentColumns {...rest} ref={ref}>
      <div>
        <ColumnLabel>Developer</ColumnLabel>
        <ul>
          {developerMenu.map(({ children, href, icon, title }) => (
            <MenuColumnListItem
              href={href}
              icon={icon}
              key={href}
              title={title}
            >
              {children}
            </MenuColumnListItem>
          ))}
        </ul>
      </div>
      <div>
        <ColumnLabel>Community</ColumnLabel>
        <ul>
          {(
            [
              [
                "YouTube",
                YouTubeIcon,
                "https://www.youtube.com/watch?v=d_GBgH-L5c4&list=PLhCf3AUOg4PgQoY_A6xWDQ70yaNtPYtZd",
              ],
              ["X", TwitterIcon, "https://x.com/theguilddev"],
              [
                "LinkedIn",
                LinkedInIcon,
                "https://www.linkedin.com/company/the-guild-software/",
              ],
              ["Discord", DiscordIcon, "https://discord.com/invite/xud7bH9"],
            ] as const
          ).map(([text, Icon, href]) => (
            <MenuColumnListItem href={href} icon={<Icon />} key={href}>
              {text}
            </MenuColumnListItem>
          ))}
        </ul>
      </div>
    </MenuContentColumns>
  );
});
DeveloperMenu.displayName = "DeveloperMenu";

function MenuColumnListItem({
  children,
  href,
  icon,
  title,
}: {
  children: ReactNode;
  href: string;
  icon: ReactNode;
  title?: string;
}) {
  return (
    <li>
      <NavigationMenuLink
        arrow
        className="flex items-center gap-3 text-nowrap px-4 py-2 [&:hover>svg]:opacity-100 [&>svg]:size-6 [&>svg]:shrink-0"
        href={href}
        title={title}
      >
        {icon}
        <p className="text-base/normal font-medium text-green-1000 dark:text-neutral-200">
          {children}
        </p>
      </NavigationMenuLink>
    </li>
  );
}

function ColumnLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 text-sm/5 text-green-700 dark:text-neutral-300">
      {children}
    </p>
  );
}

// These icons are _different_ than the ones used elsewhere.
// e.g. Discord is a "chat" bubble with the Discord logo in the center.

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path d="M20.5887 7.04819C21 8.65199 21 12 21 12C21 12 21 15.348 20.5887 16.9518C20.3601 17.8383 19.6914 18.5358 18.8445 18.7716C17.3064 19.2 12 19.2 12 19.2C12 19.2 6.6963 19.2 5.1555 18.7716C4.305 18.5322 3.6372 17.8356 3.4113 16.9518C3 15.348 3 12 3 12C3 12 3 8.65199 3.4113 7.04819C3.6399 6.16169 4.3086 5.46419 5.1555 5.22839C6.6963 4.79999 12 4.79999 12 4.79999C12 4.79999 17.3064 4.79999 18.8445 5.22839C19.695 5.46779 20.3628 6.16439 20.5887 7.04819ZM10.2 15.15L15.6 12L10.2 8.84999V15.15Z" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path d="M16.6536 4.6875H19.1346L13.7144 10.8825L20.0909 19.3125H15.0981L11.1876 14.1997L6.71313 19.3125H4.23063L10.0281 12.6862L3.91113 4.6875H9.03063L12.5654 9.36075L16.6536 4.6875ZM15.7829 17.8275H17.1576L8.28363 6.0945H6.80838L15.7829 17.8275Z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path d="M17.7015 17.7051H15.303V13.9458C15.303 13.0494 15.285 11.8956 14.052 11.8956C12.8019 11.8956 12.6111 12.8712 12.6111 13.8801V17.7051H10.2117V9.97499H12.5157V11.028H12.5472C12.8694 10.4214 13.6524 9.77969 14.8224 9.77969C17.2524 9.77969 17.7024 11.3799 17.7024 13.4616V17.7051H17.7015ZM7.50272 8.91749C7.31962 8.91773 7.13828 8.88183 6.96908 8.81184C6.79988 8.74185 6.64617 8.63916 6.51674 8.50965C6.38731 8.38013 6.28471 8.22635 6.21483 8.05711C6.14496 7.88786 6.10917 7.70649 6.10952 7.52339C6.1097 7.24785 6.19159 6.97854 6.34482 6.74953C6.49806 6.52051 6.71576 6.34208 6.9704 6.2368C7.22504 6.13152 7.50519 6.10411 7.77541 6.15804C8.04563 6.21197 8.29378 6.34482 8.4885 6.53979C8.68322 6.73476 8.81575 6.98309 8.86933 7.25338C8.92291 7.52367 8.89514 7.80377 8.78953 8.05828C8.68392 8.31279 8.50521 8.53026 8.276 8.6832C8.04679 8.83614 7.77737 8.91767 7.50182 8.91749H7.50272ZM8.70512 17.7051H6.29942V9.97499H8.70602V17.7051H8.70512ZM18.903 3.89999H5.09612C4.43372 3.89999 3.90002 4.42199 3.90002 5.06729V18.9327C3.90002 19.578 4.43462 20.1 5.09522 20.1H18.8994C19.56 20.1 20.1 19.578 20.1 18.9327V5.06729C20.1 4.42199 19.56 3.89999 18.8994 3.89999H18.9021H18.903Z" />
    </svg>
  );
}

function DiscordIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path d="M10.2684 11.1C10.8084 11.1 11.2458 11.505 11.2359 12C11.2359 12.495 10.8093 12.9 10.2684 12.9C9.73742 12.9 9.30002 12.495 9.30002 12C9.30002 11.505 9.72752 11.1 10.2684 11.1ZM13.7316 11.1C14.2725 11.1 14.7 11.505 14.7 12C14.7 12.495 14.2725 12.9 13.7316 12.9C13.2006 12.9 12.7641 12.495 12.7641 12C12.7641 11.505 13.1907 11.1 13.7316 11.1ZM18.2019 3C19.2486 3 20.1 3.8694 20.1 4.9467V21.9L18.1101 20.1045L16.9896 19.0461L15.8043 17.9211L16.2957 19.6698H5.79812C4.75142 19.6698 3.90002 18.8004 3.90002 17.7231V4.9467C3.90002 3.8694 4.75142 3 5.79812 3H18.201H18.2019ZM14.6289 15.3417C16.6746 15.276 17.4621 13.9053 17.4621 13.9053C17.4621 10.8624 16.1283 8.3955 16.1283 8.3955C14.7963 7.3758 13.5273 7.4037 13.5273 7.4037L13.3977 7.5549C14.9718 8.0463 15.7026 8.7555 15.7026 8.7555C14.8432 8.27129 13.896 7.9629 12.9162 7.8483C12.2947 7.7781 11.667 7.78415 11.0469 7.8663C10.9911 7.8663 10.9443 7.8762 10.8894 7.8852C10.5654 7.914 9.77792 8.0364 8.78792 8.481C8.44592 8.6412 8.24162 8.7555 8.24162 8.7555C8.24162 8.7555 9.01022 8.0085 10.6761 7.5171L10.5834 7.4037C10.5834 7.4037 9.31532 7.3758 7.98242 8.3964C7.98242 8.3964 6.64952 10.8624 6.64952 13.9053C6.64952 13.9053 7.42712 15.2751 9.47283 15.3417C9.47283 15.3417 9.81482 14.9169 10.0938 14.5578C8.91752 14.1978 8.47382 13.4418 8.47382 13.4418C8.47382 13.4418 8.56563 13.5084 8.73212 13.6029C8.74113 13.6119 8.75012 13.6218 8.76902 13.6308C8.79692 13.6506 8.82482 13.6596 8.85273 13.6785C9.08402 13.8108 9.31532 13.9143 9.52772 13.9998C9.90753 14.151 10.3611 14.3022 10.8894 14.4066C11.6808 14.5617 12.4945 14.5648 13.287 14.4156C13.7487 14.3332 14.199 14.197 14.6289 14.0097C14.9529 13.8864 15.3138 13.7064 15.6936 13.4517C15.6936 13.4517 15.231 14.2266 14.0178 14.5767C14.2959 14.9358 14.6298 15.3417 14.6298 15.3417H14.6289Z" />
    </svg>
  );
}

/**
 * @internal
 */
export function EnterpriseMenu() {
  return (
    <ul>
      {(
        [
          // TODO: Enable these when the pages are created.
          [AccountBox, "Customer Stories", ""],
          [BardIcon, "Why GraphQL", ""],
          [HonourIcon, "Professional Services", ""],
          [ShieldFlashIcon, "Commitment to Security", ""],
        ] as const
      ).map(([Icon, text, href]) => {
        return (
          <MenuColumnListItem href={href} icon={<Icon />} key={text}>
            {text}
          </MenuColumnListItem>
        );
      })}
    </ul>
  );
}

/**
 * @internal
 */
export function CompanyMenu({ children }: { children: React.ReactNode }) {
  return (
    <MenuContentColumns>
      <div>
        <ColumnLabel>Company</ColumnLabel>
        <ul>
          <MenuColumnListItem
            href={`${siteOrigin}/about-us`}
            icon={<GroupIcon />}
          >
            About Us
          </MenuColumnListItem>
          <MenuColumnListItem href={`${siteOrigin}/logos`} icon={<AppsIcon />}>
            Brand Assets
          </MenuColumnListItem>
        </ul>
        <ColumnLabel>Proudly made by</ColumnLabel>
        <NavigationMenuLink arrow className="px-4 py-2" href={`${siteOrigin}/`}>
          <GuildLogo className="-my-2 size-10" />
          <TheGuild className="h-8" />
        </NavigationMenuLink>
        <ColumnLabel>Part of</ColumnLabel>
        <NavigationMenuLink
          arrow
          className="px-4 py-2 text-blue-800 hover:text-blue-1000"
          href="https://graphql.org/community/foundation/"
        >
          <GraphQLFoundationLogo className="" />
        </NavigationMenuLink>
      </div>
      {children && <div>{children}</div>}
    </MenuContentColumns>
  );
}

function HiveLogoLink({ isHive }: { isHive: boolean }) {
  return (
    <Anchor
      className="hive-focus -m-2 flex items-center rounded-md p-2"
      href={isHive ? "/" : "https://the-guild.dev/graphql/hive"}
    >
      <HiveCombinationMark className="text-green-1000 dark:text-neutral-200 max-sm:h-6 max-sm:w-auto" />
    </Anchor>
  );
}

const TopOfSiteMarker: FC<{
  className?: string;
  onChange: (scrolled: boolean) => void;
}> = ({ className, onChange }) => {
  const mounted = useMounted();

  const markerRef = useRef<HTMLDivElement>(null);
  const onScrollChange = useEffectEvent((scrolled: boolean) => {
    onChange(scrolled);
  });

  useEffect(() => {
    if (!mounted || !markerRef.current) {
      return;
    }
    const marker = markerRef.current;
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        onScrollChange(entry.boundingClientRect.y < -1);
      }
    });
    observer.observe(marker);

    return () => {
      observer.unobserve(marker);
    };
  }, [mounted]);

  // We can't create a portal to document.body if we are not in the browser.
  if (!mounted) {
    return null;
  }

  return createPortal(
    <div
      className={cn("absolute left-0 top-0 -z-50 size-px", className)}
      ref={markerRef}
    />,
    document.body,
  );
};
