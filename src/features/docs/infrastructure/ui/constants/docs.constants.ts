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
  Bell,
  Users,
  Activity,
  Eye,
  Webhook,
  ScrollText,
  TerminalSquare,
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
      { id: "applications", label: "Applications", icon: Layers },
      { id: "databases", label: "Databases", icon: Database },
      { id: "domains", label: "Domains & SSL", icon: Shield },
      { id: "servers", label: "Servers", icon: Server },
      { id: "preview-deployments", label: "Preview Deployments", icon: Eye },
      { id: "notifications", label: "Notifications", icon: Bell },
      { id: "users-rbac", label: "Users & RBAC", icon: Users },
      { id: "monitoring", label: "Monitoring", icon: Activity },
    ],
  },
  {
    title: "Reference",
    items: [
      { id: "cli", label: "CLI Reference", icon: TerminalSquare },
      { id: "api", label: "API Reference", icon: Terminal },
      { id: "config", label: "Configuration", icon: Settings },
      { id: "webhooks", label: "Webhooks & CI/CD", icon: Webhook },
      { id: "audit-logs", label: "Audit Logs", icon: ScrollText },
    ],
  },
];
