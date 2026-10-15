import React from "react";

import { NotFound } from "@shared/components/not-found";

import { DocsContent } from "@docs/infrastructure/ui/components/DocsContent";
import { DocsHeader } from "@docs/infrastructure/ui/components/DocsHeader";
import { DocsSidebar } from "@docs/infrastructure/ui/components/DocsSidebar";

import { useDocsNavigation } from "@docs/infrastructure/ui/hooks/useDocsNavigation";
import { useT } from "@lib/i18n/useLocale";
import { useSeo } from "@lib/seo/useSeo";

import { LOCALES } from "@lib/i18n/locales";
import { absoluteUrl } from "@lib/seo/site";
import { docsPath } from "@docs/infrastructure/ui/utils/docsPath";

import type { DocsContentT } from "@docs/infrastructure/ui/interfaces/DocsI";

interface DocsPagePropsI {
  /** La documentación en el idioma de la ruta; cada locale tiene su propio bundle. */
  content: DocsContentT;
}

export const DocsPage: React.FC<DocsPagePropsI> = ({ content }) => {
  const t = useT();
  const {
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
  } = useDocsNavigation();

  const current = content[activeSection];
  const path = docsPath(locale, activeSection);
  const title = `${current.title} — ${t.docs.titleSuffix}`;

  // Una sección desconocida renderiza NotFound; el head de esta página debe ser coherente con ello (los efectos hijos se ejecutan primero).
  useSeo(notFound ? {
    title: t.notFound.title,
    description: t.notFound.message,
    locale,
    path: `${docsPath(locale, "getting-started")}/unknown`,
    noindex: true,
  } : {
    title,
    description: current.description,
    locale,
    path,
    alternates: Object.fromEntries(LOCALES.map((l) => [l, docsPath(l, activeSection)])),
    type: "article",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: current.title,
        description: current.description,
        inLanguage: locale,
        url: absoluteUrl(path),
        isPartOf: { "@type": "WebSite", name: "DeployKit", url: absoluteUrl("/") },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.nav.docs, item: absoluteUrl(docsPath(locale, "getting-started")) },
          { "@type": "ListItem", position: 2, name: current.title, item: absoluteUrl(path) },
        ],
      },
    ],
  });

  if (notFound) return <NotFound />;

  return (
    <div className="min-h-screen bg-background">
      <DocsHeader sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />

      <div className="flex pt-[52px]">
        <DocsSidebar
          activeSection={activeSection}
          sidebarOpen={sidebarOpen}
          searchQuery={searchQuery}
          sections={sections}
          filteredSections={filteredSections}
          onSearchChange={setSearchQuery}
          hrefFor={hrefFor}
        />

        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-background/80 lg:hidden"
            onClick={closeSidebar}
          />
        )}

        <DocsContent
          activeSection={activeSection}
          current={current}
          prevItem={prevItem}
          nextItem={nextItem}
          hrefFor={hrefFor}
        />
      </div>
    </div>
  );
};
