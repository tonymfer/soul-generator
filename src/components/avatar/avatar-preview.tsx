"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { generatePortrait, renderHtml } from "@/lib/avatar";
import type { TraitVector } from "@/lib/generators/types";

export interface AvatarPreviewProps {
  traitVector: TraitVector;
  /** Controls font-size scaling (default: 128) */
  size?: number;
  className?: string;
}

/**
 * Client component that renders a deterministic ASCII portrait
 * directly in the DOM from a TraitVector.
 *
 * Safety: The HTML is generated from pure functions we control —
 * TraitVector is validated to contain only known enum values before
 * reaching this component. No user-supplied strings enter the HTML
 * output, making innerHTML usage safe here.
 */
export function AvatarPreview({
  traitVector,
  size = 128,
  className,
}: AvatarPreviewProps) {
  const html = useMemo(() => {
    const portrait = generatePortrait(traitVector);
    return renderHtml(portrait);
  }, [traitVector]);

  // Scale font-size to fit the portrait within the given size.
  // Grid is 7 rows tall with line-height 1.15, so total height ~ 7 * 1.15 * fontSize.
  const fontSize = Math.floor(size / 8);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded bg-[#0a0a0f]",
        className,
      )}
      style={{
        fontSize: `${fontSize}px`,
        padding: `${Math.max(4, Math.floor(fontSize * 0.5))}px`,
      }}
      role="img"
      aria-label="Soul avatar"
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
