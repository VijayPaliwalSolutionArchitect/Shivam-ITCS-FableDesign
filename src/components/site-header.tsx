"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { nav, site } from "@/lib/content/site";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label="SHIVAM ITCS — home">
      <span
        aria-hidden="true"
        className="relative grid h-9 w-9 place-items-center rounded-md border border-line-strong bg-surface-1"
      >
        {/* Node glyph: commander core + two agents */}
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
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.18em] text-ink-mute">
          {site.tagline}
        </span>
      </span>
    </Link>
  );
}

function DropdownMenu({ items }: { items: { label: string; href: string; hint?: string }[] }) {
  return (
    <ul className="panel panel-ticks absolute left-0 top-full z-50 mt-3 w-72 overflow-hidden p-1.5 shadow-2xl shadow-black/50">
      {items.map((item) => (
        <li key={item.href + item.label}>
          <Link
            href={item.href}
            className="group/item flex items-baseline justify-between gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-surface-2"
          >
            <span className="text-sm font-medium text-ink group-hover/item:text-signal-300">
              {item.label}
            </span>
            {item.hint && (
              <span className="font-mono text-[0.62rem] uppercase tracking-wider text-ink-mute">
                {item.hint}
              </span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function DesktopNav() {
  const [open, setOpen] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={navRef} className="hidden items-center gap-1 lg:flex">
      {nav.map((item) =>
        item.children ? (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => setOpen(item.label)}
            onMouseLeave={() => setOpen(null)}
          >
            <button
              type="button"
              aria-expanded={open === item.label}
              aria-haspopup="true"
              onClick={() => setOpen(open === item.label ? null : item.label)}
              onFocus={() => setOpen(item.label)}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                open === item.label ? "text-signal-300" : "text-ink-dim hover:text-ink"
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
            <AnimatePresence>
              {open === item.label && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                >
                  <DropdownMenu items={item.children} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
          >
            {item.label}
          </Link>
        )
      )}
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
        className="grid h-10 w-10 place-items-center rounded-md border border-line-strong text-ink-dim"
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
            className="fixed inset-0 top-[60px] z-40 overflow-y-auto bg-base/97 backdrop-blur-md"
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
                        className="flex w-full items-center justify-between py-3 font-display text-lg font-medium text-ink"
                      >
                        {item.label}
                        <span aria-hidden="true" className="font-mono text-sm text-ink-mute">
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
                                className="block py-2 pl-3 text-sm text-signal-300"
                              >
                                All {item.label} →
                              </Link>
                            </li>
                            {item.children.map((child) => (
                              <li key={child.href + child.label}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2 pl-3 text-sm text-ink-dim"
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
                      className="block py-3 font-display text-lg font-medium text-ink"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-6 block rounded-lg bg-signal-500 px-5 py-3 text-center font-medium text-white"
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

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-base/80 backdrop-blur-lg">
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Logo />
        <DesktopNav />
        <div className="flex items-center gap-3">
          <Link
            href="/#contact"
            className="hidden rounded-lg bg-signal-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-signal-400 sm:block"
          >
            Start a Project →
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
