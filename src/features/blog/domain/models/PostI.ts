import type { LocaleT } from "@lib/i18n/locales";

export interface TocEntryI {
  id: string;
  text: string;
  /** 2 para `##`, 3 para `###`. */
  depth: number;
}

/** Un post en un idioma, compilado desde `content/blog/<key>/<locale>.md` en build. */
export interface PostI {
  /** Nombre de la carpeta; el mismo para todas las traducciones del post. */
  key: string;
  locale: LocaleT;
  slug: string;
  title: string;
  description: string;
  /** Fecha ISO, `YYYY-MM-DD`. */
  date: string;
  updated: string | null;
  tags: string[];
  cover: string | null;
  author: string;
  readingMinutes: number;
  toc: TocEntryI[];
  /** HTML renderizado y de confianza (nuestro propio Markdown, compilado en build). */
  html: string;
}

export type PostSummaryT = Omit<PostI, "html" | "toc">;
