"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { nav, site, type NavItem } from "@/lib/content/site";
import { cn } from "@/lib/utils";

/* Featured card shown on the right of each mega panel */
const featured: Record<string, { title: string; body: string; href: string; tag: string; commander?: boolean }> = {
  Services: {
    tag: "Flagship service",
    title: "AI Infrastructure & LLM Ops",
    body: "Hybrid LLM routing, Commander Architecture, RAG pipelines, local Ollama inference. 40–70% AI cost reduction — structural, not cosmetic.",
    href: "/services#ai-infrastructure",
  },
  Solutions: {
    tag: "Most requested",
    title: "Healthcare",
    body: "HIPAA-compliant Hospital OS, Clinic CRM, AI clinical workflows — compliance designed in from day one.",
    href: "/solutions#healthcare",
  },
  "Architecture Flagship": {
    tag: "Proprietary · Production-proven",
    title: "Sovereign Architecture (SCA)",
    body: "10-layer governance stack: Iron Dome, Agent Registry, Omniprocessor, Commander. 96% AI cost reduction.",
    href: "/architecture",
    commander: true,
  },
  Work: {
    tag: "Case study",
    title: "Commander Architecture",
    body: "Autonomous 5-agent pipeline — ~90% prompt cache hit rate, ~$0.001/task on local Qwen agents.",
    href: "/work#commander-architecture",
    commander: true,
  },
};

/* Small inline glyph per nav group (no emoji-as-icon; SVG node motif) */
function GroupGlyph({ d, tone = "signal" }: { d: string; tone?: "signal" | "commander" }) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <circle cx="8" cy="3" r="2" fill={tone === "commander" ? "var(--color-commander-500)" : "var(--color-signal-500)"} />
      <circle cx="3" cy="12.5" r="1.6" fill="var(--color-signal-500)" opacity="0.85" />
      <circle cx="13" cy="12.5" r="1.6" fill="var(--color-signal-500)" opacity="0.85" />
      <path d="M8 5.4 3.6 11M8 5.4l4.4 5.6" stroke="var(--color-line-strong)" strokeWidth="1.2" />
      <path d={d} stroke="var(--color-line-strong)" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const GLYPHS: Record<string, string> = {
  Services: "M2 8h12",
  Solutions: "M2 8h12M8 2v12",
  "Architecture Flagship": "M8 2v5M8 7 3 12M8 7l5 5",
  Work: "M2 11l4-6 3 4 5-7",
};

function MegaPanel({ item, onClose }: { item: NavItem; onClose: () => void }) {
  const f = featured[item.label];
  const cols = item.children && item.children.length > 6 ? 2 : 1;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.99 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-x-0 top-full"
    >
      <div className="mx-auto w-full max-w-7xl px-5 lg:px-8">
        <div
          className="glass-deep grad-border mt-2 overflow-hidden rounded-2xl shadow-2xl shadow-black/60"
          style={{ transformOrigin: "top" }}
        >
          <div className={cn("grid", f ? "lg:grid-cols-[1.6fr_1fr]" : "")}>
            {/* link columns */}
            <div
              className={cn(
                "grid gap-1 p-4",
                cols === 2 ? "sm:grid-cols-2" : "grid-cols-1"
              )}
            >
              <ul>
                <li key="all">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="font-mono group flex items-center gap-2.5 rounded-lg px-3 py-2 text-[0.7rem] uppercase tracking-[0.16em] text-signal-300 transition-colors hover:bg-signal-900/25"
                  >
                    <GroupGlyph d={GLYPHS[item.label] ?? ""} />
                    Overview — all {item.label.toLowerCase()}
                    <span aria-hidden="true" className="ml-auto opacity-0 transition-opacity group-hover:opacity-100">→</span>
                  </Link>
                </li>
              </ul>
              <ul className={cn("grid gap-1", cols === 2 ? "sm:col-span-2 sm:grid-cols-2" : "")}>
                {item.children?.map((child) => (
                  <li key={child.href + child.label}>
                    <Link
                      href={child.href}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2/80"
                    >
                      <span className="text-sm font-medium text-ink group-hover:text-signal-300">
                        {child.label}
                      </span>
                      {child.hint && (
                        <span className="font-mono hidden shrink-0 text-[0.6rem] uppercase tracking-[0.12em] text-ink-mute md:block">
                          {child.hint}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* featured card */}
            {f && (
              <div className="relative border-t border-line/70 bg-surface-1/40 p-5 lg:border-l lg:border-t-0">
                <CornerGlow commander={f.commander} />
                <p className={cn("font-mono text-[0.62rem] uppercase tracking-[0.18em]", f.commander ? "text-commander-300" : "text-signal-300")}>
                  {f.tag}
                </p>
                <Link href={f.href} onClick={onClose} className="group mt-2 block">
                  <p className="font-display text-lg font-semibold text-ink group-hover:text-signal-200">
                    {f.title}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-dim">{f.body}</p>
                  <span className="font-mono mt-4 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.14em] text-signal-300">
                    Open <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CornerGlow({ commander = false }: { commander?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-3xl",
        commander ? "bg-commander-500/20" : "bg-signal-500/20"
      )}
    />
  );
}

function Logo() {
  return (
    <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="SHIVAM ITCS — home">
      <span
        aria-hidden="true"
        className="grad-border relative grid h-9 w-9 place-items-center rounded-lg bg-surface-1"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <circle cx="9" cy="4" r="2.2" fill="var(--color-commander-500)" />
          <circle cx="4" cy="13.5" r="1.7" fill="var(--color-signal-500)" />
          <circle cx="14" cy="13.5" r="1.7" fill="var(--color-signal-500)" />
          <path d="M9 6.2 4.6 11.9M9 6.2l4.4 5.7" stroke="var(--color-line-strong)" strokeWidth="1.2" />
        </svg>
      </span>
      <span className="leading-none">
        <span className="font-display block text-[0.95rem] font-semibold tracking-wide text-ink">
          SHIVAM ITCS
        </span>
        <span className="font-mono hidden text-[0.6rem] uppercase tracking-[0.18em] text-ink-mute sm:block">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}

function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpen(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const current = nav.find((n) => n.label === open && n.children);

  return (
    <div ref={navRef} className="hidden items-center gap-1 lg:flex" onMouseLeave={() => setOpen(null)}>
      {nav.map((item) =>
        item.children ? (
          <button
            key={item.label}
            type="button"
            aria-expanded={open === item.label}
            aria-haspopup="true"
            onClick={() => setOpen(open === item.label ? null : item.label)}
            onMouseEnter={() => setOpen(item.label)}
            onFocus={() => setOpen(item.label)}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
              open === item.label
                ? "bg-surface-2/80 text-signal-300"
                : "text-ink-dim hover:text-ink"
            )}
          >
            {item.label}
            <svg
              aria-hidden="true"
              width="8"
              height="8"
              viewBox="0 0 8 8"
              className={cn("transition-transform duration-200", open === item.label && "rotate-180")}
            >
              <path d="M1 2.5 4 5.5 7 2.5" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            </svg>
          </button>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            onMouseEnter={() => setOpen(null)}
            className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
          >
            {item.label}
          </Link>
        )
      )}

      {/* the mega layer lives inside the full-width header, not the nav row */}
      <AnimatePresence>
        {current && !reduced && <MegaPanel key={current.label} item={current} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </div>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen(!open)}
        className="glass grid h-10 w-10 place-items-center rounded-lg text-ink-dim"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
          {open ? (
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          ) : (
            <path d="M2 4.5h12M2 8h12M2 11.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="glass-deep fixed inset-0 top-[60px] z-40 overflow-y-auto"
          >
            <nav aria-label="Mobile" className="px-5 py-6">
              {nav.map((item) => (
                <div key={item.label} className="border-b border-line py-1">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                        aria-expanded={expanded === item.label}
                        className="font-display flex w-full items-center justify-between py-3.5 text-lg font-medium text-ink"
                      >
                        {item.label}
                        <span aria-hidden="true" className="font-mono text-sm text-signal-400">
                          {expanded === item.label ? "−" : "+"}
                        </span>
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded === item.label && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <li>
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="font-mono block py-2 pl-3 text-[0.7rem] uppercase tracking-[0.14em] text-signal-300"
                              >
                                Overview →
                              </Link>
                            </li>
                            {item.children.map((child) => (
                              <li key={child.href + child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2.5 pl-3 text-sm text-ink-dim"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="font-display block py-3.5 text-lg font-medium text-ink"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="font-display mt-6 block rounded-xl bg-gradient-to-r from-signal-600 to-signal-500 px-5 py-3.5 text-center font-semibold text-white shadow-[0_0_28px_-8px_var(--color-signal-500)]"
              >
                Start a Project →
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* Scroll progress hairline under the header */
function ScrollProgress() {
  const [p, setP] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setP(max > 0 ? window.scrollY / max : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);
  if (reduced) return null;
  return (
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px]">
      <div
        className="h-full origin-left bg-gradient-to-r from-signal-500 via-signal-300 to-commander-500"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

export function SiteHeader() {
  return (
    <header className="glass fixed inset-x-0 top-0 z-50 border-b border-line/70">
      <div className="relative mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="font-display shimmer hidden rounded-xl bg-gradient-to-r from-signal-600 to-signal-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_20px_-6px_var(--color-signal-500)] transition-shadow hover:shadow-[0_0_30px_-4px_var(--color-signal-500)] sm:block"
          >
            Start a Project →
          </Link>
          <MobileNav />
        </div>
        <ScrollProgress />
      </div>
    </header>
  );
}
