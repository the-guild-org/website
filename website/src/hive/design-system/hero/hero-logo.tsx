import { cloneElement, ReactElement } from "react";

import { cn } from "../cn";
import { GRADIENT_GREEN_ID, GRADIENT_WHITE_ID } from "./hero-gradient-ids";

const GRADIENT_BLUE = "logo-blue-3028";
const GRADIENT_WHITE_INVERTED = "logo-white-3028";

export interface HeroLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactElement<{
    className?: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
  }>;
}

export function HeroLogo({ children, className, ...rest }: HeroLogoProps) {
  return (
    <div className={cn("relative", className)} {...rest}>
      {cloneElement(children, {
        className: cn(
          "absolute inset-1/2 size-1/2 -translate-1/2",
          children.props.className,
        ),
        fill: `url(#${GRADIENT_BLUE})`,
        stroke: `url(#${GRADIENT_WHITE_INVERTED})`,
      })}
      <LogoBadgeBackground />
      <LogoGradientDefs />
    </div>
  );
}

function LogoBadgeBackground() {
  return (
    <svg fill="none" height="96" viewBox="0 0 96 96" width="96">
      <rect
        fill={`url(#${GRADIENT_GREEN_ID})`}
        height="96"
        rx="24"
        width="96"
      />
      <rect
        height="95"
        rx="23.5"
        stroke={`url(#${GRADIENT_WHITE_ID})`}
        width="95"
        x="0.5"
        y="0.5"
      />
      <path d="M57.0264 32.1652H48.9577L53.8032 27.3197L48.4855 22L43.1658 27.3197L48.0114 32.1652H39.9427C38.9042 32.1652 37.9069 32.5786 37.1721 33.3134L23 47.4855L28.3197 52.8052L45.715 35.4099C47.2452 33.8797 49.7258 33.8797 51.2561 35.4099L68.6513 52.8052L73.971 47.4855L59.797 33.3114C59.0622 32.5767 58.0649 32.1632 57.0264 32.1632V32.1652ZM48.4854 63.3623L43.1665 68.6811L48.4854 74L53.8042 68.6811L48.4854 63.3623ZM39.9446 52.8054H48.4855H48.4894H57.0303C58.0688 52.8054 59.0661 53.2188 59.8008 53.9536L63.89 58.0428L58.5704 63.3625L51.258 56.0501C49.7277 54.5198 47.2472 54.5198 45.7169 56.0501L38.4045 63.3625L33.0848 58.0428L37.174 53.9536C37.9088 53.2188 38.9061 52.8054 39.9446 52.8054Z" />
    </svg>
  );
}

// these are not reused
function LogoGradientDefs() {
  return (
    <svg className="size-0" viewBox="0 0 52 53">
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id={GRADIENT_BLUE}
        x1="0"
        x2="51.998"
        y1="0.524872"
        y2="52.5229"
      >
        <stop stopColor="#A7D5CA" />
        <stop offset="1" stopColor="#86B6C1" />
      </linearGradient>
      <linearGradient
        gradientUnits="userSpaceOnUse"
        id={GRADIENT_WHITE_INVERTED}
        x1="0"
        x2="52"
        y1="0.524872"
        y2="52.5249"
      >
        <stop stopColor="white" stopOpacity="0.5" />
        <stop offset="1" stopColor="white" stopOpacity="0.2" />
      </linearGradient>
    </svg>
  );
}
