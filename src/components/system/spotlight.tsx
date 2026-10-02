"use client";

/**
 * Spotlight — pointer-follow glow wrapper. Sets --mx / --my on the container so
 * the .spotlight-glow child tracks the cursor. Renders its children untouched;
 * the glow is a single absolutely-positioned child, so it composes safely with
 * .panel-ticks (which owns ::before / ::after).
 */

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Spotlight({
  children,
  className,
  commander = false,
}: {
  children: ReactNode;
  className?: string;
  commander?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={cn("spotlight", commander && "spotlight-commander", className)}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      <span aria-hidden="true" className="spotlight-glow" />
      {children}
    </div>
  );
}
