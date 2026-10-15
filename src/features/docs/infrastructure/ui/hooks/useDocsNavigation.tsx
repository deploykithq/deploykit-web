import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useLocale, useT } from "@lib/i18n/useLocale";

import {
  DEFAULT_SECTION,
  DOCS_SECTION_IDS,
  getSidebarSections,
} from "@docs/infrastructure/ui/constants/docs.constants";
import { docsPath } from "@docs/infrastructure/ui/utils/docsPath";

import type { DocsSectionIdT, SidebarSectionI } from "@docs/infrastructure/ui/interfaces/DocsI";

const isSectionId = (id: string): id is DocsSectionIdT =>
  (DOCS_SECTION_IDS as string[]).includes(id);

/** La sección sale de la ruta (`/docs/cli`), así que cada sección es una página indexable. */
export const useDocsNavigation = () => {
  const { section } = useParams<{ section?: string }>();
  const { hash } = useLocation();
  const navigate = useNavigate();
  const locale = useLocale();
  const t = useT();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const requested = section ?? DEFAULT_SECTION;
  const notFound = !isSectionId(requested);
  const activeSection: DocsSectionIdT = notFound ? DEFAULT_SECTION : requested;

  const sections = useMemo(() => getSidebarSections(t), [t]);

  // Los enlaces anteriores a las rutas por sección (`/docs#cli`) y `/docs/getting-started` aterrizan en la URL canónica.
  useEffect(() => {
    const legacy = !section && hash ? hash.slice(1) : null;
    if (legacy && isSectionId(legacy)) navigate(docsPath(locale, legacy), { replace: true });
    else if (section === DEFAULT_SECTION) navigate(docsPath(locale, DEFAULT_SECTION), { replace: true });
  }, [section, hash, locale, navigate]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [activeSection]);

  const filteredSections: SidebarSectionI[] = useMemo(
    () =>
      sections
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [sections, searchQuery],
  );

  const allItems = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  const currentIndex = useMemo(
    () => allItems.findIndex((i) => i.id === activeSection),
    [allItems, activeSection],
  );

  const prevItem = allItems[currentIndex - 1] ?? null;
  const nextItem = allItems[currentIndex + 1] ?? null;

  const hrefFor = useCallback((id: string) => docsPath(locale, id), [locale]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return {
    locale,
    activeSection,
    notFound,
    sections,
    sidebarOpen,
    searchQuery,
    setSearchQuery,
    filteredSections,
    prevItem,
    nextItem,
    hrefFor,
    toggleSidebar,
    closeSidebar,
  };
};
