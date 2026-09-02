import { cloneElement, ReactElement } from "react";

export function Screenshot({
  children,
}: {
  children: ReactElement<{ className?: string }>;
}) {
  return cloneElement(children, {
    className: "mt-6 rounded-lg drop-shadow-md",
  });
}
