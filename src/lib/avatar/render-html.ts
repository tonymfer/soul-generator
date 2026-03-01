// ============================================================
// HTML Renderer for ASCII Portraits
// Outputs <pre> with colored <span>s for web display
// ============================================================

import type { AsciiPortrait } from "./composer";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/**
 * Render an AsciiPortrait as an HTML string.
 * Returns a <pre> element with inline-styled <span>s for color.
 * Sizing is left to the parent container (set font-size externally).
 */
export function renderHtml(portrait: AsciiPortrait): string {
  const lines: string[] = [];

  for (let row = 0; row < portrait.height; row++) {
    const spans: string[] = [];
    for (let col = 0; col < portrait.width; col++) {
      const char = portrait.grid[row][col];
      const color = portrait.colors[row][col];
      if (color) {
        spans.push(
          `<span style="color:${color}">${escapeHtml(char)}</span>`,
        );
      } else {
        spans.push(escapeHtml(char));
      }
    }
    lines.push(spans.join(""));
  }

  return [
    '<pre style="',
    "margin:0;",
    "line-height:1.15;",
    "letter-spacing:0.05em;",
    "font-family:'JetBrains Mono',ui-monospace,monospace;",
    'white-space:pre">',
    lines.join("\n"),
    "</pre>",
  ].join("");
}
