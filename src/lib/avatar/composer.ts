// ============================================================
// Avatar Composer
// Assembles SVG avatar parts into a complete 64x64 pixel art SVG
// Pure functions — no framework dependencies
// ============================================================

import type { TraitVector } from "../generators/types";
import type { AvatarPalette } from "./palette";
import { getPalette } from "./palette";
import type { BodyType, EyeStyle, MouthStyle, TopAccessory, BgPattern } from "./parts-catalog";
import {
  getBodyShape,
  getEyeStyle,
  getMouthStyle,
  getTopAccessory,
  getBgPattern,
} from "./parts-catalog";

// ============================================================
// Types
// ============================================================

export interface AvatarConfig {
  bodyType: BodyType;
  eyeStyle: EyeStyle;
  mouthStyle: MouthStyle;
  topAccessory: TopAccessory;
  bgPattern: BgPattern;
  palette: AvatarPalette;
  /** Adds sparkle particles around the character */
  adhd: "none" | "inattentive" | "hyperactive" | "combined";
  /** 0-1, adds rosy cheeks when high */
  enthusiasm: number;
  /** 0-1, adds blush marks when high */
  empathy: number;
}

// ============================================================
// Trait -> Config mapping
// ============================================================

/**
 * Deterministically maps a TraitVector to an AvatarConfig.
 * Every trait contributes to a visual feature.
 */
export function traitToAvatarConfig(traits: TraitVector): AvatarConfig {
  return {
    bodyType: traits.energy_pattern,
    eyeStyle: traits.humor_type,
    mouthStyle: traits.communication_style,
    topAccessory: traits.decision_mode,
    bgPattern: traits.response_structure,
    palette: getPalette(traits),
    adhd: traits.adhd,
    enthusiasm: traits.enthusiasm_baseline,
    empathy: traits.empathy,
  };
}

// ============================================================
// Extra detail generators
// ============================================================

/** ADHD sparkle particles scattered around the character */
function adhdSparkles(palette: AvatarPalette): string {
  const sparkleColor = palette.accent;
  return [
    // Top-left sparkle
    `<polygon points="10,14 11,16 13,16 11.5,17.5 12,19.5 10,18 8,19.5 8.5,17.5 7,16 9,16" fill="${sparkleColor}" opacity="0.7"/>`,
    // Top-right sparkle
    `<polygon points="54,10 55,12 57,12 55.5,13.5 56,15.5 54,14 52,15.5 52.5,13.5 51,12 53,12" fill="${sparkleColor}" opacity="0.6"/>`,
    // Bottom-left sparkle
    `<polygon points="8,50 9,52 11,52 9.5,53.5 10,55.5 8,54 6,55.5 6.5,53.5 5,52 7,52" fill="${sparkleColor}" opacity="0.5"/>`,
    // Bottom-right sparkle
    `<polygon points="56,46 57,48 59,48 57.5,49.5 58,51.5 56,50 54,51.5 54.5,49.5 53,48 55,48" fill="${sparkleColor}" opacity="0.65"/>`,
    // Extra tiny dots
    `<circle cx="14" cy="44" r="1" fill="${sparkleColor}" opacity="0.4"/>`,
    `<circle cx="50" cy="22" r="1" fill="${sparkleColor}" opacity="0.45"/>`,
  ].join("");
}

/** Rosy cheek blush for high enthusiasm */
function rosyCheeks(): string {
  return [
    `<circle cx="22" cy="39" r="3" fill="#fda4af" opacity="0.45"/>`,
    `<circle cx="42" cy="39" r="3" fill="#fda4af" opacity="0.45"/>`,
  ].join("");
}

/** Subtle empathy blush marks (short diagonal lines on cheeks) */
function empathyBlush(palette: AvatarPalette): string {
  return [
    `<line x1="20" y1="38" x2="22" y2="40" stroke="${palette.accent}" stroke-width="0.8" opacity="0.3"/>`,
    `<line x1="21" y1="38" x2="23" y2="40" stroke="${palette.accent}" stroke-width="0.8" opacity="0.3"/>`,
    `<line x1="41" y1="38" x2="43" y2="40" stroke="${palette.accent}" stroke-width="0.8" opacity="0.3"/>`,
    `<line x1="42" y1="38" x2="44" y2="40" stroke="${palette.accent}" stroke-width="0.8" opacity="0.3"/>`,
  ].join("");
}

// ============================================================
// SVG Composer
// ============================================================

/**
 * Composes a complete SVG string from an AvatarConfig.
 *
 * Layer order (back to front):
 * 1. Background fill
 * 2. Background pattern
 * 3. Body shape
 * 4. Eyes
 * 5. Mouth
 * 6. Extra details (cheeks, blush)
 * 7. Top accessory
 * 8. ADHD sparkles (if enabled)
 */
export function composeSvg(config: AvatarConfig): string {
  const { palette } = config;

  const layers: string[] = [];

  // 1. Background
  layers.push(`<rect width="64" height="64" fill="${palette.bg}"/>`);

  // 2. Background pattern
  layers.push(getBgPattern(config.bgPattern, palette));

  // 3. Body
  layers.push(getBodyShape(config.bodyType, palette));

  // 4. Eyes
  layers.push(getEyeStyle(config.eyeStyle, palette));

  // 5. Mouth
  layers.push(getMouthStyle(config.mouthStyle, palette));

  // 6. Extra details based on numeric traits
  if (config.enthusiasm > 0.6) {
    layers.push(rosyCheeks());
  }
  if (config.empathy > 0.7) {
    layers.push(empathyBlush(palette));
  }

  // 7. Top accessory
  layers.push(getTopAccessory(config.topAccessory, palette));

  // 8. ADHD sparkles
  if (config.adhd !== "none") {
    layers.push(adhdSparkles(palette));
  }

  // Wrap in SVG document
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64" shape-rendering="crispEdges">`,
    layers.join(""),
    `</svg>`,
  ].join("");
}

/**
 * Convenience: generate a complete SVG directly from a TraitVector.
 */
export function generateAvatarSvg(traits: TraitVector): string {
  return composeSvg(traitToAvatarConfig(traits));
}
