import { memo, useCallback } from "react";
import { SIDEBAR_SECTIONS } from "@docs/infrastructure/ui/constants/docs.constants";
import type { SidebarSectionI } from "@docs/infrastructure/ui/types/docs.module.types";

interface DocsSidebarPropsI {
  activeSection: string;
  sidebarOpen: boolean;
  searchQuery: string;
  filteredSections: SidebarSectionI[];
  onSearchChange: (query: string) => void;
  onNavigate: (id: string) => void;
}

/** Stable man-page style indices ("1", "1.2"), unaffected by search filtering. */
const SECTION_INDEX = new Map<string, string>();
const ITEM_INDEX = new Map<string, string>();
SIDEBAR_SECTIONS.forEach((section, s) => {
  SECTION_INDEX.set(section.title, `${s + 1}`);
  section.items.forEach((item, i) => ITEM_INDEX.set(item.id, `${s + 1}.${i + 1}`));
});

export const DocsSidebar = memo(({
  activeSection,
  sidebarOpen,
  searchQuery,
  filteredSections,
  onSearchChange,
  onNavigate,
}: DocsSidebarPropsI) => {
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
            placeholder="search"
            aria-label="Search docs"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full bg-transparent text-foreground placeholder:text-dim focus:outline-none"
          />
        </label>

        {filteredSections.length === 0 && (
          <p className="px-2 text-sm text-dim">no matches.</p>
        )}

        {filteredSections.map((section) => (
          <div key={section.title} className="mb-6">
            <p className="mb-2 px-2 text-xs uppercase tracking-widest text-dim">
              {SECTION_INDEX.get(section.title)}. {section.title}
            </p>
            <ul>
              {section.items.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex w-full items-baseline gap-3 border-l-2 px-2 py-1.5 text-left text-sm transition-colors ${
                        isActive
                          ? "border-primary bg-surface-1 text-primary"
                          : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
                      }`}
                    >
                      <span className={`w-8 shrink-0 text-xs ${isActive ? "text-primary" : "text-dim"}`}>
                        {ITEM_INDEX.get(item.id)}
                      </span>
                      <span className="lowercase">{item.label}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
});

DocsSidebar.displayName = "DocsSidebar";
