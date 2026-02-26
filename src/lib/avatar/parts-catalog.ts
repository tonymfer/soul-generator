// ============================================================
// Avatar Parts Catalog
// SVG element snippets for each composable avatar part
// Pure functions — no framework dependencies
//
// All coordinates target a 64x64 viewBox.
// Each function returns SVG element strings (NOT full documents).
// ============================================================

import type { AvatarPalette } from "./palette";
import type { TraitVector } from "../generators/types";

// ============================================================
// Type definitions
// ============================================================

export type BodyType = TraitVector["energy_pattern"];
export type EyeStyle = TraitVector["humor_type"];
export type MouthStyle = TraitVector["communication_style"];
export type TopAccessory = TraitVector["decision_mode"];
export type BgPattern = TraitVector["response_structure"];

// ============================================================
// Body shapes — based on energy_pattern
// ============================================================

const bodyShapes: Record<BodyType, (p: AvatarPalette) => string> = {
  // Rounded square — stable, consistent
  steady(p) {
    return `<rect x="16" y="20" width="32" height="32" rx="8" ry="8" fill="${p.body}" stroke="${p.accent}" stroke-width="1.5"/>`;
  },

  // Star / spiky shape — bursts of energy
  burst(p) {
    return `<polygon points="32,18 36,28 46,28 38,34 41,44 32,38 23,44 26,34 18,28 28,28" fill="${p.body}" stroke="${p.accent}" stroke-width="1.5" stroke-linejoin="round"/>`;
  },

  // Diamond / angular — quick reactions
  reactive(p) {
    return `<polygon points="32,18 48,36 32,54 16,36" fill="${p.body}" stroke="${p.accent}" stroke-width="1.5" stroke-linejoin="round"/>`;
  },

  // Circle / cloud — soft, diffuse energy
  ambient(p) {
    return [
      `<circle cx="32" cy="36" r="16" fill="${p.body}" stroke="${p.accent}" stroke-width="1.5"/>`,
      // Small cloud bumps for extra softness
      `<circle cx="22" cy="32" r="5" fill="${p.body}"/>`,
      `<circle cx="42" cy="32" r="5" fill="${p.body}"/>`,
      `<circle cx="32" cy="26" r="5" fill="${p.body}"/>`,
    ].join("");
  },
};

// ============================================================
// Eye styles — based on humor_type
// ============================================================

const eyeStyles: Record<EyeStyle, (p: AvatarPalette) => string> = {
  // Half-closed / unimpressed dots
  dry(p) {
    return [
      `<rect x="25" y="34" width="4" height="2" rx="1" fill="${p.eyes}"/>`,
      `<rect x="35" y="34" width="4" height="2" rx="1" fill="${p.eyes}"/>`,
    ].join("");
  },

  // Upside-down U — happy squinty eyes
  pun(p) {
    return [
      `<path d="M25,35 Q27,31 29,35" fill="none" stroke="${p.eyes}" stroke-width="1.5" stroke-linecap="round"/>`,
      `<path d="M35,35 Q37,31 39,35" fill="none" stroke="${p.eyes}" stroke-width="1.5" stroke-linecap="round"/>`,
    ].join("");
  },

  // One eye bigger — asymmetric skeptical look
  sarcastic(p) {
    return [
      `<circle cx="27" cy="34" r="2.5" fill="${p.eyes}"/>`,
      `<circle cx="37" cy="33" r="1.5" fill="${p.eyes}"/>`,
      // Raised eyebrow over the smaller eye
      `<line x1="34" y1="29" x2="40" y2="28" stroke="${p.eyes}" stroke-width="1" stroke-linecap="round"/>`,
    ].join("");
  },

  // Big round sparkly kawaii eyes
  wholesome(p) {
    return [
      // Left eye
      `<circle cx="27" cy="33" r="3.5" fill="${p.eyes}"/>`,
      `<circle cx="28" cy="32" r="1" fill="#ffffff"/>`,
      // Right eye
      `<circle cx="37" cy="33" r="3.5" fill="${p.eyes}"/>`,
      `<circle cx="38" cy="32" r="1" fill="#ffffff"/>`,
    ].join("");
  },

  // X eyes or spiral — chaotic energy
  absurd(p) {
    return [
      // Left X eye
      `<line x1="24" y1="31" x2="29" y2="36" stroke="${p.eyes}" stroke-width="1.5" stroke-linecap="round"/>`,
      `<line x1="29" y1="31" x2="24" y2="36" stroke="${p.eyes}" stroke-width="1.5" stroke-linecap="round"/>`,
      // Right spiral eye
      `<path d="M35,33 Q37,31 39,33 Q37,35 36,33.5" fill="none" stroke="${p.eyes}" stroke-width="1.2" stroke-linecap="round"/>`,
    ].join("");
  },
};

// ============================================================
// Mouth styles — based on communication_style
// ============================================================

const mouthStyles: Record<MouthStyle, (p: AvatarPalette) => string> = {
  // Straight line — matter-of-fact
  direct(p) {
    return `<line x1="28" y1="41" x2="36" y2="41" stroke="${p.eyes}" stroke-width="1.5" stroke-linecap="round"/>`;
  },

  // Gentle smile curve — friendly
  warm(p) {
    return `<path d="M28,40 Q32,44 36,40" fill="none" stroke="${p.eyes}" stroke-width="1.5" stroke-linecap="round"/>`;
  },

  // Small circle — "oh" / thinking expression
  analytical(p) {
    return `<circle cx="32" cy="41" r="2" fill="none" stroke="${p.eyes}" stroke-width="1.2"/>`;
  },

  // Big open smile — excited
  expressive(p) {
    return [
      `<path d="M26,39 Q32,47 38,39" fill="${p.accent}" stroke="${p.eyes}" stroke-width="1.2" stroke-linecap="round"/>`,
      // Tongue peek
      `<circle cx="32" cy="43" r="1.5" fill="#fda4af"/>`,
    ].join("");
  },
};

// ============================================================
// Top accessories — based on decision_mode
// ============================================================

const topAccessories: Record<TopAccessory, (p: AvatarPalette) => string> = {
  // Square glasses on top of head
  logical(p) {
    return [
      `<rect x="22" y="16" width="8" height="5" rx="1" fill="none" stroke="${p.accent}" stroke-width="1.2"/>`,
      `<rect x="34" y="16" width="8" height="5" rx="1" fill="none" stroke="${p.accent}" stroke-width="1.2"/>`,
      `<line x1="30" y1="18" x2="34" y2="18" stroke="${p.accent}" stroke-width="1"/>`,
    ].join("");
  },

  // Star / sparkle crown
  intuitive(p) {
    return [
      `<polygon points="32,8 34,14 38,14 35,17 36,22 32,19 28,22 29,17 26,14 30,14" fill="${p.accent}"/>`,
      `<circle cx="25" cy="16" r="1.5" fill="${p.accent}" opacity="0.6"/>`,
      `<circle cx="39" cy="16" r="1.5" fill="${p.accent}" opacity="0.6"/>`,
    ].join("");
  },

  // Heart antenna
  consensus(p) {
    return [
      `<line x1="32" y1="20" x2="32" y2="12" stroke="${p.accent}" stroke-width="1.2"/>`,
      `<path d="M28,11 Q28,7 32,10 Q36,7 36,11 Q36,14 32,16 Q28,14 28,11Z" fill="${p.accent}"/>`,
    ].join("");
  },

  // Flame / lightning bolt — impulsive energy
  impulsive(p) {
    return [
      `<polygon points="30,8 35,16 32,16 36,24 28,15 31,15" fill="${p.accent}" stroke="${p.eyes}" stroke-width="0.5"/>`,
    ].join("");
  },
};

// ============================================================
// Background patterns — based on response_structure
// ============================================================

const bgPatterns: Record<BgPattern, (p: AvatarPalette) => string> = {
  // Grid dots — structured, organized
  organized(p) {
    const dots: string[] = [];
    for (let x = 4; x < 64; x += 8) {
      for (let y = 4; y < 64; y += 8) {
        dots.push(
          `<circle cx="${x}" cy="${y}" r="0.8" fill="${p.bgAccent}" opacity="0.35"/>`
        );
      }
    }
    return dots.join("");
  },

  // Wavy lines — flowing, stream-of-consciousness
  "stream-of-consciousness"(p) {
    return [
      `<path d="M0,16 Q16,12 32,16 Q48,20 64,16" fill="none" stroke="${p.bgAccent}" stroke-width="0.8" opacity="0.3"/>`,
      `<path d="M0,32 Q16,28 32,32 Q48,36 64,32" fill="none" stroke="${p.bgAccent}" stroke-width="0.8" opacity="0.25"/>`,
      `<path d="M0,48 Q16,44 32,48 Q48,52 64,48" fill="none" stroke="${p.bgAccent}" stroke-width="0.8" opacity="0.2"/>`,
    ].join("");
  },

  // Scattered stars — a bit of both
  mixed(p) {
    return [
      `<polygon points="8,8 9,11 12,11 9.5,13 10.5,16 8,14 5.5,16 6.5,13 4,11 7,11" fill="${p.bgAccent}" opacity="0.3"/>`,
      `<polygon points="52,12 53,14 55,14 53.5,15.5 54,17.5 52,16 50,17.5 50.5,15.5 49,14 51,14" fill="${p.bgAccent}" opacity="0.25"/>`,
      `<polygon points="12,52 13,54 15,54 13.5,55.5 14,57.5 12,56 10,57.5 10.5,55.5 9,54 11,54" fill="${p.bgAccent}" opacity="0.3"/>`,
      `<polygon points="56,48 57,50 59,50 57.5,51.5 58,53.5 56,52 54,53.5 54.5,51.5 53,50 55,50" fill="${p.bgAccent}" opacity="0.2"/>`,
      `<circle cx="48" cy="56" r="1" fill="${p.bgAccent}" opacity="0.25"/>`,
    ].join("");
  },
};

// ============================================================
// Public API — getter functions
// ============================================================

export function getBodyShape(
  type: BodyType,
  palette: AvatarPalette,
): string {
  const fn = bodyShapes[type];
  return fn ? fn(palette) : bodyShapes.steady(palette);
}

export function getEyeStyle(
  style: EyeStyle,
  palette: AvatarPalette,
): string {
  const fn = eyeStyles[style];
  return fn ? fn(palette) : eyeStyles.wholesome(palette);
}

export function getMouthStyle(
  style: MouthStyle,
  palette: AvatarPalette,
): string {
  const fn = mouthStyles[style];
  return fn ? fn(palette) : mouthStyles.warm(palette);
}

export function getTopAccessory(
  type: TopAccessory,
  palette: AvatarPalette,
): string {
  const fn = topAccessories[type];
  return fn ? fn(palette) : topAccessories.intuitive(palette);
}

export function getBgPattern(
  pattern: BgPattern,
  palette: AvatarPalette,
): string {
  const fn = bgPatterns[pattern];
  return fn ? fn(palette) : bgPatterns.mixed(palette);
}
