// ============================================================
// Avatar Palette System (Dark Terminal Theme)
// Maps MBTI types to signature colors for ASCII portraits
// Pure functions — no framework dependencies
// ============================================================

import type { TraitVector } from "../generators/types";

/** Color palette for ASCII portrait rendering */
export interface AsciiPalette {
  /** MBTI signature color — primary body/outline */
  primary: string;
  /** Dimmed primary — softer borders, shade characters */
  dim: string;
  /** Brightened primary — highlights, emphasis */
  bright: string;
  /** Light feature color — eyes, mouth (high contrast on dark bg) */
  feature: string;
  /** Accent for accessories and decorations */
  accent: string;
}

/** @deprecated Use AsciiPalette instead */
export type AvatarPalette = AsciiPalette;

// ============================================================
// MBTI Signature Colors (dark-theme optimized)
// ============================================================

const MBTI_COLORS: Record<string, string> = {
  INTJ: "#7c6ef6", // Deep violet
  INTP: "#5b8def", // Slate blue
  ENTJ: "#94a3b8", // Steel
  ENTP: "#22d3ee", // Electric cyan
  INFJ: "#a78bfa", // Soft lavender
  INFP: "#f0abfc", // Dusty rose
  ENFJ: "#fbbf24", // Warm gold
  ENFP: "#f472b6", // Hot pink
  ISTJ: "#4ade80", // Forest green
  ISFJ: "#5eead4", // Soft teal
  ESTJ: "#cbd5e1", // Iron gray
  ESFJ: "#fb923c", // Peach
  ISTP: "#a1a1aa", // Cool zinc
  ISFP: "#86efac", // Sage
  ESTP: "#f87171", // Red-orange
  ESFP: "#e879f9", // Magenta
};

// ============================================================
// Color utilities
// ============================================================

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [
    parseInt(c.slice(0, 2), 16),
    parseInt(c.slice(2, 4), 16),
    parseInt(c.slice(4, 6), 16),
  ];
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b]
    .map((c) =>
      Math.round(Math.max(0, Math.min(255, c)))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

/** Darken a hex color by multiplying each channel */
function dimColor(hex: string, factor = 0.4): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(r * factor, g * factor, b * factor);
}

/** Lighten a hex color by blending toward white */
function brightenColor(hex: string, factor = 0.4): string {
  const [r, g, b] = hexToRgb(hex);
  return rgbToHex(
    r + (255 - r) * factor,
    g + (255 - g) * factor,
    b + (255 - b) * factor,
  );
}

// ============================================================
// Public API
// ============================================================

/** Get the MBTI signature color for a given type */
export function getMbtiColor(mbti: string): string {
  return MBTI_COLORS[mbti] ?? "#7c6ef6";
}

/**
 * Deterministically generate a palette from a TraitVector.
 * Primary color is determined by MBTI type.
 * Dim/bright variants are derived automatically.
 */
export function getPalette(traits: TraitVector): AsciiPalette {
  const primary = getMbtiColor(traits.mbti);

  return {
    primary,
    dim: dimColor(primary, 0.4),
    bright: brightenColor(primary, 0.6),
    feature: "#e0e0e0",
    accent: brightenColor(primary, 0.4),
  };
}
