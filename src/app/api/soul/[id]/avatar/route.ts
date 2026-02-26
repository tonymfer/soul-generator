// ============================================================
// GET /api/soul/[id]/avatar
// Generates and returns a deterministic avatar for a soul.
// Supports ?format=svg (default) or ?format=png (501)
//
// Public endpoint — no auth required (avatars are for OG images
// and sharing), but only serves avatars for public souls
// (is_public = true).
// ============================================================

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateAvatarSvg } from "@/lib/avatar";
import type { TraitVector } from "@/lib/generators/types";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// ============================================================
// Runtime validation for TraitVector
// Ensures DB data is well-formed before passing to SVG generation.
// This is the safety boundary — if validation passes, the SVG
// generator only receives known-good enum values, so the
// resulting SVG (used with dangerouslySetInnerHTML in components)
// cannot contain injected content.
// ============================================================

function isValidTraitVector(data: unknown): data is TraitVector {
  if (typeof data !== "object" || data === null) return false;
  const obj = data as Record<string, unknown>;

  const validCommunicationStyles = ["direct", "warm", "analytical", "expressive"];
  const validEnergyPatterns = ["steady", "burst", "reactive", "ambient"];
  const validDecisionModes = ["logical", "intuitive", "consensus", "impulsive"];
  const validHumorTypes = ["dry", "pun", "sarcastic", "wholesome", "absurd"];
  const validResponseStructures = ["organized", "stream-of-consciousness", "mixed"];

  return (
    validCommunicationStyles.includes(obj.communication_style as string) &&
    validEnergyPatterns.includes(obj.energy_pattern as string) &&
    validDecisionModes.includes(obj.decision_mode as string) &&
    validHumorTypes.includes(obj.humor_type as string) &&
    validResponseStructures.includes(obj.response_structure as string) &&
    typeof obj.adhd === "boolean" &&
    typeof obj.formality_level === "number" &&
    typeof obj.enthusiasm_baseline === "number" &&
    typeof obj.empathy === "number"
  );
}

/** Fallback trait vector used when DB data fails validation */
const FALLBACK_TRAIT_VECTOR: TraitVector = {
  mbti: "INFP",
  adhd: false,
  communication_style: "warm",
  energy_pattern: "steady",
  decision_mode: "intuitive",
  humor_type: "wholesome",
  verbosity: 0.5,
  emoji_density: 0.3,
  formality_level: 0.5,
  tangent_probability: 0.3,
  enthusiasm_baseline: 0.5,
  empathy: 0.6,
  response_structure: "mixed",
};

export async function GET(
  request: Request,
  { params }: RouteParams,
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") ?? "svg";

  // Validate format
  if (format !== "svg" && format !== "png") {
    return NextResponse.json(
      { error: "Unsupported format. Use ?format=svg or ?format=png" },
      { status: 400 },
    );
  }

  // PNG is not yet supported — return 501 instead of serving SVG
  // with a misleading Content-Type
  if (format === "png") {
    return NextResponse.json(
      { error: "PNG 형식은 아직 지원되지 않습니다. format=svg를 사용해주세요." },
      { status: 501 },
    );
  }

  // Fetch public soul from Supabase
  // Only serve avatars for public souls (is_public = true)
  const supabase = await createClient();
  const { data: soul, error } = await supabase
    .from("souls")
    .select("personality_data")
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (error || !soul) {
    return NextResponse.json(
      { error: "Soul not found" },
      { status: 404 },
    );
  }

  // Extract traitVector from personality_data
  const personalityData = soul.personality_data as Record<string, unknown> | null;
  const rawTraitVector = personalityData?.traitVector;

  if (!rawTraitVector) {
    return NextResponse.json(
      { error: "Soul has no trait vector" },
      { status: 404 },
    );
  }

  // Validate trait vector at runtime — use fallback if malformed
  const traitVector = isValidTraitVector(rawTraitVector)
    ? rawTraitVector
    : FALLBACK_TRAIT_VECTOR;

  // Generate SVG
  // Safety: traitVector is validated above, so generateAvatarSvg only
  // receives known-good enum values. No user-supplied strings reach
  // the SVG output, making dangerouslySetInnerHTML usage safe.
  const svg = generateAvatarSvg(traitVector);

  // Return SVG
  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
