import type { HTMLAttributes, ReactElement, ReactNode } from "react";

import { Anchor } from "../anchor";
import { cn } from "../cn";

export function Cards({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn("not-prose mt-4 grid gap-4", "hive-cards", className)}
      style={{
        gridTemplateColumns:
          "repeat(auto-fill, minmax(max(250px, calc((100% - 1rem * 2) / 3)), 1fr))",
        ...props.style,
      }}
    >
      {children}
    </div>
  );
}

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  description?: ReactNode;
  href: string;
  icon?: ReactElement;
  title: string;
}

export function Card({
  children,
  className,
  description,
  href,
  icon,
  title,
  ...props
}: CardProps) {
  return (
    <Anchor
      {...props}
      className={cn(
        "hive-card group flex flex-col justify-start overflow-hidden rounded-lg border ring-beige-200 no-underline bg-white dark:bg-transparent shadow-sm transition-all duration-200 hover:shadow-md dark:ring-neutral-800 dark:shadow-none dark:hover:ring-neutral-700 dark:hover:bg-neutral-900",
        className,
      )}
      href={href}
    >
      {children}
      <span
        className={cn(
          "flex items-center gap-2 p-4 font-semibold text-gray-700 hover:text-gray-900",
          "dark:text-neutral-200 dark:hover:text-neutral-50",
        )}
        title={title}
      >
        {icon}
        <span className="truncate">{title}</span>
        <span
          aria-hidden
          className="transition-transform duration-75 group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
      {description ? (
        <p className="px-4 pb-4 text-sm text-gray-500 dark:text-neutral-400">
          {description}
        </p>
      ) : null}
    </Anchor>
  );
}
