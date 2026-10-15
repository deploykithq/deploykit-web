import posts from "virtual:blog-posts";

import type { LocaleT } from "@lib/i18n/locales";
import type { PostI, PostSummaryT } from "@blog/domain/models/PostI";
import type { BlogPort } from "@blog/domain/ports/blog.port";

const toSummary = ({ html: _html, toc: _toc, ...summary }: PostI): PostSummaryT => summary;

/** Lee los posts que el plugin de Vite del blog compiló desde `content/blog`, los más recientes primero. */
export class BlogAdapter implements BlogPort {
  listPosts(locale: LocaleT): PostSummaryT[] {
    return posts.filter((post) => post.locale === locale).map(toSummary);
  }

  getPost(locale: LocaleT, slug: string): PostI | null {
    return posts.find((post) => post.locale === locale && post.slug === slug) ?? null;
  }

  getTranslations(key: string): Partial<Record<LocaleT, PostSummaryT>> {
    return Object.fromEntries(
      posts.filter((post) => post.key === key).map((post) => [post.locale, toSummary(post)]),
    );
  }
}
