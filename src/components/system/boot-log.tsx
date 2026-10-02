"use client";

/**
 * BootLog — terminal type-on boot sequence. Types each line sequentially, then
 * holds a blinking cursor. Under prefers-reduced-motion the full log renders at
 * once, in its final state.
 */

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const LINES = [
  "> boot commander ............... ok",
  "> load model fleet: claude · gpt · glm · qwen … ok",
  "> arm cost-first fallback ...... ok",
  "> register agents: 12 / 12 online",
];

export function BootLog({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const [lineIdx, setLineIdx] = useState(reduced ? LINES.length : 0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (reduced) {
      setLineIdx(LINES.length);
      setCharIdx(0);
      return;
    }
    let li = 0;
    let ci = 0;
    let raf = 0;
    let last = 0;
    let done = false;

    const step = (t: number) => {
      if (done) return;
      if (!last) last = t;
      if (t - last >= 22) {
        last = t;
        const line = LINES[li];
        if (ci < line.length) {
          ci += 1;
          setCharIdx(ci);
        } else {
          li += 1;
          ci = 0;
          if (li >= LINES.length) {
            setLineIdx(LINES.length);
            setCharIdx(0);
            done = true;
            return;
          }
          setLineIdx(li);
          setCharIdx(0);
        }
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  const complete = lineIdx >= LINES.length;

  return (
    <div className={cn("readout space-y-0.5", className)}>
      {LINES.map((l, i) => {
        if (i < lineIdx) return <div key={i}>{l}</div>;
        if (i === lineIdx && !complete)
          return (
            <div key={i}>
              {l.slice(0, charIdx)}
              <span className="text-signal-400">▌</span>
            </div>
          );
        return null;
      })}
      {complete && <div className="text-ok">▌ all systems ready</div>}
    </div>
  );
}
