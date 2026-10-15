import { createContext, useContext, useEffect } from "react";

import { renderHead } from "@lib/seo/renderHead";

import type { SeoCollectorI, SeoMetaI } from "@lib/seo/seo.types";

/** Solo lo provee la entrada de servidor; en el cliente queda en null. */
export const SeoCollectorContext = createContext<SeoCollectorI | null>(null);

const applyHead = (head: string, lang: string) => {
  document.head.querySelectorAll("[data-seo]").forEach((node) => node.remove());
  const template = document.createElement("template");
  template.innerHTML = head;
  document.head.append(template.content);
  document.documentElement.lang = lang;
};

/**
 * Declara el head de la página actual. Durante el prerender entrega los meta
 * al colector; en el navegador reescribe el head tras navegar.
 */
export const useSeo = (meta: SeoMetaI) => {
  const collector = useContext(SeoCollectorContext);
  if (collector) collector.meta = meta;

  const head = renderHead(meta);
  useEffect(() => {
    applyHead(head, meta.locale);
  }, [head, meta.locale]);
};
