import React, { memo, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";

import { useT } from "@lib/i18n/useLocale";

import type { SidebarSectionI } from "@docs/infrastructure/ui/interfaces/DocsI";

interface DocsSidebarPropsI {
  activeSection: string;
  sidebarOpen: boolean;
  searchQuery: string;
  /** Secciones sin filtrar, usadas para índices estables estilo man-page ("1", "1.2"). */
  sections: SidebarSectionI[];
  filteredSections: SidebarSectionI[];
  onSearchChange: (query: string) => void;
  hrefFor: (id: string) => string;
}

export const DocsSidebar: React.FC<DocsSidebarPropsI> = memo(({
  activeSection,
  sidebarOpen,
  searchQuery,
  sections,
  filteredSections,
  onSearchChange,
  hrefFor,
}: DocsSidebarPropsI) => {
  const t = useT();

  const { sectionIndex, itemIndex } = useMemo(() => {
    const sectionIndex = new Map<string, string>();
    const itemIndex = new Map<string, string>();
    sections.forEach((section, s) => {
      sectionIndex.set(section.title, `${s + 1}`);
      section.items.forEach((item, i) => itemIndex.set(item.id, `${s + 1}.${i + 1}`));
    });
    return { sectionIndex, itemIndex };
  }, [sections]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value),
    [onSearchChange],
  );

  return (
    <aside
      id="docs-sidebar"
      className={`fixed lg:sticky top-[52px] left-0 z-40 h-[calc(100vh-52px)] w-72 shrink-0 overflow-y-auto border-r border-border bg-background font-mono transition-transform lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full max-lg:invisible"
      }`}
    >
      <div className="p-4">
        <label className="mb-6 flex items-center gap-2 border border-border bg-surface-1 px-3 py-2 text-sm focus-within:border-primary">
          <span aria-hidden className="text-primary">/</span>
          <input
            type="text"
            placeholder={t.docs.search}
            aria-label={t.docs.searchLabel}
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-transparent text-foreground placeholder:text-dim focus:outline-none"
          />
        </label>

        {filteredSections.length === 0 && (
          <p className="px-2 text-sm text-dim">{t.docs.noMatches}</p>
        )}

        {filteredSections.map((section) => (
          <nav key={section.title} aria-label={section.title} className="mb-6">
            <p className="mb-2 px-2 text-xs uppercase tracking-widest text-dim">
              {sectionIndex.get(section.title)}. {section.title}
            </p>
            <ul>
              {section.items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      to={hrefFor(item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex w-full items-baseline gap-3 border-l-2 px-2 py-1.5 text-left text-sm transition-colors ${
                        isActive
                          ? "border-primary bg-surface-1 text-primary"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <span className={`w-8 shrink-0 text-xs ${isActive ? "text-primary" : "text-dim"}`}>
                        {itemIndex.get(item.id)}
                      </span>
                      <span className="lowercase">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ))}
      </div>
    </aside>
  );
});

DocsSidebar.displayName = "DocsSidebar";
