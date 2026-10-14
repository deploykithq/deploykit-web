import { useState } from "react";
import {
  NAV_LINKS,
  GITHUB_URL,
} from "@landing/infrastructure/ui/constants/landing.constants";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
        <a href="/" className="font-mono text-base font-bold tracking-tight text-bright" aria-label="DeployKit home">
          deploykit
          <span aria-hidden className="text-primary animate-caret-blink">
            _
          </span>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-sm lowercase text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden font-mono text-sm text-muted-foreground transition-colors hover:text-primary sm:inline"
          >
            ★ star
          </a>
          <a
            href="#cta"
            className="bg-primary px-3 py-1.5 font-mono text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground"
          >
            get started
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            className="font-mono text-sm text-muted-foreground hover:text-foreground md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? "[x]" : "[≡]"}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <ul className="container mx-auto px-4 py-2 font-mono text-sm sm:px-6">
            {NAV_LINKS.map((link, i) => (
              <li key={link.href} className="border-b border-border/60 last:border-0">
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex gap-3 py-3 lowercase text-muted-foreground hover:text-primary"
                >
                  <span className="text-dim">{String(i + 1).padStart(2, "0")}</span>
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 py-3 text-muted-foreground hover:text-primary"
              >
                <span className="text-dim">{String(NAV_LINKS.length + 1).padStart(2, "0")}</span>
                ★ star on github
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
