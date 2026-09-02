import { ReactElement, ReactNode } from "react";

import { cn } from "./cn";

export interface TagProps extends React.ComponentPropsWithoutRef<"button"> {
  children: ReactNode;
  selected?: boolean;
}

export const Tag = ({ children, onClick, selected, ...rest }: TagProps) => {
  return (
    <button
      className={cn(
        "hive-focus inline cursor-pointer rounded-full border-0 px-3 py-1 text-xs font-medium outline-hidden",
        selected
          ? "bg-neutral-700 text-white in-[.green]:bg-green-600"
          : "bg-neutral-900/5 text-neutral-800 dark:bg-neutral-200/10 dark:text-neutral-200 in-[.green]:bg-green-700 in-[.green]:text-green-200",
      )}
      onClick={onClick}
      tabIndex={onClick ? 0 : -1}
      {...rest}
    >
      {children}
    </button>
  );
};

export const TagsContainer = ({
  children,
  className,
  focusgroup,
}: {
  children: ReactNode;
  className?: string;
  focusgroup?: "horizontal";
}): ReactElement => {
  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={cn("flex flex-wrap gap-2 py-2", className)}
      onKeyDown={focusgroup ? moveFocusWithLeftAndRight : undefined}
    >
      {children}
    </div>
  );
};

const moveFocusWithLeftAndRight = (
  event: React.KeyboardEvent<HTMLDivElement>,
) => {
  if (
    event.target instanceof HTMLElement &&
    event.target.tagName === "BUTTON"
  ) {
    let next: Element | null | undefined;
    switch (event.key) {
      case "ArrowLeft":
        next = event.target.previousElementSibling;
        break;
      case "ArrowRight":
        next = event.target.nextElementSibling;
        break;
    }
    if (next && next instanceof HTMLElement && next.tagName === "BUTTON") {
      event.preventDefault();
      next.focus();
    }
  }
};
