"use client";

import dynamic from "next/dynamic";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion, useIdleAfterLoad } from "@/lib/motion";
import { initScrollDrivers, pointerState } from "./scroll-store";
import { CommanderDiagramStatic } from "./commander-diagram-static";

/**
 * Lazy-loaded so WebGL init never blocks first paint. The ssr:false
 * dynamic import keeps three.js out of the server bundle entirely.
 */
const CommanderScene = dynamic(() => import("./commander-scene"), { ssr: false });

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * The signature layer: a fixed, persistent 3D node graph of the
 * Sovereign Commander Architecture that follows the user down the page.
 *
 * Falls back to a fully static SVG diagram (no camera moves, no
 * particles) when the user prefers reduced motion or WebGL is absent.
 */
export function CommanderBackdrop({ dim = true }: { dim?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const idle = useIdleAfterLoad();
  const [hasWebgl, setHasWebgl] = useState(true);
  const [driversReady, setDriversReady] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [failed, setFailed] = useState(false);
  const layerRef = useRef<HTMLDivElement>(null);

  // Probe WebGL once on the client
  useEffect(() => {
    setHasWebgl(webglAvailable());
  }, []);

  // GSAP ScrollTrigger drivers + pointer parallax feed
  useEffect(() => {
    if (reduced || !hasWebgl) return;
    const cleanup = initScrollDrivers();
    setDriversReady(true);
    const onPointer = (e: PointerEvent) => {
      pointerState.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerState.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    return () => {
      cleanup();
      window.removeEventListener("pointermove", onPointer);
    };
  }, [reduced, hasWebgl]);

  // Mount the canvas only after load + idle → LCP is text-first
  useEffect(() => {
    if (reduced || !hasWebgl || !driversReady) return;
    if (idle) {
      const raf = requestAnimationFrame(() => setMounted(true));
      return () => cancelAnimationFrame(raf);
    }
  }, [idle, driversReady, reduced, hasWebgl]);

  const showScene = mounted && !reduced && hasWebgl && !failed;
  const showStatic = !showScene && (reduced || !hasWebgl || failed);

  return (
    <div ref={layerRef} className="pointer-events-none fixed inset-0 z-0" data-testid="commander-backdrop">
      {/* Reserve layout space before the canvas mounts — zero CLS */}
      <div className="absolute inset-0" style={{ contain: "strict" }} aria-hidden="true">
        {showScene && (
          <ErrorBoundaryFallback onError={() => setFailed(true)}>
            <div className="h-full w-full opacity-90">
              <CommanderScene />
            </div>
          </ErrorBoundaryFallback>
        )}
        {showStatic && (
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <CommanderDiagramStatic
              className="h-full max-h-[85vh] w-auto max-w-[70vw] opacity-[0.16]"
              title="Static Commander Architecture diagram (reduced motion)"
            />
          </div>
        )}

        {/* Readability veil between the graph and the content */}
        {dim && showScene && (
          <div className="absolute inset-0 bg-gradient-to-b from-base/55 via-base/35 to-base/70" />
        )}
      </div>

      {/* Text-equivalent for screen readers — WebGL output is opaque to AT */}
      <p className="sr-only-text">
        Commander Architecture pipeline: market intelligence triggers (RSS feeds, news APIs, trend
        signals) flow to the Claude Opus Supreme Commander, which reads signals and generates
        directives.json. The n8n orchestrator routes tasks to the Qwen 3:32B script agent and Qwen
        3.5:27B video agent, both running locally on Ollama at zero cloud cost. Finished output is
        published and indexed automatically. Result: ~90% prompt cache hit rate and 40–70% lower AI
        spend versus pure cloud inference.
      </p>
    </div>
  );
}

/* Minimal error boundary — a WebGL context loss shouldn't take the page down */
class ErrorBoundaryFallback extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidUpdate() {
    if (this.state.failed) this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
