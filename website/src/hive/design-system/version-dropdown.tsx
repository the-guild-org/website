"use client";

import { cn } from "./cn";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "./dropdown";
import { CaretSlimIcon, CheckIcon } from "./icons";

export interface VersionDropdownProps {
  chevronPosition?: "left" | "right";
  currentVersion: string;
  versions: {
    href?: string;
    label?: string;
    onClick?: () => void;
    value: string;
  }[];
}
export function VersionDropdown({
  chevronPosition = "left",
  currentVersion,
  versions,
}: VersionDropdownProps) {
  return (
    <Dropdown className="relative" type="hover">
      <DropdownTrigger className="hive-focus flex cursor-default items-center gap-1 py-2 font-medium leading-normal text-green-800 aria-expanded:text-green-1000 dark:text-neutral-300 dark:aria-expanded:text-neutral-100">
        {chevronPosition === "left" && <CaretSlimIcon className="size-3.5" />}
        {currentVersion}
        {chevronPosition === "right" && <CaretSlimIcon className="size-3.5" />}
      </DropdownTrigger>

      <DropdownContent className="absolute left-full min-w-16 -translate-x-full translate-y-2 rounded-xl border border-beige-200 bg-white p-1 shadow-[0px_16px_32px_-12px_rgba(14,18,27,0.10)] transition ease-in-out data-[state=closed]:pointer-events-none data-[state=closed]:translate-y-0 data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:fade-in-90 dark:border-neutral-800 dark:bg-neutral-900">
        {versions.map((version) => (
          <DropdownItem
            className={cn(
              "flex items-center justify-between gap-1 whitespace-nowrap rounded-sm p-2 text-green-800 transition-colors hover:bg-beige-100 hover:text-green-1000 dark:text-neutral-300 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-100",
              version.value === currentVersion &&
                "pointer-events-none font-medium",
            )}
            href={version.href}
            key={version.value}
            onClick={version.onClick}
          >
            {version.label ?? version.value}{" "}
            {version.value === currentVersion && (
              <CheckIcon className="size-3.5" />
            )}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
