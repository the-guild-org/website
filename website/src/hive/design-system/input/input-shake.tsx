"use client";

import { useEffect, useRef } from "react";

import { Severity } from "../types/severity";

interface InputShakeProps {
  severity?: Severity;
}

/**
 * We need this hack to avoid shaking the input when it's first rendered
 * already as critical.
 */
export function InputShake({ severity }: InputShakeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prevSeverityRef = useRef<Severity | undefined>(severity);

  useEffect(() => {
    const shouldShake =
      prevSeverityRef.current !== "critical" && severity === "critical";

    prevSeverityRef.current = severity;
    const container = ref.current?.parentElement;
    if (container && shouldShake) {
      container.classList.add("animate-shake");
      const cleanUp = () => container.classList.remove("animate-shake");
      container.addEventListener("animationend", cleanUp, { once: true });
    }
  }, [severity]);

  return <div className="hidden" ref={ref} />;
}
