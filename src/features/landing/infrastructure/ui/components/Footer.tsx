import { Rocket, Github } from "lucide-react";
import { GITHUB_URL } from "@landing/infrastructure/ui/constants/landing.constants";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Demo", href: "#demo" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Installation", href: "/docs" },
      { label: "CLI Reference", href: "/docs" },
      { label: "API Reference", href: "/docs" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "GitHub", href: GITHUB_URL },
      { label: "Contributing", href: "https://github.com/deploykithq/deploykit?tab=contributing-ov-file" },
      { label: "License (MIT)", href: "https://github.com/deploykithq/deploykit?tab=MIT-1-ov-file" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/60 py-12 sm:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Rocket className="h-4 w-4 text-primary-foreground" />
              </span>
              <span className="font-display text-lg font-bold text-bright">DeployKit</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              The open-source, self-hosted PaaS. Deploy apps and databases on your own
              infrastructure — no vendor lock-in.
            </p>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg surface-card px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:border-glow"
            >
              <Github className="h-4 w-4" />
              Star on GitHub
            </a>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-bright">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} DeployKit. Open source under the MIT license.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse-glow" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  );
};
