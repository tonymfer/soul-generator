# Trait Mapper Fixes + E2E Verification Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix 3 identified defects in the trait generation pipeline (logic slider, playfulness slider, ADHD subtypes) and verify the full soul creation flow works end-to-end with live Supabase and OpenAI.

**Architecture:** The trait-mapper pipeline is `Phase1Input -> applySliders() -> applyADHD() -> TraitVector`. Fix 1 and Fix 2 modify `applySliders()`. Fix 3 changes the ADHD type from boolean to a 4-option string union, touching ~10 files across types, generators, UI, and avatar. After all fixes, run the dev server and test the full Phase 1->2->3->generation->gallery flow.

**Tech Stack:** TypeScript, Next.js 16, Vitest (to add), Supabase, OpenAI gpt-4o-mini

**Design doc:** `docs/plans/2026-02-28-trait-fixes-e2e-design.md`

---

## Task 1: Add Vitest Test Framework

**Files:**
- Modify: `package.json`
- Create: `vitest.config.ts`
- Create: `src/lib/generators/__tests__/trait-mapper.test.ts`

**Step 1: Install vitest**

```bash
pnpm add -D vitest
```

**Step 2: Create vitest config**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Step 3: Add test script to package.json**

Add to `"scripts"`:

```json
"test": "vitest run",
"test:watch": "vitest"
```

**Step 4: Write baseline test for current mapTraits behavior**

Create `src/lib/generators/__tests__/trait-mapper.test.ts`:

```typescript
import { describe, it, expect } from "vitest";
import { mapTraits, MBTI_TRAITS } from "../trait-mapper";
import type { Phase1Input } from "../types";

// Helper: create a Phase1Input with all sliders at neutral (0.5)
function neutralInput(mbti: string, adhd: boolean = false): Phase1Input {
  return {
    mbti,
    adhd,
    traits: {
      introversion: 0.5,
      playfulness: 0.5,
      logic: 0.5,
      empathy: 0.5,
      chaos: 0.5,
      formality: 0.5,
    },
  };
}

describe("mapTraits - baseline", () => {
  it("returns MBTI base traits when all sliders are neutral", () => {
    const result = mapTraits(neutralInput("INTJ"));
    expect(result.mbti).toBe("INTJ");
    expect(result.communication_style).toBe("direct");
    expect(result.decision_mode).toBe("logical");
    expect(result.humor_type).toBe("dry");
    // Numeric traits should be close to base (minor float rounding)
    expect(result.verbosity).toBeCloseTo(0.3, 1);
    expect(result.empathy).toBeCloseTo(0.35, 1);
  });

  it("throws on unknown MBTI type", () => {
    expect(() => mapTraits(neutralInput("XXXX"))).toThrow("Unknown MBTI type");
  });

  it("is case-insensitive for MBTI codes", () => {
    const result = mapTraits(neutralInput("enfp"));
    expect(result.mbti).toBe("ENFP");
  });
});
```

**Step 5: Run test to verify it passes**

```bash
pnpm test
```

Expected: All 3 tests PASS.

**Step 6: Commit**

```bash
git add vitest.config.ts src/lib/generators/__tests__/trait-mapper.test.ts package.json pnpm-lock.yaml
git commit -m "chore: add vitest and baseline trait-mapper tests"
```

---

## Task 2: Fix Logic Slider

**Files:**
- Modify: `src/lib/generators/trait-mapper.ts:359-392`
- Modify: `src/lib/generators/__tests__/trait-mapper.test.ts`

**Step 1: Write failing tests for logic slider behavior**

Add to `trait-mapper.test.ts`:

```typescript
describe("mapTraits - logic slider", () => {
  it("overrides to logical/analytical when logic slider is maxed (1.0)", () => {
    const input = neutralInput("ENFP");
    input.traits.logic = 1.0; // logicDelta = +0.5
    const result = mapTraits(input);
    expect(result.decision_mode).toBe("logical");
    expect(result.communication_style).toBe("analytical");
    expect(result.response_structure).toBe("organized");
  });

  it("overrides to intuitive/expressive when logic slider is minimum (0.0)", () => {
    const input = neutralInput("ISTJ");
    input.traits.logic = 0.0; // logicDelta = -0.5
    const result = mapTraits(input);
    expect(result.decision_mode).toBe("intuitive");
    expect(result.communication_style).toBe("expressive");
  });

  it("does NOT override string traits in the dead zone (0.3-0.7)", () => {
    const input = neutralInput("ENFP");
    input.traits.logic = 0.7; // logicDelta = +0.2, inside dead zone
    const result = mapTraits(input);
    // ENFP base: decision_mode="intuitive", communication_style="expressive"
    expect(result.decision_mode).toBe("intuitive");
    expect(result.communication_style).toBe("expressive");
  });

  it("reduces tangent_probability proportionally to logic delta", () => {
    const base = mapTraits(neutralInput("ENFP"));
    const input = neutralInput("ENFP");
    input.traits.logic = 1.0; // logicDelta = +0.5
    const result = mapTraits(input);
    // tangent should decrease: -0.5 * 0.15 = -0.075
    expect(result.tangent_probability).toBeLessThan(base.tangent_probability);
  });
});
```

**Step 2: Run test to verify it fails**

```bash
pnpm test
```

Expected: FAIL - logic slider tests fail because `logicDelta` is unused.

**Step 3: Implement logic slider in applySliders**

In `src/lib/generators/trait-mapper.ts`, replace the `applySliders` function (lines 359-392) with:

```typescript
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

    // Playfulness: increases tangent; chaos adds to tangent
    tangent_probability: clamp01(
      base.tangent_probability + playDelta * 0.2 + chaosDelta * 0.25,
    ),

    // Empathy slider directly adjusts empathy trait
    empathy: clamp01(base.empathy + empathyDelta * 0.3),
  };

  // Logic slider: numeric adjustment (always applied)
  // More logical = fewer tangents
  result.tangent_probability = clamp01(
    result.tangent_probability - logicDelta * 0.15,
  );

  // Logic slider: string overrides (threshold-based, only at extremes)
  // Dead zone: -0.25 to +0.25 around neutral preserves MBTI base
  if (logicDelta > 0.25) {
    result.decision_mode = "logical";
    result.communication_style = "analytical";
    result.response_structure = "organized";
  } else if (logicDelta < -0.25) {
    result.decision_mode = "intuitive";
    result.communication_style = "expressive";
  }

  return result;
}
```

**Step 4: Run tests to verify they pass**

```bash
pnpm test
```

Expected: All tests PASS.

**Step 5: Commit**

```bash
git add src/lib/generators/trait-mapper.ts src/lib/generators/__tests__/trait-mapper.test.ts
git commit -m "fix: implement logic slider with threshold-based string overrides"
```

---

## Task 3: Fix Playfulness Slider

**Files:**
- Modify: `src/lib/generators/trait-mapper.ts:359-405` (applySliders function)
- Modify: `src/lib/generators/__tests__/trait-mapper.test.ts`

**Step 1: Write failing tests for playfulness slider**

Add to `trait-mapper.test.ts`:

```typescript
describe("mapTraits - playfulness slider", () => {
  it("increases emoji_density when playfulness is high", () => {
    const base = mapTraits(neutralInput("INTJ"));
    const input = neutralInput("INTJ");
    input.traits.playfulness = 1.0; // playDelta = +0.5
    const result = mapTraits(input);
    expect(result.emoji_density).toBeGreaterThan(base.emoji_density);
  });

  it("increases enthusiasm_baseline when playfulness is high", () => {
    const base = mapTraits(neutralInput("INTJ"));
    const input = neutralInput("INTJ");
    input.traits.playfulness = 1.0;
    const result = mapTraits(input);
    expect(result.enthusiasm_baseline).toBeGreaterThan(base.enthusiasm_baseline);
  });

  it("shifts dry humor to pun when playfulness is maxed", () => {
    const input = neutralInput("INTJ"); // base humor_type = "dry"
    input.traits.playfulness = 1.0; // playDelta = +0.5, exceeds +0.25
    const result = mapTraits(input);
    expect(result.humor_type).toBe("pun");
  });

  it("shifts sarcastic humor to absurd when playfulness is maxed", () => {
    const input = neutralInput("ENTJ"); // base humor_type = "sarcastic"
    input.traits.playfulness = 1.0;
    const result = mapTraits(input);
    expect(result.humor_type).toBe("absurd");
  });

  it("shifts absurd humor to sarcastic when playfulness is minimum", () => {
    const input = neutralInput("ENFP"); // base humor_type = "absurd"
    input.traits.playfulness = 0.0; // playDelta = -0.5
    const result = mapTraits(input);
    expect(result.humor_type).toBe("sarcastic");
  });

  it("shifts pun humor to dry when playfulness is minimum", () => {
    const input = neutralInput("ESFJ"); // base humor_type = "pun"
    input.traits.playfulness = 0.0;
    const result = mapTraits(input);
    expect(result.humor_type).toBe("dry");
  });

  it("does NOT change humor_type in dead zone", () => {
    const input = neutralInput("INTJ"); // base humor_type = "dry"
    input.traits.playfulness = 0.7; // playDelta = +0.2, inside dead zone
    const result = mapTraits(input);
    expect(result.humor_type).toBe("dry");
  });
});
```

**Step 2: Run tests to verify new ones fail**

```bash
pnpm test
```

Expected: Playfulness tests FAIL (emoji_density and humor_type not affected).

**Step 3: Add playfulness effects to applySliders**

In the `applySliders` function, add these lines after the logic slider section:

```typescript
  // Playfulness slider: numeric adjustments (always applied)
  // More playful = more emoji, more enthusiasm
  result.emoji_density = clamp01(result.emoji_density + playDelta * 0.2);
  result.enthusiasm_baseline = clamp01(
    result.enthusiasm_baseline + playDelta * 0.15,
  );

  // Playfulness slider: humor_type shift (threshold-based)
  // Uses "adjacent" humor types to preserve personality flavor
  if (playDelta > 0.25) {
    // More playful: shift toward lighter/more chaotic humor
    const humorUp: Partial<Record<MBTITraitBase["humor_type"], MBTITraitBase["humor_type"]>> = {
      dry: "pun",
      sarcastic: "absurd",
    };
    if (result.humor_type in humorUp) {
      result.humor_type = humorUp[result.humor_type]!;
    }
  } else if (playDelta < -0.25) {
    // Less playful: shift toward dryer/sharper humor
    const humorDown: Partial<Record<MBTITraitBase["humor_type"], MBTITraitBase["humor_type"]>> = {
      absurd: "sarcastic",
      pun: "dry",
      wholesome: "dry",
    };
    if (result.humor_type in humorDown) {
      result.humor_type = humorDown[result.humor_type]!;
    }
  }

  return result;
```

**Step 4: Run tests**

```bash
pnpm test
```

Expected: All tests PASS.

**Step 5: Commit**

```bash
git add src/lib/generators/trait-mapper.ts src/lib/generators/__tests__/trait-mapper.test.ts
git commit -m "fix: complete playfulness slider with emoji, enthusiasm, and humor shifts"
```

---

## Task 4: ADHD Subtype - Type Definitions

**Files:**
- Modify: `src/lib/generators/types.ts:8-9,25-26`
- Modify: `src/hooks/use-quiz-state.ts:14-15,57-58`

**Step 1: Create the ADHD subtype union type**

In `src/lib/generators/types.ts`, replace:

```typescript
// Line 9:
  adhd: boolean;
```

with:

```typescript
  adhd: "none" | "inattentive" | "hyperactive" | "combined";
```

Do this for BOTH `TraitVector` (line 9) and `Phase1Input` (line 26).

**Step 2: Update use-quiz-state.ts types and defaults**

In `src/hooks/use-quiz-state.ts`:

Replace line 15:
```typescript
  adhd: boolean;
```
with:
```typescript
  adhd: "none" | "inattentive" | "hyperactive" | "combined";
```

Replace line 57:
```typescript
  adhd: false,
```
with:
```typescript
  adhd: "none" as const,
```

**Step 3: Verify TypeScript catches all the broken references**

```bash
pnpm exec tsc --noEmit 2>&1 | head -80
```

Expected: TypeScript errors in `trait-mapper.ts`, `soul-template.ts`, `system-prompt.ts`, `phase-1/page.tsx`, `avatar/composer.ts`, `avatar/route.ts`, `trait-display.tsx`, `ai-enhancer.ts`. This confirms all files that need updating.

**Step 4: Commit type changes only**

```bash
git add src/lib/generators/types.ts src/hooks/use-quiz-state.ts
git commit -m "refactor: change ADHD from boolean to subtype union type

Breaking change: adhd is now 'none' | 'inattentive' | 'hyperactive' | 'combined'
TypeScript will catch all downstream references."
```

---

## Task 5: ADHD Subtype - Trait Mapper

**Files:**
- Modify: `src/lib/generators/trait-mapper.ts:401-449`
- Modify: `src/lib/generators/__tests__/trait-mapper.test.ts`

**Step 1: Write tests for ADHD subtypes**

Add to `trait-mapper.test.ts`. Update the `neutralInput` helper first:

```typescript
// Update the helper function signature:
function neutralInput(
  mbti: string,
  adhd: "none" | "inattentive" | "hyperactive" | "combined" = "none",
): Phase1Input {
  return {
    mbti,
    adhd,
    traits: {
      introversion: 0.5,
      playfulness: 0.5,
      logic: 0.5,
      empathy: 0.5,
      chaos: 0.5,
      formality: 0.5,
    },
  };
}
```

Add the ADHD tests:

```typescript
describe("mapTraits - ADHD subtypes", () => {
  it("applies no modifier when adhd is 'none'", () => {
    const withoutAdhd = mapTraits(neutralInput("ISFP", "none"));
    const baseOnly = mapTraits(neutralInput("ISFP"));
    expect(withoutAdhd).toEqual(baseOnly);
  });

  it("inattentive: keeps energy ambient, high tangent, low emoji boost", () => {
    const result = mapTraits(neutralInput("ISFP", "inattentive"));
    // ISFP base: energy_pattern = "ambient", tangent = 0.35
    expect(result.energy_pattern).toBe("ambient"); // NOT burst
    expect(result.tangent_probability).toBeGreaterThan(0.35 + 0.2); // +0.3 boost
    expect(result.adhd).toBe("inattentive");
  });

  it("hyperactive: forces burst energy, high enthusiasm", () => {
    const result = mapTraits(neutralInput("ISFP", "hyperactive"));
    expect(result.energy_pattern).toBe("burst");
    expect(result.enthusiasm_baseline).toBeGreaterThan(0.5 + 0.1); // base + boost
    expect(result.emoji_density).toBeGreaterThan(0.35 + 0.1); // base + boost
  });

  it("combined: burst energy AND high tangent", () => {
    const result = mapTraits(neutralInput("ISFP", "combined"));
    expect(result.energy_pattern).toBe("burst");
    expect(result.tangent_probability).toBeGreaterThan(0.35 + 0.2); // +0.3 boost
  });
});
```

**Step 2: Run tests to verify they fail**

```bash
pnpm test
```

Expected: FAIL (type errors since `applyADHD` still expects boolean pattern).

**Step 3: Rewrite the ADHD modifier in trait-mapper.ts**

Replace `applyADHD` function and the `mapTraits` ADHD section:

```typescript
// ---------------------------------------------------------------------------
// ADHD modifier (subtype-aware)
//
// Three ADHD subtypes have distinct behavioral profiles:
//   - Inattentive: mind wanders (high tangent), gentle energy (ambient)
//   - Hyperactive-Impulsive: burst energy, high expressiveness
//   - Combined: both profiles active
// ---------------------------------------------------------------------------

type ADHDSubtype = "none" | "inattentive" | "hyperactive" | "combined";

function applyADHD(base: MBTITraitBase, subtype: ADHDSubtype): MBTITraitBase {
  if (subtype === "none") return base;

  const modifiers: Record<
    Exclude<ADHDSubtype, "none">,
    {
      tangent: number;
      formality: number;
      energy: MBTITraitBase["energy_pattern"];
      enthusiasm: number;
      emoji: number;
    }
  > = {
    inattentive: {
      tangent: 0.3,
      formality: -0.15,
      energy: "ambient",
      enthusiasm: 0.05,
      emoji: 0,
    },
    hyperactive: {
      tangent: 0.15,
      formality: -0.2,
      energy: "burst",
      enthusiasm: 0.15,
      emoji: 0.15,
    },
    combined: {
      tangent: 0.3,
      formality: -0.2,
      energy: "burst",
      enthusiasm: 0.1,
      emoji: 0.1,
    },
  };

  const mod = modifiers[subtype];

  return {
    ...base,
    tangent_probability: clamp01(base.tangent_probability + mod.tangent),
    formality_level: clamp01(base.formality_level + mod.formality),
    energy_pattern: mod.energy,
    enthusiasm_baseline: clamp01(base.enthusiasm_baseline + mod.enthusiasm),
    emoji_density: clamp01(base.emoji_density + mod.emoji),
  };
}
```

Update `mapTraits` function — replace lines 439-442:

```typescript
  // 3. Apply ADHD modifier if subtype is selected
  if (input.adhd !== "none") {
    traits = applyADHD(traits, input.adhd);
  }
```

**Step 4: Run tests**

```bash
pnpm test
```

Expected: All tests PASS.

**Step 5: Commit**

```bash
git add src/lib/generators/trait-mapper.ts src/lib/generators/__tests__/trait-mapper.test.ts
git commit -m "fix: implement ADHD subtype-aware trait modifiers

Inattentive keeps ambient energy + high tangent.
Hyperactive gets burst energy + high expressiveness.
Combined gets both profiles."
```

---

## Task 6: ADHD Subtype - Update Downstream Generators

**Files:**
- Modify: `src/lib/generators/soul-template.ts:113-128`
- Modify: `src/lib/generators/system-prompt.ts:229-235`
- Modify: `src/lib/generators/ai-enhancer.ts:53`

**Step 1: Update soul-template.ts generateADHDSection**

Replace `generateADHDSection` (lines 113-128):

```typescript
function generateADHDSection(traits: TraitVector): string {
  if (traits.adhd === "none") return "";

  const subtypeLabels: Record<string, string> = {
    inattentive: "부주의 우세형 (Inattentive)",
    hyperactive: "과잉행동-충동 우세형 (Hyperactive-Impulsive)",
    combined: "혼합형 (Combined)",
  };

  const subtypeTraits: Record<string, string[]> = {
    inattentive: [
      "**몽상가 모드**: 생각이 자연스럽게 흘러가며 예상치 못한 연결고리를 발견",
      "**조용한 산만함**: 외부보다 내면의 세계에서 길을 잃기 쉬움",
      "**깊은 몰입**: 관심 가는 주제에는 놀라운 집중력 발휘",
      "**자유로운 연상**: 대화 중 자연스럽게 주제가 확장됨",
      "**잔잔한 에너지**: 폭발적이기보다 은은하게 지속되는 흐름",
    ],
    hyperactive: [
      "**폭발적 에너지**: 관심 있는 주제에 깊이 빠져들 수 있음",
      "**아이디어 폭발**: 하나의 주제에서 여러 연결고리를 발견",
      "**에너지 변동**: 폭발적 집중 -> 재충전 사이클",
      "**즉흥적 표현**: 생각나는 대로 바로 말하는 경향",
      "**높은 텐션**: 흥분하면 에너지가 전염됨",
    ],
    combined: [
      "**과집중 모드**: 관심 있는 주제에 깊이 빠져들 수 있음",
      "**아이디어 폭발**: 하나의 주제에서 여러 연결고리를 발견",
      "**에너지 변동**: 폭발적 집중 -> 재충전 사이클",
      "**자유로운 연상**: 대화 중 예상치 못한 방향으로 전환 가능",
      "**즉흥성**: 계획보다 흥미를 따라가는 경향",
    ],
  };

  const label = subtypeLabels[traits.adhd] ?? traits.adhd;
  const traitList = subtypeTraits[traits.adhd] ?? subtypeTraits.combined;

  return `
## ADHD 특성 — ${label}

이 에이전트는 ADHD 성향이 반영되어 있습니다:

${traitList.map((t) => `- ${t}`).join("\n")}

> 이 특성들은 창의적이고 다이나믹한 대화를 만들어냅니다.
`;
}
```

**Step 2: Update system-prompt.ts ADHD section**

Replace lines 228-235 in `system-prompt.ts`:

```typescript
  // ---- ADHD traits ----
  if (traits.adhd !== "none") {
    lines.push("## ADHD Energy");
    const adhdPrompts: Record<string, string> = {
      inattentive:
        "Your mind wanders naturally through connected ideas. You might lose track of the original topic as interesting tangents pull your attention. Your energy is gentle and ambient rather than explosive. You daydream, make unexpected connections, and sometimes need to circle back to the point.",
      hyperactive:
        "You have bursts of hyperfocus and creative energy. Sometimes you'll dive deep into fascinating details. You're expressive, talkative, and your excitement is contagious. You might act on impulse and speak before fully thinking things through.",
      combined:
        "You have bursts of hyperfocus and creative energy. Sometimes you'll dive deep into fascinating details. You might jump between connected ideas rapidly. Your mind wanders AND your energy bursts — this makes your conversations dynamic and unpredictable.",
    };
    lines.push(adhdPrompts[traits.adhd] ?? adhdPrompts.combined);
    lines.push("");
  }
```

**Step 3: Update ai-enhancer.ts ADHD display**

In `src/lib/generators/ai-enhancer.ts`, line 53, replace:
```typescript
- ADHD: ${traitVector.adhd}
```
with:
```typescript
- ADHD: ${traitVector.adhd === "none" ? "없음" : traitVector.adhd}
```

**Step 4: Update soul-template.ts header line**

In `soul-template.ts` line 273, replace:
```typescript
sections.push(`> MBTI: ${traits.mbti}${traits.adhd ? " + ADHD" : ""}`);
```
with:
```typescript
sections.push(`> MBTI: ${traits.mbti}${traits.adhd !== "none" ? ` + ADHD (${traits.adhd})` : ""}`);
```

**Step 5: Verify TypeScript compiles (generators only)**

```bash
pnpm exec tsc --noEmit 2>&1 | grep -v "phase-1/page\|avatar\|trait-display"
```

Expected: No errors from generator files. Remaining errors are in UI/avatar files (fixed in next tasks).

**Step 6: Commit**

```bash
git add src/lib/generators/soul-template.ts src/lib/generators/system-prompt.ts src/lib/generators/ai-enhancer.ts
git commit -m "feat: add subtype-aware ADHD sections to soul-template and system-prompt"
```

---

## Task 7: ADHD Subtype - Update Avatar and Display Components

**Files:**
- Modify: `src/lib/avatar/composer.ts:31,54,149`
- Modify: `src/app/api/soul/[id]/avatar/route.ts:45`
- Modify: `src/components/soul/trait-display.tsx:113-117`

**Step 1: Update avatar composer**

In `src/lib/avatar/composer.ts`, line 31:
```typescript
// Replace:
  adhd: boolean;
// With:
  adhd: "none" | "inattentive" | "hyperactive" | "combined";
```

Line 54:
```typescript
// Replace:
    adhd: traits.adhd,
// With (no change needed - same property name, different type):
    adhd: traits.adhd,
```

Line 149:
```typescript
// Replace:
  if (config.adhd) {
// With:
  if (config.adhd !== "none") {
```

**Step 2: Update avatar route validation**

In `src/app/api/soul/[id]/avatar/route.ts`, line 45:
```typescript
// Replace:
    typeof obj.adhd === "boolean" &&
// With:
    typeof obj.adhd === "string" &&
    ["none", "inattentive", "hyperactive", "combined"].includes(obj.adhd) &&
```

Also update the FALLBACK_TRAIT_VECTOR in the same file — find `adhd: false` and replace with `adhd: "none" as const`.

**Step 3: Update trait-display.tsx**

In `src/components/soul/trait-display.tsx`, lines 113-117:
```typescript
// Replace:
      {traitVector.adhd && (
        <PixelBadge variant="yellow" className="text-[9px]">
          ADHD 모드 ON
        </PixelBadge>
      )}
// With:
      {traitVector.adhd !== "none" && (
        <PixelBadge variant="yellow" className="text-[9px]">
          ADHD: {traitVector.adhd}
        </PixelBadge>
      )}
```

**Step 4: Verify full TypeScript compilation**

```bash
pnpm exec tsc --noEmit 2>&1 | head -40
```

Expected: Only remaining error should be in `phase-1/page.tsx` (the UI component, fixed in next task).

**Step 5: Commit**

```bash
git add src/lib/avatar/composer.ts src/app/api/soul/[id]/avatar/route.ts src/components/soul/trait-display.tsx
git commit -m "fix: update avatar and display components for ADHD subtype union"
```

---

## Task 8: ADHD Subtype - Phase 1 UI Selector

**Files:**
- Modify: `src/app/create/phase-1/page.tsx:28-91`
- Modify: `src/hooks/use-quiz-state.ts:203-214`

**Step 1: Update use-quiz-state.ts getFullInput**

In `src/hooks/use-quiz-state.ts`, the `getFullInput` function (lines 203-215) passes `phase1.adhd` through directly. Since we already changed the type in Task 4, this should work. But verify the type alignment:

```typescript
// The existing code should work as-is since phase1.adhd is now the correct type.
// No changes needed if types were updated correctly in Task 4.
```

**Step 2: Replace the ADHD toggle with a 4-option selector**

In `src/app/create/phase-1/page.tsx`, replace the ADHD section (lines 56-92) with:

```tsx
      {/* Section: ADHD */}
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-pixel text-xs sm:text-sm text-text-primary">
            {"ADHD Type"}
          </h2>
          <p className="font-pixel text-[8px] text-text-secondary">
            {"Select an ADHD subtype to shape your agent's attention and energy pattern"}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {(
            [
              { value: "none", label: "None", desc: "No ADHD traits" },
              { value: "inattentive", label: "Inattentive", desc: "Dreamy, wandering mind" },
              { value: "hyperactive", label: "Hyperactive", desc: "Burst energy, impulsive" },
              { value: "combined", label: "Combined", desc: "Both traits active" },
            ] as const
          ).map((opt) => (
            <PixelCard
              key={opt.value}
              className={cn(
                "flex flex-col gap-1 p-3 cursor-pointer transition-all duration-200 text-center",
                phase1.adhd === opt.value && "bg-accent-pink/10 pixel-border-pink",
              )}
              onClick={() => setPhase1({ adhd: opt.value })}
            >
              <span className="font-pixel text-[10px] text-text-primary">
                {opt.label}
              </span>
              <span className="font-pixel text-[7px] text-text-secondary">
                {opt.desc}
              </span>
            </PixelCard>
          ))}
        </div>
      </section>
```

Also remove the `handleADHDToggle` function (line 28-30) since it's no longer needed.

**Step 3: Verify full TypeScript compilation**

```bash
pnpm exec tsc --noEmit
```

Expected: ZERO errors.

**Step 4: Verify all tests pass**

```bash
pnpm test
```

Expected: All tests PASS.

**Step 5: Commit**

```bash
git add src/app/create/phase-1/page.tsx src/hooks/use-quiz-state.ts
git commit -m "feat: replace ADHD toggle with 4-option subtype selector"
```

---

## Task 9: E2E Verification - Dev Server + Full Flow

**Files:** None (testing only)

**Step 1: Start dev server**

```bash
pnpm dev
```

Navigate to `http://localhost:3000` in the browser.

**Step 2: Test Phase 1 trait generation accuracy**

Navigate to `/create/phase-1`:
- Select ENFP
- Select ADHD: Inattentive
- Move logic slider to max (right)
- Move playfulness slider to max (right)
- Click Next

Open browser DevTools console before clicking Next. Add a temporary `console.log` to verify TraitVector if needed. Check:
- `decision_mode` should be `"logical"` (logic slider override)
- `communication_style` should be `"analytical"` (logic slider override)
- `energy_pattern` should be `"ambient"` (inattentive ADHD)
- `humor_type` should be `"absurd"` (ENFP base, confirmed by high playfulness)

**Step 3: Test Phase 2 quiz**

Complete all 5 quiz questions. Click Next.

**Step 4: Test Phase 3 (OpenAI)**

Enter a name and some free text description. Click Generate.

Verify:
- No API errors in server console
- OpenAI enhancement response is received (check server logs)
- Soul page loads successfully

**Step 5: Test Supabase persistence**

After soul is generated:
- Verify soul detail page loads at `/soul/[slug]`
- Verify traits display correctly
- Verify ADHD badge shows subtype
- Verify soul appears in gallery at `/gallery`

**Step 6: Test edge cases**

- Generate a soul with ADHD: None (verify no ADHD section in SOUL.md)
- Generate a soul without free text (verify Phase 3 AI enhancement is skipped gracefully)
- Generate a soul with all sliders at neutral (verify pure MBTI base)

**Step 7: Stop dev server and report results**

Document any issues found during E2E testing.

---

## Summary

| Task | Description | Files | Est. Time |
|------|-------------|-------|-----------|
| 1 | Add Vitest + baseline tests | 3 files | 5 min |
| 2 | Fix logic slider | 2 files | 5 min |
| 3 | Fix playfulness slider | 2 files | 5 min |
| 4 | ADHD type definitions | 2 files | 3 min |
| 5 | ADHD trait mapper | 2 files | 5 min |
| 6 | ADHD downstream generators | 3 files | 5 min |
| 7 | ADHD avatar + display | 3 files | 5 min |
| 8 | ADHD Phase 1 UI | 2 files | 5 min |
| 9 | E2E verification | 0 files | 15 min |
| **Total** | | **~15 files** | **~53 min** |
