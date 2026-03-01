// ============================================================
// ANSI Renderer for ASCII Portraits
// Outputs ANSI 256-color escape sequences for terminal display
// ============================================================

import type { AsciiPortrait } from "./composer";

// ============================================================
// Color conversion
// ============================================================

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  return [
    parseInt(c.slice(0, 2), 16),
    parseInt(c.slice(2, 4), 16),
    parseInt(c.slice(4, 6), 16),
  ];
}

/**
 * Convert hex color to closest ANSI 256-color code.
 * Uses the 6×6×6 color cube (codes 16-231) and grayscale ramp (232-255).
 */
function hexToAnsi256(hex: string): number {
  const [r, g, b] = hexToRgb(hex);

  // Check if grayscale (all channels within 10 of each other)
  if (Math.abs(r - g) < 10 && Math.abs(g - b) < 10) {
    const gray = (r + g + b) / 3;
    if (gray < 8) return 16;
    if (gray > 248) return 231;
    return Math.round((gray - 8) / 247 * 24) + 232;
  }

  // Map to 6×6×6 color cube
  const ri = Math.round(r / 255 * 5);
  const gi = Math.round(g / 255 * 5);
  const bi = Math.round(b / 255 * 5);
  return 16 + 36 * ri + 6 * gi + bi;
}

// ============================================================
// Renderer
// ============================================================

/**
 * Render an AsciiPortrait as a string with ANSI 256-color escape codes.
 * Each colored character is wrapped in \e[38;5;{code}m...\e[0m.
 */
export function renderAnsi(portrait: AsciiPortrait): string {
  const lines: string[] = [];

  for (let row = 0; row < portrait.height; row++) {
    const chars: string[] = [];
    let lastColor: number | null = null;

    for (let col = 0; col < portrait.width; col++) {
      const char = portrait.grid[row][col];
      const color = portrait.colors[row][col];

      if (color) {
        const code = hexToAnsi256(color);
        if (code !== lastColor) {
          // Reset previous color if needed, then set new one
          if (lastColor !== null) chars.push("\x1b[0m");
          chars.push(`\x1b[38;5;${code}m`);
          lastColor = code;
        }
        chars.push(char);
      } else {
        if (lastColor !== null) {
          chars.push("\x1b[0m");
          lastColor = null;
        }
        chars.push(char);
      }
    }

    // Reset at end of line
    if (lastColor !== null) chars.push("\x1b[0m");
    lines.push(chars.join(""));
  }

  return lines.join("\n");
}
