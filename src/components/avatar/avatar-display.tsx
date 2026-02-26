"use client";

import { cn } from "@/lib/utils/cn";
import { AvatarPreview } from "./avatar-preview";
import type { TraitVector } from "@/lib/generators/types";

export interface AvatarDisplayProps {
  /** Pre-rendered avatar URL (from storage) */
  avatarUrl?: string | null;
  /** TraitVector for inline generation */
  traitVector?: TraitVector | null;
  /** Display size in pixels (default: 128) */
  size?: number;
  className?: string;
}

/**
 * Versatile avatar component with fallback chain:
 * 1. If avatarUrl exists -> render <img>
 * 2. If traitVector exists -> render AvatarPreview (inline SVG)
 * 3. Fallback -> emoji placeholder
 */
export function AvatarDisplay({
  avatarUrl,
  traitVector,
  size = 128,
  className,
}: AvatarDisplayProps) {
  // Option 1: Pre-rendered image URL
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt="Soul avatar"
        width={size}
        height={size}
        className={cn(
          "pixel-border",
          className,
        )}
        style={{ imageRendering: "pixelated" }}
      />
    );
  }

  // Option 2: Generate inline from traits
  if (traitVector) {
    return (
      <AvatarPreview
        traitVector={traitVector}
        size={size}
        className={className}
      />
    );
  }

  // Option 3: Emoji fallback
  return (
    <div
      className={cn(
        "flex items-center justify-center pixel-border bg-accent-primary/10",
        className,
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Soul avatar placeholder"
    >
      <span style={{ fontSize: size * 0.4 }}>&#x1F52E;</span>
    </div>
  );
}
