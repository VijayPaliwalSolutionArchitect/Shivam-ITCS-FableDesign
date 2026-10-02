"use client";

/**
 * AgentCanvas — the signature hero visual: a live agent-graph.
 *
 * 34 drifting nodes, proximity edges, glowing packets travelling the links, and
 * amber links that reach back to the pointer (the "commander" acknowledging the
 * user). Plain 2D canvas so it never touches the R3F scene budget.
 *
 * Perf discipline: DPR capped at 2, rAF paused when off-screen, O(n²) kept at
 * n=34 (561 pairs), and under prefers-reduced-motion a SINGLE static frame is
 * drawn — no loop at all.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Node = { x: number; y: number; vx: number; vy: number; r: number };
type Packet = { a: number; b: number; t: number; sp: number };

const SIGNAL = "62, 123, 250";
const COMMANDER = "245, 166, 35";
const LINK_D2 = 20000;

export function AgentCanvas({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: -1, y: -1, inside: false });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const N = 34;
    let nodes: Node[] = [];
    const packets: Packet[] = [];

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      w = Math.max(1, r.width);
      h = Math.max(1, r.height);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodes = Array.from({ length: N }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: 1 + Math.random() * 1.6,
      }));
      packets.length = 0;
    };

    const render = (advance: boolean) => {
      ctx.clearRect(0, 0, w, h);

      if (advance) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        if (packets.length < 9 && Math.random() < 0.03) {
          const a = Math.floor(Math.random() * N);
          let b = Math.floor(Math.random() * N);
          if (b === a) b = (a + 1) % N;
          packets.push({ a, b, t: 0, sp: 0.006 + Math.random() * 0.008 });
        }
      }

      // proximity edges
      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK_D2) {
            const a = (1 - d2 / LINK_D2) * 0.42;
            ctx.strokeStyle = `rgba(${SIGNAL}, ${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // pointer → commander links
      if (pointer.current.inside) {
        for (const n of nodes) {
          const dx = n.x - pointer.current.x;
          const dy = n.y - pointer.current.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 34000) {
            const a = (1 - d2 / 34000) * 0.75;
            ctx.strokeStyle = `rgba(${COMMANDER}, ${a.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(pointer.current.x, pointer.current.y);
            ctx.lineTo(n.x, n.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(${SIGNAL}, 0.85)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // travelling packets
      for (let k = packets.length - 1; k >= 0; k--) {
        const p = packets[k];
        if (advance) p.t += p.sp;
        if (p.t >= 1) {
          packets.splice(k, 1);
          continue;
        }
        const a = nodes[p.a];
        const b = nodes[p.b];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        ctx.fillStyle = `rgba(138, 178, 255, 0.95)`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    seed();

    if (reduced) {
      render(false);
      return;
    }

    const loop = () => {
      if (visible) render(true);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      pointer.current.x = x;
      pointer.current.y = y;
      pointer.current.inside = x >= 0 && y >= 0 && x <= w && y <= h;
    };
    const onLeave = () => {
      pointer.current.inside = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    let rt = 0;
    const onResize = () => {
      window.clearTimeout(rt);
      rt = window.setTimeout(() => {
        resize();
        seed();
      }, 180);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.clearTimeout(rt);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  );
}
