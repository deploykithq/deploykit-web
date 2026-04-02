import { useState, useMemo, useCallback } from "react";
import { SIDEBAR_SECTIONS } from "@docs/infrastructure/ui/constants/docs.constants";
import type { SidebarSectionI } from "@docs/infrastructure/ui/types/docs.module.types";

export const useDocsNavigation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
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

  const navigateTo = useCallback((id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
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
