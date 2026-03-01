"use client";

import { useState, useCallback, type ReactNode } from "react";
import { PixelCard } from "@/components/ui/pixel-card";
import { PixelButton } from "@/components/ui/pixel-button";
import { ChevronDown, ChevronUp, Copy, Check } from "lucide-react";
import { useMessages } from "@/lib/i18n";

// ============================================================
// Simple markdown renderer — no external libraries
// Handles: headers, bold, inline code, code blocks, lists, paragraphs
// ============================================================

function parseMarkdown(md: string): ReactNode[] {
  const lines = md.split("\n");
  const elements: ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block (```)
    if (line.trimStart().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <pre
          key={key++}
          className="bg-text-primary/5 p-3 pixel-border-sm overflow-x-auto text-[10px] font-mono leading-relaxed text-text-primary"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      continue;
    }

    // Headers
    if (line.startsWith("### ")) {
      elements.push(
        <h4 key={key++} className="font-pixel text-[10px] text-accent-pink mt-4 mb-1">
          {renderInline(line.slice(4))}
        </h4>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={key++} className="font-pixel text-xs text-accent-primary mt-4 mb-1">
          {renderInline(line.slice(3))}
        </h3>
      );
      i++;
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(
        <h2 key={key++} className="font-pixel text-sm text-accent-primary mt-4 mb-2">
          {renderInline(line.slice(2))}
        </h2>
      );
      i++;
      continue;
    }

    // Unordered list items
    if (/^[\s]*[-*]\s/.test(line)) {
      const listItems: ReactNode[] = [];
      while (i < lines.length && /^[\s]*[-*]\s/.test(lines[i])) {
        const content = lines[i].replace(/^[\s]*[-*]\s/, "");
        listItems.push(
          <li key={key++} className="font-pixel-accent text-[11px] text-text-primary leading-relaxed">
            {renderInline(content)}
          </li>
        );
        i++;
      }
      elements.push(
        <ul key={key++} className="list-disc list-inside space-y-0.5 pl-2">
          {listItems}
        </ul>
      );
      continue;
    }

    // Ordered list items
    if (/^[\s]*\d+\.\s/.test(line)) {
      const listItems: ReactNode[] = [];
      while (i < lines.length && /^[\s]*\d+\.\s/.test(lines[i])) {
        const content = lines[i].replace(/^[\s]*\d+\.\s/, "");
        listItems.push(
          <li key={key++} className="font-pixel-accent text-[11px] text-text-primary leading-relaxed">
            {renderInline(content)}
          </li>
        );
        i++;
      }
      elements.push(
        <ol key={key++} className="list-decimal list-inside space-y-0.5 pl-2">
          {listItems}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="font-pixel-accent text-[11px] text-text-primary leading-relaxed">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

/** Render inline markdown: **bold**, `code`, *italic* */
function renderInline(text: string): ReactNode {
  // Split on patterns: **bold**, `code`, *italic*
  const parts: ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold: **text**
    const boldMatch = remaining.match(/^([\s\S]*?)\*\*(.+?)\*\*([\s\S]*)/);
    if (boldMatch) {
      if (boldMatch[1]) parts.push(boldMatch[1]);
      parts.push(
        <strong key={key++} className="font-bold text-accent-primary">
          {boldMatch[2]}
        </strong>
      );
      remaining = boldMatch[3];
      continue;
    }

    // Inline code: `text`
    const codeMatch = remaining.match(/^([\s\S]*?)`(.+?)`([\s\S]*)/);
    if (codeMatch) {
      if (codeMatch[1]) parts.push(codeMatch[1]);
      parts.push(
        <code
          key={key++}
          className="bg-accent-primary/10 text-accent-primary px-1 py-0.5 text-[10px] font-mono"
        >
          {codeMatch[2]}
        </code>
      );
      remaining = codeMatch[3];
      continue;
    }

    // No more patterns — push remaining text
    parts.push(remaining);
    break;
  }

  return parts.length === 1 ? parts[0] : <>{parts}</>;
}

// ============================================================
// SoulMdViewer — main component
// ============================================================

const COLLAPSED_LINE_COUNT = 10;

interface SoulMdViewerProps {
  soulMd: string;
}

export function SoulMdViewer({ soulMd }: SoulMdViewerProps) {
  const m = useMessages();
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const lines = soulMd.split("\n");
  const needsCollapse = lines.length > COLLAPSED_LINE_COUNT;
  const displayContent = isExpanded
    ? soulMd
    : lines.slice(0, COLLAPSED_LINE_COUNT).join("\n");

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(soulMd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback: ignore if clipboard fails
    }
  }, [soulMd]);

  return (
    <PixelCard className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-pixel text-sm text-accent-primary">SOUL.md</h2>
        <PixelButton
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
        </PixelButton>
      </div>

      <div className="space-y-2 relative">
        {parseMarkdown(displayContent)}
        {needsCollapse && !isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-card-bg to-transparent pointer-events-none" />
        )}
      </div>

      {needsCollapse && (
        <PixelButton
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
              <span>{m.viewer.viewFullSoulMd}</span>
            </>
          )}
        </PixelButton>
      )}
    </PixelCard>
  );
}
