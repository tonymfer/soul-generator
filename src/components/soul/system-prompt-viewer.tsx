"use client";

import { useState, useCallback } from "react";
import { TerminalCard } from "@/components/ui/terminal-card";
import { TerminalButton } from "@/components/ui/terminal-button";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { useMessages } from "@/lib/i18n";

// ============================================================
// SystemPromptViewer — displays system prompt with copy & collapse
// ============================================================

interface SystemPromptViewerProps {
  systemPrompt: string;
}

export function SystemPromptViewer({ systemPrompt }: SystemPromptViewerProps) {
  const m = useMessages();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(systemPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: ignore if clipboard fails
    }
  }, [systemPrompt]);

  // Line-based collapse (matching soul-md-viewer approach)
  const COLLAPSE_LINE_LIMIT = 5;
  const lines = systemPrompt.split("\n");
  const needsCollapse = lines.length > COLLAPSE_LINE_LIMIT;
  const displayText = isExpanded || !needsCollapse
    ? systemPrompt
    : lines.slice(0, COLLAPSE_LINE_LIMIT).join("\n") + "...";

  return (
    <TerminalCard className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-sm text-accent-primary">
          {m.viewer.systemPromptTitle}
        </h2>
        <TerminalButton
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="gap-1.5"
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>{m.viewer.copied}</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>{m.viewer.copy}</span>
            </>
          )}
        </TerminalButton>
      </div>

      <div className="relative">
        <pre className="whitespace-pre-wrap break-words font-pixel-accent font-mono text-[11px] text-text-primary leading-relaxed bg-text-primary/5 p-4 terminal-border-sm overflow-hidden">
          {displayText}
        </pre>
        {needsCollapse && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card-bg to-transparent pointer-events-none" />
        )}
      </div>

      {needsCollapse && (
        <TerminalButton
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className="w-full gap-1.5"
        >
          {isExpanded ? (
            <>
              <ChevronUp size={12} />
              <span>{m.viewer.collapse}</span>
            </>
          ) : (
            <>
              <ChevronDown size={12} />
              <span>{m.viewer.viewFullPrompt}</span>
            </>
          )}
        </TerminalButton>
      )}
    </TerminalCard>
  );
}
