import { useCallback, useEffect, useRef, useState } from "react";

/** Copies `text` to the clipboard and flags `copied` for a short moment. */
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
