// ============================================================
// Avatar Parts Catalog (Unicode Block Characters)
// Grid modifiers for composing ASCII portraits
// Pure functions — no framework dependencies
//
// All parts target a 9×7 character grid.
// Each function modifies grid and color arrays in-place.
// ============================================================

import type { AsciiPalette } from "./palette";
import type { TraitVector } from "../generators/types";

// ============================================================
// Type definitions
// ============================================================

export type BodyType = TraitVector["energy_pattern"];
export type EyeStyle = TraitVector["humor_type"];
export type MouthStyle = TraitVector["communication_style"];
export type TopAccessory = TraitVector["decision_mode"];
export type AdhdType = TraitVector["adhd"];

export type Grid = string[][];
export type ColorGrid = (string | null)[][];

/** Grid dimensions */
export const GRID_WIDTH = 9;
export const GRID_HEIGHT = 7;

// ============================================================
// Helpers
// ============================================================

function set(
  grid: Grid,
  colors: ColorGrid,
  row: number,
  col: number,
  char: string,
  color: string | null,
): void {
  if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
    grid[row][col] = char;
    colors[row][col] = color;
  }
}

function setRow(
  grid: Grid,
  colors: ColorGrid,
  row: number,
  chars: string[],
  rowColors: (string | null)[],
): void {
  for (let col = 0; col < chars.length && col < GRID_WIDTH; col++) {
    set(grid, colors, row, col, chars[col], rowColors[col]);
  }
}

// ============================================================
// Body shapes — based on energy_pattern
//
// Determines the outline/border of the face.
// Interior positions are left as spaces for features.
//
// Grid layout:
//   Row 0: top of head (accessory zone)
//   Row 1-5: face sides
//   Row 6: bottom of head
//   Col 0,8: left/right border
//   Col 1-7: interior
// ============================================================

export function applyBody(
  type: BodyType,
  grid: Grid,
  colors: ColorGrid,
  palette: AsciiPalette,
): void {
  const p = palette.primary;
  const d = palette.dim;
  const b = palette.bright;
  const n = null;

  switch (type) {
    case "steady": {
      // Rounded — solid blocks with curved corners (▄▀)
      setRow(grid, colors, 0, [" ", "▄", "█", "█", "█", "█", "█", "▄", " "], [n, p, p, p, p, p, p, p, n]);
      for (let r = 1; r <= 5; r++) {
        set(grid, colors, r, 0, "█", p);
        set(grid, colors, r, 8, "█", p);
      }
      setRow(grid, colors, 6, [" ", "▀", "█", "█", "█", "█", "█", "▀", " "], [n, p, p, p, p, p, p, p, n]);
      break;
    }
    case "burst": {
      // Angular — diagonal corners, half-block sides
      setRow(grid, colors, 0, ["╱", "▀", "█", "█", "█", "█", "█", "▀", "╲"], [b, p, p, p, p, p, p, p, b]);
      for (let r = 1; r <= 5; r++) {
        set(grid, colors, r, 0, "▐", p);
        set(grid, colors, r, 8, "▌", p);
      }
      setRow(grid, colors, 6, ["╲", "▄", "█", "█", "█", "█", "█", "▄", "╱"], [b, p, p, p, p, p, p, p, b]);
      break;
    }
    case "reactive": {
      // Sharp — triangle corners (◢◣◤◥)
      setRow(grid, colors, 0, ["◢", "▄", "█", "█", "█", "█", "█", "▄", "◣"], [b, p, p, p, p, p, p, p, b]);
      for (let r = 1; r <= 5; r++) {
        set(grid, colors, r, 0, "█", p);
        set(grid, colors, r, 8, "█", p);
      }
      setRow(grid, colors, 6, ["◥", "▀", "█", "█", "█", "█", "█", "▀", "◤"], [b, p, p, p, p, p, p, p, b]);
      break;
    }
    case "ambient": {
      // Soft/diffuse — shade gradient (░▒▓)
      setRow(grid, colors, 0, ["░", "▒", "▓", "█", "█", "█", "▓", "▒", "░"], [d, d, p, p, p, p, p, d, d]);
      for (let r = 1; r <= 5; r++) {
        set(grid, colors, r, 0, "▒", d);
        set(grid, colors, r, 8, "▒", d);
      }
      setRow(grid, colors, 6, ["░", "▒", "▓", "█", "█", "█", "▓", "▒", "░"], [d, d, p, p, p, p, p, d, d]);
      break;
    }
  }
}

// ============================================================
// Eye styles — based on humor_type
// Eyes at grid positions [2][2] and [2][6]
// ============================================================

export function applyEyes(
  style: EyeStyle,
  grid: Grid,
  colors: ColorGrid,
  palette: AsciiPalette,
): void {
  const f = palette.feature;
  const a = palette.accent;

  switch (style) {
    case "dry":
      // Half-closed — ▄▄
      set(grid, colors, 2, 2, "▄", f);
      set(grid, colors, 2, 6, "▄", f);
      break;
    case "pun":
      // Happy arcs — ◠◠
      set(grid, colors, 2, 2, "◠", f);
      set(grid, colors, 2, 6, "◠", f);
      break;
    case "sarcastic":
      // Asymmetric — one big, one small
      set(grid, colors, 2, 2, "●", f);
      set(grid, colors, 2, 6, "·", f);
      break;
    case "wholesome":
      // Big round — ●●
      set(grid, colors, 2, 2, "●", a);
      set(grid, colors, 2, 6, "●", a);
      break;
    case "absurd":
      // Mismatched — × and ◎
      set(grid, colors, 2, 2, "×", f);
      set(grid, colors, 2, 6, "◎", a);
      break;
  }
}

// ============================================================
// Mouth styles — based on communication_style
// Mouth at grid position [4][4] (center)
// ============================================================

export function applyMouth(
  style: MouthStyle,
  grid: Grid,
  colors: ColorGrid,
  palette: AsciiPalette,
): void {
  const f = palette.feature;

  switch (style) {
    case "direct":
      // Straight line — ─
      set(grid, colors, 4, 4, "─", f);
      break;
    case "warm":
      // Smile — ◡
      set(grid, colors, 4, 4, "◡", f);
      break;
    case "analytical":
      // Circle — ○ (thinking)
      set(grid, colors, 4, 4, "○", f);
      break;
    case "expressive":
      // Wide open — ▽
      set(grid, colors, 4, 4, "▽", f);
      break;
  }
}

// ============================================================
// Top accessories — based on decision_mode
// logical: glasses on row 1 (above eyes)
// others: icon at row 0 center
// ============================================================

export function applyAccessory(
  type: TopAccessory,
  grid: Grid,
  colors: ColorGrid,
  palette: AsciiPalette,
): void {
  const a = palette.accent;
  const b = palette.bright;

  switch (type) {
    case "logical":
      // Glasses — frames above eyes on row 1
      set(grid, colors, 1, 2, "▫", a);
      set(grid, colors, 1, 3, "─", a);
      set(grid, colors, 1, 4, "─", a);
      set(grid, colors, 1, 5, "─", a);
      set(grid, colors, 1, 6, "▫", a);
      break;
    case "intuitive":
      // Star crown — center of top row
      set(grid, colors, 0, 4, "★", b);
      break;
    case "consensus":
      // Heart — center of top row
      set(grid, colors, 0, 4, "♥", b);
      break;
    case "impulsive":
      // Lightning — center of top row
      set(grid, colors, 0, 4, "↯", b);
      break;
  }
}

// ============================================================
// ADHD decorative elements
// Placed in interior corner/edge spaces
// ============================================================

export function applyAdhd(
  type: AdhdType,
  grid: Grid,
  colors: ColorGrid,
  palette: AsciiPalette,
): void {
  if (type === "none") return;

  const a = palette.accent;
  const d = palette.dim;

  if (type === "inattentive" || type === "combined") {
    // Scattered dots — dreamy, unfocused
    set(grid, colors, 1, 1, "·", d);
    set(grid, colors, 5, 7, "·", d);
    if (type === "inattentive") {
      set(grid, colors, 3, 1, "·", d);
      set(grid, colors, 3, 7, "·", d);
    }
  }

  if (type === "hyperactive" || type === "combined") {
    // Sparkle characters — energetic
    set(grid, colors, 1, 7, "✦", a);
    set(grid, colors, 5, 1, "✦", a);
    if (type === "hyperactive") {
      set(grid, colors, 3, 1, "✧", a);
      set(grid, colors, 3, 7, "✧", a);
    }
  }
}

// ============================================================
// Enthusiasm blush (when enthusiasm > 0.6)
// ============================================================

export function applyEnthusiasm(
  level: number,
  grid: Grid,
  colors: ColorGrid,
): void {
  if (level <= 0.6) return;
  // Blush marks on cheeks (shade blocks for "rosy" effect)
  set(grid, colors, 3, 1, "░", "#fda4af");
  set(grid, colors, 3, 7, "░", "#fda4af");
}

// ============================================================
// Empathy marks (when empathy > 0.7)
// ============================================================

export function applyEmpathy(
  level: number,
  grid: Grid,
  colors: ColorGrid,
  palette: AsciiPalette,
): void {
  if (level <= 0.7) return;
  // Subtle dots near mouth area
  set(grid, colors, 4, 2, "·", palette.dim);
  set(grid, colors, 4, 6, "·", palette.dim);
}
