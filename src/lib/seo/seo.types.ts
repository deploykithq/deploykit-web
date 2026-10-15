import type { LocaleT } from "@lib/i18n/locales";

export interface SeoMetaI {
  title: string;
  description: string;
  locale: LocaleT;
  /** Ruta de esta página con prefijo de locale, p. ej. `/es/blog/foo`. */
  path: string;
  /** Ruta de esta misma página en cada locale, para hreflang. Omitir en páginas sin traducción. */
  alternates?: Partial<Record<LocaleT, string>>;
  type?: "website" | "article";
  /** URL de imagen absoluta o relativa a la raíz; por defecto, la imagen OG del sitio. */
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noindex?: boolean;
  jsonLd?: Record<string, unknown>[];
}

/** Lo rellena `useSeo` durante el renderizado en servidor para que el prerender pueda escribir el head de la página. */
export interface SeoCollectorI {
  meta: SeoMetaI | null;
}
