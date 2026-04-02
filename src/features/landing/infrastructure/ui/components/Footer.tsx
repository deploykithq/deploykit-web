import { Rocket } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-primary">
            <Rocket className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-sm font-semibold text-bright">DeployKit</span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} DeployKit. Open source under MIT license.
        </p>
      </div>
    </footer>
  );
};
