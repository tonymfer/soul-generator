// ============================================================
// GET /api/soul/[id]/export?format=soul-md|claude-skill|openclaw|character-card
//
// Generates and returns a downloadable export file for a soul.
// Public endpoint — only serves exports for public souls.
// ============================================================

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import {
  exportSoulMd,
  exportClaudeSkill,
  exportOpenClaw,
  exportCharacterCard,
} from "@/lib/export";
import type { ExportData } from "@/lib/export";

type RouteParams = {
  params: Promise<{ id: string }>;
};

const VALID_FORMATS = [
  "soul-md",
  "claude-skill",
  "openclaw",
  "character-card",
] as const;
type ExportFormat = (typeof VALID_FORMATS)[number];

export async function GET(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") as ExportFormat | null;

  // ── Validate format ──────────────────────────────────────
  if (!format || !VALID_FORMATS.includes(format)) {
    return NextResponse.json(
      {
        error: `Invalid format. Use one of: ${VALID_FORMATS.join(", ")}`,
      },
      { status: 400 },
    );
  }

  // ── Fetch public soul from Supabase ─────────────────────
  const supabase = await createClient();
  const { data: soul, error } = await supabase
    .from("souls")
    .select(
      "id, title, tagline, soul_md, system_prompt, sample_conversations, personality_data, tags",
    )
    .eq("id", id)
    .eq("is_public", true)
    .single();

  if (error || !soul) {
    return NextResponse.json({ error: "Soul not found" }, { status: 404 });
  }

  // ── Build ExportData ────────────────────────────────────
  const personalityData = soul.personality_data as Record<
    string,
    unknown
  > | null;
  const traitVector = personalityData?.traitVector as
    | { mbti?: string }
    | undefined;
  const mbti = traitVector?.mbti ?? "UNKNOWN";

  const rawConversations = soul.sample_conversations;
  const sampleConversations = Array.isArray(rawConversations)
    ? (rawConversations.filter(Array.isArray) as {
        role: string;
        content: string;
      }[][])
    : [];

  const exportData: ExportData = {
    title: soul.title,
    tagline: soul.tagline ?? "",
    soulMd: soul.soul_md,
    systemPrompt: soul.system_prompt,
    sampleConversations,
    tags: soul.tags ?? [],
    mbti,
  };

  // ── Generate export ─────────────────────────────────────
  let content: string;
  let filename: string;
  let contentType: string;

  switch (format) {
    case "soul-md": {
      const result = exportSoulMd(exportData.soulMd, exportData.title);
      content = result.content;
      filename = result.filename;
      contentType = "text/markdown; charset=utf-8";
      break;
    }
    case "claude-skill": {
      const result = exportClaudeSkill(exportData);
      content = result.content;
      filename = result.filename;
      contentType = "text/markdown; charset=utf-8";
      break;
    }
    case "openclaw": {
      const result = exportOpenClaw(exportData);
      content = result.content;
      filename = result.filename;
      contentType = "text/markdown; charset=utf-8";
      break;
    }
    case "character-card": {
      const result = exportCharacterCard(exportData);
      content = result.content;
      filename = result.filename;
      contentType = "application/json; charset=utf-8";
      break;
    }
  }

  // ── Return downloadable file ────────────────────────────
  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "private, no-cache",
    },
  });
}
