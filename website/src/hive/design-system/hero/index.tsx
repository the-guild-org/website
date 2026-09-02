import { FC, ReactNode } from "react";

import { cn } from "../cn";
import { Heading } from "../heading";
import { CheckIcon } from "../icons";
import { HeroGradientDefs } from "./hero-gradient-defs";

export { HeroDecorationFromLogo } from "./hero-decoration-from-logo";
export { HeroLogo } from "./hero-logo";

export interface HeroProps {
  checkmarks: string[];
  children?: ReactNode;
  className?: string;
  heading: string;
  text: string;
  top?: ReactNode;
}

export const Hero: FC<HeroProps> = (props) => {
  return (
    <div
      className={cn(
        "relative isolate flex max-w-360 flex-col items-center justify-center gap-6 overflow-hidden rounded-3xl bg-blue-400 px-4 py-6 text-green-1000 max-sm:mt-2 sm:py-12 md:gap-8 lg:py-24",
        props.className,
      )}
    >
      {props.top}
      <Heading
        as="h1"
        className="mx-auto max-w-3xl text-balance text-center"
        size="xl"
      >
        {props.heading}
      </Heading>
      <p className="mx-auto w-[512px] max-w-[80%] text-center leading-6 text-green-800">
        {props.text}
      </p>
      <ul className="mx-auto flex list-none gap-x-6 gap-y-2 text-sm font-medium max-md:flex-col">
        {props.checkmarks.map((text) => (
          <li className="flex items-center gap-2" key={text}>
            <CheckIcon className="text-green-800" />
            {text}
          </li>
        ))}
      </ul>
      <div className="flex w-full justify-center gap-2 px-0.5 max-sm:flex-col sm:gap-4">
        {props.children}
      </div>
      <HeroGradientDefs />
    </div>
  );
};
