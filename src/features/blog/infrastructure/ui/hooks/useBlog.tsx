import { useCallback, useMemo } from "react";

import { BlogAdapter } from "@blog/application/adapters/blog.adapter";
import { BlogUseCases } from "@blog/infrastructure/usecases/blog.usecases";

import { useLocale } from "@lib/i18n/useLocale";

import type { PostSummaryT } from "@blog/domain/models/PostI";

/** Los posts son salida estática del build, así que no hay estado de carga: todo se resuelve de forma síncrona. */
export const useBlog = () => {
  const locale = useLocale();

  const blogUseCases = useMemo(() => {
    const blogAdapter = new BlogAdapter();
    return new BlogUseCases(blogAdapter);
  }, []);

  const posts = useMemo(() => blogUseCases.listPosts(locale), [blogUseCases, locale]);

  const getPost = useCallback(
    (slug: string) => blogUseCases.getPost(locale, slug),
    [blogUseCases, locale],
  );

  const getTranslations = useCallback(
    (key: string) => blogUseCases.getTranslations(key),
    [blogUseCases],
  );

  const getRelated = useCallback(
    (post: PostSummaryT) => blogUseCases.getRelated(post),
    [blogUseCases],
  );

  return { locale, posts, getPost, getTranslations, getRelated };
};
