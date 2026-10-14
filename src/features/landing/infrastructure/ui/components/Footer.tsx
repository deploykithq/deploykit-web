import {
  DEPLOYKIT_VERSION,
  GITHUB_URL,
} from "@landing/infrastructure/ui/constants/landing.constants";

const COLUMNS = [
  {
    title: "product",
    links: [
      { label: "Features", href: "#features" },
      { label: "How it works", href: "#how-it-works" },
      { label: "Demo", href: "#demo" },
    ],
  },
  {
    title: "docs",
    links: [
      { label: "Installation", href: "/docs" },
      { label: "CLI Reference", href: "/docs" },
      { label: "API Reference", href: "/docs" },
    ],
  },
  {
    title: "project",
    links: [
      { label: "GitHub", href: GITHUB_URL },
      { label: "Contributing", href: "https://github.com/deploykithq/deploykit?tab=contributing-ov-file" },
      { label: "License (MIT)", href: "https://github.com/deploykithq/deploykit?tab=MIT-1-ov-file" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="font-mono">
      <div className="container mx-auto grid gap-8 px-4 py-12 sm:grid-cols-[1.4fr_1fr_1fr_1fr] sm:px-6">
        <div>
          <p className="text-base font-bold text-bright">
            deploykit<span className="text-primary">_</span>
          </p>
          <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-muted-foreground">
            The open-source, self-hosted PaaS. Deploy apps and databases on your own
            infrastructure — no vendor lock-in.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h4 className="text-xs uppercase tracking-widest text-dim">{col.title}/</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="lowercase text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* tmux-style status line */}
      <div className="border-t border-border bg-surface-1 text-xs">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-6">
          <p className="flex items-center gap-3">
            <span className="bg-primary px-2 py-0.5 font-semibold text-primary-foreground">deploykit</span>
            <span className="text-muted-foreground">0:landing*</span>
          </p>
          <p className="flex flex-wrap items-center gap-x-3 text-dim">
            <span className="text-success">● all systems operational</span>
            {[DEPLOYKIT_VERSION, "MIT", `© ${new Date().getFullYear()}`].map((item) => (
              <span key={item}>
                <span aria-hidden className="mr-3">│</span>
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
};
