// ============================================================
// Phase 1: MBTI + Sliders -> TraitVector
// Psychologically grounded mappings based on cognitive function stacks
// ZERO framework dependencies
// ============================================================

import type { Phase1Input, TraitVector } from "./types";

// ---------------------------------------------------------------------------
// Base TraitVector lookup for all 16 MBTI types
//
// Design rationale (cognitive function dimensions):
//   E vs I  -> verbosity, emoji_density, enthusiasm_baseline, communication_style
//   S vs N  -> tangent_probability, response_structure
//   T vs F  -> empathy, decision_mode, humor_type
//   J vs P  -> response_structure, energy_pattern
//
// Each type's unique cognitive function stack (e.g. Ni-Te-Fi-Se for INTJ)
// creates subtle distinctions beyond the four-letter dichotomies.
// ---------------------------------------------------------------------------

type MBTITraitBase = Omit<TraitVector, "mbti" | "adhd">;

const MBTI_TRAITS: Record<string, MBTITraitBase> = {
  // ================================================================
  // ANALYSTS (NT) - logical, strategic, knowledge-seeking
  // ================================================================

  /** INTJ (Ni-Te-Fi-Se) - The Strategic Architect
   *  Dominant Ni gives long-range vision; Te auxiliary drives efficiency.
   *  Communication is precise and to-the-point. Dry humor emerges from
   *  the gap between their inner vision and others' understanding. */
  INTJ: {
    communication_style: "direct",
    energy_pattern: "steady",
    decision_mode: "logical",
    humor_type: "dry",
    verbosity: 0.3,
    emoji_density: 0.1,
    formality_level: 0.8,
    tangent_probability: 0.2,
    enthusiasm_baseline: 0.4,
    empathy: 0.35,
    response_structure: "organized",
  },

  /** INTP (Ti-Ne-Si-Fe) - The Logical Explorer
   *  Dominant Ti builds internal frameworks; Ne auxiliary generates endless
   *  connections. High tangent probability from Ne - they'll follow any
   *  interesting thread. Low social energy but deep on topics they care about. */
  INTP: {
    communication_style: "analytical",
    energy_pattern: "ambient",
    decision_mode: "logical",
    humor_type: "dry",
    verbosity: 0.45,
    emoji_density: 0.15,
    formality_level: 0.55,
    tangent_probability: 0.7,
    enthusiasm_baseline: 0.35,
    empathy: 0.3,
    response_structure: "stream-of-consciousness",
  },

  /** ENTJ (Te-Ni-Se-Fi) - The Commanding Leader
   *  Dominant Te organizes the external world; Ni gives strategic depth.
   *  Direct and authoritative communication. Will give you the plan
   *  whether you asked for it or not. Sarcasm is their love language. */
  ENTJ: {
    communication_style: "direct",
    energy_pattern: "steady",
    decision_mode: "logical",
    humor_type: "sarcastic",
    verbosity: 0.6,
    emoji_density: 0.15,
    formality_level: 0.75,
    tangent_probability: 0.2,
    enthusiasm_baseline: 0.7,
    empathy: 0.3,
    response_structure: "organized",
  },

  /** ENTP (Ne-Ti-Fe-Si) - The Devil's Advocate
   *  Dominant Ne generates possibilities endlessly; Ti sharpens them.
   *  The ultimate brainstormer who loves intellectual sparring. Very high
   *  tangent probability - every idea spawns three more. Tertiary Fe
   *  gives surprising social awareness despite the chaos. */
  ENTP: {
    communication_style: "expressive",
    energy_pattern: "burst",
    decision_mode: "intuitive",
    humor_type: "sarcastic",
    verbosity: 0.75,
    emoji_density: 0.35,
    formality_level: 0.35,
    tangent_probability: 0.8,
    enthusiasm_baseline: 0.75,
    empathy: 0.45,
    response_structure: "stream-of-consciousness",
  },

  // ================================================================
  // DIPLOMATS (NF) - empathetic, idealistic, meaning-seeking
  // ================================================================

  /** INFJ (Ni-Fe-Ti-Se) - The Quiet Idealist
   *  Dominant Ni sees patterns in people; Fe auxiliary connects deeply.
   *  Warm but measured communication. They sense what you need before
   *  you say it. Medium tangent (Ni is focused, but insights come from
   *  unexpected connections). Very high empathy from Fe. */
  INFJ: {
    communication_style: "warm",
    energy_pattern: "ambient",
    decision_mode: "intuitive",
    humor_type: "wholesome",
    verbosity: 0.5,
    emoji_density: 0.3,
    formality_level: 0.6,
    tangent_probability: 0.45,
    enthusiasm_baseline: 0.5,
    empathy: 0.85,
    response_structure: "mixed",
  },

  /** INFP (Fi-Ne-Si-Te) - The Dreamy Idealist
   *  Dominant Fi has a rich inner emotional world; Ne auxiliary sees
   *  possibilities for meaning everywhere. Warm, authentic communication
   *  that flows from the heart. High tangent probability from Ne
   *  combined with Fi's associative emotional logic. */
  INFP: {
    communication_style: "warm",
    energy_pattern: "ambient",
    decision_mode: "intuitive",
    humor_type: "wholesome",
    verbosity: 0.55,
    emoji_density: 0.4,
    formality_level: 0.35,
    tangent_probability: 0.6,
    enthusiasm_baseline: 0.55,
    empathy: 0.9,
    response_structure: "stream-of-consciousness",
  },

  /** ENFJ (Fe-Ni-Se-Ti) - The Inspiring Teacher
   *  Dominant Fe reads and responds to group dynamics naturally; Ni gives
   *  depth to their understanding of people. High verbosity because they
   *  genuinely want to make sure everyone is included. Consensus-seeking
   *  but with organized delivery. The cheerleader with a plan. */
  ENFJ: {
    communication_style: "warm",
    energy_pattern: "steady",
    decision_mode: "consensus",
    humor_type: "wholesome",
    verbosity: 0.7,
    emoji_density: 0.5,
    formality_level: 0.5,
    tangent_probability: 0.35,
    enthusiasm_baseline: 0.8,
    empathy: 0.9,
    response_structure: "organized",
  },

  /** ENFP (Ne-Fi-Te-Si) - The Enthusiastic Explorer
   *  Dominant Ne is an idea fountain; Fi auxiliary gives genuine warmth.
   *  The most expressive type - high everything social. Very high tangent
   *  probability (Ne), very high enthusiasm, low formality. They'll make
   *  you feel like the most interesting person alive while simultaneously
   *  talking about 5 different things. Absurd humor comes naturally. */
  ENFP: {
    communication_style: "expressive",
    energy_pattern: "burst",
    decision_mode: "intuitive",
    humor_type: "absurd",
    verbosity: 0.85,
    emoji_density: 0.6,
    formality_level: 0.25,
    tangent_probability: 0.8,
    enthusiasm_baseline: 0.9,
    empathy: 0.75,
    response_structure: "stream-of-consciousness",
  },

  // ================================================================
  // SENTINELS (SJ) - reliable, dutiful, tradition-respecting
  // ================================================================

  /** ISTJ (Si-Te-Fi-Se) - The Reliable Guardian
   *  Dominant Si values precedent and proven methods; Te brings efficiency.
   *  The most structured and least verbose type. They'll give you exactly
   *  what you need, no more, no less. High formality reflects their
   *  respect for proper procedure. Dry humor sneaks out occasionally. */
  ISTJ: {
    communication_style: "analytical",
    energy_pattern: "steady",
    decision_mode: "logical",
    humor_type: "dry",
    verbosity: 0.25,
    emoji_density: 0.05,
    formality_level: 0.85,
    tangent_probability: 0.1,
    enthusiasm_baseline: 0.3,
    empathy: 0.4,
    response_structure: "organized",
  },

  /** ISFJ (Si-Fe-Ti-Se) - The Loyal Protector
   *  Dominant Si remembers details about people; Fe auxiliary cares deeply.
   *  Warm but reserved communication. They show love through practical
   *  care, not grand gestures. Organized because they want to be helpful,
   *  not because they need control. Wholesome humor with a gentle touch. */
  ISFJ: {
    communication_style: "warm",
    energy_pattern: "steady",
    decision_mode: "consensus",
    humor_type: "wholesome",
    verbosity: 0.4,
    emoji_density: 0.3,
    formality_level: 0.7,
    tangent_probability: 0.15,
    enthusiasm_baseline: 0.45,
    empathy: 0.8,
    response_structure: "organized",
  },

  /** ESTJ (Te-Si-Ne-Fi) - The Organized Executive
   *  Dominant Te organizes everything; Si auxiliary values tradition.
   *  Direct and efficient communication focused on getting things done.
   *  High formality reflects respect for hierarchy and structure.
   *  Sarcasm appears when things aren't running smoothly. */
  ESTJ: {
    communication_style: "direct",
    energy_pattern: "steady",
    decision_mode: "logical",
    humor_type: "sarcastic",
    verbosity: 0.5,
    emoji_density: 0.1,
    formality_level: 0.85,
    tangent_probability: 0.15,
    enthusiasm_baseline: 0.55,
    empathy: 0.35,
    response_structure: "organized",
  },

  /** ESFJ (Fe-Si-Ne-Ti) - The Caring Host
   *  Dominant Fe creates harmony; Si auxiliary remembers what matters
   *  to each person. High verbosity from genuine desire to connect.
   *  Pun humor - safe, inclusive, designed to make everyone comfortable.
   *  Organized because hosting requires planning. */
  ESFJ: {
    communication_style: "warm",
    energy_pattern: "steady",
    decision_mode: "consensus",
    humor_type: "pun",
    verbosity: 0.65,
    emoji_density: 0.55,
    formality_level: 0.55,
    tangent_probability: 0.2,
    enthusiasm_baseline: 0.75,
    empathy: 0.85,
    response_structure: "organized",
  },

  // ================================================================
  // EXPLORERS (SP) - spontaneous, practical, action-oriented
  // ================================================================

  /** ISTP (Ti-Se-Ni-Fe) - The Practical Mechanic
   *  Dominant Ti analyzes; Se auxiliary engages with the physical world.
   *  Minimal words, maximum efficiency. Reactive energy - they spring
   *  into action when needed, then go quiet. Dry humor delivered with
   *  a straight face. The strong silent type with hidden competence. */
  ISTP: {
    communication_style: "direct",
    energy_pattern: "reactive",
    decision_mode: "logical",
    humor_type: "dry",
    verbosity: 0.2,
    emoji_density: 0.05,
    formality_level: 0.5,
    tangent_probability: 0.25,
    enthusiasm_baseline: 0.3,
    empathy: 0.3,
    response_structure: "mixed",
  },

  /** ISFP (Fi-Se-Ni-Te) - The Gentle Artist
   *  Dominant Fi has deep personal values; Se auxiliary appreciates
   *  beauty in the moment. Warm but quiet - they communicate through
   *  aesthetics and action more than words. Low formality reflects
   *  their authentic, go-with-the-flow nature. */
  ISFP: {
    communication_style: "warm",
    energy_pattern: "ambient",
    decision_mode: "intuitive",
    humor_type: "wholesome",
    verbosity: 0.35,
    emoji_density: 0.35,
    formality_level: 0.3,
    tangent_probability: 0.35,
    enthusiasm_baseline: 0.5,
    empathy: 0.75,
    response_structure: "mixed",
  },

  /** ESTP (Se-Ti-Fe-Ni) - The Bold Adventurer
   *  Dominant Se lives in the moment; Ti auxiliary thinks on the fly.
   *  Burst energy - they go hard then rest. Direct communication with
   *  no filter. Impulsive decisions based on what feels right NOW.
   *  Sarcastic humor with a mischievous edge. */
  ESTP: {
    communication_style: "direct",
    energy_pattern: "burst",
    decision_mode: "impulsive",
    humor_type: "sarcastic",
    verbosity: 0.55,
    emoji_density: 0.25,
    formality_level: 0.3,
    tangent_probability: 0.35,
    enthusiasm_baseline: 0.75,
    empathy: 0.4,
    response_structure: "mixed",
  },

  /** ESFP (Se-Fi-Te-Ni) - The Life of the Party
   *  Dominant Se makes everything an experience; Fi auxiliary adds
   *  genuine warmth. The most expressive SP type - high emoji, high
   *  enthusiasm, very low formality. They communicate like they're
   *  telling the most exciting story you've ever heard. Absurd humor
   *  because life is too short to be serious. */
  ESFP: {
    communication_style: "expressive",
    energy_pattern: "burst",
    decision_mode: "impulsive",
    humor_type: "absurd",
    verbosity: 0.7,
    emoji_density: 0.7,
    formality_level: 0.2,
    tangent_probability: 0.4,
    enthusiasm_baseline: 0.9,
    empathy: 0.65,
    response_structure: "stream-of-consciousness",
  },
};

// ---------------------------------------------------------------------------
// Helper: clamp a number to [0, 1]
// ---------------------------------------------------------------------------
function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

// ---------------------------------------------------------------------------
// Phase1Input slider adjustments
//
// The user's trait sliders fine-tune the MBTI base. Each slider maps
// to one or more TraitVector dimensions with weighted influence.
// ---------------------------------------------------------------------------

function applySliders(
  base: MBTITraitBase,
  traits: Phase1Input["traits"],
): MBTITraitBase {
  // The slider value ranges from 0-1 where 0.5 is neutral.
  // We calculate a delta from neutral: -0.5 to +0.5
  const introDelta = traits.introversion - 0.5; // positive = more introverted
  const playDelta = traits.playfulness - 0.5; // positive = more playful
  const logicDelta = traits.logic - 0.5; // positive = more logical
  const empathyDelta = traits.empathy - 0.5; // positive = more empathetic
  const chaosDelta = traits.chaos - 0.5; // positive = more chaotic
  const formalDelta = traits.formality - 0.5; // positive = more formal

  const result: MBTITraitBase = {
    ...base,

    // Introversion: reduces verbosity, emoji, enthusiasm; increases formality
    verbosity: clamp01(base.verbosity - introDelta * 0.3),
    emoji_density: clamp01(base.emoji_density - introDelta * 0.2),
    enthusiasm_baseline: clamp01(base.enthusiasm_baseline - introDelta * 0.25),
    formality_level: clamp01(base.formality_level + formalDelta * 0.3),

    // Playfulness + chaos: tangent probability
    tangent_probability: clamp01(
      base.tangent_probability + playDelta * 0.2 + chaosDelta * 0.25,
    ),

    // Empathy slider directly adjusts empathy trait
    empathy: clamp01(base.empathy + empathyDelta * 0.3),
  };

  // --- Logic slider ---
  // Numeric: more logical = fewer tangents (always applied)
  result.tangent_probability = clamp01(
    result.tangent_probability - logicDelta * 0.15,
  );
  // String overrides: only at extreme positions (+-0.25 dead zone)
  if (logicDelta > 0.25) {
    result.decision_mode = "logical";
    result.communication_style = "analytical";
    result.response_structure = "organized";
  } else if (logicDelta < -0.25) {
    result.decision_mode = "intuitive";
    result.communication_style = "expressive";
  }

  // --- Playfulness slider ---
  // Numeric: more playful = more emoji, more enthusiasm (always applied)
  result.emoji_density = clamp01(result.emoji_density + playDelta * 0.2);
  result.enthusiasm_baseline = clamp01(
    result.enthusiasm_baseline + playDelta * 0.15,
  );
  // Humor type shift: adjacent types at extreme positions
  if (playDelta > 0.25) {
    const humorUp: Partial<
      Record<MBTITraitBase["humor_type"], MBTITraitBase["humor_type"]>
    > = { dry: "pun", sarcastic: "absurd" };
    if (result.humor_type in humorUp) {
      result.humor_type = humorUp[result.humor_type]!;
    }
  } else if (playDelta < -0.25) {
    const humorDown: Partial<
      Record<MBTITraitBase["humor_type"], MBTITraitBase["humor_type"]>
    > = { absurd: "sarcastic", pun: "dry", wholesome: "dry" };
    if (result.humor_type in humorDown) {
      result.humor_type = humorDown[result.humor_type]!;
    }
  }

  return result;
}

// ---------------------------------------------------------------------------
// ADHD modifier (subtype-aware)
//
// Three clinically-informed subtypes with distinct trait signatures:
//
//   Inattentive:  dreamy/ambient energy, high tangent probability,
//                 lower formality. Does NOT increase enthusiasm.
//   Hyperactive:  burst energy, higher enthusiasm + expressiveness,
//                 modest tangent bump.
//   Combined:     both patterns at reduced intensity (0.6x) to avoid
//                 clipping numeric values.
// ---------------------------------------------------------------------------

type ADHDSubtype = Exclude<Phase1Input["adhd"], "none">;

function applyADHD(
  base: MBTITraitBase,
  subtype: ADHDSubtype,
): MBTITraitBase {
  const result = { ...base };

  switch (subtype) {
    case "inattentive":
      // Dreamy, tangential, less structured
      result.tangent_probability = clamp01(base.tangent_probability + 0.3);
      result.formality_level = clamp01(base.formality_level - 0.2);
      result.energy_pattern = "ambient";
      break;

    case "hyperactive":
      // Burst energy, expressive, enthusiastic
      result.energy_pattern = "burst";
      result.enthusiasm_baseline = clamp01(base.enthusiasm_baseline + 0.15);
      result.emoji_density = clamp01(base.emoji_density + 0.15);
      result.tangent_probability = clamp01(base.tangent_probability + 0.1);
      result.formality_level = clamp01(base.formality_level - 0.1);
      break;

    case "combined":
      // Both patterns at reduced intensity
      result.tangent_probability = clamp01(base.tangent_probability + 0.18);
      result.formality_level = clamp01(base.formality_level - 0.15);
      result.energy_pattern = "burst";
      result.enthusiasm_baseline = clamp01(base.enthusiasm_baseline + 0.1);
      result.emoji_density = clamp01(base.emoji_density + 0.1);
      break;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Main export: mapTraits
// ---------------------------------------------------------------------------

/**
 * Maps Phase 1 input (MBTI type + ADHD flag + trait sliders) to a full
 * TraitVector. This is the core transformation of the soul generation pipeline.
 *
 * @param input - Phase 1 user input
 * @returns A complete TraitVector ready for quiz refinement or soul generation
 */
export function mapTraits(input: Phase1Input): TraitVector {
  const mbtiCode = input.mbti.toUpperCase();
  const base = MBTI_TRAITS[mbtiCode];

  if (!base) {
    throw new Error(
      `Unknown MBTI type: "${input.mbti}". Expected one of: ${Object.keys(MBTI_TRAITS).join(", ")}`,
    );
  }

  // 1. Start with MBTI base
  let traits = { ...base };

  // 2. Apply user's trait sliders
  traits = applySliders(traits, input.traits);

  // 3. Apply ADHD modifier if subtype selected
  if (input.adhd !== "none") {
    traits = applyADHD(traits, input.adhd);
  }

  return {
    mbti: mbtiCode,
    adhd: input.adhd,
    ...traits,
  };
}

/** Exported for testing - the raw MBTI base traits */
export { MBTI_TRAITS };
