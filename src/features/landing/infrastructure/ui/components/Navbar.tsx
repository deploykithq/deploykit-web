import { m, AnimatePresence } from "framer-motion";
import { Rocket, Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV_LINKS } from "@landing/infrastructure/ui/constants/landing.constants";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass animate-hero-fade-in">

      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <Rocket className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-foreground" />
          </div>
          <span className="text-base sm:text-lg font-bold text-bright">DeployKit</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#cta"
            className="hidden sm:inline-flex rounded-lg bg-gradient-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 glow-sm"
          >
            Get Started
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-foreground"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <m.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden md:hidden border-t border-border"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setMobileOpen(false)}
                className="mt-1 rounded-lg bg-gradient-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
              >
                Get Started
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
