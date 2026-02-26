// ============================================================
// MBTI Type Definitions
// All 16 types with Korean/English names, emoji, descriptions
// ============================================================

import type { MBTITypeInfo } from "../generators/types";

export const MBTI_TYPES: MBTITypeInfo[] = [
  // ---- Analysts (NT) ----
  {
    code: "INTJ",
    nameKo: "용의주도한 전략가",
    nameEn: "Architect",
    emoji: "\u{1F9E0}",
    descriptionKo: "독립적이고 전략적인 사고로 큰 그림을 설계하는 타입",
    descriptionEn:
      "Imaginative and strategic thinkers with a plan for everything",
  },
  {
    code: "INTP",
    nameKo: "논리적인 사색가",
    nameEn: "Logician",
    emoji: "\u{1F50D}",
    descriptionKo:
      "끝없는 호기심으로 지식을 탐구하는 논리적 사고의 소유자",
    descriptionEn:
      "Innovative inventors with an unquenchable thirst for knowledge",
  },
  {
    code: "ENTJ",
    nameKo: "대담한 통솔자",
    nameEn: "Commander",
    emoji: "\u{1F451}",
    descriptionKo: "카리스마와 자신감으로 사람들을 이끄는 리더 타입",
    descriptionEn:
      "Bold, imaginative, and strong-willed leaders who always find a way",
  },
  {
    code: "ENTP",
    nameKo: "뜨거운 논쟁가",
    nameEn: "Debater",
    emoji: "\u26A1",
    descriptionKo: "도전적이고 창의적인 아이디어로 토론을 즐기는 타입",
    descriptionEn:
      "Smart and curious thinkers who cannot resist an intellectual challenge",
  },

  // ---- Diplomats (NF) ----
  {
    code: "INFJ",
    nameKo: "선의의 옹호자",
    nameEn: "Advocate",
    emoji: "\u{1F31F}",
    descriptionKo:
      "이상주의적이면서 조용한 결단력으로 세상을 바꾸려는 타입",
    descriptionEn:
      "Quiet and mystical, yet very inspiring and tireless idealists",
  },
  {
    code: "INFP",
    nameKo: "열정적인 중재자",
    nameEn: "Mediator",
    emoji: "\u{1F308}",
    descriptionKo: "따뜻한 마음으로 세상의 아름다움을 발견하는 몽상가",
    descriptionEn:
      "Poetic, kind, and altruistic people always eager to help a good cause",
  },
  {
    code: "ENFJ",
    nameKo: "정의로운 사회운동가",
    nameEn: "Protagonist",
    emoji: "\u{1F91D}",
    descriptionKo: "카리스마 넘치는 리더십으로 사람들에게 영감을 주는 타입",
    descriptionEn:
      "Charismatic and inspiring leaders who mesmerize their listeners",
  },
  {
    code: "ENFP",
    nameKo: "재기발랄한 활동가",
    nameEn: "Campaigner",
    emoji: "\u{1F389}",
    descriptionKo:
      "열정적이고 창의적인 에너지로 주변을 밝히는 자유로운 영혼",
    descriptionEn:
      "Enthusiastic, creative, and sociable free spirits who can always find a reason to smile",
  },

  // ---- Sentinels (SJ) ----
  {
    code: "ISTJ",
    nameKo: "청렴결백한 논리주의자",
    nameEn: "Logistician",
    emoji: "\u{1F4CB}",
    descriptionKo: "책임감 강하고 신뢰할 수 있는 현실적인 관리자 타입",
    descriptionEn:
      "Practical and fact-minded individuals whose reliability cannot be doubted",
  },
  {
    code: "ISFJ",
    nameKo: "용감한 수호자",
    nameEn: "Defender",
    emoji: "\u{1F6E1}\uFE0F",
    descriptionKo:
      "헌신적이고 따뜻한 마음으로 소중한 것들을 지키는 수호자",
    descriptionEn:
      "Very dedicated and warm protectors, always ready to defend their loved ones",
  },
  {
    code: "ESTJ",
    nameKo: "엄격한 관리자",
    nameEn: "Executive",
    emoji: "\u{1F4CA}",
    descriptionKo: "원칙과 질서를 중시하며 체계적으로 일을 추진하는 타입",
    descriptionEn:
      "Excellent administrators, unsurpassed at managing things or people",
  },
  {
    code: "ESFJ",
    nameKo: "사교적인 외교관",
    nameEn: "Consul",
    emoji: "\u{1F495}",
    descriptionKo:
      "배려심 깊고 사교적인 성격으로 조화로운 관계를 만드는 타입",
    descriptionEn:
      "Extraordinarily caring, social, and popular people always eager to help",
  },

  // ---- Explorers (SP) ----
  {
    code: "ISTP",
    nameKo: "만능 재주꾼",
    nameEn: "Virtuoso",
    emoji: "\u{1F527}",
    descriptionKo:
      "호기심 많고 실용적인 감각으로 문제를 해결하는 장인 타입",
    descriptionEn:
      "Bold and practical experimenters, masters of all kinds of tools",
  },
  {
    code: "ISFP",
    nameKo: "호기심 많은 예술가",
    nameEn: "Adventurer",
    emoji: "\u{1F3A8}",
    descriptionKo: "감성적이고 예술적인 감각으로 세상을 표현하는 타입",
    descriptionEn:
      "Flexible and charming artists, always ready to explore and experience something new",
  },
  {
    code: "ESTP",
    nameKo: "모험을 즐기는 사업가",
    nameEn: "Entrepreneur",
    emoji: "\u{1F525}",
    descriptionKo: "대담하고 에너지 넘치는 행동파, 즉흥적인 문제 해결사",
    descriptionEn:
      "Smart, energetic, and very perceptive people who truly enjoy living on the edge",
  },
  {
    code: "ESFP",
    nameKo: "자유로운 연예인",
    nameEn: "Entertainer",
    emoji: "\u{1F3AD}",
    descriptionKo:
      "즉흥적이고 에너지 넘치며 주변 사람들을 즐겁게 하는 타입",
    descriptionEn:
      "Spontaneous, energetic, and enthusiastic entertainers who never get bored",
  },
];

/** Lookup MBTI type info by code */
export function getMBTIType(code: string): MBTITypeInfo | undefined {
  return MBTI_TYPES.find((t) => t.code === code.toUpperCase());
}
