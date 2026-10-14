import { useState, useMemo, useCallback, useEffect } from "react";
import { SIDEBAR_SECTIONS } from "@docs/infrastructure/ui/constants/docs.constants";
import type { SidebarSectionI } from "@docs/infrastructure/ui/types/docs.module.types";

const DEFAULT_SECTION = "getting-started";
const SECTION_IDS = new Set(SIDEBAR_SECTIONS.flatMap((s) => s.items.map((i) => i.id)));

/** The section named by the URL hash (`/docs#cli`), so in-content links and shared URLs work. */
const sectionFromHash = () => {
  const id = window.location.hash.slice(1);
  return SECTION_IDS.has(id) ? id : DEFAULT_SECTION;
};

export const useDocsNavigation = () => {
  const [activeSection, setActiveSection] = useState(sectionFromHash);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSections: SidebarSectionI[] = useMemo(
    () =>
      SIDEBAR_SECTIONS
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((section) => section.items.length > 0),
    [searchQuery],
  );

  const allItems = useMemo(
    () => SIDEBAR_SECTIONS.flatMap((s) => s.items),
    [],
  );

  const currentIndex = useMemo(
    () => allItems.findIndex((i) => i.id === activeSection),
    [allItems, activeSection],
  );

  const prevItem = allItems[currentIndex - 1] ?? null;
  const nextItem = allItems[currentIndex + 1] ?? null;

  useEffect(() => {
    const onHashChange = () => {
      setActiveSection(sectionFromHash());
      setSidebarOpen(false);
      window.scrollTo({ top: 0 });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigateTo = useCallback((id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top: 0 });
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return {
    activeSection,
    sidebarOpen,
    searchQuery,
    setSearchQuery,
    filteredSections,
    prevItem,
    nextItem,
    navigateTo,
    toggleSidebar,
    closeSidebar,
  };
};
