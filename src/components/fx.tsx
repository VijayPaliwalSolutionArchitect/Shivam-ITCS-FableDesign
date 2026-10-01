"use client";

import {
  Component,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── SpotlightCard: mouse-tracked radial highlight ────────── */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={cn("spotlight panel panel-ticks card-hover", className)}
    >
      {children}
    </div>
  );
}

/* ── TiltCard: subtle 3D tilt toward the pointer ──────────── */
export function TiltCard({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (reduced) return;
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "";
      }}
      className={cn("transition-transform duration-300 will-change-transform", className)}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* ── CountUp: number counts up when scrolled into view ────── */
export function CountUp({
  value,
  duration = 1.6,
  className,
}: {
  /** Numeric part, e.g. 40 for "40–70%" */
  value: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration, reduced]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

/* ── GlowButton: primary CTA with gradient + shimmer ──────── */
export function GlowButton({
  children,
  href,
  variant = "primary",
  className,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "commander" | "ghost";
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const base = cn(
    "font-display group relative inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition-all duration-300",
    variant === "primary" &&
      "shimmer bg-gradient-to-r from-signal-600 to-signal-500 text-white shadow-[0_0_28px_-6px_var(--color-signal-500)] hover:shadow-[0_0_40px_-4px_var(--color-signal-500)] hover:brightness-110",
    variant === "commander" &&
      "shimmer bg-gradient-to-r from-commander-600 to-commander-500 text-base-raised shadow-[0_0_28px_-6px_var(--color-commander-500)] hover:shadow-[0_0_40px_-4px_var(--color-commander-500)] hover:brightness-110",
    variant === "ghost" &&
      "grad-border glass text-ink hover:border-signal-500/40 hover:text-signal-200",
    className
  );
  if (href) {
    return (
      <a href={href} className={base} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={base} aria-label={ariaLabel}>
      {children}
    </button>
  );
}

/* ── Reveal: scroll-in animation, static under reduced motion */
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

/* ── Eyebrow: mono kicker with node dot ───────────────────── */
export function Eyebrow({
  children,
  commander = false,
  className,
}: {
  children: ReactNode;
  commander?: boolean;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow", commander && "eyebrow-commander", className)}>
      {children}
    </p>
  );
}

/* ── SectionHeading: display title with optional gradient ─── */
export function SectionHeading({
  children,
  level = 2,
  id,
  gradient = false,
  className,
}: {
  children: ReactNode;
  level?: 1 | 2 | 3;
  id?: string;
  gradient?: boolean;
  className?: string;
}) {
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return (
    <Tag
      id={id}
      className={cn(
        "font-display mt-4 text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.9rem]",
        gradient && "text-gradient",
        !gradient && "text-ink",
        className
      )}
    >
      {children}
    </Tag>
  );
}

/* ── Halftone corner: decorative node cluster ─────────────── */
export function CornerNodes({ className, tone = "signal" }: { className?: string; tone?: "signal" | "commander" }) {
  const c = tone === "commander" ? "var(--color-commander-500)" : "var(--color-signal-500)";
  return (
    <svg aria-hidden="true" width="72" height="72" viewBox="0 0 72 72" fill="none" className={cn("pointer-events-none absolute opacity-60", className)}>
      <circle cx="8" cy="8" r="3" fill={c} />
      <circle cx="28" cy="20" r="2" fill="var(--color-ink-mute)" />
      <circle cx="16" cy="40" r="2.5" fill="var(--color-line-strong)" />
      <circle cx="44" cy="8" r="1.6" fill="var(--color-line-strong)" />
      <path d="M10 10 26 19M10 11 15 37M30 22 15 37M30 20 42 10" stroke="var(--color-line-strong)" strokeWidth="1" />
    </svg>
  );
}

/* ── ErrorBoundary (generic) ──────────────────────────────── */
export class FxErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}

/* ── Inline style helper for CSS-var-driven effects ───────── */
export function cssVars(vars: Record<string, string | number>): CSSProperties {
  return vars as CSSProperties;
}
