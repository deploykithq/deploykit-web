import { useDocsNavigation } from "@docs/infrastructure/ui/hooks/useDocsNavigation";
import { DocsHeader, DocsSidebar, DocsContent } from "@docs/infrastructure/ui/components";

export const DocsPage = () => {
  const {
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
  } = useDocsNavigation();

  return (
    <div className="min-h-screen bg-background">
      <DocsHeader onToggleSidebar={toggleSidebar} />

      <div className="flex pt-[52px]">
        <DocsSidebar
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
          searchQuery={searchQuery}
          filteredSections={filteredSections}
          onSearchChange={setSearchQuery}
          onNavigate={navigateTo}
        />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
            onClick={closeSidebar}
          />
        )}

        <DocsContent
          activeSection={activeSection}
          prevItem={prevItem}
          nextItem={nextItem}
          onNavigate={navigateTo}
        />
      </div>
    </div>
  );
};
