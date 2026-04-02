import { memo, useCallback } from "react";
import { Search } from "lucide-react";
import type { SidebarSectionI } from "@docs/infrastructure/ui/types/docs.module.types";

interface DocsSidebarPropsI {
  activeSection: string;
  sidebarOpen: boolean;
  searchQuery: string;
  filteredSections: SidebarSectionI[];
  onSearchChange: (query: string) => void;
  onNavigate: (id: string) => void;
}

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
      className={`fixed lg:sticky top-[52px] left-0 z-40 h-[calc(100vh-52px)] w-64 border-r border-border bg-background overflow-y-auto transition-transform lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-dim" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full rounded-lg border border-border bg-secondary pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-dim focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {filteredSections.map((section) => (
          <div key={section.title} className="mb-5">
            <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-dim">
              {section.title}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
});

DocsSidebar.displayName = "DocsSidebar";
