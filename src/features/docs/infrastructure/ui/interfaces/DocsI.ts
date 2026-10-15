import type { LucideIcon } from "lucide-react";
import type { DictionaryT } from "@lib/i18n/dictionaries/en";

export type DocsSectionIdT = keyof DictionaryT["docs"]["sections"];

export interface SidebarItemI {
  id: DocsSectionIdT;
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

/** Un idioma de toda la documentación. */
export type DocsContentT = Record<DocsSectionIdT, DocsSectionContentI>;
