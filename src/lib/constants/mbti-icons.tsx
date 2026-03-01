// ============================================================
// MBTI Pixel-Art SVG Icons (16x16 grid)
// Kawaii terminal theme — designed for 24px+ rendering
// ============================================================

import type { ReactNode } from "react";

/**
 * Map of MBTI type code → SVG <g> element (16×16 viewBox).
 * Wrap in <svg viewBox="0 0 16 16" ...> at the call site.
 *
 * Color palette:
 *   Purple  #7c6ef6   — Analysts (NT)
 *   Pink    #f472b6   — Diplomats (NF)
 *   Yellow  #fbbf24   — Diplomats (NF) accent / Explorers (SP)
 *   Green   #4ade80   — Sentinels (SJ)
 *   Light   #e0e0e0   — Highlights & details
 *   Red     #f87171   — Explorers (SP) accent
 *   BG      #0a0a0f   — Dark background / cutouts
 */
export const MBTI_ICONS: Record<string, ReactNode> = {
  // ================================================================
  // ANALYSTS (NT) — Purple tones
  // ================================================================

  /** INTJ — Architect: Cogwheel / gear icon */
  INTJ: (
    <g>
      {/* Gear body */}
      <rect x="5" y="5" width="6" height="6" fill="#7c6ef6" />
      {/* Gear teeth — top, bottom, left, right */}
      <rect x="7" y="3" width="2" height="2" fill="#7c6ef6" />
      <rect x="7" y="11" width="2" height="2" fill="#7c6ef6" />
      <rect x="3" y="7" width="2" height="2" fill="#7c6ef6" />
      <rect x="11" y="7" width="2" height="2" fill="#7c6ef6" />
      {/* Diagonal teeth */}
      <rect x="4" y="4" width="2" height="2" fill="#7c6ef6" />
      <rect x="10" y="4" width="2" height="2" fill="#7c6ef6" />
      <rect x="4" y="10" width="2" height="2" fill="#7c6ef6" />
      <rect x="10" y="10" width="2" height="2" fill="#7c6ef6" />
      {/* Center hole */}
      <rect x="7" y="7" width="2" height="2" fill="#0a0a0f" />
    </g>
  ),

  /** INTP — Logician: Magnifying glass */
  INTP: (
    <g>
      {/* Lens ring — top row */}
      <rect x="5" y="2" width="4" height="1" fill="#7c6ef6" />
      {/* Lens ring — second row */}
      <rect x="4" y="3" width="1" height="1" fill="#7c6ef6" />
      <rect x="9" y="3" width="1" height="1" fill="#7c6ef6" />
      {/* Lens ring — sides */}
      <rect x="3" y="4" width="1" height="4" fill="#7c6ef6" />
      <rect x="10" y="4" width="1" height="4" fill="#7c6ef6" />
      {/* Lens ring — lower sides */}
      <rect x="4" y="8" width="1" height="1" fill="#7c6ef6" />
      <rect x="9" y="8" width="1" height="1" fill="#7c6ef6" />
      {/* Lens ring — bottom row */}
      <rect x="5" y="9" width="4" height="1" fill="#7c6ef6" />
      {/* Lens glint */}
      <rect x="5" y="4" width="2" height="1" fill="#e0e0e0" />
      <rect x="5" y="5" width="1" height="1" fill="#e0e0e0" />
      {/* Handle */}
      <rect x="10" y="9" width="1" height="1" fill="#9b8ffb" />
      <rect x="11" y="10" width="1" height="1" fill="#9b8ffb" />
      <rect x="12" y="11" width="2" height="2" fill="#9b8ffb" />
    </g>
  ),

  /** ENTJ — Commander: Crown */
  ENTJ: (
    <g>
      {/* Crown base */}
      <rect x="3" y="10" width="10" height="2" fill="#7c6ef6" />
      {/* Crown body */}
      <rect x="3" y="7" width="10" height="3" fill="#7c6ef6" />
      {/* Crown points — left */}
      <rect x="3" y="4" width="2" height="3" fill="#7c6ef6" />
      <rect x="3" y="3" width="2" height="1" fill="#7c6ef6" />
      {/* Crown points — center */}
      <rect x="7" y="3" width="2" height="4" fill="#7c6ef6" />
      <rect x="7" y="2" width="2" height="1" fill="#7c6ef6" />
      {/* Crown points — right */}
      <rect x="11" y="4" width="2" height="3" fill="#7c6ef6" />
      <rect x="11" y="3" width="2" height="1" fill="#7c6ef6" />
      {/* Jewels */}
      <rect x="5" y="8" width="1" height="1" fill="#fbbf24" />
      <rect x="7" y="8" width="2" height="1" fill="#fbbf24" />
      <rect x="10" y="8" width="1" height="1" fill="#fbbf24" />
    </g>
  ),

  /** ENTP — Debater: Lightning bolt */
  ENTP: (
    <g>
      {/* Top segment */}
      <rect x="7" y="1" width="3" height="1" fill="#7c6ef6" />
      <rect x="6" y="2" width="3" height="1" fill="#7c6ef6" />
      <rect x="5" y="3" width="3" height="1" fill="#7c6ef6" />
      <rect x="4" y="4" width="3" height="1" fill="#7c6ef6" />
      {/* Middle bar */}
      <rect x="4" y="5" width="6" height="1" fill="#e0e0e0" />
      <rect x="5" y="6" width="6" height="1" fill="#e0e0e0" />
      {/* Bottom segment */}
      <rect x="8" y="7" width="3" height="1" fill="#7c6ef6" />
      <rect x="7" y="8" width="3" height="1" fill="#7c6ef6" />
      <rect x="6" y="9" width="3" height="1" fill="#7c6ef6" />
      <rect x="5" y="10" width="3" height="1" fill="#7c6ef6" />
      <rect x="4" y="11" width="3" height="1" fill="#7c6ef6" />
      {/* Spark tip */}
      <rect x="5" y="12" width="2" height="1" fill="#9b8ffb" />
    </g>
  ),

  // ================================================================
  // DIPLOMATS (NF) — Pink / Yellow tones
  // ================================================================

  /** INFJ — Advocate: Glowing star */
  INFJ: (
    <g>
      {/* Star center */}
      <rect x="6" y="6" width="4" height="4" fill="#fbbf24" />
      {/* Top point */}
      <rect x="7" y="3" width="2" height="3" fill="#fbbf24" />
      <rect x="7" y="2" width="2" height="1" fill="#f472b6" />
      {/* Bottom point */}
      <rect x="7" y="10" width="2" height="3" fill="#fbbf24" />
      <rect x="7" y="13" width="2" height="1" fill="#f472b6" />
      {/* Left point */}
      <rect x="3" y="7" width="3" height="2" fill="#fbbf24" />
      <rect x="2" y="7" width="1" height="2" fill="#f472b6" />
      {/* Right point */}
      <rect x="10" y="7" width="3" height="2" fill="#fbbf24" />
      <rect x="13" y="7" width="1" height="2" fill="#f472b6" />
      {/* Glow corners */}
      <rect x="4" y="4" width="1" height="1" fill="#f472b6" />
      <rect x="11" y="4" width="1" height="1" fill="#f472b6" />
      <rect x="4" y="11" width="1" height="1" fill="#f472b6" />
      <rect x="11" y="11" width="1" height="1" fill="#f472b6" />
    </g>
  ),

  /** INFP — Mediator: Rainbow arc */
  INFP: (
    <g>
      {/* Outer arc — red */}
      <rect x="3" y="6" width="1" height="3" fill="#f87171" />
      <rect x="4" y="4" width="1" height="2" fill="#f87171" />
      <rect x="5" y="3" width="2" height="1" fill="#f87171" />
      <rect x="7" y="2" width="2" height="1" fill="#f87171" />
      <rect x="9" y="3" width="2" height="1" fill="#f87171" />
      <rect x="11" y="4" width="1" height="2" fill="#f87171" />
      <rect x="12" y="6" width="1" height="3" fill="#f87171" />
      {/* Middle arc — yellow */}
      <rect x="4" y="6" width="1" height="2" fill="#fbbf24" />
      <rect x="5" y="4" width="1" height="2" fill="#fbbf24" />
      <rect x="6" y="3" width="1" height="1" fill="#fbbf24" />
      <rect x="7" y="3" width="2" height="1" fill="#fbbf24" />
      <rect x="9" y="3" width="1" height="1" fill="#fbbf24" />
      <rect x="10" y="4" width="1" height="2" fill="#fbbf24" />
      <rect x="11" y="6" width="1" height="2" fill="#fbbf24" />
      {/* Inner arc — pink */}
      <rect x="5" y="6" width="1" height="1" fill="#f472b6" />
      <rect x="6" y="4" width="1" height="2" fill="#f472b6" />
      <rect x="7" y="4" width="2" height="1" fill="#f472b6" />
      <rect x="9" y="4" width="1" height="2" fill="#f472b6" />
      <rect x="10" y="6" width="1" height="1" fill="#f472b6" />
      {/* Ground line */}
      <rect x="3" y="9" width="10" height="1" fill="#e0e0e0" />
      {/* Heart at top */}
      <rect x="7" y="1" width="2" height="1" fill="#f472b6" />
    </g>
  ),

  /** ENFJ — Protagonist: Rising sun */
  ENFJ: (
    <g>
      {/* Horizon line */}
      <rect x="1" y="10" width="14" height="1" fill="#e0e0e0" />
      {/* Sun body — half circle above horizon */}
      <rect x="5" y="8" width="6" height="2" fill="#fbbf24" />
      <rect x="6" y="7" width="4" height="1" fill="#fbbf24" />
      <rect x="7" y="6" width="2" height="1" fill="#fbbf24" />
      {/* Rays */}
      <rect x="7" y="4" width="2" height="2" fill="#f472b6" />
      <rect x="3" y="7" width="2" height="1" fill="#f472b6" />
      <rect x="11" y="7" width="2" height="1" fill="#f472b6" />
      <rect x="4" y="5" width="1" height="1" fill="#f472b6" />
      <rect x="11" y="5" width="1" height="1" fill="#f472b6" />
      <rect x="3" y="6" width="1" height="1" fill="#f472b6" />
      <rect x="12" y="6" width="1" height="1" fill="#f472b6" />
      {/* Below horizon glow */}
      <rect x="4" y="11" width="8" height="1" fill="#fbbf24" opacity="0.5" />
    </g>
  ),

  /** ENFP — Campaigner: Sparkle / firework burst */
  ENFP: (
    <g>
      {/* Center sparkle */}
      <rect x="7" y="7" width="2" height="2" fill="#fbbf24" />
      {/* Cardinal rays */}
      <rect x="7" y="3" width="2" height="1" fill="#f472b6" />
      <rect x="7" y="5" width="2" height="2" fill="#fbbf24" />
      <rect x="7" y="9" width="2" height="2" fill="#fbbf24" />
      <rect x="7" y="12" width="2" height="1" fill="#f472b6" />
      <rect x="3" y="7" width="1" height="2" fill="#f472b6" />
      <rect x="5" y="7" width="2" height="2" fill="#fbbf24" />
      <rect x="9" y="7" width="2" height="2" fill="#fbbf24" />
      <rect x="12" y="7" width="1" height="2" fill="#f472b6" />
      {/* Diagonal sparks */}
      <rect x="4" y="4" width="1" height="1" fill="#f472b6" />
      <rect x="5" y="5" width="1" height="1" fill="#fbbf24" />
      <rect x="11" y="4" width="1" height="1" fill="#f472b6" />
      <rect x="10" y="5" width="1" height="1" fill="#fbbf24" />
      <rect x="4" y="11" width="1" height="1" fill="#f472b6" />
      <rect x="5" y="10" width="1" height="1" fill="#fbbf24" />
      <rect x="11" y="11" width="1" height="1" fill="#f472b6" />
      <rect x="10" y="10" width="1" height="1" fill="#fbbf24" />
      {/* Tiny dots */}
      <rect x="2" y="5" width="1" height="1" fill="#e0e0e0" />
      <rect x="13" y="5" width="1" height="1" fill="#e0e0e0" />
      <rect x="2" y="10" width="1" height="1" fill="#e0e0e0" />
      <rect x="13" y="10" width="1" height="1" fill="#e0e0e0" />
    </g>
  ),

  // ================================================================
  // SENTINELS (SJ) — Green tones
  // ================================================================

  /** ISTJ — Logistician: Clipboard with checkmark */
  ISTJ: (
    <g>
      {/* Clipboard body */}
      <rect x="4" y="3" width="8" height="11" fill="#4ade80" />
      {/* Clipboard clip */}
      <rect x="6" y="1" width="4" height="3" fill="#e0e0e0" />
      <rect x="7" y="2" width="2" height="1" fill="#0a0a0f" />
      {/* Paper interior */}
      <rect x="5" y="5" width="6" height="8" fill="#0a0a0f" />
      {/* Checkmark */}
      <rect x="6" y="9" width="1" height="1" fill="#4ade80" />
      <rect x="7" y="10" width="1" height="1" fill="#4ade80" />
      <rect x="8" y="9" width="1" height="1" fill="#4ade80" />
      <rect x="9" y="8" width="1" height="1" fill="#4ade80" />
      <rect x="10" y="7" width="1" height="1" fill="#4ade80" />
      {/* Lines on paper */}
      <rect x="6" y="6" width="4" height="1" fill="#4ade80" opacity="0.4" />
    </g>
  ),

  /** ISFJ — Defender: Shield */
  ISFJ: (
    <g>
      {/* Shield top */}
      <rect x="3" y="2" width="10" height="2" fill="#4ade80" />
      {/* Shield body */}
      <rect x="3" y="4" width="10" height="4" fill="#4ade80" />
      {/* Shield taper */}
      <rect x="4" y="8" width="8" height="2" fill="#4ade80" />
      <rect x="5" y="10" width="6" height="1" fill="#4ade80" />
      <rect x="6" y="11" width="4" height="1" fill="#4ade80" />
      <rect x="7" y="12" width="2" height="1" fill="#4ade80" />
      {/* Shield emblem — cross */}
      <rect x="7" y="4" width="2" height="6" fill="#e0e0e0" />
      <rect x="5" y="6" width="6" height="2" fill="#e0e0e0" />
      {/* Border highlight */}
      <rect x="3" y="2" width="10" height="1" fill="#e0e0e0" opacity="0.3" />
    </g>
  ),

  /** ESTJ — Executive: Bar chart */
  ESTJ: (
    <g>
      {/* Y axis */}
      <rect x="2" y="2" width="1" height="11" fill="#e0e0e0" />
      {/* X axis */}
      <rect x="2" y="13" width="12" height="1" fill="#e0e0e0" />
      {/* Bar 1 — short */}
      <rect x="4" y="10" width="2" height="3" fill="#4ade80" />
      {/* Bar 2 — medium */}
      <rect x="7" y="7" width="2" height="6" fill="#4ade80" />
      {/* Bar 3 — tall */}
      <rect x="10" y="3" width="2" height="10" fill="#4ade80" />
      {/* Bar highlights */}
      <rect x="4" y="10" width="2" height="1" fill="#e0e0e0" opacity="0.3" />
      <rect x="7" y="7" width="2" height="1" fill="#e0e0e0" opacity="0.3" />
      <rect x="10" y="3" width="2" height="1" fill="#e0e0e0" opacity="0.3" />
    </g>
  ),

  /** ESFJ — Consul: Heart pair */
  ESFJ: (
    <g>
      {/* Left heart */}
      <rect x="1" y="4" width="2" height="1" fill="#4ade80" />
      <rect x="4" y="4" width="2" height="1" fill="#4ade80" />
      <rect x="1" y="5" width="6" height="2" fill="#4ade80" />
      <rect x="1" y="7" width="5" height="1" fill="#4ade80" />
      <rect x="2" y="8" width="3" height="1" fill="#4ade80" />
      <rect x="3" y="9" width="1" height="1" fill="#4ade80" />
      {/* Left heart highlight */}
      <rect x="1" y="4" width="1" height="1" fill="#e0e0e0" opacity="0.4" />
      {/* Right heart */}
      <rect x="9" y="4" width="2" height="1" fill="#4ade80" />
      <rect x="12" y="4" width="2" height="1" fill="#4ade80" />
      <rect x="9" y="5" width="6" height="2" fill="#4ade80" />
      <rect x="10" y="7" width="5" height="1" fill="#4ade80" />
      <rect x="11" y="8" width="3" height="1" fill="#4ade80" />
      <rect x="12" y="9" width="1" height="1" fill="#4ade80" />
      {/* Right heart highlight */}
      <rect x="9" y="4" width="1" height="1" fill="#e0e0e0" opacity="0.4" />
      {/* Connector sparkle */}
      <rect x="7" y="6" width="2" height="1" fill="#e0e0e0" />
    </g>
  ),

  // ================================================================
  // EXPLORERS (SP) — Yellow / Red tones
  // ================================================================

  /** ISTP — Virtuoso: Wrench / tool */
  ISTP: (
    <g>
      {/* Wrench head — open jaw */}
      <rect x="3" y="1" width="2" height="1" fill="#fbbf24" />
      <rect x="2" y="2" width="1" height="3" fill="#fbbf24" />
      <rect x="6" y="2" width="1" height="3" fill="#fbbf24" />
      <rect x="3" y="4" width="1" height="1" fill="#fbbf24" />
      <rect x="5" y="4" width="1" height="1" fill="#fbbf24" />
      <rect x="3" y="5" width="3" height="1" fill="#fbbf24" />
      {/* Wrench shaft */}
      <rect x="4" y="6" width="2" height="1" fill="#fbbf24" />
      <rect x="5" y="7" width="2" height="1" fill="#fbbf24" />
      <rect x="6" y="8" width="2" height="1" fill="#fbbf24" />
      <rect x="7" y="9" width="2" height="1" fill="#fbbf24" />
      <rect x="8" y="10" width="2" height="1" fill="#fbbf24" />
      {/* Wrench bottom jaw */}
      <rect x="9" y="11" width="3" height="1" fill="#fbbf24" />
      <rect x="9" y="12" width="1" height="2" fill="#fbbf24" />
      <rect x="12" y="12" width="1" height="2" fill="#fbbf24" />
      <rect x="10" y="13" width="2" height="1" fill="#fbbf24" />
      {/* Metal highlight */}
      <rect x="3" y="1" width="1" height="1" fill="#e0e0e0" opacity="0.4" />
    </g>
  ),

  /** ISFP — Adventurer: Artist palette */
  ISFP: (
    <g>
      {/* Palette body */}
      <rect x="3" y="5" width="10" height="6" fill="#fbbf24" />
      <rect x="4" y="4" width="8" height="1" fill="#fbbf24" />
      <rect x="5" y="3" width="6" height="1" fill="#fbbf24" />
      <rect x="4" y="11" width="8" height="1" fill="#fbbf24" />
      <rect x="5" y="12" width="6" height="1" fill="#fbbf24" />
      {/* Thumb hole */}
      <rect x="9" y="8" width="2" height="2" fill="#0a0a0f" />
      {/* Paint blobs */}
      <rect x="4" y="5" width="2" height="2" fill="#f87171" />
      <rect x="7" y="4" width="2" height="2" fill="#7c6ef6" />
      <rect x="5" y="8" width="2" height="2" fill="#4ade80" />
      <rect x="10" y="5" width="2" height="2" fill="#f472b6" />
    </g>
  ),

  /** ESTP — Entrepreneur: Flame */
  ESTP: (
    <g>
      {/* Flame outer — red */}
      <rect x="6" y="2" width="4" height="1" fill="#f87171" />
      <rect x="5" y="3" width="6" height="1" fill="#f87171" />
      <rect x="4" y="4" width="8" height="1" fill="#f87171" />
      <rect x="3" y="5" width="10" height="2" fill="#f87171" />
      <rect x="3" y="7" width="10" height="2" fill="#f87171" />
      <rect x="4" y="9" width="8" height="2" fill="#f87171" />
      <rect x="5" y="11" width="6" height="1" fill="#f87171" />
      <rect x="6" y="12" width="4" height="1" fill="#f87171" />
      {/* Flame tip */}
      <rect x="7" y="1" width="2" height="1" fill="#f87171" />
      {/* Flame inner — yellow */}
      <rect x="6" y="6" width="4" height="2" fill="#fbbf24" />
      <rect x="7" y="5" width="2" height="1" fill="#fbbf24" />
      <rect x="6" y="8" width="4" height="2" fill="#fbbf24" />
      <rect x="7" y="10" width="2" height="2" fill="#fbbf24" />
      {/* Flame core — white hot */}
      <rect x="7" y="8" width="2" height="2" fill="#e0e0e0" />
    </g>
  ),

  /** ESFP — Entertainer: Theater masks (comedy/tragedy) */
  ESFP: (
    <g>
      {/* Happy mask (left, foreground) */}
      <rect x="1" y="4" width="7" height="6" fill="#fbbf24" />
      <rect x="2" y="3" width="5" height="1" fill="#fbbf24" />
      <rect x="2" y="10" width="5" height="1" fill="#fbbf24" />
      {/* Happy eyes */}
      <rect x="2" y="5" width="2" height="2" fill="#0a0a0f" />
      <rect x="5" y="5" width="2" height="2" fill="#0a0a0f" />
      {/* Happy mouth — smile */}
      <rect x="2" y="8" width="1" height="1" fill="#0a0a0f" />
      <rect x="3" y="9" width="3" height="1" fill="#0a0a0f" />
      <rect x="6" y="8" width="1" height="1" fill="#0a0a0f" />
      {/* Sad mask (right, background) */}
      <rect x="8" y="3" width="7" height="6" fill="#f87171" />
      <rect x="9" y="2" width="5" height="1" fill="#f87171" />
      <rect x="9" y="9" width="5" height="1" fill="#f87171" />
      {/* Sad eyes */}
      <rect x="9" y="4" width="2" height="2" fill="#0a0a0f" />
      <rect x="12" y="4" width="2" height="2" fill="#0a0a0f" />
      {/* Sad mouth — frown */}
      <rect x="9" y="7" width="1" height="1" fill="#0a0a0f" />
      <rect x="10" y="6" width="3" height="1" fill="#0a0a0f" />
      <rect x="13" y="7" width="1" height="1" fill="#0a0a0f" />
    </g>
  ),
};
