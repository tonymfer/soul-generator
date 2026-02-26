// ============================================================
// Avatar System — Barrel Export
// Deterministic pixel-art avatar generation from TraitVector
// ============================================================

// Palette
export { getPalette } from "./palette";
export type { AvatarPalette } from "./palette";

// Parts catalog
export {
  getBodyShape,
  getEyeStyle,
  getMouthStyle,
  getTopAccessory,
  getBgPattern,
} from "./parts-catalog";
export type {
  BodyType,
  EyeStyle,
  MouthStyle,
  TopAccessory,
  BgPattern,
} from "./parts-catalog";

// Composer
export {
  traitToAvatarConfig,
  composeSvg,
  generateAvatarSvg,
} from "./composer";
export type { AvatarConfig } from "./composer";
