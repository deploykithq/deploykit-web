import {
  Rocket,
  Terminal,
  Zap,
  Globe,
  Database,
  Shield,
  Layers,
  Server,
  Settings,
  GitBranch,
} from "lucide-react";
import type { SidebarSectionI } from "@docs/infrastructure/ui/types/docs.module.types";

export const SIDEBAR_SECTIONS: SidebarSectionI[] = [
  {
    title: "Getting Started",
    items: [
      { id: "getting-started", label: "Introduction", icon: Rocket },
      { id: "installation", label: "Installation", icon: Terminal },
      { id: "quickstart", label: "Quickstart", icon: Zap },
    ],
  },
  {
    title: "Guides",
    items: [
      { id: "deploy-app", label: "Deploy an app", icon: Globe },
      { id: "databases", label: "Databases", icon: Database },
      { id: "domains", label: "Domains & SSL", icon: Shield },
      { id: "scaling", label: "Scaling", icon: Layers },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "cli", label: "CLI Reference", icon: Terminal },
      { id: "api", label: "API Reference", icon: Server },
      { id: "config", label: "Configuration", icon: Settings },
      { id: "ci-cd", label: "CI/CD", icon: GitBranch },
    ],
  },
];