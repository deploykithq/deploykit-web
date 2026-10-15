import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import type { MouseEvent } from "react";

/**
 * Manejador de clics para un contenedor de markup estático (JSX de docs, HTML de posts): los
 * clics en `<a>` del mismo origen se convierten en navegaciones del router en lugar de recargas completas.
 */
export const useInternalLinks = () => {
  const navigate = useNavigate();

  return useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as HTMLElement).closest("a");
      if (!anchor || anchor.target || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/") || href.startsWith("//")) return;
      // Las anclas de la misma página conservan el salto nativo del navegador.
      if (href.startsWith("#")) return;

      event.preventDefault();
      navigate(href);
    },
    [navigate],
  );
};
