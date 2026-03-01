// ============================================================
// Avatar Composer
// Assembles Unicode block-character portraits from TraitVector
// Pure functions — no framework dependencies
// ============================================================

import type { TraitVector } from "../generators/types";
import type { AsciiPalette } from "./palette";
import { getPalette } from "./palette";
import type { BodyType, EyeStyle, MouthStyle, TopAccessory, Grid, ColorGrid } from "./parts-catalog";
import {
  GRID_WIDTH,
  GRID_HEIGHT,
  applyBody,
  applyEyes,
  applyMouth,
  applyAccessory,
  applyAdhd,
  applyEnthusiasm,
  applyEmpathy,
} from "./parts-catalog";

// ============================================================
// Types
// ============================================================

export interface AvatarConfig {
  bodyType: BodyType;
  eyeStyle: EyeStyle;
  mouthStyle: MouthStyle;
  topAccessory: TopAccessory;
  palette: AsciiPalette;
  adhd: "none" | "inattentive" | "hyperactive" | "combined";
  /** 0-1, adds rosy cheeks when high */
  enthusiasm: number;
  /** 0-1, adds blush marks when high */
  empathy: number;
}

export interface AsciiPortrait {
  /** Character grid — grid[row][col] */
  grid: string[][];
  /** Parallel color grid — hex string or null for default */
  colors: (string | null)[][];
  width: number;
  height: number;
  palette: AsciiPalette;
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
    palette: getPalette(traits),
    adhd: traits.adhd,
    enthusiasm: traits.enthusiasm_baseline,
    empathy: traits.empathy,
  };
}

// ============================================================
// Grid factory
// ============================================================

function createEmptyGrid(): { grid: Grid; colors: ColorGrid } {
  const grid: Grid = Array.from({ length: GRID_HEIGHT }, () =>
    Array.from({ length: GRID_WIDTH }, () => " "),
  );
  const colors: ColorGrid = Array.from({ length: GRID_HEIGHT }, () =>
    Array.from({ length: GRID_WIDTH }, () => null),
  );
  return { grid, colors };
}

// ============================================================
// Portrait Composer
// ============================================================

/**
 * Compose an AsciiPortrait from an AvatarConfig.
 *
 * Layers are applied in order (back to front):
 * 1. Body shape (outline)
 * 2. Eyes
 * 3. Mouth
 * 4. Enthusiasm blush
 * 5. Empathy marks
 * 6. Accessory
 * 7. ADHD decorations (highest priority)
 */
export function composePortrait(config: AvatarConfig): AsciiPortrait {
  const { grid, colors } = createEmptyGrid();
  const { palette } = config;

  applyBody(config.bodyType, grid, colors, palette);
  applyEyes(config.eyeStyle, grid, colors, palette);
  applyMouth(config.mouthStyle, grid, colors, palette);
  applyEnthusiasm(config.enthusiasm, grid, colors);
  applyEmpathy(config.empathy, grid, colors, palette);
  applyAccessory(config.topAccessory, grid, colors, palette);
  applyAdhd(config.adhd, grid, colors, palette);

  return {
    grid,
    colors,
    width: GRID_WIDTH,
    height: GRID_HEIGHT,
    palette,
  };
}

/**
 * Convenience: generate a portrait directly from a TraitVector.
 */
export function generatePortrait(traits: TraitVector): AsciiPortrait {
  return composePortrait(traitToAvatarConfig(traits));
}
