import { forwardRef } from "react";

import { Anchor } from "../anchor";
import { cn } from "../cn";

export interface MDXLinkProps extends Omit<
  React.ComponentProps<typeof Anchor>,
  "children" | "href"
> {
  children?: React.ReactNode;
  href?: string;
}

export const MDXLink = forwardRef<HTMLAnchorElement, MDXLinkProps>(
  ({ children, className, href, ...rest }, ref) => {
    return (
      <Anchor
        // we remove `text-underline-position` from default Nextra link styles, because Neue Montreal font
        // has a different underline position than system fonts, and it looks bad in Safari.
        className={cn(
          "hive-focus -mx-1 -my-0.5 rounded-sm px-1 py-0.5 text-current hover:text-blue-700 decoration-blue-700 underline underline-offset-2 hover:no-underline focus-visible:no-underline focus-visible:ring-current focus-visible:ring-offset-blue-200 dark:decoration-primary/75 dark:focus-visible:ring-primary/50 dark:hover:text-primary",
          className,
        )}
        href={href || ""}
        ref={ref}
        {...rest}
      >
        {children}
      </Anchor>
    );
  },
);

MDXLink.displayName = "MDXLink";
