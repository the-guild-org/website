"use client";

import { ComponentProps, useState, useSyncExternalStore } from "react";

import { CallToAction } from "./call-to-action";
import { cn } from "./cn";

export type CookiesConsentProps = ComponentProps<"div">;

const STORAGE_KEY = "cookies";

function subscribe(callback: () => void) {
  globalThis.addEventListener("storage", callback);
  return () => globalThis.removeEventListener("storage", callback);
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY) === "true";
}

// We don't server render the cookie consent modal.
function getServerSnapshot() {
  return true;
}

export function CookiesConsent(props: CookiesConsentProps) {
  const hasConsented = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [isClosing, setIsClosing] = useState(false);

  if (hasConsented && !isClosing) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn(
        "fixed bottom-0 z-50 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-lg border border-beige-200 bg-beige-100 p-4 text-sm text-green-800 shadow-xl duration-300 animate-in fade-in-0 slide-in-from-bottom-6 fill-mode-forwards data-[state=closing]:animate-out data-[state=closing]:fade-out-0 data-[state=closing]:slide-out-to-bottom-6 lg:flex-nowrap lg:justify-between lg:text-left dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200",
        props.className,
      )}
      data-state={isClosing ? "closing" : "open"}
      onAnimationEnd={() => {
        if (isClosing) {
          setIsClosing(false);
        }
      }}
    >
      <div>
        <p className="max-sm:inline">
          This site uses cookies for analytics and improving your experience.
        </p>{" "}
        <p className="max-sm:inline">
          By using our services, you consent to cookies.
        </p>
      </div>
      <div className="ml-auto flex w-auto items-center justify-end gap-4">
        <a
          className="hive-focus whitespace-nowrap rounded-sm p-1 hover:text-blue-700 hover:underline dark:hover:text-blue-100"
          href="https://the-guild.dev/graphql/hive/privacy-policy.pdf"
          rel="noopener noreferrer"
          target="_blank"
        >
          Privacy Policy
        </a>
        <CallToAction
          className="px-4 py-2"
          onClick={() => {
            setIsClosing(true);
            localStorage.setItem(STORAGE_KEY, "true");
          }}
          variant="tertiary"
        >
          Allow
        </CallToAction>
      </div>
    </div>
  );
}
