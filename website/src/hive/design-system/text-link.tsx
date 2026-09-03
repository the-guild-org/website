import React from "react";

import { Anchor, AnchorProps } from "./anchor";
import { cn } from "./cn";
import { ArrowIcon } from "./icons";

export type TextLinkProps = AnchorProps & {
  variant?: "dark" | "default";
};

export function TextLink({
  children,
  className,
  variant = "default",
  ...rest
}: TextLinkProps) {
  const hasArrow =
    children &&
    flattenFragments(children).some(
      (child) =>
        typeof child === "object" &&
        child &&
        "type" in child &&
        child.type === ArrowIcon,
    );

  return (
    <Anchor
      className={cn(
        variant === "default"
          ? cn(
              "hive-focus -mx-1 -my-0.5 rounded-sm px-1 py-0.5 hover:text-blue-700 dark:hover:text-blue-500",
              hasArrow ? "inline-flex items-center gap-2" : "underline",
            )
          : cn(
              "underline decoration-white/30 underline-offset-2 hover:decoration-white/80",
              hasArrow && "inline-flex items-center gap-2",
            ),
        className,
      )}
      {...rest}
    >
      {children}
    </Anchor>
  );
}

function flattenFragments(children: React.ReactNode): React.ReactNode[] {
  return React.Children.toArray(children).flatMap((child) =>
    typeof child === "object" &&
    "type" in child &&
    child.type === React.Fragment
      ? ((child as React.ReactElement<{ children?: React.ReactNode[] }>).props
          .children ?? [])
      : child,
  );
}
