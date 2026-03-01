import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface PixelIconProps {
  name: string;
  size?: number;
  className?: string;
}

const ICONS: Record<string, ReactNode> = {
  /* ── Feature Icons ────────────────────────────────── */

  "theater-masks": (
    <g>
      {/* Happy mask (left, purple) */}
      <rect x="1" y="3" width="8" height="8" rx="2" fill="#7c6ef6" />
      <rect x="3" y="5" width="2" height="2" fill="#1a1a2e" />
      <rect x="6" y="5" width="1" height="1" fill="#1a1a2e" />
      <rect x="3" y="8" width="4" height="1" fill="#1a1a2e" />
      <rect x="4" y="9" width="2" height="1" fill="#1a1a2e" />
      {/* Sad mask (right, pink, overlapping) */}
      <rect x="7" y="5" width="8" height="8" rx="2" fill="#f472b6" />
      <rect x="9" y="7" width="2" height="2" fill="#1a1a2e" />
      <rect x="12" y="7" width="1" height="1" fill="#1a1a2e" />
      <rect x="10" y="11" width="3" height="1" fill="#1a1a2e" />
      <rect x="10" y="10" width="2" height="1" fill="#1a1a2e" />
    </g>
  ),

  package: (
    <g>
      {/* Top face */}
      <polygon points="8,1 14,4 8,7 2,4" fill="#7c6ef6" />
      {/* Left face */}
      <polygon points="2,4 8,7 8,14 2,11" fill="#4ade80" opacity="0.8" />
      {/* Right face */}
      <polygon points="14,4 8,7 8,14 14,11" fill="#7c6ef6" opacity="0.6" />
      {/* Top stripe */}
      <rect x="7" y="1" width="2" height="6" fill="#e0e0e0" opacity="0.3" />
      {/* Center line */}
      <line x1="8" y1="7" x2="8" y2="14" stroke="#4ade80" strokeWidth="0.5" opacity="0.4" />
    </g>
  ),

  globe: (
    <g>
      {/* Outer circle */}
      <circle cx="8" cy="8" r="6" fill="none" stroke="#4ade80" strokeWidth="1.2" />
      {/* Inner fill */}
      <circle cx="8" cy="8" r="5.4" fill="#4ade80" opacity="0.15" />
      {/* Vertical meridian */}
      <ellipse cx="8" cy="8" rx="2.5" ry="5.4" fill="none" stroke="#7c6ef6" strokeWidth="0.8" />
      {/* Horizontal latitude lines */}
      <line x1="3" y1="6" x2="13" y2="6" stroke="#7c6ef6" strokeWidth="0.6" opacity="0.6" />
      <line x1="2.6" y1="8" x2="13.4" y2="8" stroke="#7c6ef6" strokeWidth="0.6" opacity="0.6" />
      <line x1="3" y1="10" x2="13" y2="10" stroke="#7c6ef6" strokeWidth="0.6" opacity="0.6" />
      {/* Highlight */}
      <rect x="5" y="4" width="1" height="1" fill="#e0e0e0" opacity="0.5" />
    </g>
  ),

  palette: (
    <g>
      {/* Palette body */}
      <ellipse cx="8" cy="8.5" rx="6.5" ry="5.5" fill="#f472b6" opacity="0.3" />
      <ellipse cx="8" cy="8.5" rx="6" ry="5" fill="#f472b6" opacity="0.5" />
      {/* Thumb hole */}
      <circle cx="5" cy="10" r="1.5" fill="#1a1a2e" />
      {/* Color dots */}
      <circle cx="5" cy="5.5" r="1.2" fill="#7c6ef6" />
      <circle cx="8" cy="4.5" r="1.2" fill="#fbbf24" />
      <circle cx="11" cy="5.5" r="1.2" fill="#4ade80" />
      <circle cx="12" cy="8" r="1.2" fill="#f87171" />
      <circle cx="10" cy="11" r="1" fill="#e0e0e0" />
    </g>
  ),

  "crystal-ball": (
    <g>
      {/* Glow behind ball */}
      <circle cx="8" cy="6" r="6" fill="#7c6ef6" opacity="0.1" />
      {/* Ball outer */}
      <circle cx="8" cy="6" r="5" fill="#7c6ef6" opacity="0.25" />
      {/* Ball inner */}
      <circle cx="8" cy="6" r="4" fill="#7c6ef6" opacity="0.4" />
      {/* Highlight */}
      <rect x="5" y="3" width="2" height="1" rx="0.5" fill="#e0e0e0" opacity="0.7" />
      <rect x="5" y="4" width="1" height="1" fill="#e0e0e0" opacity="0.4" />
      {/* Sparkles inside */}
      <rect x="9" y="5" width="1" height="1" fill="#f472b6" opacity="0.8" />
      <rect x="7" y="7" width="1" height="1" fill="#f472b6" opacity="0.6" />
      {/* Neck */}
      <rect x="6" y="11" width="4" height="1" fill="#7c6ef6" opacity="0.6" />
      {/* Base */}
      <rect x="4" y="12" width="8" height="2" rx="1" fill="#7c6ef6" opacity="0.7" />
      <rect x="5" y="12" width="6" height="1" fill="#e0e0e0" opacity="0.15" />
    </g>
  ),

  /* ── Step Number Icons ────────────────────────────── */

  "step-1": (
    <g>
      {/* Badge background */}
      <rect x="1" y="2" width="14" height="12" rx="2" fill="#7c6ef6" opacity="0.2" />
      <rect x="1" y="2" width="14" height="12" rx="2" fill="none" stroke="#7c6ef6" strokeWidth="0.8" />
      {/* "0" */}
      <rect x="3" y="5" width="4" height="6" rx="1" fill="none" stroke="#7c6ef6" strokeWidth="1" opacity="0.5" />
      {/* "1" */}
      <rect x="10" y="5" width="1.5" height="6" fill="#7c6ef6" />
      <rect x="9" y="5" width="2" height="1.5" fill="#7c6ef6" />
      <rect x="9" y="9.5" width="4" height="1.5" fill="#7c6ef6" />
    </g>
  ),

  "step-2": (
    <g>
      {/* Badge background */}
      <rect x="1" y="2" width="14" height="12" rx="2" fill="#f472b6" opacity="0.2" />
      <rect x="1" y="2" width="14" height="12" rx="2" fill="none" stroke="#f472b6" strokeWidth="0.8" />
      {/* "0" */}
      <rect x="3" y="5" width="4" height="6" rx="1" fill="none" stroke="#f472b6" strokeWidth="1" opacity="0.5" />
      {/* "2" */}
      <rect x="9" y="5" width="4" height="1.5" fill="#f472b6" />
      <rect x="11.5" y="5" width="1.5" height="3" fill="#f472b6" />
      <rect x="9" y="7" width="4" height="1.5" fill="#f472b6" />
      <rect x="9" y="7" width="1.5" height="3" fill="#f472b6" />
      <rect x="9" y="9.5" width="4" height="1.5" fill="#f472b6" />
    </g>
  ),

  "step-3": (
    <g>
      {/* Badge background */}
      <rect x="1" y="2" width="14" height="12" rx="2" fill="#4ade80" opacity="0.2" />
      <rect x="1" y="2" width="14" height="12" rx="2" fill="none" stroke="#4ade80" strokeWidth="0.8" />
      {/* "0" */}
      <rect x="3" y="5" width="4" height="6" rx="1" fill="none" stroke="#4ade80" strokeWidth="1" opacity="0.5" />
      {/* "3" */}
      <rect x="9" y="5" width="4" height="1.5" fill="#4ade80" />
      <rect x="11.5" y="5" width="1.5" height="6" fill="#4ade80" />
      <rect x="9" y="7" width="4" height="1.5" fill="#4ade80" />
      <rect x="9" y="9.5" width="4" height="1.5" fill="#4ade80" />
    </g>
  ),
};

function PixelIcon({ name, size = 24, className }: PixelIconProps) {
  const icon = ICONS[name];
  if (!icon) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("inline-block shrink-0", className)}
      aria-hidden="true"
      style={{ imageRendering: "crisp-edges" }}
    >
      {icon}
    </svg>
  );
}

export { PixelIcon };
export type { PixelIconProps };
