import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useLayoutEffect,
} from "react";

import { Anchor } from "../anchor";
import { cn } from "../cn";
import { ArrowIcon } from "../icons";

const CONTAINER_ID = "h-navmenu-container";
const VIEWPORT_ID = "h-navmenu-viewport";

export interface NavigationMenuProps extends ComponentPropsWithoutRef<
  typeof NavigationMenuPrimitive.Root
> {
  forceMount?: true;
}
export const NavigationMenu = forwardRef<
  ElementRef<typeof NavigationMenuPrimitive.Root>,
  NavigationMenuProps
>(({ children, className, forceMount, ...rest }, ref) => (
  <NavigationMenuPrimitive.Root
    aria-label="Navigation Menu"
    className={cn("relative z-10 flex flex-1 items-center", className)}
    id={CONTAINER_ID}
    ref={ref}
    {...rest}
  >
    {children}
    <NavigationMenuViewport forceMount={forceMount} />
    <RemoveMotionIfPreferred />
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

export const NavigationMenuList = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...rest }, ref) => (
  <NavigationMenuPrimitive.List
    className={cn(
      "group flex flex-1 list-none items-center rounded-lg border-beige-200 px-1.5 lg:border lg:px-3 dark:border-neutral-700",
      className,
    )}
    ref={ref}
    {...rest}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

export const NavigationMenuItem = NavigationMenuPrimitive.Item;

export const NavigationMenuTrigger = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ children, className, ...rest }, ref) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(
      "hive-focus cursor-default rounded-sm p-3 font-medium leading-normal text-green-800 aria-expanded:text-green-1000 dark:text-neutral-300 dark:aria-expanded:text-neutral-100",
      className,
    )}
    onPointerOver={(event) => {
      rest.onPointerOver?.(event);
      const container = document.getElementById(CONTAINER_ID);
      const viewport = document.getElementById(VIEWPORT_ID);
      if (!viewport || !(viewport instanceof HTMLElement) || !container) return;
      const newX = getTransformX(event.currentTarget, viewport, container);
      if (!viewport.style.transition) {
        setTimeout(() => {
          // First transition will be immediate.
          // We start under the first hovered element.
          viewport.style.transition = "transform 0.5s";
          // TODO: Clear this on close.
        }, 0);
      }
      viewport.style.transform = `translateX(${newX}px)`;
    }}
    ref={ref}
    {...rest}
  >
    {children}
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

export const NavigationMenuContent = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...rest }, ref) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      "absolute left-0 top-0 w-auto bg-white dark:bg-neutral-900 *:first:p-6",
      // Reset scale vars so Content doesn't inherit Viewport's zoom-in/zoom-out
      "[--tw-enter-scale:1] [--tw-exit-scale:1]",
      // Blur exiting content for a smoother handoff
      "transition-[filter] duration-150 data-[motion^=to-]:blur-[1px]",
      // Slide + fade animation between menus
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in-0 data-[motion^=to-]:fade-out-0 data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 data-[motion^=to-]:animate-duration-250 data-[motion^=from-]:animate-duration-450",
      className,
    )}
    ref={ref}
    {...rest}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

export interface NavigationMenuLinkProps extends Omit<
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Link>,
  "asChild"
> {
  arrow?: boolean;
  href: string;
}

export const NavigationMenuLink = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Link>,
  NavigationMenuLinkProps
>(({ arrow, children, className, href, ...rest }, ref) => {
  const isActive = false; // TODO: Do we even discern this in the design?
  return (
    <NavigationMenuPrimitive.Link active={isActive} {...rest} asChild ref={ref}>
      <Anchor
        className={cn(
          'hive-focus data-[active="true"]:text-green-1000 rounded-sm p-3 leading-normal text-green-800 transition-colors hover:bg-beige-100 hover:text-green-1000 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100',
          arrow && "flex items-center",
          className,
        )}
        href={href}
        {...(href.startsWith("http")
          ? { rel: "noopener noreferrer", target: "_blank" }
          : {})}
      >
        {children}
        {arrow && (
          <ArrowIcon className="ml-auto size-6 shrink-0 opacity-0 transition-all" />
        )}
      </Anchor>
    </NavigationMenuPrimitive.Link>
  );
});
NavigationMenuLink.displayName = NavigationMenuPrimitive.Link.displayName;

const useIsomorphicLayoutEffect =
  globalThis.window === undefined ? useEffect : useLayoutEffect;

export const NavigationMenuViewport = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...rest }, ref) => {
  useIsomorphicLayoutEffect(() => {
    const viewport = document.getElementById(VIEWPORT_ID);
    const container = document.getElementById(CONTAINER_ID);
    if (
      !(
        container &&
        container instanceof HTMLElement &&
        viewport &&
        viewport instanceof HTMLElement
      )
    ) {
      return;
    }

    const firstCollectionItem = container.querySelector(
      "[data-radix-collection-item]",
    );
    if (firstCollectionItem && firstCollectionItem instanceof HTMLElement) {
      viewport.style.transform = `translateX(${getTransformX(firstCollectionItem, viewport, container)}px)`;
    }
  }, []);
  return (
    <div
      className="pointer-events-none absolute left-0 top-full flex"
      id={VIEWPORT_ID}
      style={{
        perspective: "2000px",
      }}
    >
      <NavigationMenuPrimitive.Viewport
        className={cn(
          "pointer-events-auto relative mt-1.5 h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) origin-[top_center] overflow-hidden rounded-xl border border-beige-200 bg-white shadow-[0px_16px_32px_-12px_rgba(14,18,27,0.10)] data-[state=closed]:opacity-0 data-[state=closed]:scale-95 data-[state=closed]:pointer-events-none dark:border-neutral-800 dark:bg-neutral-900",
          className,
        )}
        ref={ref}
        style={{
          transition:
            "width 450ms, height 450ms, transform 250ms, opacity 250ms, scale 250ms",
        }}
        {...rest}
      />
    </div>
  );
});
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

export const NavigationMenuIndicator = forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...rest }, ref) => (
  <NavigationMenuPrimitive.Indicator
    className={cn(
      "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out-0 data-[state=visible]:fade-in-0",
      className,
    )}
    ref={ref}
    {...rest}
  >
    <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-beige-200 shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

function getTransformX(
  element: HTMLElement,
  viewport: HTMLElement,
  container: HTMLElement,
) {
  const boundingBox = element.getBoundingClientRect();
  const containerLeft = container.getBoundingClientRect().left;
  const left = boundingBox.left - containerLeft;
  const offsetX = -32;
  let newX = left + offsetX;
  if (newX + viewport.offsetWidth > window.innerWidth) {
    newX = window.innerWidth - viewport.offsetWidth + offsetX;
  }
  return newX;
}

// We're removing fade-in and fade-out too, because without the slide animations they make the content less readable.
function RemoveMotionIfPreferred() {
  return (
    <style>
      {`@media (prefers-reduced-motion: reduce) { #${CONTAINER_ID} * { animation-duration: 0ms !important; transition-duration: 0ms !important; } }`}
    </style>
  );
}
