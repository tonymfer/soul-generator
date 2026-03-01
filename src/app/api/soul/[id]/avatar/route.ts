// ============================================================
// GET /api/soul/[id]/avatar
// Generates and returns a deterministic avatar for a soul.
// Supports ?format=html|ansi|text|json
//
// Public endpoint — no auth required (avatars are for OG images
// and sharing), but only serves avatars for public souls
// (is_public = true).
// ============================================================

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generatePortrait, renderHtml, renderAnsi, renderPlain } from "@/lib/avatar";
import type { TraitVector } from "@/lib/generators/types";

type RouteParams = {
  params: Promise<{ id: string }>;
};

// ============================================================
// Runtime validation for TraitVector
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
    typeof obj.adhd === "string" && ["none", "inattentive", "hyperactive", "combined"].includes(obj.adhd as string) &&
    typeof obj.formality_level === "number" &&
    typeof obj.enthusiasm_baseline === "number" &&
    typeof obj.empathy === "number"
  );
}

/** Fallback trait vector used when DB data fails validation */
const FALLBACK_TRAIT_VECTOR: TraitVector = {
  mbti: "INFP",
  adhd: "none",
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

const VALID_FORMATS = ["html", "ansi", "text", "json"] as const;
type AvatarFormat = (typeof VALID_FORMATS)[number];

export async function GET(
  request: Request,
  { params }: RouteParams,
) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const format = (searchParams.get("format") ?? "html") as AvatarFormat;

  // Validate format
  if (!VALID_FORMATS.includes(format)) {
    return NextResponse.json(
      { error: `Unsupported format. Use ?format=${VALID_FORMATS.join("|")}` },
      { status: 400 },
    );
  }

  // Fetch public soul from Supabase
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

  // Generate portrait
  const portrait = generatePortrait(traitVector);

  const cacheHeaders = {
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  switch (format) {
    case "html":
      return new NextResponse(renderHtml(portrait), {
        status: 200,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          ...cacheHeaders,
        },
      });
    case "ansi":
      return new NextResponse(renderAnsi(portrait), {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          ...cacheHeaders,
        },
      });
    case "text":
      return new NextResponse(renderPlain(portrait), {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          ...cacheHeaders,
        },
      });
    case "json":
      return NextResponse.json(
        {
          grid: portrait.grid,
          colors: portrait.colors,
          width: portrait.width,
          height: portrait.height,
          palette: portrait.palette,
        },
        {
          status: 200,
          headers: cacheHeaders,
        },
      );
  }
}
