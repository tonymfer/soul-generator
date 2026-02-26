// ============================================================
// ABTI Soul Generator - Barrel Export
// All core generators re-exported from a single entry point
// ============================================================

// Types
export type {
  AIEnhancement,
  MBTITypeInfo,
  Phase1Input,
  QuizQuestion,
  SoulOutput,
  TraitVector,
} from "./types";

// Phase 1: MBTI -> TraitVector
export { mapTraits, MBTI_TRAITS } from "./trait-mapper";

// Phase 2: Quiz -> Trait Modifiers
export { applyQuizScores, QUIZ_QUESTIONS } from "./quiz-scorer";

// Soul output generators
export { generateSoulMd } from "./soul-template";
export { generateSystemPrompt } from "./system-prompt";
export { generateSampleConversations } from "./conversation-gen";

// Utilities
export { generateSlug, generateSlugWithIndex } from "./slug-generator";
