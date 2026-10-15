import React, { memo } from "react";

import { useT } from "@lib/i18n/useLocale";

import { formatPostDate } from "@blog/infrastructure/ui/utils/blogPaths";

import type { PostSummaryT } from "@blog/domain/models/PostI";

interface PostMetaPropsI {
  post: PostSummaryT;
  className?: string;
}

/** `15 oct 2026 · 6 min read · [docker] [traefik]` */
export const PostMeta: React.FC<PostMetaPropsI> = memo(({ post, className = "" }: PostMetaPropsI) => {
  const t = useT();

  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-dim ${className}`}>
      <time dateTime={post.date}>{formatPostDate(post.date, post.locale)}</time>
      <span aria-hidden>·</span>
      <span>{t.blog.readingTime(post.readingMinutes)}</span>
      {post.tags.length > 0 && (
        <>
          <span aria-hidden>·</span>
          <span className="flex flex-wrap gap-2 lowercase text-primary">
            {post.tags.map((tag) => (
              <span key={tag}>[{tag}]</span>
            ))}
          </span>
        </>
      )}
    </p>
  );
});

PostMeta.displayName = "PostMeta";
