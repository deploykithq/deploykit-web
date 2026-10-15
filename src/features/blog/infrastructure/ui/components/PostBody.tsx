import React, { memo, useEffect, useRef } from "react";

import { useInternalLinks } from "@/hooks/useInternalLinks";
import { useT } from "@lib/i18n/useLocale";

interface PostBodyPropsI {
  /** HTML de confianza compilado desde nuestro propio Markdown en build. */
  html: string;
}

const COPIED_MS = 2000;

/** El cuerpo del artículo; conecta los botones `[ copy ]` que el compilador de Markdown puso en los bloques de código. */
export const PostBody: React.FC<PostBodyPropsI> = memo(({ html }: PostBodyPropsI) => {
  const t = useT();
  const ref = useRef<HTMLDivElement>(null);
  const onClick = useInternalLinks();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const buttons = Array.from(root.querySelectorAll<HTMLButtonElement>("button[data-copy]"));
    const handlers = buttons.map((button) => {
      button.textContent = t.docs.copy;
      const handler = () => {
        const code = button.closest(".code-block")?.querySelector("pre")?.textContent ?? "";
        navigator.clipboard?.writeText(code).then(() => {
          button.textContent = t.docs.copied;
          button.dataset.copied = "true";
          timers.push(
            setTimeout(() => {
              button.textContent = t.docs.copy;
              delete button.dataset.copied;
            }, COPIED_MS),
          );
        });
      };
      button.addEventListener("click", handler);
      return () => button.removeEventListener("click", handler);
    });

    return () => {
      handlers.forEach((off) => off());
      timers.forEach(clearTimeout);
    };
  }, [html, t]);

  return <div ref={ref} className="blog-prose" onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />;
});

PostBody.displayName = "PostBody";
