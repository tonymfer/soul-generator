"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils/cn";
import { generateAvatarSvg } from "@/lib/avatar";
import type { TraitVector } from "@/lib/generators/types";

export interface AvatarPreviewProps {
  traitVector: TraitVector;
  /** Display size in pixels (default: 128) */
  size?: number;
  className?: string;
}

/**
 * Client component that renders a deterministic pixel art avatar
 * directly in the DOM from a TraitVector.
 *
 * The SVG is generated from pure functions we control (no user input
 * reaches the SVG string), so dangerouslySetInnerHTML is safe here.
 */
export function AvatarPreview({
  traitVector,
  size = 128,
  className,
}: AvatarPreviewProps) {
  const svg = useMemo(() => generateAvatarSvg(traitVector), [traitVector]);

  return (
    <div
      className={cn(
        "relative inline-block pixel-border overflow-hidden",
        className,
      )}
      style={{
        width: size,
        height: size,
        imageRendering: "pixelated",
      }}
      role="img"
      aria-label="Soul avatar"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
