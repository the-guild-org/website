"use client";

import React, { ReactElement, ReactNode } from "react";

import { cn } from "../cn";
import { useTweenPlaybackRate } from "./use-tween-playback-rate";

const PresetSpeedToMs = {
  fast: 20_000,
  normal: 40_000,
  slow: 60_000,
};

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: "left" | "right";
  /**
   * Seconds to stop the animation
   */
  pauseDurationSeconds?: number;
  pauseOnHover?: boolean;
  speed?: keyof typeof PresetSpeedToMs | number;
}

export function Marquee({
  children,
  className,
  direction = "left",
  pauseDurationSeconds = 1,
  pauseOnHover = false,
  speed = "normal",
  ...rest
}: MarqueeProps) {
  const animationDuration =
    typeof speed === "number"
      ? speed
      : PresetSpeedToMs[speed as keyof typeof PresetSpeedToMs];

  const tweenPlaybackRate = useTweenPlaybackRate();

  const STEP = 1 / (pauseDurationSeconds * 1000);

  return (
    <div
      className={cn(
        "mask-[linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "flex w-max animate-[marquee_var(--animation-duration)_var(--animation-direction)_linear_infinite] gap-1 py-0.5 sm:gap-2 sm:py-1",
        )}
        onMouseEnter={
          pauseOnHover
            ? (event) => {
                const animation = event.currentTarget.getAnimations()[0];
                if (animation) tweenPlaybackRate(animation, -STEP);
              }
            : undefined
        }
        onMouseLeave={
          pauseOnHover
            ? (event) => {
                const animation = event.currentTarget.getAnimations()[0];
                if (animation) tweenPlaybackRate(animation, STEP);
              }
            : undefined
        }
        style={
          {
            "--animation-direction":
              direction === "left" ? "forwards" : "reverse",
            "--animation-duration": `${animationDuration}ms`,
          } as {}
        }
      >
        {children}
        {children}
      </div>
      <style href="Marquee-keyframes">
        {
          /* css */ `
          @keyframes marquee {
            to {
              translate: calc(-50% - .5rem);
            }
          }
        `
        }
      </style>
    </div>
  );
}

export interface MarqueeRowsProps
  extends
    React.HTMLAttributes<HTMLElement>,
    Pick<MarqueeProps, "pauseOnHover" | "speed"> {
  children: ReactElement[];
  rows: number;
}

export function MarqueeRows({
  children,
  className,
  pauseOnHover,
  rows,
  speed,
  ...rest
}: MarqueeRowsProps) {
  const chunkSize = Math.floor(children.length / rows);
  const remainder = children.length % rows;
  const chunks: ReactElement[][] = [];

  let start = 0;
  for (let i = 0; i < rows; i++) {
    const end = start + chunkSize + (i < remainder ? 1 : 0); // distribute extras
    chunks.push(children.slice(start, end));
    start = end;
  }

  return (
    <div className={cn("overflow-hidden", className)} {...rest}>
      {chunks.map((chunk, index) => (
        <Marquee
          direction={index % 2 ? "left" : "right"}
          key={index}
          pauseOnHover={pauseOnHover}
          speed={speed}
        >
          {chunk}
          {index === chunks.length - 1 && chunk}
        </Marquee>
      ))}
    </div>
  );
}

MarqueeRows.Rows = MarqueeRows;
