import Link from "next/link";
import { footer, site } from "@/lib/content/site";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-line bg-base-raised" role="contentinfo">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="font-display text-lg font-semibold text-ink">{site.name}</p>
            <p className="mt-2 max-w-xs text-sm text-ink-dim">{footer.blurb}</p>
            <p className="readout mt-6 flex flex-wrap gap-x-3 gap-y-1">
              {footer.domains.map((d, i) => (
                <span key={d} className="flex items-center gap-3">
                  {i > 0 && <span aria-hidden="true" className="text-ink-mute">·</span>}
                  {d}
                </span>
              ))}
            </p>
            <p className="readout mt-4 flex items-center gap-2 text-ok">
              <span aria-hidden="true" className="inline-block h-2 w-2 rounded-full bg-ok animate-node-pulse" />
              {site.availability}
            </p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h2 className="text-system-label">{col.heading}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-sm text-ink-dim transition-colors hover:text-signal-300">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="readout">{site.copyright}</p>
          <p className="readout text-ink-mute">
            Est. {site.founded} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
