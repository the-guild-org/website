import { ComponentProps } from "react";

import { cn } from "./cn";

export type StudProps = ComponentProps<"div">;
export function Stud(props: StudProps) {
  return (
    <div
      {...props}
      className={cn(
        "w-fit rounded-lg bg-[linear-gradient(135deg,#68A8B6,#3B736A)] p-[9px] text-white",
        props.className,
      )}
    />
  );
}
