import React, { memo } from "react";
import { Link } from "react-router-dom";

import { PostMeta } from "./PostMeta";

import { useT } from "@lib/i18n/useLocale";

import { postPath } from "@blog/infrastructure/ui/utils/blogPaths";

import type { PostSummaryT } from "@blog/domain/models/PostI";

interface PostCardPropsI {
  post: PostSummaryT;
  index: number;
}

/** Una fila estilo `ls -l` del índice de posts. */
export const PostCard: React.FC<PostCardPropsI> = memo(({ post, index }: PostCardPropsI) => {
  const t = useT();

  return (
    <li className="group border-t border-border first:border-t-0">
      <Link
        to={postPath(post.locale, post.slug)}
        className="grid gap-x-8 gap-y-3 py-6 md:grid-cols-[3rem_minmax(0,1fr)_auto] md:items-baseline"
      >
        <span className="font-mono text-xs text-dim transition-colors group-hover:text-primary">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="min-w-0">
          <h2 className="font-mono text-lg font-bold leading-snug text-bright transition-colors group-hover:text-primary sm:text-xl">
            {post.title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{post.description}</p>
          <PostMeta post={post} className="mt-3" />
        </div>
        <span className="hidden font-mono text-sm text-muted-foreground transition-colors group-hover:text-primary md:inline">
          {t.blog.readPost}
        </span>
      </Link>
    </li>
  );
});

PostCard.displayName = "PostCard";
