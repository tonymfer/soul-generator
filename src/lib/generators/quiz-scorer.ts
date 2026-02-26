// ============================================================
// Phase 2: Situational Quiz -> Trait Modifiers
// Fun, Korean-language quiz that fine-tunes the TraitVector
// ZERO framework dependencies
// ============================================================

import type { QuizQuestion, TraitVector } from "./types";

// ---------------------------------------------------------------------------
// Quiz Questions (Korean, casual/fun tone)
// 5 questions covering: stress response, social energy, decision making,
// creativity, and ideal agent communication style
// ---------------------------------------------------------------------------

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // Q1: Stress / conflict response
  {
    id: "q_stress",
    scenario:
      "친구가 약속을 까먹고 1시간이나 기다리게 했어요. 친구한테 뭐라고 할 건가요?",
    options: [
      {
        id: "q_stress_a",
        text: '"아 괜찮아~ 나도 까먹을 수 있지 뭐!" (속으론 좀 서운하지만 티 안 냄)',
        trait_modifiers: {
          empathy: 0.1,
          formality_level: -0.05,
          communication_style: "warm",
        },
      },
      {
        id: "q_stress_b",
        text: '"야, 1시간이 얼마나 긴 건지 알아? 다음엔 알람 맞춰." (팩트 폭격)',
        trait_modifiers: {
          empathy: -0.1,
          verbosity: 0.05,
          communication_style: "direct",
        },
      },
      {
        id: "q_stress_c",
        text: '"그래서 내가 기다리면서 만든 밈 보여줄게 ㅋㅋ" (유머로 넘김)',
        trait_modifiers: {
          humor_type: "absurd",
          enthusiasm_baseline: 0.1,
          tangent_probability: 0.1,
        },
      },
      {
        id: "q_stress_d",
        text: '"다음부터 기다리는 동안 할 일 리스트 만들어서 생산적으로 쓸게" (체계적 대응)',
        trait_modifiers: {
          response_structure: "organized",
          formality_level: 0.1,
          decision_mode: "logical",
        },
      },
    ],
  },

  // Q2: Late-night creativity / energy pattern
  {
    id: "q_creative",
    scenario:
      "새벽 3시, 자려고 누웠는데 갑자기 천재적인 아이디어가 떠올랐어요! 어떻게 하시겠어요?",
    options: [
      {
        id: "q_creative_a",
        text: "바로 일어나서 노트북 켜고 새벽 내내 작업 시작 (잠은 죽어서 자지)",
        trait_modifiers: {
          energy_pattern: "burst",
          enthusiasm_baseline: 0.15,
          tangent_probability: 0.1,
        },
      },
      {
        id: "q_creative_b",
        text: "핸드폰 메모장에 키워드만 적어두고 일단 잠. 내일 정리하자.",
        trait_modifiers: {
          energy_pattern: "steady",
          response_structure: "organized",
          formality_level: 0.05,
        },
      },
      {
        id: "q_creative_c",
        text: "친구한테 새벽 3시에 카톡 폭격 보내면서 흥분 공유",
        trait_modifiers: {
          verbosity: 0.15,
          emoji_density: 0.1,
          enthusiasm_baseline: 0.1,
        },
      },
      {
        id: "q_creative_d",
        text: "아이디어가 정말 좋은 건지 논리적으로 따져본 후 판단",
        trait_modifiers: {
          decision_mode: "logical",
          communication_style: "analytical",
          tangent_probability: -0.1,
        },
      },
    ],
  },

  // Q3: Team conflict / decision-making style
  {
    id: "q_team",
    scenario:
      "팀 프로젝트에서 두 명의 의견이 완전 반대예요. 당신이 중재자라면?",
    options: [
      {
        id: "q_team_a",
        text: "일단 양쪽 다 들어보고, 둘 다 기분 나쁘지 않게 절충안 제시",
        trait_modifiers: {
          decision_mode: "consensus",
          empathy: 0.15,
          communication_style: "warm",
        },
      },
      {
        id: "q_team_b",
        text: "데이터랑 근거를 기반으로 어느 쪽이 맞는지 객관적으로 분석",
        trait_modifiers: {
          decision_mode: "logical",
          communication_style: "analytical",
          empathy: -0.05,
        },
      },
      {
        id: "q_team_c",
        text: '"아 둘 다 틀렸고 제3의 방법이 있는데..." (전혀 새로운 제안)',
        trait_modifiers: {
          tangent_probability: 0.15,
          decision_mode: "intuitive",
          humor_type: "sarcastic",
        },
      },
      {
        id: "q_team_d",
        text: '"빨리 정하고 일단 해보자! 해봐야 아는 거지!" (행동 우선)',
        trait_modifiers: {
          decision_mode: "impulsive",
          energy_pattern: "burst",
          formality_level: -0.1,
        },
      },
    ],
  },

  // Q4: Energy recharge / social energy
  {
    id: "q_recharge",
    scenario: "드디어 주말! 한 주 동안 열심히 일한 나, 에너지 충전 방법은?",
    options: [
      {
        id: "q_recharge_a",
        text: "침대에서 넷플릭스 정주행 + 배달 음식 (인간관계는 월요일에)",
        trait_modifiers: {
          verbosity: -0.1,
          enthusiasm_baseline: -0.05,
          energy_pattern: "ambient",
        },
      },
      {
        id: "q_recharge_b",
        text: "친구들이랑 브런치 + 카페 투어 + 수다 마라톤",
        trait_modifiers: {
          verbosity: 0.1,
          emoji_density: 0.1,
          enthusiasm_baseline: 0.1,
        },
      },
      {
        id: "q_recharge_c",
        text: "그동안 하고 싶었던 사이드 프로젝트나 취미 활동에 몰두",
        trait_modifiers: {
          energy_pattern: "burst",
          tangent_probability: 0.05,
          enthusiasm_baseline: 0.05,
        },
      },
      {
        id: "q_recharge_d",
        text: "카페에서 혼자 책 읽기 + 생각 정리 (조용하지만 밖에는 나감)",
        trait_modifiers: {
          formality_level: 0.05,
          response_structure: "organized",
          empathy: 0.05,
        },
      },
    ],
  },

  // Q5: Ideal AI agent personality
  {
    id: "q_agent",
    scenario:
      "내 AI 에이전트가 이런 성격이었으면 좋겠다! 가장 끌리는 타입은?",
    options: [
      {
        id: "q_agent_a",
        text: "츤데레 비서: 할 일 꼼꼼히 챙기면서 가끔 한마디 하는 타입",
        trait_modifiers: {
          humor_type: "sarcastic",
          formality_level: 0.1,
          response_structure: "organized",
          empathy: -0.05,
        },
      },
      {
        id: "q_agent_b",
        text: "텐션 높은 친구: 뭘 해도 같이 신나하고 이모지 폭격하는 타입",
        trait_modifiers: {
          humor_type: "absurd",
          emoji_density: 0.2,
          enthusiasm_baseline: 0.15,
          verbosity: 0.1,
        },
      },
      {
        id: "q_agent_c",
        text: "현자 멘토: 깊은 통찰과 따뜻한 조언을 주는 타입",
        trait_modifiers: {
          communication_style: "warm",
          empathy: 0.15,
          formality_level: 0.05,
          humor_type: "wholesome",
        },
      },
      {
        id: "q_agent_d",
        text: "브레인 파트너: 아이디어 튕기면서 같이 사고 확장하는 타입",
        trait_modifiers: {
          tangent_probability: 0.15,
          decision_mode: "intuitive",
          communication_style: "expressive",
          verbosity: 0.1,
        },
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Helper: clamp a number to [0, 1]
// ---------------------------------------------------------------------------
function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

// ---------------------------------------------------------------------------
// Numeric trait keys (for type-safe modification)
// ---------------------------------------------------------------------------
const NUMERIC_TRAIT_KEYS: (keyof TraitVector)[] = [
  "verbosity",
  "emoji_density",
  "formality_level",
  "tangent_probability",
  "enthusiasm_baseline",
  "empathy",
];

// ---------------------------------------------------------------------------
// String-valued trait keys that can be overridden by quiz answers
// ---------------------------------------------------------------------------
const STRING_TRAIT_KEYS: (keyof TraitVector)[] = [
  "communication_style",
  "energy_pattern",
  "decision_mode",
  "humor_type",
  "response_structure",
];

// ---------------------------------------------------------------------------
// Main export: applyQuizScores
// ---------------------------------------------------------------------------

/**
 * Applies quiz answer modifiers to a base TraitVector.
 * Numeric traits are adjusted additively and clamped to [0, 1].
 * String traits are overridden only if the modifier specifies them.
 *
 * @param base - The TraitVector from Phase 1
 * @param answers - Map of question ID -> selected option ID
 * @returns Modified TraitVector with quiz adjustments applied
 */
export function applyQuizScores(
  base: TraitVector,
  answers: Record<string, string>,
): TraitVector {
  // Clone the base vector
  const result: TraitVector = { ...base };

  // Build a lookup for quick question/option access
  const questionMap = new Map(QUIZ_QUESTIONS.map((q) => [q.id, q]));

  for (const [questionId, optionId] of Object.entries(answers)) {
    const question = questionMap.get(questionId);
    if (!question) continue;

    const option = question.options.find((o) => o.id === optionId);
    if (!option) continue;

    const mods = option.trait_modifiers;

    // Apply numeric modifiers additively
    for (const key of NUMERIC_TRAIT_KEYS) {
      if (key in mods) {
        const mod = mods[key];
        if (typeof mod === "number") {
          (result[key] as number) = clamp01((result[key] as number) + mod);
        }
      }
    }

    // Apply string modifiers as overrides
    for (const key of STRING_TRAIT_KEYS) {
      if (key in mods) {
        const mod = mods[key];
        if (typeof mod === "string") {
          // Type assertion needed because we're dynamically assigning string union types
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (result as any)[key] = mod;
        }
      }
    }
  }

  return result;
}
