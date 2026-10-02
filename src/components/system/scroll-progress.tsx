"use client";

/**
 * ScrollProgress — hairline readout of page progress pinned to the top.
 * Animated with transform: scaleX only (never width).
 */

import { useEffect, useState } from "react";

export function ScrollProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const read = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setP(max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
      <div
        className="h-full origin-left bg-gradient-to-r from-signal-600 via-signal-400 to-commander-500"
        style={{ transform: `scaleX(${p})`, willChange: "transform" }}
      />
    </div>
  );
}
