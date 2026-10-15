import React, { memo, useState, useCallback, useEffect, useMemo, useRef } from "react";

import { useT } from "@lib/i18n/useLocale";

/** Quita las líneas en blanco de los extremos y la indentación común que traen los template literals. */
const dedent = (code: string) => {
  const lines = code.replace(/^\s*\n|\n\s*$/g, "").split("\n");
  const indent = Math.min(
    ...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length),
  );
  return lines.map((l) => l.slice(indent)).join("\n");
};

interface CodeBlockPropsI {
  code: string;
  language?: string;
}

export const CodeBlock: React.FC<CodeBlockPropsI> = memo(({ code: raw, language = "bash" }: CodeBlockPropsI) => {
  const t = useT();
  const code = useMemo(() => dedent(raw), [raw]);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleCopy = useCallback(() => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="border border-border bg-surface-1 font-mono">
      <div className="flex items-center justify-between border-b border-border px-4 py-2 text-[11px] uppercase tracking-widest">
        <span className="text-muted-foreground">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={t.docs.copySnippet(language)}
          className={copied ? "text-success" : "text-muted-foreground hover:text-primary"}
        >
          <span aria-live="polite">{copied ? t.docs.copied : t.docs.copy}</span>
        </button>
      </div>
      <pre className="overflow-x-auto bg-background p-4">
        <code className="text-[13px] leading-relaxed text-bright">{code}</code>
      </pre>
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";
