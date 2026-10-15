import type { LocaleT } from "@lib/i18n/locales";
import type { PostI, PostSummaryT } from "@blog/domain/models/PostI";

/**
 * Los posts se compilan en el bundle durante el build, así que el contrato es
 * síncrono: las páginas deben renderizarse completas durante el prerender.
 */
export interface BlogPort {
  listPosts: (locale: LocaleT) => PostSummaryT[];
  getPost: (locale: LocaleT, slug: string) => PostI | null;
  /** Cada versión de idioma de un post, indexada por locale. */
  getTranslations: (key: string) => Partial<Record<LocaleT, PostSummaryT>>;
}
