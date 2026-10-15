import { LOCALES, localePath } from "@lib/i18n/locales";

import type { LocaleT } from "@lib/i18n/locales";

export type PageKeyT = "landing" | "docsEn" | "docsEs" | "blogList" | "blogPost" | "notFound";

interface RouteI {
  path: string;
  page: PageKeyT;
  locale: LocaleT;
}

/** El contenido de docs se divide por locale para que cada bundle incluya un solo idioma. */
const DOCS_PAGE: Record<LocaleT, PageKeyT> = { en: "docsEn", es: "docsEs" };

const routesFor = (locale: LocaleT): RouteI[] => [
  { path: localePath(locale, "/"), page: "landing", locale },
  { path: localePath(locale, "/docs"), page: DOCS_PAGE[locale], locale },
  { path: localePath(locale, "/docs/:section"), page: DOCS_PAGE[locale], locale },
  { path: localePath(locale, "/blog"), page: "blogList", locale },
  { path: localePath(locale, "/blog/:slug"), page: "blogPost", locale },
];

export const ROUTES: RouteI[] = LOCALES.flatMap(routesFor);
