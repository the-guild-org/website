import { cn } from "../cn";
import CalloutCriticalIcon from "../icons/callout-critical.svg?svgr";
import CalloutInfoIcon from "../icons/callout-info.svg?svgr";
import CalloutNeutralIcon from "../icons/callout-neutral.svg?svgr";
import CalloutSuccessIcon from "../icons/callout-success.svg?svgr";
import CalloutWarningIcon from "../icons/callout-warning.svg?svgr";

type CalloutType = "critical" | "info" | "note" | "success" | "tip" | "warning";

interface CalloutProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  type: CalloutType;
}

const calloutConfig: Record<
  CalloutType,
  {
    bg: string;
    border: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    text: string;
  }
> = {
  critical: {
    bg: "bg-critical-100 dark:bg-[rgba(255,240,232,0.2)]",
    border: "border border-critical-500 dark:border-[rgba(255,198,187,0.2)]",
    Icon: CalloutCriticalIcon,
    text: "text-critical-800 dark:text-[#ffc6bb]",
  },
  info: {
    bg: "bg-info-100/50 dark:bg-info-500/3",
    border: "border border-info-500 dark:border-info-500/25",
    Icon: CalloutInfoIcon,
    text: "text-info-800 dark:text-[#e7f7ff]",
  },
  note: {
    bg: "bg-beige-200 dark:bg-[rgba(77,75,70,0.4)]",
    border: "border border-beige-500 dark:border-[rgba(109,106,99,0.4)]",
    Icon: CalloutNeutralIcon,
    text: "text-beige-900 dark:text-[#dedacf]",
  },
  success: {
    bg: "bg-positive-100 dark:bg-[rgba(175,213,99,0.2)]",
    border: "border border-positive-500 dark:border-[rgba(175,213,99,0.2)]",
    Icon: CalloutSuccessIcon,
    text: "text-positive-800 dark:text-[#afd563]",
  },
  tip: {
    bg: "bg-beige-200 dark:bg-[rgba(77,75,70,0.4)]",
    border: "border border-beige-500 dark:border-[rgba(109,106,99,0.4)]",
    Icon: CalloutNeutralIcon,
    text: "text-beige-900 dark:text-[#dedacf]",
  },
  warning: {
    bg: "bg-warning-100/35 dark:bg-[rgba(251,248,203,0.2)]",
    border: "border border-warning-500 dark:border-[rgba(231,222,98,0.2)]",
    Icon: CalloutWarningIcon,
    text: "text-warning-800 dark:text-[#d7cf53]",
  },
};

export function Callout({
  children,
  className,
  title,
  type = "info",
}: CalloutProps) {
  const config = calloutConfig[type];

  if (!config) {
    throw new Error(`Unknown callout type: ${type}`);
  }

  const { Icon } = config;

  return (
    <div
      className={cn(
        "mt-6 flex min-h-12 gap-2 rounded-lg px-[13px] py-[9px] hive-callout",
        config.bg,
        config.border,
        className,
      )}
    >
      <Icon
        aria-hidden
        className={cn("size-6 mt-0.5 shrink-0", config.text)}
        role="img"
      />
      <div className="min-w-0 flex-1">
        {title && (
          <div
            className={cn(
              "mb-1 font-mono text-sm font-medium uppercase",
              config.text,
            )}
            style={{ letterSpacing: "0.05em" }}
          >
            {title}
          </div>
        )}
        <div
          className={cn(
            "text-base leading-[1.75] text-neutral-900 [&>p:first-child]:mt-0 [&>*:last-child]:mb-0 [&_a]:decoration-current [&_li]:my-0 [&_*:last-child]:mb-0 **:leading-[inherit]! [&_li::marker]:text-current",
            config.text,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
