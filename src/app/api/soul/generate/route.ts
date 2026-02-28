// ============================================================
// POST /api/soul/generate
// Orchestrates the full soul generation pipeline:
//   Phase1Input -> TraitVector -> Quiz refinement -> AI enhancement
//   -> SOUL.md + System Prompt + Sample Conversations -> Supabase insert
// ============================================================

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  mapTraits,
  applyQuizScores,
  generateSoulMd,
  generateSystemPrompt,
  generateSampleConversations,
  generateSlug,
  generateSlugWithIndex,
} from "@/lib/generators";
import { enhanceWithAI } from "@/lib/generators/ai-enhancer";
import { traitToAvatarConfig } from "@/lib/avatar";
import type { Phase1Input, AIEnhancement, TraitVector } from "@/lib/generators/types";
import type { Database, Json, SoulInsert } from "@/lib/supabase/types";

// ---------------------------------------------------------------------------
// Request body type
// ---------------------------------------------------------------------------

interface GenerateRequestBody {
  phase1Input: Phase1Input;
  quizAnswers: Record<string, string>;
  freeText: string;
  soulName: string;
}

// ---------------------------------------------------------------------------
// Tagline generator
// ---------------------------------------------------------------------------

function generateTagline(traits: TraitVector): string {
  const styleLabel: Record<TraitVector["communication_style"], string> = {
    direct: "직설적인",
    warm: "따뜻한",
    analytical: "분석적인",
    expressive: "표현력 풍부한",
  };

  const humorLabel: Record<TraitVector["humor_type"], string> = {
    dry: "드라이 위트의",
    pun: "말장난을 사랑하는",
    sarcastic: "날카로운 풍자의",
    wholesome: "힐링 유머의",
    absurd: "텐션 폭발의",
  };

  return `${styleLabel[traits.communication_style]} ${humorLabel[traits.humor_type]} AI 소울`;
}

// ---------------------------------------------------------------------------
// Atomic slug insert with retry on unique constraint violation
// ---------------------------------------------------------------------------

/** Postgres unique_violation error code */
const PG_UNIQUE_VIOLATION = "23505";

/**
 * Attempts to insert a soul with the base slug first. On a unique constraint
 * violation (concurrent request picked the same slug), retries with indexed
 * slugs. This avoids the TOCTOU race of the previous read-then-write approach.
 */
async function insertSoulWithUniqueSlug(
  supabase: Awaited<ReturnType<typeof createClient>>,
  soulName: string,
  soulInsert: SoulInsert,
): Promise<{ slug: string; id: string } | { error: string; status: number }> {
  const baseSlug = generateSlug(soulName);

  // Try base slug first
  const { data, error } = await supabase
    .from("souls")
    .insert({ ...soulInsert, slug: baseSlug })
    .select("id")
    .single();

  if (data) {
    return { slug: baseSlug, id: data.id };
  }

  // If not a unique violation, it's a real error
  if (error.code !== PG_UNIQUE_VIOLATION) {
    console.error("[generate] Soul insert error:", error);
    return { error: "소울 생성에 실패했습니다. 다시 시도해주세요.", status: 500 };
  }

  // Unique collision — retry with indexed slugs
  for (let i = 1; i <= 100; i++) {
    const indexedSlug = generateSlugWithIndex(soulName, i);
    const { data: retryData, error: retryError } = await supabase
      .from("souls")
      .insert({ ...soulInsert, slug: indexedSlug })
      .select("id")
      .single();

    if (retryData) {
      return { slug: indexedSlug, id: retryData.id };
    }

    // If it's not another collision, stop retrying
    if (retryError.code !== PG_UNIQUE_VIOLATION) {
      console.error("[generate] Soul insert error:", retryError);
      return { error: "소울 생성에 실패했습니다. 다시 시도해주세요.", status: 500 };
    }
  }

  // Extremely unlikely: 100+ collisions
  console.error("[generate] Exhausted slug retry attempts for:", soulName);
  return { error: "소울 생성에 실패했습니다. 다시 시도해주세요.", status: 500 };
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateRequestBody(
  body: unknown,
): body is GenerateRequestBody {
  if (typeof body !== "object" || body === null) return false;
  const obj = body as Record<string, unknown>;

  if (typeof obj.soulName !== "string" || !obj.soulName.toString().trim()) {
    return false;
  }

  if (typeof obj.phase1Input !== "object" || obj.phase1Input === null) {
    return false;
  }

  if (typeof obj.quizAnswers !== "object" || obj.quizAnswers === null) {
    return false;
  }

  return true;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
    // 1. Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "잘못된 요청 형식입니다." },
        { status: 400 },
      );
    }

    // 2. Validate
    if (!validateRequestBody(body)) {
      return NextResponse.json(
        { error: "소울 이름은 필수 항목입니다." },
        { status: 400 },
      );
    }

    const { phase1Input, quizAnswers, soulName } = body;

    // 2b. Sanitize freeText: trim and enforce 500-char server-side limit
    const freeText =
      typeof body.freeText === "string"
        ? body.freeText.trim().slice(0, 500)
        : "";

    // 3. Auth check
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    // 4. Deterministic pipeline: Phase1 -> TraitVector -> Quiz refinement
    const baseTraits = mapTraits(phase1Input);
    const finalTraits = applyQuizScores(baseTraits, quizAnswers);

    // 5. Optional AI enhancement (only when freeText is provided)
    let aiEnhancement: AIEnhancement | undefined;
    if (freeText && freeText.trim().length > 0) {
      try {
        aiEnhancement = await enhanceWithAI(freeText.trim(), finalTraits);
      } catch (error) {
        console.error("[generate] AI enhancement failed, continuing without:", error);
        // Continue without AI enhancement — it's optional
      }
    }

    // 6. Generate outputs
    const soulMd = generateSoulMd(soulName, finalTraits, aiEnhancement);
    const systemPrompt = generateSystemPrompt(soulName, finalTraits, aiEnhancement);
    const sampleConversations = generateSampleConversations(
      soulName,
      finalTraits,
      aiEnhancement,
    );

    // 7. Generate tagline
    const tagline = generateTagline(finalTraits);

    // 8. Build personality_data for storage
    const personalityData = {
      traitVector: finalTraits,
      aiEnhancement: aiEnhancement ?? null,
    };

    // 8b. Generate deterministic avatar config from traits
    const avatarConfig = traitToAvatarConfig(finalTraits);

    // 9. Build soul insert payload (slug will be set by the atomic insert)
    // avatar_url is not set yet — will be populated when storage upload is added
    const soulInsert: SoulInsert = {
      slug: "", // placeholder — overridden by insertSoulWithUniqueSlug
      user_id: user.id,
      title: soulName.trim(),
      tagline,
      personality_data: personalityData as unknown as SoulInsert["personality_data"],
      soul_md: soulMd,
      system_prompt: systemPrompt,
      sample_conversations: sampleConversations as unknown as SoulInsert["sample_conversations"],
      avatar_config: avatarConfig as unknown as SoulInsert["avatar_config"],
      is_public: true,
      tags: [
        finalTraits.mbti,
        finalTraits.communication_style,
        finalTraits.humor_type,
        ...(finalTraits.adhd !== "none" ? [`adhd-${finalTraits.adhd}`] : []),
      ],
    };

    // 10. Atomically insert soul with unique slug (retry on collision)
    const insertResult = await insertSoulWithUniqueSlug(supabase, soulName, soulInsert);

    if ("error" in insertResult) {
      return NextResponse.json(
        { error: insertResult.error },
        { status: insertResult.status },
      );
    }

    const { slug, id: soulId } = insertResult;

    // 11. Insert quiz response for record-keeping
    const quizInsertData: Database["public"]["Tables"]["quiz_responses"]["Insert"] = {
      soul_id: soulId,
      user_id: user.id,
      phase1_data: phase1Input as unknown as Json,
      phase2_data: quizAnswers as unknown as Json,
      phase3_text: freeText || null,
    };

    const { error: quizInsertError } = await supabase
      .from("quiz_responses")
      .insert(quizInsertData);

    if (quizInsertError) {
      // Non-critical — log but don't fail the request
      console.error("[generate] Quiz response insert error:", quizInsertError);
    }

    // 12. Return success
    return NextResponse.json({
      slug,
      soulId,
    });
  } catch (error) {
    console.error("[generate] Unexpected error:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 },
    );
  }
}
