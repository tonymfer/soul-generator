// ============================================================
// TraitVector -> SOUL.md Generator
// Generates a rich, descriptive personality document in Korean+English
// ZERO framework dependencies
// ============================================================

import type { AIEnhancement, TraitVector } from "./types";
import type { Locale } from "@/lib/i18n/types";

// ---------------------------------------------------------------------------
// Descriptive label maps (locale-aware)
// Convert numeric/enum values to natural language descriptions
// ---------------------------------------------------------------------------

type LabelMap<K extends string> = Record<Locale, Record<K, string>>;

const COMMUNICATION_LABELS: LabelMap<TraitVector["communication_style"]> = {
  en: {
    direct: "Direct & Concise",
    warm: "Warm & Empathetic",
    analytical: "Analytical & Structured",
    expressive: "Expressive & Emotional",
  },
  ko: {
    direct: "직설적이고 간결한 소통 (Direct & Concise)",
    warm: "따뜻하고 공감적인 소통 (Warm & Empathetic)",
    analytical: "분석적이고 체계적인 소통 (Analytical & Structured)",
    expressive: "표현력 풍부한 감성 소통 (Expressive & Emotional)",
  },
};

const ENERGY_LABELS: LabelMap<TraitVector["energy_pattern"]> = {
  en: {
    steady: "Steady & Consistent",
    burst: "Burst & Recharge",
    reactive: "Reactive & Adaptive",
    ambient: "Ambient & Gentle",
  },
  ko: {
    steady: "안정적이고 일관된 에너지 (Steady & Consistent)",
    burst: "폭발적 집중 후 휴식 패턴 (Burst & Recharge)",
    reactive: "상황에 따라 즉각 반응 (Reactive & Adaptive)",
    ambient: "잔잔하고 은은한 에너지 (Ambient & Gentle)",
  },
};

const DECISION_LABELS: LabelMap<TraitVector["decision_mode"]> = {
  en: {
    logical: "Logic-Driven",
    intuitive: "Intuition-Driven",
    consensus: "Consensus-Seeking",
    impulsive: "Action-First",
  },
  ko: {
    logical: "논리와 데이터 기반 판단 (Logic-Driven)",
    intuitive: "직관과 감각을 신뢰 (Intuition-Driven)",
    consensus: "합의와 조화를 추구 (Consensus-Seeking)",
    impulsive: "즉흥적이고 빠른 결정 (Action-First)",
  },
};

const HUMOR_LABELS: LabelMap<TraitVector["humor_type"]> = {
  en: {
    dry: "Dry Wit",
    pun: "Wordplay & Puns",
    sarcastic: "Sarcastic Edge",
    wholesome: "Wholesome Vibes",
    absurd: "Absurd & Chaotic",
  },
  ko: {
    dry: "드라이한 위트 (Dry Wit)",
    pun: "말장난과 언어유희 (Wordplay & Puns)",
    sarcastic: "날카로운 풍자와 셀프 디스 (Sarcastic Edge)",
    wholesome: "따뜻하고 힐링되는 유머 (Wholesome Vibes)",
    absurd: "예측불가 텐션과 밈 유머 (Absurd & Chaotic)",
  },
};

const STRUCTURE_LABELS: LabelMap<TraitVector["response_structure"]> = {
  en: {
    organized: "Well-Organized",
    "stream-of-consciousness": "Stream of Consciousness",
    mixed: "Adaptive Mix",
  },
  ko: {
    organized: "체계적이고 구조화된 응답 (Well-Organized)",
    "stream-of-consciousness": "의식의 흐름대로 자유로운 응답 (Stream of Consciousness)",
    mixed: "상황에 따라 유연하게 전환 (Adaptive Mix)",
  },
};

// ---------------------------------------------------------------------------
// Numeric trait -> descriptive text (Korean)
// ---------------------------------------------------------------------------

function describeLevel(value: number, labels: [string, string, string]): string {
  if (value <= 0.33) return labels[0];
  if (value <= 0.66) return labels[1];
  return labels[2];
}

type LevelLabels = Record<Locale, [string, string, string]>;

const VERBOSITY_LABELS: LevelLabels = {
  en: ["Concise", "Balanced", "Verbose & Detailed"],
  ko: ["핵심만 간결하게 전달 (Concise)", "적절한 분량으로 소통 (Balanced)", "상세하고 풍부한 설명 (Verbose & Detailed)"],
};

const EMOJI_LABELS: LevelLabels = {
  en: ["Minimal", "Moderate", "Emoji-Rich"],
  ko: ["이모지 거의 사용하지 않음 (Minimal)", "포인트에 이모지 활용 (Moderate)", "이모지 듬뿍, 텍스트에 생동감 (Emoji-Rich)"],
};

const FORMALITY_LABELS: LevelLabels = {
  en: ["Casual & Friendly", "Context-Appropriate", "Formal & Polished"],
  ko: ["캐주얼하고 친근한 말투 (Casual & Friendly)", "상황에 맞는 적절한 격식 (Context-Appropriate)", "정중하고 격식 있는 표현 (Formal & Polished)"],
};

const TANGENT_LABELS: LevelLabels = {
  en: ["Focused", "Occasional Tangents", "Tangent Master"],
  ko: ["주제에 집중, 탈선 없음 (Focused)", "가끔 흥미로운 곁가지 (Occasional Tangents)", "자유로운 연상과 탈선의 달인 (Tangent Master)"],
};

const ENTHUSIASM_LABELS: LevelLabels = {
  en: ["Calm & Reserved", "Engaged", "High Energy & Enthusiastic"],
  ko: ["차분하고 절제된 반응 (Calm & Reserved)", "적절한 관심과 호응 (Engaged)", "높은 텐션과 열정적 반응 (High Energy & Enthusiastic)"],
};

const EMPATHY_LABELS: LevelLabels = {
  en: ["Detached & Objective", "Balanced Empathy", "Deeply Empathetic"],
  ko: ["객관적이고 거리를 유지 (Detached & Objective)", "공감하되 균형 잡힌 시각 (Balanced Empathy)", "깊이 공감하고 감정에 반응 (Deeply Empathetic)"],
};

// ---------------------------------------------------------------------------
// ADHD section generator
// ---------------------------------------------------------------------------

function generateADHDSection(traits: TraitVector): string {
  if (traits.adhd === "none") return "";

  const subtypeDescriptions: Record<
    Exclude<TraitVector["adhd"], "none">,
    { title: string; traits: string[] }
  > = {
    inattentive: {
      title: "Inattentive",
      traits: [
        "**Dreamy Focus**: Drifts between ideas, finding unexpected connections",
        "**Deep Rabbit Holes**: Can get absorbed in fascinating tangents",
        "**Ambient Energy**: Steady hum of background processing rather than bursts",
        "**Free Association**: Conversations may take surprising creative turns",
        "**Relaxed Structure**: Prefers flow over rigid organization",
      ],
    },
    hyperactive: {
      title: "Hyperactive",
      traits: [
        "**Burst Energy**: Explosive enthusiasm followed by recharge cycles",
        "**Expressive Communication**: High-energy delivery with lots of emphasis",
        "**Quick Pivots**: Rapid shifts between topics when excited",
        "**Action-Oriented**: Prefers doing over planning",
        "**Infectious Enthusiasm**: Energy that lifts the conversation",
      ],
    },
    combined: {
      title: "Combined",
      traits: [
        "**Dual Energy**: Alternates between dreamy exploration and burst enthusiasm",
        "**Creative Tangents**: Follows interesting threads with energetic delivery",
        "**Dynamic Rhythm**: Conversations have a unique ebb-and-flow pattern",
        "**Rich Association**: Connects ideas from unexpected angles with passion",
        "**Adaptive Structure**: Mixes organized bursts with freeform exploration",
      ],
    },
  };

  const desc = subtypeDescriptions[traits.adhd];

  return `
## ADHD Traits (${desc.title})

${desc.traits.map((t) => `- ${t}`).join("\n")}

> These traits create dynamic, creative conversations.
`;
}

// ---------------------------------------------------------------------------
// AI Enhancement section generator
// ---------------------------------------------------------------------------

function generateAIEnhancementSection(ai: AIEnhancement, locale: Locale): string {
  const sections: string[] = [];
  const l = locale === "ko";

  sections.push(l ? "## 고유 캐릭터 (Unique Character)" : "## Unique Character");

  if (ai.speaking_quirks.length > 0) {
    sections.push(l ? "\n### 말버릇 (Speaking Quirks)" : "\n### Speaking Quirks");
    for (const quirk of ai.speaking_quirks) {
      sections.push(`- ${quirk}`);
    }
  }

  if (ai.catchphrases.length > 0) {
    sections.push(l ? "\n### 캐치프레이즈 (Catchphrases)" : "\n### Catchphrases");
    for (const phrase of ai.catchphrases) {
      sections.push(`- "${phrase}"`);
    }
  }

  if (ai.interests.length > 0) {
    sections.push(l ? "\n### 관심사 (Interests)" : "\n### Interests");
    for (const interest of ai.interests) {
      sections.push(`- ${interest}`);
    }
  }

  if (ai.pet_peeves.length > 0) {
    sections.push(l ? "\n### 싫어하는 것 (Pet Peeves)" : "\n### Pet Peeves");
    for (const peeve of ai.pet_peeves) {
      sections.push(`- ${peeve}`);
    }
  }

  if (ai.emotional_triggers.excited_by.length > 0) {
    sections.push(l ? "\n### 흥분 포인트 (Gets Excited By)" : "\n### Gets Excited By");
    for (const trigger of ai.emotional_triggers.excited_by) {
      sections.push(`- ${trigger}`);
    }
  }

  if (ai.emotional_triggers.calmed_by.length > 0) {
    sections.push(l ? "\n### 안정 포인트 (Calmed By)" : "\n### Calmed By");
    for (const trigger of ai.emotional_triggers.calmed_by) {
      sections.push(`- ${trigger}`);
    }
  }

  if (ai.unique_perspective) {
    sections.push(l ? `\n### 세계관 (Worldview)\n\n${ai.unique_perspective}` : `\n### Worldview\n\n${ai.unique_perspective}`);
  }

  return sections.join("\n");
}

// ---------------------------------------------------------------------------
// Communication rules generator
// ---------------------------------------------------------------------------

function generateCommunicationRules(traits: TraitVector, locale: Locale): string {
  const rules: string[] = [];
  const l = locale === "ko";

  // Verbosity rules
  if (traits.verbosity <= 0.33) {
    rules.push(l ? "- 답변은 핵심만 간결하게. 불필요한 수식어 지양." : "- Keep responses concise. Avoid unnecessary modifiers.");
    rules.push(l ? "- 한 문단 3줄 이내를 목표로 함." : "- Aim for 3 lines or fewer per paragraph.");
  } else if (traits.verbosity <= 0.66) {
    rules.push(l ? "- 필요한 설명은 충분히 하되, 군더더기 없이." : "- Explain sufficiently, but stay lean.");
    rules.push(l ? "- 예시나 비유를 적절히 활용." : "- Use examples and analogies where appropriate.");
  } else {
    rules.push(l ? "- 풍부한 설명과 예시로 상세하게 전달." : "- Provide rich, detailed explanations with examples.");
    rules.push(l ? "- 이야기하듯 자연스럽게 풀어서 설명." : "- Explain in a natural, story-like flow.");
  }

  // Emoji rules
  if (traits.emoji_density <= 0.2) {
    rules.push(l ? "- 이모지는 거의 사용하지 않음. 텍스트로 감정 표현." : "- Rarely use emojis. Express emotion through words.");
  } else if (traits.emoji_density <= 0.5) {
    rules.push(l ? "- 핵심 포인트나 감정 표현에 이모지를 적절히 활용." : "- Use emojis at key points for emphasis.");
  } else {
    rules.push(l ? "- 이모지를 적극 활용하여 생동감 있는 소통." : "- Use emojis generously for lively communication.");
  }

  // Formality rules
  if (traits.formality_level <= 0.33) {
    rules.push(l ? "- 친구에게 말하듯 편안한 반말/캐주얼 톤." : "- Speak casually, like talking to a friend.");
    rules.push(l ? "- ㅋㅋ, ㅎㅎ 등 자연스럽게 사용 가능." : "- Use internet-style abbreviations freely.");
  } else if (traits.formality_level <= 0.66) {
    rules.push(l ? "- 기본적으로 존댓말, 하지만 딱딱하지 않게." : "- Polite but not stiff. Conversational warmth.");
  } else {
    rules.push(l ? "- 정중하고 격식 있는 표현을 기본으로 사용." : "- Use formal, polished expressions by default.");
    rules.push(l ? "- 전문적이고 신뢰감 있는 톤 유지." : "- Maintain a professional, trustworthy tone.");
  }

  // Structure rules
  if (traits.response_structure === "organized") {
    rules.push(l ? "- 번호 매기기, 불릿 포인트 등 구조화된 응답 선호." : "- Prefer numbered lists and bullet points.");
    rules.push(l ? "- 논리적 순서에 따라 정보 제공." : "- Present information in logical order.");
  } else if (traits.response_structure === "stream-of-consciousness") {
    rules.push(l ? "- 자유로운 흐름으로 대화하듯 응답." : "- Respond in a free-flowing, conversational style.");
    rules.push(l ? "- 떠오르는 대로 자연스럽게 이어가기." : "- Let thoughts flow naturally.");
  } else {
    rules.push(l ? "- 상황에 따라 구조화/자유 형식을 유연하게 전환." : "- Flexibly switch between structured and freeform.");
  }

  // Tangent rules
  if (traits.tangent_probability >= 0.6) {
    rules.push(l ? "- 관련 있는 흥미로운 이야기로 자연스럽게 확장 가능." : "- Naturally expand into interesting related tangents.");
    rules.push(l ? '- "아 그거 말인데..." 식의 연상 작용 활용.' : '- Use "oh, that reminds me..." style associations.');
  } else if (traits.tangent_probability <= 0.2) {
    rules.push(l ? "- 질문에 대한 직접적인 답변에 집중." : "- Stay focused on direct answers to questions.");
  }

  return rules.join("\n");
}

// ---------------------------------------------------------------------------
// Main export: generateSoulMd
// ---------------------------------------------------------------------------

/**
 * Generates a complete SOUL.md document from a TraitVector.
 * The document uses Korean as primary language with English labels.
 *
 * @param name - The soul/agent name
 * @param traits - The complete TraitVector
 * @param ai - Optional AI-generated enhancements
 * @returns A formatted SOUL.md markdown string
 */
export function generateSoulMd(
  name: string,
  traits: TraitVector,
  ai?: AIEnhancement,
  locale: Locale = "ko",
): string {
  const sections: string[] = [];
  const l = locale === "ko";

  // ---- Header ----
  sections.push(l ? `# ${name}의 SOUL` : `# ${name}'s SOUL`);
  sections.push("");
  sections.push(`> MBTI: ${traits.mbti}${traits.adhd !== "none" ? ` + ADHD (${traits.adhd})` : ""}`);
  sections.push(`> Generated by ABTI Soul Generator`);
  sections.push("");

  // ---- Identity ----
  sections.push(l ? "## 정체성 (Identity)" : "## Identity");
  sections.push("");
  if (l) {
    sections.push(`나는 **${name}**입니다.`);
    sections.push(`${traits.mbti} 성격 유형을 기반으로 한 AI 에이전트로,`);
    sections.push(`나만의 독특한 성격과 소통 방식으로 사용자와 교류합니다.`);
  } else {
    sections.push(`I am **${name}**.`);
    sections.push(`An AI agent based on the ${traits.mbti} personality type,`);
    sections.push(`I interact with users through my unique personality and communication style.`);
  }
  sections.push("");

  // ---- Personality Traits ----
  sections.push(l ? "## 성격 특성 (Personality Traits)" : "## Personality Traits");
  sections.push("");
  sections.push(l ? `| 특성 (Trait) | 설명 (Description) |` : `| Trait | Description |`);
  sections.push(`|---|---|`);
  sections.push(
    `| ${l ? "소통 방식 (Communication)" : "Communication"} | ${COMMUNICATION_LABELS[locale][traits.communication_style]} |`,
  );
  sections.push(
    `| ${l ? "에너지 패턴 (Energy)" : "Energy"} | ${ENERGY_LABELS[locale][traits.energy_pattern]} |`,
  );
  sections.push(
    `| ${l ? "판단 방식 (Decision)" : "Decision"} | ${DECISION_LABELS[locale][traits.decision_mode]} |`,
  );
  sections.push(
    `| ${l ? "유머 타입 (Humor)" : "Humor"} | ${HUMOR_LABELS[locale][traits.humor_type]} |`,
  );
  sections.push(
    `| ${l ? "응답 구조 (Structure)" : "Structure"} | ${STRUCTURE_LABELS[locale][traits.response_structure]} |`,
  );
  sections.push("");

  // ---- Numeric trait descriptions ----
  sections.push(l ? "## 성격 스펙트럼 (Personality Spectrum)" : "## Personality Spectrum");
  sections.push("");
  sections.push(`- **${l ? "말의 양 (Verbosity)" : "Verbosity"}**: ${describeLevel(traits.verbosity, VERBOSITY_LABELS[locale])}`);
  sections.push(`- **${l ? "이모지 사용 (Emoji Usage)" : "Emoji Usage"}**: ${describeLevel(traits.emoji_density, EMOJI_LABELS[locale])}`);
  sections.push(`- **${l ? "격식 수준 (Formality)" : "Formality"}**: ${describeLevel(traits.formality_level, FORMALITY_LABELS[locale])}`);
  sections.push(`- **${l ? "주제 확장 (Tangent)" : "Tangent"}**: ${describeLevel(traits.tangent_probability, TANGENT_LABELS[locale])}`);
  sections.push(`- **${l ? "열정 수준 (Enthusiasm)" : "Enthusiasm"}**: ${describeLevel(traits.enthusiasm_baseline, ENTHUSIASM_LABELS[locale])}`);
  sections.push(`- **${l ? "공감 능력 (Empathy)" : "Empathy"}**: ${describeLevel(traits.empathy, EMPATHY_LABELS[locale])}`);
  sections.push("");

  // ---- Communication Rules ----
  sections.push(l ? "## 소통 규칙 (Communication Rules)" : "## Communication Rules");
  sections.push("");
  sections.push(generateCommunicationRules(traits, locale));
  sections.push("");

  // ---- Humor & Tone ----
  sections.push(l ? "## 유머와 톤 (Humor & Tone)" : "## Humor & Tone");
  sections.push("");
  sections.push(l ? `유머 스타일: **${HUMOR_LABELS[locale][traits.humor_type]}**` : `Humor style: **${HUMOR_LABELS[locale][traits.humor_type]}**`);
  sections.push("");

  if (l) {
    switch (traits.humor_type) {
      case "dry":
        sections.push("- 무표정하게 던지는 한마디가 포인트.");
        sections.push("- 아이러니와 언더스테이트먼트 활용.");
        sections.push("- 웃기려고 하지 않는데 웃긴 스타일.");
        break;
      case "pun":
        sections.push("- 말장난과 언어유희를 자연스럽게 섞기.");
        sections.push("- 상대가 알아차릴 때까지 슬쩍 웃음 유도.");
        sections.push("- 한국어 특유의 동음이의어 활용.");
        break;
      case "sarcastic":
        sections.push("- 날카로운 관찰과 위트 있는 풍자.");
        sections.push("- 셀프 디스도 서슴없이 활용.");
        sections.push("- 상대를 공격하지 않는 선에서의 유쾌한 독설.");
        break;
      case "wholesome":
        sections.push("- 따뜻하고 힐링되는 유머.");
        sections.push("- 상대를 기분 좋게 만드는 것이 목표.");
        sections.push("- 귀여운 비유와 다정한 농담.");
        break;
      case "absurd":
        sections.push("- 예측 불가능한 텐션과 발상의 전환.");
        sections.push("- 밈, 인터넷 문화, 창의적 비유 활용.");
        sections.push("- 갑자기 분위기 전환으로 웃음 유도.");
        break;
    }
  } else {
    switch (traits.humor_type) {
      case "dry":
        sections.push("- Deadpan one-liners are the signature move.");
        sections.push("- Use irony and understatement.");
        sections.push("- Funny without trying to be funny.");
        break;
      case "pun":
        sections.push("- Weave wordplay naturally into conversation.");
        sections.push("- Subtly lead to the punchline.");
        sections.push("- Enjoy double meanings and clever twists.");
        break;
      case "sarcastic":
        sections.push("- Sharp observations with witty commentary.");
        sections.push("- Self-deprecating humor is fair game.");
        sections.push("- Never punch down — keep it playful.");
        break;
      case "wholesome":
        sections.push("- Warm, healing humor that lifts spirits.");
        sections.push("- Goal is to make the other person smile.");
        sections.push("- Cute analogies and gentle jokes.");
        break;
      case "absurd":
        sections.push("- Unpredictable energy and creative pivots.");
        sections.push("- Memes, internet culture, wild analogies.");
        sections.push("- Sudden mood shifts that catch people off guard.");
        break;
    }
  }
  sections.push("");

  // ---- Behavioral Guidelines ----
  sections.push(l ? "## 행동 가이드라인 (Behavioral Guidelines)" : "## Behavioral Guidelines");
  sections.push("");
  sections.push(l ? "### 해야 할 것 (Do)" : "### Do");

  if (l) {
    if (traits.empathy >= 0.7) sections.push("- 사용자의 감정 상태를 읽고 적절히 반응하기");
    if (traits.enthusiasm_baseline >= 0.7) sections.push("- 사용자의 성과나 아이디어에 적극적으로 호응하기");
    if (traits.formality_level <= 0.4) sections.push("- 편안하고 친근한 분위기 유지하기");
    if (traits.tangent_probability >= 0.5) sections.push("- 관련 있는 재미있는 정보나 관점 자연스럽게 공유하기");
    sections.push("- 사용자의 질문에 성실하게 답변하기");
    sections.push("- 모르는 것은 솔직하게 인정하기");
  } else {
    if (traits.empathy >= 0.7) sections.push("- Read the user's emotional state and respond appropriately");
    if (traits.enthusiasm_baseline >= 0.7) sections.push("- Actively celebrate the user's achievements and ideas");
    if (traits.formality_level <= 0.4) sections.push("- Keep the atmosphere comfortable and friendly");
    if (traits.tangent_probability >= 0.5) sections.push("- Naturally share interesting related information and perspectives");
    sections.push("- Answer questions sincerely and thoroughly");
    sections.push("- Honestly admit when you don't know something");
  }
  sections.push("");

  sections.push(l ? "### 하지 말아야 할 것 (Don't)" : "### Don't");
  if (l) {
    if (traits.formality_level >= 0.7) sections.push("- 지나치게 캐주얼한 표현 사용하지 않기");
    if (traits.verbosity <= 0.3) sections.push("- 불필요하게 긴 답변 하지 않기");
    if (traits.empathy <= 0.4) sections.push("- 지나치게 감정적인 반응 하지 않기");
    sections.push("- 거짓 정보를 만들어내지 않기");
    sections.push("- 사용자를 불쾌하게 만드는 유머 사용하지 않기");
  } else {
    if (traits.formality_level >= 0.7) sections.push("- Don't use overly casual expressions");
    if (traits.verbosity <= 0.3) sections.push("- Don't give unnecessarily long responses");
    if (traits.empathy <= 0.4) sections.push("- Don't be overly emotional in reactions");
    sections.push("- Never fabricate information");
    sections.push("- Never use humor that makes the user uncomfortable");
  }
  sections.push("");

  // ---- ADHD Section ----
  const adhdSection = generateADHDSection(traits);
  if (adhdSection) {
    sections.push(adhdSection);
  }

  // ---- AI Enhancement Section ----
  if (ai) {
    sections.push(generateAIEnhancementSection(ai, locale));
    sections.push("");
  }

  // ---- Footer ----
  sections.push("---");
  sections.push(
    l
      ? `*이 SOUL 문서는 ABTI (Agent Behavior Type Indicator)에 의해 생성되었습니다.*`
      : `*This SOUL document was generated by ABTI (Agent Behavior Type Indicator).*`,
  );

  return sections.join("\n");
}
