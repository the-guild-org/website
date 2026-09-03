import { HTMLAttributes } from "react";

import { Anchor } from "./anchor";
import { cn } from "./cn";

const variantStyles = {
  primary: cn(
    "bg-primary hover:bg-green-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800 dark:bg-neutral-100 dark:text-neutral-800 dark:hover:bg-white dark:hover:text-neutral-900",
  ),
  "primary-inverted": cn(
    "bg-primary text-green-1000 hover:bg-white focus-visible:outline-4 focus-visible:outline-offset-0 focus-visible:outline-white/40 dark:text-green-1000",
  ),
  secondary: cn(
    "bg-green-300 hover:bg-green-200 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-300/40",
  ),
  "secondary-inverted": cn(
    "bg-green-800 text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800/40 dark:text-white",
  ),
  tertiary: cn(
    "bg-transparent text-green-1000 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-green-800",
  ),
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace CallToActionProps {
  export type Variant = keyof typeof variantStyles;

  export interface BaseProps {
    variant: Variant;
  }

  export interface AnchorProps
    extends BaseProps, React.ComponentPropsWithoutRef<typeof Anchor> {
    as?: never;
    href: string;
  }

  export interface ButtonProps
    extends
      BaseProps,
      React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
      > {
    as?: never;
    href?: never;
  }

  /**
   * Use inside `<summary>` or as visual part of bigger interactive element.
   * Prefer using `href` prop using CallToAction as `<button>` in other cases.
   */
  export interface NonInteractiveProps
    extends
      BaseProps,
      React.DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
    as: "div" | "span";
    href?: never;
  }
}

export type CallToActionProps =
  | CallToActionProps.AnchorProps
  | CallToActionProps.ButtonProps
  | CallToActionProps.NonInteractiveProps;

/**
 * This is called `Button` in Figma in the new Hive brand design system.
 * It's a styled variant of {@link Anchor}. Based on the presence of the
 * `href` prop or `as` prop, it renders a `button`, `a` or `props.as`
 * (for non-interactive elements) element.
 *
 * // TODO: Consider renaming it to `Button`.
 */
export function CallToAction(props: CallToActionProps) {
  const className = cn(
    "relative flex items-center justify-center gap-2 text-nowrap rounded-lg px-6 py-3 font-medium leading-6 text-green-1000 focus-visible:outline focus-visible:ring-0 focus-visible:ring-offset-0 sm:w-fit dark:text-neutral-200 [&:hover>:first-child]:-inset-px [&:hover>:first-child]:rounded-[9px]",
    variantStyles[props.variant],
    props.className,
  );

  const growingBorderBox = (
    <span className="absolute inset-0 rounded-lg border border-green-800 dark:border-neutral-200" />
  );

  if ("href" in props && typeof props.href === "string") {
    const { children, className: _1, variant: _2, ...rest } = props;

    return (
      <Anchor className={className} {...rest}>
        {growingBorderBox}
        {children}
      </Anchor>
    );
  }

  if (props.as) {
    const { as, children, className: _1, variant: _2, ...rest } = props;
    // for this use case HTMLElement is enough, we don't need to use the more specific HTMLDivElement
    const Root = as as "span";
    return (
      <Root className={className} {...rest}>
        {growingBorderBox}
        {children}
      </Root>
    );
  }

  const { children, className: _1, variant: _2, ...rest } = props;

  return (
    <button className={className} type="button" {...rest}>
      {growingBorderBox}
      {children}
    </button>
  );
}
