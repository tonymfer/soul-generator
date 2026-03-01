// ============================================================
// Plain Text Renderer for ASCII Portraits
// Outputs plain text without any color codes
// ============================================================

import type { AsciiPortrait } from "./composer";

/**
 * Render an AsciiPortrait as plain text (no color).
 * Each row becomes a line, characters joined directly.
 */
export function renderPlain(portrait: AsciiPortrait): string {
  return portrait.grid.map((row) => row.join("")).join("\n");
}
