// ============================================================
// Avatar System — Barrel Export
// Deterministic ASCII portrait generation from TraitVector
// ============================================================

// Palette
export { getPalette, getMbtiColor } from "./palette";
export type { AsciiPalette, AvatarPalette } from "./palette";

// Parts catalog types
export type { BodyType, EyeStyle, MouthStyle, TopAccessory, Grid, ColorGrid } from "./parts-catalog";
export { GRID_WIDTH, GRID_HEIGHT } from "./parts-catalog";

// Composer
export { traitToAvatarConfig, composePortrait, generatePortrait } from "./composer";
export type { AvatarConfig, AsciiPortrait } from "./composer";

// Renderers
export { renderHtml } from "./render-html";
export { renderAnsi } from "./render-ansi";
export { renderPlain } from "./render-plain";
