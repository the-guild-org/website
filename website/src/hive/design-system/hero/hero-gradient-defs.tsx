import {
  GRADIENT_GREEN_ID,
  GRADIENT_WHITE_2_ID,
  GRADIENT_WHITE_ID,
} from "./hero-gradient-ids";

export function HeroGradientDefs() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute"
      height="96"
      viewBox="0 0 96 96"
      width="96"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={GRADIENT_GREEN_ID}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop stopColor="#3B736A" />
          <stop offset="1" stopColor="#15433C" />
        </linearGradient>
        <linearGradient
          id={GRADIENT_WHITE_ID}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop stopColor="#fff" stopOpacity="0.8" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient
          id={GRADIENT_WHITE_2_ID}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop stopColor="#fff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
