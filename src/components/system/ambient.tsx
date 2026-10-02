"use client";

/**
 * Ambient — the page-wide living backdrop: drifting aurora fields, CRT
 * scanlines, a slow sweeping scan line and film grain.
 *
 * Fixed, pointer-events-none, z-0 so every section sits above it. Under
 * prefers-reduced-motion the aurora and sweep are frozen (globals.css collapses
 * animation durations) — the static colour fields still render.
 */

import { useReducedMotion } from "framer-motion";

export function Ambient() {
  const reduced = useReducedMotion();
  const still = reduced ? { animation: "none" as const } : undefined;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="aurora-blob left-[-10vw] top-[-12vw] h-[46vw] w-[46vw] bg-signal-500/20"
        style={still}
      />
      <div
        className="aurora-blob right-[-8vw] top-[14vh] h-[38vw] w-[38vw] bg-commander-500/10"
        style={{ ...(still ?? { animationDelay: "-8s" }) }}
      />
      <div
        className="aurora-blob bottom-[-22vw] left-[20vw] h-[54vw] w-[54vw] bg-signal-700/15"
        style={{ ...(still ?? { animationDelay: "-16s" }) }}
      />

      <div className="scanlines absolute inset-0 opacity-[0.45]" />
      <div className="grain absolute inset-0 opacity-[0.3] mix-blend-soft-light" />

      {!reduced && (
        <div className="scan-sweep absolute inset-x-0 top-0 h-[38vh] bg-gradient-to-b from-transparent via-signal-400/[0.05] to-transparent" />
      )}
    </div>
  );
}
