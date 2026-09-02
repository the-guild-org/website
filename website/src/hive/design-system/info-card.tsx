import { ReactNode } from "react";

import { Anchor, AnchorProps } from "./anchor";
import { cn } from "./cn";
import { Stud } from "./stud";
import { UnionToIntersection } from "./types/utility";

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace InfoCardProps {
  interface InfoCardBaseProps {
    heading: ReactNode;
    icon: ReactNode;
    scheme?: "green" | "neutral";
  }

  interface InfoCardLinkProps
    extends InfoCardBaseProps, Omit<AnchorProps, "as"> {
    href: AnchorProps["href"];
  }

  interface InfoCardInertProps
    extends React.HTMLAttributes<HTMLElement>, InfoCardBaseProps {
    as: "div" | "li";
  }
}

export type InfoCardProps =
  | InfoCardProps.InfoCardInertProps
  | InfoCardProps.InfoCardLinkProps;

export function InfoCard({
  children,
  className,
  heading,
  icon,
  scheme = "neutral",
  ...rest
}: InfoCardProps) {
  let Root: InfoCardProps.InfoCardInertProps["as"] | typeof Anchor;

  if ("href" in rest) {
    Root = Anchor;
  } else {
    Root = rest.as || "div";
    delete (rest as { as?: unknown }).as;
  }

  return (
    <Root
      className={cn(
        "p-6 md:p-12",
        scheme === "neutral" &&
          "bg-beige-100 [--color-h:var(--color-green-1000)] [--color-text:var(--color-green-800)] [--hover-bg:var(--color-beige-200)] dark:bg-neutral-900 dark:[--color-h:var(--color-white)] dark:[--color-text:var(--color-white)] dark:[--hover-bg:var(--color-neutral-800)]",
        scheme === "green" &&
          "bg-green-900 [--color-h:var(--color-white)] [--color-text:var(--color-white)] [--hover-bg:var(--color-green-800)]",
        Root === Anchor &&
          "hive-focus block cursor-pointer duration-300 hover:bg-(--hover-bg) focus-visible:bg-(--hover-bg)",
        className,
      )}
      {...(rest as UnionToIntersection<InfoCardProps>)}
    >
      <Stud>{icon}</Stud>
      <h3 className="mt-4 text-xl font-medium leading-[1.4] text-(--color-h) md:mt-6">
        {heading}
      </h3>
      <div className="mt-2 space-y-2 text-(--color-text) md:mt-4">
        {children}
      </div>
    </Root>
  );
}
