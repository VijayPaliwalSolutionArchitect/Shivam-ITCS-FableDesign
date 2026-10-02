"use client";

/**
 * WordCycler — swaps a single word on a beat with a vertical mask transition.
 * Under prefers-reduced-motion it holds the first word.
 */

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function WordCycler({
  words,
  interval = 2400,
  className,
}: {
  words: string[];
  interval?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [reduced, interval, words.length]);

  return (
    <span className={className} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "bottom" }}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          className="inline-block"
          initial={reduced ? false : { y: "0.95em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: "-0.95em", opacity: 0 }}
          transition={{ duration: 0.42, ease: EASE }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
