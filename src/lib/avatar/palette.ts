// ============================================================
// Avatar Palette System
// Maps personality traits to kawaii color palettes
// Pure functions — no framework dependencies
// ============================================================

import type { TraitVector } from "../generators/types";

/** Color palette for a single avatar */
export interface AvatarPalette {
  /** Main face/body color */
  body: string;
  /** Hair/accessory accent color */
  accent: string;
  /** Eye color */
  eyes: string;
  /** Background fill */
  bg: string;
  /** Background pattern accent */
  bgAccent: string;
}

// ============================================================
// Palette families — based on communication_style
// Each family has 3 variations indexed by formality (low/mid/high)
// ============================================================

const PALETTE_FAMILIES: Record<
  TraitVector["communication_style"],
  AvatarPalette[]
> = {
  // Cool / blue tones
  direct: [
    { body: "#bae6fd", accent: "#38bdf8", eyes: "#0c4a6e", bg: "#f0f9ff", bgAccent: "#7dd3fc" },
    { body: "#93c5fd", accent: "#3b82f6", eyes: "#1e3a5f", bg: "#eff6ff", bgAccent: "#60a5fa" },
    { body: "#7dd3fc", accent: "#0ea5e9", eyes: "#0369a1", bg: "#e0f2fe", bgAccent: "#38bdf8" },
  ],
  // Warm / pink tones
  warm: [
    { body: "#fecdd3", accent: "#fb7185", eyes: "#9f1239", bg: "#fff1f2", bgAccent: "#fda4af" },
    { body: "#fbcfe8", accent: "#f472b6", eyes: "#831843", bg: "#fdf2f8", bgAccent: "#f9a8d4" },
    { body: "#fda4af", accent: "#fb923c", eyes: "#7c2d12", bg: "#fff7ed", bgAccent: "#fdba74" },
  ],
  // Mint / green tones
  analytical: [
    { body: "#a7f3d0", accent: "#34d399", eyes: "#064e3b", bg: "#ecfdf5", bgAccent: "#6ee7b7" },
    { body: "#99f6e4", accent: "#2dd4bf", eyes: "#134e4a", bg: "#f0fdfa", bgAccent: "#5eead4" },
    { body: "#6ee7b7", accent: "#10b981", eyes: "#065f46", bg: "#d1fae5", bgAccent: "#34d399" },
  ],
  // Purple / lavender tones
  expressive: [
    { body: "#ddd6fe", accent: "#a78bfa", eyes: "#4c1d95", bg: "#f5f3ff", bgAccent: "#c4b5fd" },
    { body: "#e9d5ff", accent: "#c084fc", eyes: "#581c87", bg: "#faf5ff", bgAccent: "#d8b4fe" },
    { body: "#c4b5fd", accent: "#8b5cf6", eyes: "#3b0764", bg: "#ede9fe", bgAccent: "#a78bfa" },
  ],
};

// ============================================================
// Saturation boost — high enthusiasm shifts colors warmer
// ============================================================

/**
 * Very simple hex color adjustment: blend toward a warm tint.
 * We only do this for high-enthusiasm souls to give them
 * a subtle rosy glow.
 */
function blendHex(hex: string, tint: string, amount: number): string {
  const parse = (h: string) => {
    const c = h.replace("#", "");
    return [
      parseInt(c.slice(0, 2), 16),
      parseInt(c.slice(2, 4), 16),
      parseInt(c.slice(4, 6), 16),
    ] as [number, number, number];
  };

  const [r1, g1, b1] = parse(hex);
  const [r2, g2, b2] = parse(tint);

  const mix = (a: number, b: number) =>
    Math.round(a + (b - a) * amount)
      .toString(16)
      .padStart(2, "0");

  return `#${mix(r1, r2)}${mix(g1, g2)}${mix(b1, b2)}`;
}

// ============================================================
// Public API
// ============================================================

/**
 * Deterministically select a color palette from a TraitVector.
 *
 * Selection logic:
 * 1. communication_style -> palette family
 * 2. formality_level -> variation within family (low/mid/high)
 * 3. enthusiasm_baseline > 0.7 -> warm tint blend on body color
 */
export function getPalette(traits: TraitVector): AvatarPalette {
  const family = PALETTE_FAMILIES[traits.communication_style];

  // Map formality_level (0-1) to index 0, 1, or 2
  const formalityIndex =
    traits.formality_level < 0.33 ? 0 : traits.formality_level < 0.66 ? 1 : 2;

  const base = { ...family[formalityIndex] };

  // High enthusiasm -> subtle warm tint on body
  if (traits.enthusiasm_baseline > 0.7) {
    const blendAmount = (traits.enthusiasm_baseline - 0.7) / 0.3; // 0-1 range
    base.body = blendHex(base.body, "#fecdd3", blendAmount * 0.25);
  }

  return base;
}
