import { ReactNode } from "react";

import { cn } from "../cn";
import CSAStarLevelOneIcon from "../icons/csa-star-level-one.svg?svgr";
import soc2Badge from "./soc2-badge.webp?url";

function SecurityBadge({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  return (
    <a
      className={cn(
        "hive-focus size-fit rounded-full p-1 hover:bg-blue-200 focus-visible:outline-hidden focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(var(--nextra-bg))] dark:hover:bg-white/20 dark:hover:*:opacity-100",
        className,
      )}
      href={href}
      rel="noreferrer noopener"
      target="_blank"
    >
      {children}
    </a>
  );
}

export function SecurityBadges() {
  return (
    <div className="flex flex-wrap gap-4 max-lg:flex-col">
      <SecurityBadge href="https://cloudsecurityalliance.org/star/registry/software-products-guild-ltd-the-guild/services/graphql-hive">
        <CSAStarLevelOneIcon className="size-22 dark:opacity-95" />
      </SecurityBadge>
      <SecurityBadge href="https://security.graphql-hive.com/">
        <img
          alt="AICPA SOC 2"
          className="size-22 dark:opacity-95"
          loading="lazy"
          src={soc2Badge}
        />
      </SecurityBadge>
    </div>
  );
}
