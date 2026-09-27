import Link from "next/link";
import { CommanderDiagramStatic } from "@/components/three/commander-diagram-static";

export default function NotFound() {
  return (
    <div className="relative z-10 mx-auto flex min-h-[70vh] w-full max-w-7xl flex-col items-center justify-center px-5 pt-20 text-center lg:px-8">
      <p className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-signal-300">
        404 · node not found
      </p>
      <h1 className="font-display mt-4 text-5xl font-bold text-ink sm:text-6xl">
        This route never deployed.
      </h1>
      <p className="mt-4 max-w-md text-lg text-ink-dim">
        The orchestrator has no agent registered for this URL. Return to a known-good node:
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="font-display rounded-lg bg-signal-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-signal-400"
        >
          ← Back to base
        </Link>
        <Link
          href="/architecture"
          className="font-display rounded-lg border border-line-strong px-6 py-3 font-semibold text-ink transition-colors hover:border-signal-600 hover:text-signal-300"
        >
          View the Architecture
        </Link>
      </div>
      <CommanderDiagramStatic className="mt-10 w-full max-w-md opacity-30" title="Commander Architecture diagram" />
    </div>
  );
}
