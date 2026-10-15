import { useCallback, useEffect, useRef, useState } from "react";

/** Copia `text` al portapapeles y activa `copied` un instante. */
export const useCopyToClipboard = (text: string, resetMs = 1800) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), resetMs);
    });
  }, [text, resetMs]);

  return { copied, copy };
};
