"use client";

import { ComponentPropsWithoutRef, useCallback, useRef, useState } from "react";

import { cn } from "./cn";
import { headingSlug } from "./heading-slug.js";

export { headingSlug } from "./heading-slug.js";

export interface HeadingProps extends ComponentPropsWithoutRef<"h1"> {
  as: "div" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  size?: "lg" | "md" | "sm" | "xl" | "xs";
}
export function Heading({
  as: _as,
  children,
  className,
  id: idProp,
  size,
  ...rest
}: HeadingProps) {
  const Level = _as || "h2";

  let sizeStyle = "";
  switch (size) {
    case "lg":
      sizeStyle =
        "text-4xl leading-[1.2] md:text-[56px] md:leading-[1.14286] tracking-[-0.56px]";
      break;
    case "md":
      sizeStyle =
        "text-4xl leading-[1.2] md:text-5xl md:leading-[1.16667] tracking-[-0.48px]";
      break;
    case "sm":
      sizeStyle = "text-[40px] leading-[1.2] tracking-[-0.2px]";
      break;
    case "xl":
      sizeStyle =
        "text-4xl leading-[1.2] md:text-[4rem] md:leading-[1.1875] tracking-[-0.64px]";
      break;
    case "xs":
      sizeStyle = "text-[32px]/[1.25] tracking-[-0.16px]";
      break;
  }

  const autoId =
    typeof children === "string" ? headingSlug(children) : undefined;
  const id = idProp ?? autoId;

  return (
    <Level className={cn("group", sizeStyle, className)} id={id} {...rest}>
      {id && <CopyLinkButton id={id} />}
      {children}
    </Level>
  );
}

function CopyLinkButton({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copyLink = useCallback(() => {
    const url = new URL(globalThis.location.href);
    url.hash = id;
    void navigator.clipboard.writeText(url.toString());
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const popover =
        containerRef.current?.querySelector<HTMLElement>("[data-popover]");
      if (popover) {
        const animation = popover.animate(
          [
            { opacity: 1, scale: 1 },
            { opacity: 0, scale: 0.9 },
          ],
          {
            duration: 150,
            easing: "ease-in",
            fill: "forwards",
          },
        );
        animation.finished.then(() => {
          setCopied(false);
          setTimeout(() => {
            animation.cancel();
          }, 150);
        });
      } else {
        setCopied(false);
      }
    }, 1500);
  }, [id]);

  return (
    <span
      className="inline-block w-0 overflow-visible align-top"
      ref={containerRef}
    >
      <button
        aria-label="Copy link to this section"
        className="relative -ml-[0.8em] -mt-1 mr-1 before:transition-opacity hover:before:duration-50 before:duration-150 before:bg-current before:absolute before:inset-0 before:rounded-md before:opacity-0 hover:before:opacity-5 before:saturate-50 hive-focus rounded-md"
        data-copied={copied}
        onClick={copyLink}
        type="button"
      >
        <LinkIcon className="size-[0.7em] opacity-0 group-hover:opacity-70 [:active>&]:opacity-100 transition group-hover:duration-100 duration-300 [:active>&]:scale-96 [[data-copied=true]>&]:opacity-100 [:focus-visible>&]:opacity-70" />
        {copied && (
          <span
            className="pointer-events-none tracking-[0.01em] absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-white px-2 py-1 text-xs font-normal text-green-1000 shadow-sm ring-1 ring-beige-500/35 dark:bg-neutral-800 dark:text-white dark:ring-neutral-900 animate-pop-up"
            data-popover
          >
            Copied the link
          </span>
        )}
      </button>
    </span>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        d="M8.51194 3.00541C9.18829 2.54594 10.0435 2.53694 10.6788 2.95419C10.8231 3.04893 10.9771 3.1993 11.389 3.61119C11.8009 4.02307 11.9513 4.17714 12.046 4.32141C12.4633 4.95675 12.4543 5.81192 11.9948 6.48827C11.8899 6.64264 11.7276 6.80811 11.3006 7.23511L10.6819 7.85383C10.4867 8.04909 10.4867 8.36567 10.6819 8.56093C10.8772 8.7562 11.1938 8.7562 11.389 8.56093L12.0077 7.94221L12.0507 7.89929C12.4203 7.52976 12.6568 7.2933 12.822 7.0502C13.4972 6.05623 13.5321 4.76252 12.8819 3.77248C12.7233 3.53102 12.4922 3.30001 12.1408 2.94871L12.0961 2.90408L12.0515 2.85942C11.7002 2.508 11.4692 2.27689 11.2277 2.11832C10.2377 1.46813 8.94398 1.50299 7.95001 2.17822C7.70691 2.34336 7.47044 2.57991 7.1009 2.94955L7.058 2.99247L6.43928 3.61119C6.24401 3.80645 6.24401 4.12303 6.43928 4.31829C6.63454 4.51355 6.95112 4.51355 7.14638 4.31829L7.7651 3.69957C8.1921 3.27257 8.35757 3.11027 8.51194 3.00541ZM4.31796 7.14672C4.51322 6.95146 4.51322 6.63487 4.31796 6.43961C4.12269 6.24435 3.80611 6.24435 3.61085 6.43961L2.99213 7.05833L2.94922 7.10124C2.57957 7.47077 2.34303 7.70724 2.17788 7.95035C1.50265 8.94432 1.4678 10.238 2.11799 11.2281C2.27656 11.4695 2.50766 11.7005 2.8591 12.0518L2.90374 12.0965L2.94837 12.1411C3.29967 12.4925 3.53068 12.7237 3.77214 12.8822C4.76219 13.5324 6.05589 13.4976 7.04986 12.8223C7.29296 12.6572 7.52943 12.4206 7.89896 12.051L7.89897 12.051L7.94188 12.0081L8.5606 11.3894C8.75586 11.1941 8.75586 10.8775 8.5606 10.6823C8.36533 10.487 8.04875 10.487 7.85349 10.6823L7.23477 11.301C6.80777 11.728 6.6423 11.8903 6.48794 11.9951C5.81158 12.4546 4.95642 12.4636 4.32107 12.0464C4.17681 11.9516 4.02274 11.8012 3.61085 11.3894C3.19896 10.9775 3.0486 10.8234 2.95385 10.6791C2.53661 10.0438 2.54561 9.18863 3.00507 8.51227C3.10993 8.35791 3.27224 8.19244 3.69924 7.76544L4.31796 7.14672ZM9.62172 6.08558C9.81698 5.89032 9.81698 5.57373 9.62172 5.37847C9.42646 5.18321 9.10988 5.18321 8.91461 5.37847L5.37908 8.91401C5.18382 9.10927 5.18382 9.42585 5.37908 9.62111C5.57434 9.81637 5.89092 9.81637 6.08619 9.62111L9.62172 6.08558Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
