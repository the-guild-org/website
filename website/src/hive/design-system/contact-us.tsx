"use client";

import { CallToAction, CallToActionProps } from "./call-to-action";
import { cn } from "./cn";

const openCrisp = (event: React.MouseEvent<HTMLAnchorElement>) => {
  if (
    (globalThis as unknown as { $crisp?: { push(args: unknown[]): void } })
      .$crisp
  ) {
    (
      globalThis as unknown as { $crisp: { push(args: unknown[]): void } }
    ).$crisp.push(["do", "chat:open"]);
    event.preventDefault();
  }
};

export interface ContactTextLinkProps extends Omit<
  React.HTMLAttributes<HTMLAnchorElement>,
  "href" | "onClick"
> {
  children?: React.ReactNode;
}

export function ContactTextLink(props: ContactTextLinkProps) {
  return (
    <a
      {...props}
      className={cn(
        "hive-focus -m-2 rounded-sm p-2 font-medium hover:text-blue-700 hover:underline dark:hover:text-blue-100",
        props.className,
      )}
      href="https://the-guild.dev/contact"
      onClick={openCrisp}
    >
      {props.children || "Contact Us"}
    </a>
  );
}

export interface ContactButtonProps extends Omit<
  CallToActionProps.AnchorProps,
  "children" | "href" | "onClick"
> {
  children?: React.ReactNode;
}

export function ContactButton(props: ContactButtonProps) {
  return (
    <CallToAction
      href="https://the-guild.dev/contact"
      onClick={openCrisp}
      {...props}
    >
      {props.children || "Contact Us"}
    </CallToAction>
  );
}
