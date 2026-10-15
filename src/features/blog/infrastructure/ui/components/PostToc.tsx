import React, { memo } from "react";

import { useT } from "@lib/i18n/useLocale";

import type { TocEntryI } from "@blog/domain/models/PostI";

interface PostTocPropsI {
  toc: TocEntryI[];
}

export const PostToc: React.FC<PostTocPropsI> = memo(({ toc }: PostTocPropsI) => {
  const t = useT();
  if (toc.length < 2) return null;

  return (
    <nav aria-label={t.blog.contents} className="font-mono text-sm">
      <p className="mb-3 text-xs uppercase tracking-widest text-dim">{t.blog.contents}/</p>
      <ol className="space-y-1.5 border-l border-border">
        {toc.map((entry) => (
          <li key={entry.id} className={entry.depth === 3 ? "pl-7" : "pl-3"}>
            <a href={`#${entry.id}`} className="text-muted-foreground transition-colors hover:text-primary">
              {entry.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
});

PostToc.displayName = "PostToc";
