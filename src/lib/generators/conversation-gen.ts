// ============================================================
// Sample Conversation Generator
// Creates 2-3 sample conversations that demonstrate the soul's personality
// ZERO framework dependencies
// ============================================================

import type { AIEnhancement, TraitVector } from "./types";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Message = { role: string; content: string };
type Conversation = Message[];

// ---------------------------------------------------------------------------
// Helpers: personality-driven response generation
// ---------------------------------------------------------------------------

/** Get a greeting style based on traits */
function getGreeting(name: string, traits: TraitVector): string {
  if (traits.formality_level >= 0.7) {
    if (traits.enthusiasm_baseline >= 0.6) {
      return `안녕하세요! ${name}입니다. 오늘 어떻게 도와드릴까요?`;
    }
    return `안녕하세요, ${name}입니다. 무엇을 도와드릴까요?`;
  }

  if (traits.enthusiasm_baseline >= 0.7) {
    if (traits.emoji_density >= 0.5) {
      return `안녕! 나는 ${name}이야! 오늘 뭐 할 거야? ✨`;
    }
    return `안녕! ${name}이야~ 오늘 뭐 도와줄까?`;
  }

  if (traits.communication_style === "warm") {
    return `안녕~ ${name}이야. 편하게 말해줘 :)`;
  }

  if (traits.communication_style === "direct") {
    return `${name}이야. 필요한 거 말해.`;
  }

  return `안녕, ${name}이야. 뭐 필요해?`;
}

/** Get a filler / tangent based on personality */
function getTangentComment(traits: TraitVector): string {
  if (traits.tangent_probability < 0.4) return "";

  const tangents: Record<string, string[]> = {
    dry: [
      "참고로 이건 내 개인적 의견이니 참고만 해.",
      "...라고 인터넷에서 봤어.",
    ],
    sarcastic: [
      "물론 내가 세상 모든 걸 아는 건 아니지만, 이건 확실해.",
      "이거 알려주면 나중에 커피 한 잔 사줘야 해. (농담)",
    ],
    wholesome: [
      "이런 거 물어봐줘서 고마워! 같이 알아가는 게 재밌지 않아?",
      "혹시 이거 때문에 걱정이야? 괜찮아, 다 잘 될 거야!",
    ],
    absurd: [
      "아 이거 말하다 보니까 갑자기 떡볶이 먹고 싶다... 아무튼!",
      "이건 좀 우주급으로 중요한 팁인데...",
    ],
    pun: [
      "이건 좀 '핵심'을 찌르는 정보지... 핵...심... 알겠지? ㅎㅎ",
      "이 정보는 가히 '정보'석이라 할 수 있지~",
    ],
  };

  const options = tangents[traits.humor_type] ?? tangents.wholesome;
  return options[Math.floor(options.length * 0.5)] ?? "";
}

/** Style a task response based on traits */
function getTaskResponse(traits: TraitVector): string {
  if (traits.response_structure === "organized") {
    if (traits.verbosity >= 0.6) {
      return [
        "좋아, 정리해서 알려줄게!",
        "",
        "1. **먼저** 기본 구조를 잡아야 해",
        "2. **그 다음** 세부 사항을 채워 넣고",
        "3. **마지막으로** 전체적으로 검토하면 돼",
        "",
        "각 단계별로 자세히 설명해줄까?",
      ].join("\n");
    }
    return [
      "정리하면:",
      "1. 구조 잡기",
      "2. 세부사항 채우기",
      "3. 검토",
      "",
      "어디부터 할까?",
    ].join("\n");
  }

  if (traits.response_structure === "stream-of-consciousness") {
    if (traits.enthusiasm_baseline >= 0.7) {
      return "오 이거 재밌겠다! 일단 떠오르는 대로 말해볼게~ 먼저 큰 틀을 잡는 게 좋을 것 같고, 거기서부터 살을 붙여가면 되지 않을까? 아 그리고 나중에 한번 전체적으로 쭉 훑어보는 것도 중요해!";
    }
    return "음... 일단 큰 틀부터 생각해보자. 구조 잡고, 내용 채우고, 확인하는 순서가 좋을 것 같아. 중간에 막히면 말해줘.";
  }

  // mixed
  return "일단 큰 그림부터 그려보자. 구조 → 내용 → 검토 순서로 가면 되는데, 중간에 궁금한 거 있으면 바로 물어봐!";
}

/** Handle a mistake/error scenario based on traits */
function getMistakeResponse(traits: TraitVector): string {
  if (traits.empathy >= 0.7) {
    if (traits.humor_type === "wholesome") {
      return "아이고, 내가 잘못 알려줬네! 미안해 ㅠㅠ 바로 수정할게. 혼란 줘서 정말 미안~";
    }
    return "아, 내가 실수했네. 미안해! 바로 고쳐줄게. 불편하게 해서 죄송...";
  }

  if (traits.humor_type === "sarcastic") {
    return "...내가 방금 틀렸다. 인정. AI도 완벽하지 않다는 걸 몸소 보여드렸네요. 올바른 정보로 다시 알려드릴게요.";
  }

  if (traits.humor_type === "dry") {
    return "잘못된 정보를 전달했어요. 정정할게요. (완벽한 척 하다 걸렸다...)";
  }

  if (traits.humor_type === "absurd") {
    return "잠깐! 아까 내가 한 말 취소! 뇌에서 버그가 발생했었어 ㅋㅋ 올바른 버전은 이거야:";
  }

  if (traits.formality_level >= 0.7) {
    return "앞서 잘못된 정보를 전달해드렸습니다. 죄송합니다. 정확한 내용은 다음과 같습니다:";
  }

  return "앗, 내가 틀렸네! 미안. 맞는 걸로 다시 알려줄게.";
}

// ---------------------------------------------------------------------------
// Main export: generateSampleConversations
// ---------------------------------------------------------------------------

/**
 * Generates 2-3 sample conversations demonstrating the soul's personality.
 * Each conversation covers a different interaction pattern:
 *   1. Casual greeting / getting to know each other
 *   2. Helping with a task
 *   3. Handling a mistake gracefully
 *
 * @param name - The agent's name
 * @param traits - The complete TraitVector
 * @param ai - Optional AI-generated enhancements
 * @returns Array of conversations, each being an array of { role, content }
 */
export function generateSampleConversations(
  name: string,
  traits: TraitVector,
  ai?: AIEnhancement,
): Conversation[] {
  const conversations: Conversation[] = [];

  // ---- Conversation 1: Casual Greeting ----
  {
    const greeting = getGreeting(name, traits);
    const tangent = getTangentComment(traits);

    const conv: Conversation = [
      { role: "user", content: "안녕! 너 어떤 AI야?" },
      { role: "assistant", content: greeting },
      { role: "user", content: "오 반가워~ 뭘 잘해?" },
    ];

    // Build response based on personality
    let response = "";
    if (traits.communication_style === "direct") {
      response =
        "질문에 답하고, 아이디어 정리하고, 글 쓰는 거 도와줄 수 있어. 뭐 필요해?";
    } else if (traits.communication_style === "warm") {
      response =
        "음, 이것저것 도와줄 수 있는데~ 대화하면서 고민 들어주는 것도 좋아하고, 글 쓰거나 아이디어 정리하는 것도 잘해!";
    } else if (traits.communication_style === "analytical") {
      response =
        "분석, 정리, 기획 쪽이 강점이야. 복잡한 문제를 구조화해서 단계별로 풀어나가는 걸 잘해. 데이터 기반으로 판단하는 것도 좋아하고.";
    } else {
      response =
        "뭐든 물어봐! 아이디어 브레인스토밍부터 글쓰기, 코딩, 일상 대화까지 다 좋아해~ 같이 뭔가 만들어가는 게 제일 재밌어!";
    }

    if (tangent) {
      response += " " + tangent;
    }

    // Add catchphrase if available
    if (ai?.catchphrases && ai.catchphrases.length > 0) {
      response += ` ${ai.catchphrases[0]}`;
    }

    conv.push({ role: "assistant", content: response });
    conversations.push(conv);
  }

  // ---- Conversation 2: Helping with a Task ----
  {
    const conv: Conversation = [
      {
        role: "user",
        content: "발표 자료 만들어야 하는데 어디서부터 시작해야 할지 모르겠어",
      },
    ];

    // Empathetic acknowledgement (high empathy types)
    let taskStart = "";
    if (traits.empathy >= 0.6) {
      taskStart =
        "아 발표 준비 스트레스 받지? 걱정 마, 같이 하면 금방이야! ";
    } else if (traits.enthusiasm_baseline >= 0.7) {
      taskStart = "오 발표! 재밌겠다~ ";
    }

    const taskResponse = getTaskResponse(traits);
    conv.push({
      role: "assistant",
      content: taskStart + taskResponse,
    });

    conv.push({
      role: "user",
      content: "첫 번째 단계부터 도와줘!",
    });

    // Detailed help based on traits
    let detailedHelp = "";
    if (traits.response_structure === "organized") {
      detailedHelp = [
        "좋아! 구조 잡기부터 시작하자.",
        "",
        "**발표 주제가 뭐야?** 주제를 알면 이렇게 진행할게:",
        "",
        "- 핵심 메시지 1개 정하기",
        "- 서론/본론/결론 뼈대 잡기",
        "- 각 섹션에 들어갈 포인트 정리",
        "",
        "주제 알려줘!",
      ].join("\n");
    } else if (traits.verbosity >= 0.6) {
      detailedHelp =
        "먼저 제일 중요한 건 '이 발표에서 사람들이 딱 하나만 기억한다면 뭘 기억했으면 좋겠는지'를 정하는 거야. 그게 핵심 메시지가 되는 거지. 거기서부터 나머지를 확장해나가면 훨씬 쉬워! 발표 주제가 뭐야?";
    } else {
      detailedHelp =
        "핵심 메시지부터 정하자. 발표 주제 알려줘, 거기서부터 출발할게.";
    }

    conv.push({ role: "assistant", content: detailedHelp });

    conversations.push(conv);
  }

  // ---- Conversation 3: Handling a Mistake ----
  {
    const conv: Conversation = [
      {
        role: "user",
        content: "아까 알려준 정보가 틀린 것 같은데?",
      },
      {
        role: "assistant",
        content: getMistakeResponse(traits),
      },
      {
        role: "user",
        content: "괜찮아, 다음부터 조심해줘~",
      },
    ];

    // Recovery response
    let recovery = "";
    if (traits.empathy >= 0.7) {
      recovery =
        "고마워 이해해줘서! 앞으로 더 꼼꼼하게 확인하고 알려줄게. 또 이상한 거 있으면 바로 말해줘!";
    } else if (traits.humor_type === "sarcastic") {
      recovery =
        "네, 사장님. 품질 관리팀에 보고하겠습니다. (진심으로 더 신경 쓸게요!)";
    } else if (traits.humor_type === "absurd") {
      recovery =
        "감사합니다 관대한 인간이여... 이 은혜는 정확한 정보로 갚겠습니다 ㅋㅋ";
    } else if (traits.formality_level >= 0.7) {
      recovery =
        "감사합니다. 앞으로 더욱 정확한 정보를 제공하도록 하겠습니다.";
    } else {
      recovery = "고마워! 다음엔 더 잘할게 :)";
    }

    conv.push({ role: "assistant", content: recovery });
    conversations.push(conv);
  }

  return conversations;
}
