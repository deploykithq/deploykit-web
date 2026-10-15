import {
  Rocket,
  Terminal,
  Zap,
  Database,
  Shield,
  Layers,
  Server,
  Settings,
  Bell,
  Users,
  Activity,
  Eye,
  Webhook,
  ScrollText,
  TerminalSquare,
  LayoutTemplate,
  Clock,
  Github,
  Radio,
  Gamepad2,
  ArrowLeftRight,
} from "lucide-react";

import type { DictionaryT } from "@lib/i18n/dictionaries/en";
import type { DocsSectionIdT, SidebarSectionI } from "@docs/infrastructure/ui/interfaces/DocsI";

/** La introducción se sirve en `/docs`, así que no tiene una URL `/docs/<id>` propia. */
export const DEFAULT_SECTION: DocsSectionIdT = "getting-started";

const SIDEBAR_LAYOUT = [
  {
    group: "gettingStarted",
    items: [
      { id: "getting-started", icon: Rocket },
      { id: "installation", icon: Terminal },
      { id: "quickstart", icon: Zap },
    ],
  },
  {
    group: "guides",
    items: [
      { id: "applications", icon: Layers },
      { id: "databases", icon: Database },
      { id: "domains", icon: Shield },
      { id: "servers", icon: Server },
      { id: "templates", icon: LayoutTemplate },
      { id: "scheduled-tasks", icon: Clock },
      { id: "preview-deployments", icon: Eye },
      { id: "github-app", icon: Github },
      { id: "notifications", icon: Bell },
      { id: "users-rbac", icon: Users },
      { id: "monitoring", icon: Activity },
      { id: "status-pages", icon: Radio },
      { id: "game-servers", icon: Gamepad2 },
    ],
  },
  {
    group: "reference",
    items: [
      { id: "cli", icon: TerminalSquare },
      { id: "api", icon: Terminal },
      { id: "config", icon: Settings },
      { id: "export-import", icon: ArrowLeftRight },
      { id: "webhooks", icon: Webhook },
      { id: "audit-logs", icon: ScrollText },
    ],
  },
] as const;

export const DOCS_SECTION_IDS: DocsSectionIdT[] = SIDEBAR_LAYOUT.flatMap((s) => s.items.map((i) => i.id));

export const getSidebarSections = (t: DictionaryT): SidebarSectionI[] =>
  SIDEBAR_LAYOUT.map((section) => ({
    title: t.docs.groups[section.group],
    items: section.items.map((item) => ({
      id: item.id,
      label: t.docs.sections[item.id],
      icon: item.icon,
    })),
  }));
