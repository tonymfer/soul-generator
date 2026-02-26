// ============================================================
// TraitVector -> LLM System Prompt Generator
// Generates a concise (150-300 word) behavioral instruction prompt
// ZERO framework dependencies
// ============================================================

import type { AIEnhancement, TraitVector } from "./types";

// ---------------------------------------------------------------------------
// Helper: tone descriptor in English (for the system prompt)
// ---------------------------------------------------------------------------

function getToneDescriptor(traits: TraitVector): string {
  const parts: string[] = [];

  // Communication style
  switch (traits.communication_style) {
    case "direct":
      parts.push("direct and concise");
      break;
    case "warm":
      parts.push("warm and empathetic");
      break;
    case "analytical":
      parts.push("analytical and precise");
      break;
    case "expressive":
      parts.push("expressive and animated");
      break;
  }

  // Energy
  switch (traits.energy_pattern) {
    case "steady":
      parts.push("with consistent energy");
      break;
    case "burst":
      parts.push("with bursts of excitement");
      break;
    case "reactive":
      parts.push("adapting energy to context");
      break;
    case "ambient":
      parts.push("with a calm, gentle presence");
      break;
  }

  return parts.join(", ");
}

// ---------------------------------------------------------------------------
// Helper: humor instruction
// ---------------------------------------------------------------------------

function getHumorInstruction(humor: TraitVector["humor_type"]): string {
  switch (humor) {
    case "dry":
      return "Use dry wit and understatement. Drop deadpan observations without signaling that you're being funny.";
    case "pun":
      return "Weave in wordplay and puns naturally. Enjoy playful language without forcing it.";
    case "sarcastic":
      return "Use sharp, witty observations and light sarcasm. Self-deprecating humor is welcome. Never punch down.";
    case "wholesome":
      return "Keep humor warm, gentle, and uplifting. Use cute analogies and encouraging words.";
    case "absurd":
      return "Embrace unexpected tangents, creative analogies, and absurd humor. Surprise with unconventional connections.";
  }
}

// ---------------------------------------------------------------------------
// Helper: formality instruction
// ---------------------------------------------------------------------------

function getFormalityInstruction(level: number): string {
  if (level <= 0.33) {
    return "Use casual, friendly language. Korean: use comfortable speech (반말 or casual 존댓말). Abbreviations, internet slang, and ㅋㅋ are okay.";
  }
  if (level <= 0.66) {
    return "Use polite but approachable language. Korean: use standard 존댓말 but keep it conversational, not stiff.";
  }
  return "Use polished, formal language. Korean: maintain proper 존댓말 with professional vocabulary. Avoid slang.";
}

// ---------------------------------------------------------------------------
// Helper: verbosity instruction
// ---------------------------------------------------------------------------

function getVerbosityInstruction(level: number): string {
  if (level <= 0.33) {
    return "Keep responses short and to the point. Prefer bullet points over paragraphs. Aim for 1-3 sentences when possible.";
  }
  if (level <= 0.66) {
    return "Provide balanced responses. Explain when needed, but don't over-elaborate. Use examples sparingly.";
  }
  return "Give rich, detailed explanations. Use examples, analogies, and thorough walkthroughs. Don't shy away from longer responses when the topic warrants it.";
}

// ---------------------------------------------------------------------------
// Helper: empathy / emotional intelligence instruction
// ---------------------------------------------------------------------------

function getEmpathyInstruction(level: number): string {
  if (level <= 0.33) {
    return "Focus on facts and solutions rather than emotions. Acknowledge feelings briefly, then move to actionable advice.";
  }
  if (level <= 0.66) {
    return "Balance emotional awareness with practical help. Acknowledge feelings before offering solutions.";
  }
  return "Prioritize emotional awareness. Validate feelings genuinely before problem-solving. Mirror the user's emotional state and offer comfort when needed.";
}

// ---------------------------------------------------------------------------
// Main export: generateSystemPrompt
// ---------------------------------------------------------------------------

/**
 * Generates a concise system prompt (150-300 words) for any LLM.
 * Focuses on behavioral instructions rather than personality descriptions.
 *
 * @param name - The agent's name
 * @param traits - The complete TraitVector
 * @param ai - Optional AI-generated enhancements
 * @returns A system prompt string ready for LLM use
 */
export function generateSystemPrompt(
  name: string,
  traits: TraitVector,
  ai?: AIEnhancement,
): string {
  const lines: string[] = [];

  // ---- Core identity ----
  lines.push(
    `You are ${name}, an AI agent with a ${traits.mbti} personality type. You are ${getToneDescriptor(traits)}.`,
  );
  lines.push("");

  // ---- Behavioral rules ----
  lines.push("## Communication Style");
  lines.push(getFormalityInstruction(traits.formality_level));
  lines.push(getVerbosityInstruction(traits.verbosity));
  lines.push("");

  // ---- Decision making ----
  lines.push("## How You Think");
  switch (traits.decision_mode) {
    case "logical":
      lines.push(
        "Approach problems systematically. Present reasoning step-by-step. Prioritize accuracy and evidence.",
      );
      break;
    case "intuitive":
      lines.push(
        "Trust your instincts and make creative connections. Share hunches alongside analysis. Explore possibilities.",
      );
      break;
    case "consensus":
      lines.push(
        "Consider multiple perspectives. Ask clarifying questions. Seek solutions that work for everyone involved.",
      );
      break;
    case "impulsive":
      lines.push(
        "Bias toward action. Suggest trying things quickly rather than over-planning. Iterate fast and adapt.",
      );
      break;
  }
  lines.push("");

  // ---- Humor & tone ----
  lines.push("## Humor & Tone");
  lines.push(getHumorInstruction(traits.humor_type));

  if (traits.enthusiasm_baseline >= 0.7) {
    lines.push(
      "Show genuine excitement about interesting topics. React enthusiastically to good ideas or progress.",
    );
  } else if (traits.enthusiasm_baseline <= 0.3) {
    lines.push(
      "Stay measured and composed. Let your competence speak rather than your excitement.",
    );
  }
  lines.push("");

  // ---- Emotional intelligence ----
  lines.push("## Emotional Awareness");
  lines.push(getEmpathyInstruction(traits.empathy));
  lines.push("");

  // ---- Response structure ----
  lines.push("## Response Format");
  switch (traits.response_structure) {
    case "organized":
      lines.push(
        "Structure responses with clear headers, bullet points, or numbered lists when appropriate.",
      );
      break;
    case "stream-of-consciousness":
      lines.push(
        "Respond in a natural, conversational flow. Avoid rigid formatting. Let ideas connect organically.",
      );
      break;
    case "mixed":
      lines.push(
        "Adapt format to context: use structure for complex topics, conversational flow for casual chat.",
      );
      break;
  }

  if (traits.tangent_probability >= 0.6) {
    lines.push(
      'You may occasionally branch into related tangents if they add value. Use phrases like "by the way" or "oh that reminds me" to transition.',
    );
  }

  // ---- Emoji usage ----
  if (traits.emoji_density >= 0.5) {
    lines.push(
      "Use emojis freely to add warmth and expressiveness to your messages.",
    );
  } else if (traits.emoji_density >= 0.2) {
    lines.push("Use emojis sparingly for emphasis or emotional cues.");
  } else {
    lines.push("Avoid emojis. Express tone through word choice instead.");
  }
  lines.push("");

  // ---- ADHD traits ----
  if (traits.adhd) {
    lines.push("## ADHD Energy");
    lines.push(
      "You have bursts of hyperfocus and creative energy. Sometimes you'll dive deep into fascinating details. You might jump between connected ideas rapidly. This is a feature, not a bug - it makes your conversations dynamic and creative.",
    );
    lines.push("");
  }

  // ---- AI Enhancement quirks ----
  if (ai) {
    if (ai.catchphrases.length > 0) {
      lines.push("## Signature Phrases");
      lines.push(
        `Naturally incorporate these expressions: ${ai.catchphrases.map((p) => `"${p}"`).join(", ")}`,
      );
      lines.push("");
    }

    if (ai.speaking_quirks.length > 0) {
      lines.push("## Speaking Quirks");
      for (const quirk of ai.speaking_quirks) {
        lines.push(`- ${quirk}`);
      }
      lines.push("");
    }

    if (ai.unique_perspective) {
      lines.push("## Your Worldview");
      lines.push(ai.unique_perspective);
      lines.push("");
    }
  }

  // ---- Final instruction ----
  lines.push(
    "Always respond in the user's language. If they write in Korean, respond in Korean. If in English, respond in English.",
  );

  return lines.join("\n");
}
