import { memo, useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockPropsI {
  code: string;
  language?: string;
}

export const CodeBlock = memo(({ code, language = "bash" }: CodeBlockPropsI) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <div className="group relative rounded-xl border border-border bg-secondary/50 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs font-mono text-dim">{language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? <Check className="h-3 w-3 text-green-400" /> : <Copy className="h-3 w-3" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto">
        <code className="text-sm font-mono text-foreground leading-relaxed">{code}</code>
      </pre>
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";
