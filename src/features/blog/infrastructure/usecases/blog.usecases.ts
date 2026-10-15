import type { LocaleT } from "@lib/i18n/locales";
import type { PostI, PostSummaryT } from "@blog/domain/models/PostI";
import type { BlogPort } from "@blog/domain/ports/blog.port";

const MAX_RELATED = 3;

export class BlogUseCases implements BlogPort {
  constructor(private readonly _blogService: BlogPort) {}

  listPosts(locale: LocaleT): PostSummaryT[] {
    return this._blogService.listPosts(locale);
  }

  getPost(locale: LocaleT, slug: string): PostI | null {
    return this._blogService.getPost(locale, slug);
  }

  getTranslations(key: string): Partial<Record<LocaleT, PostSummaryT>> {
    return this._blogService.getTranslations(key);
  }

  /** Posts que comparten más etiquetas con `post`, los más recientes primero en caso de empate. */
  getRelated(post: PostSummaryT): PostSummaryT[] {
    return this.listPosts(post.locale)
      .filter((other) => other.key !== post.key)
      .map((other) => ({ other, shared: other.tags.filter((tag) => post.tags.includes(tag)).length }))
      .filter(({ shared }) => shared > 0)
      .sort((a, b) => b.shared - a.shared)
      .slice(0, MAX_RELATED)
      .map(({ other }) => other);
  }
}
