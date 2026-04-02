import type { LucideIcon } from "lucide-react";

export interface SidebarItemI {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface SidebarSectionI {
  title: string;
  items: SidebarItemI[];
}

export interface DocsSectionContentI {
  title: string;
  description: string;
  content: React.ReactNode;
}
