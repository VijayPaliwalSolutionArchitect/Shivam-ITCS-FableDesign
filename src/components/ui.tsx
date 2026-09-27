"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ── Reveal: framer-motion micro-interaction, fully disabled under
      prefers-reduced-motion (renders in final state) ────────── */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Section shell ─────────────────────────────────────────── */
export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative mx-auto w-full max-w-7xl px-5 lg:px-8", className)}
    >
      {children}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  body,
  id,
  align = "left",
  commander = false,
}: {
  eyebrow: string;
  title: ReactNode;
  body?: string;
  id?: string;
  align?: "left" | "center";
  commander?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <p className={cn("eyebrow", commander && "eyebrow-commander")}>{eyebrow}</p>
      <h2
        id={id}
        className="font-display mt-4 text-3xl font-semibold leading-[1.08] text-ink sm:text-4xl lg:text-[2.9rem]"
      >
        {title}
      </h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-ink-dim">{body}</p>}
    </div>
  );
}

/* ── Panel card ────────────────────────────────────────────── */
export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div className={cn("panel panel-ticks p-6", hover && "card-hover", className)}>{children}</div>
  );
}

/* ── Tag chip (mono, systems-diagram feel) ─────────────────── */
export function Tag({ children, tone = "signal" }: { children: ReactNode; tone?: "signal" | "commander" | "mute" }) {
  return (
    <span
      className={cn(
        "font-mono inline-flex items-center rounded border px-2 py-0.5 text-[0.68rem] tracking-wide",
        tone === "signal" && "border-signal-800/60 bg-signal-900/25 text-signal-300",
        tone === "commander" && "border-commander-700/50 bg-commander-900/20 text-commander-300",
        tone === "mute" && "border-line-strong bg-surface-2 text-ink-mute"
      )}
    >
      {children}
    </span>
  );
}

/* ── Node glyph: the recurring systemic motif ──────────────── */
export function NodeGlyph({
  className,
  color = "var(--color-signal-500)",
  size = 34,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 34 34"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <circle cx="17" cy="6" r="3" fill={color} />
      <circle cx="7" cy="27" r="2.4" fill="var(--color-signal-500)" opacity="0.8" />
      <circle cx="27" cy="27" r="2.4" fill="var(--color-signal-500)" opacity="0.8" />
      <path d="M17 9.5 8 24.2M17 9.5l9 14.7" stroke="var(--color-line-strong)" strokeWidth="1.3" />
    </svg>
  );
}

/* ── Stat block ────────────────────────────────────────────── */
export function Stat({
  value,
  unit,
  label,
  note,
  commander = false,
}: {
  value: string;
  unit?: string;
  label: string;
  note?: string;
  commander?: boolean;
}) {
  return (
    <div className="relative">
      <p
        className={cn(
          "font-display text-4xl font-semibold tracking-tight sm:text-5xl",
          commander ? "text-commander-400" : "text-ink"
        )}
      >
        {value}
        {unit && <span className={commander ? "text-commander-500" : "text-signal-400"}>{unit}</span>}
      </p>
      <p className="mt-1.5 text-sm font-medium text-ink-dim">{label}</p>
      {note && <p className="readout mt-1 text-ink-mute">{note}</p>}
    </div>
  );
}
