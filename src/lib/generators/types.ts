// ============================================================
// ABTI Soul Generator - Core Types
// Pure TypeScript types with ZERO framework dependencies
// ============================================================

/** The core personality representation - a multi-dimensional vector */
export interface TraitVector {
  mbti: string; // "INTJ", "ENFP", etc.
  adhd: "none" | "inattentive" | "hyperactive" | "combined";
  communication_style: "direct" | "warm" | "analytical" | "expressive";
  energy_pattern: "steady" | "burst" | "reactive" | "ambient";
  decision_mode: "logical" | "intuitive" | "consensus" | "impulsive";
  humor_type: "dry" | "pun" | "sarcastic" | "wholesome" | "absurd";
  verbosity: number; // 0-1
  emoji_density: number; // 0-1
  formality_level: number; // 0-1
  tangent_probability: number; // 0-1
  enthusiasm_baseline: number; // 0-1
  empathy: number; // 0-1
  response_structure: "organized" | "stream-of-consciousness" | "mixed";
}

/** Phase 1 input: MBTI type + slider traits from the user */
export interface Phase1Input {
  mbti: string;
  adhd: "none" | "inattentive" | "hyperactive" | "combined";
  traits: {
    introversion: number; // 0-1
    playfulness: number; // 0-1
    logic: number; // 0-1
    empathy: number; // 0-1
    chaos: number; // 0-1
    formality: number; // 0-1
  };
}

/** A single quiz question with scenario-based options */
export interface QuizQuestion {
  id: string;
  scenario: string;
  options: {
    id: string;
    text: string;
    trait_modifiers: Partial<Record<keyof TraitVector, number | string>>;
  }[];
}

/** AI-generated personality enhancements from Phase 3 */
export interface AIEnhancement {
  speaking_quirks: string[];
  catchphrases: string[];
  interests: string[];
  pet_peeves: string[];
  emotional_triggers: { excited_by: string[]; calmed_by: string[] };
  unique_perspective: string;
  trait_adjustments: Partial<Record<keyof TraitVector, number>>;
}

/** The final soul output containing everything needed to deploy an agent */
export interface SoulOutput {
  name: string;
  tagline: string;
  traitVector: TraitVector;
  aiEnhancement?: AIEnhancement;
  soulMd: string;
  systemPrompt: string;
  sampleConversations: { role: string; content: string }[][];
}

/** MBTI type metadata for display */
export interface MBTITypeInfo {
  code: string;
  nameKo: string;
  nameEn: string;
  emoji: string;
  descriptionKo: string;
  descriptionEn: string;
}
