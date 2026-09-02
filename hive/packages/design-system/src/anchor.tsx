import { Link } from "@tanstack/react-router";
import { forwardRef, ReactElement } from "react";

import { cn } from "./cn";
import { ILink } from "./types/components";

export type AnchorProps = ILink;
export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
  function Anchor(
    { children, className, href = "", newWindow, ...props },
    forwardedRef,
  ): ReactElement {
    const classes = cn("outline-hidden focus-visible:ring-3", className);
    const hrefString = typeof href === "string" ? href : (href?.pathname ?? "");

    // Hash links
    if (hrefString.startsWith("#")) {
      return (
        <a className={classes} href={hrefString} ref={forwardedRef} {...props}>
          {children}
        </a>
      );
    }

    // External links
    if (newWindow || /^https?:\/\//.test(hrefString)) {
      return (
        <a
          className={classes}
          href={hrefString}
          ref={forwardedRef}
          rel="noreferrer"
          target="_blank"
          {...props}
        >
          {children}
        </a>
      );
    }

    // Internal links - use TanStack Router Link
    // Filter out props that TanStack Router Link doesn't accept
    const { rel: _rel, target: _target, ...linkProps } = props;
    const hashIndex = hrefString.indexOf("#");
    const to = hashIndex === -1 ? hrefString : hrefString.slice(0, hashIndex);
    const hash = hashIndex === -1 ? undefined : hrefString.slice(hashIndex + 1);
    return (
      <Link
        className={classes}
        hash={hash}
        preload="intent"
        ref={forwardedRef}
        to={to}
        {...linkProps}
      >
        {children}
      </Link>
    );
  },
);
