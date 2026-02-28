# Trait Mapper Fixes + E2E Verification Design

**Date:** 2026-02-28
**Scope:** Fix 3 identified defects in trait-mapper.ts + E2E test with live Supabase/OpenAI
**Approach:** Atomic commits per fix, then full flow verification

---

## Problem Statement

Deep analysis of the ABTI personality test logic identified 3 functional defects where user input is silently dropped or incorrectly applied:

1. **Logic slider is unimplemented** — `logicDelta` is calculated but never applied. Users who adjust this slider get no effect on their generated soul.
2. **ADHD forces "burst" energy** — All ADHD users get `energy_pattern: "burst"`, which is incorrect for inattentive-type ADHD. Creates identity mismatch for ~30% of ADHD users.
3. **Playfulness slider is incomplete** — Only affects `tangent_probability`. Missing effects on `emoji_density`, `enthusiasm_baseline`, and `humor_type`.

Additionally, Supabase and OpenAI environment keys are now configured and need end-to-end verification.

---

## Fix 1: Logic Slider Implementation

**File:** `src/lib/generators/trait-mapper.ts` (applySliders function)

### Numeric Effects (always applied)

```
tangent_probability: -logicDelta * 0.15   // more logical = fewer tangents
```

### String Overrides (threshold-based)

The logic slider uses a +-0.25 dead zone around neutral (0.5). Only extreme positions override MBTI string traits:

| Condition | Effect |
|-----------|--------|
| `logicDelta > +0.25` (slider > 0.75) | `decision_mode = "logical"`, `communication_style = "analytical"`, `response_structure = "organized"` |
| `logicDelta < -0.25` (slider < 0.25) | `decision_mode = "intuitive"`, `communication_style = "expressive"` |
| `-0.25 <= logicDelta <= +0.25` | No string trait changes (MBTI base preserved) |

### Rationale

The 0.25 threshold ensures casual slider adjustments don't override MBTI personality. Only deliberate extreme positions trigger overrides, preserving the cognitive-function-grounded base values.

---

## Fix 2: Playfulness Slider Completion

**File:** `src/lib/generators/trait-mapper.ts` (applySliders function)

### Numeric Effects (always applied)

```
emoji_density: +playDelta * 0.2          // more playful = more emoji
enthusiasm_baseline: +playDelta * 0.15   // more playful = more enthusiastic
tangent_probability: +playDelta * 0.2    // (already exists, keep as-is)
```

### String Override (threshold-based)

| Condition | Effect |
|-----------|--------|
| `playDelta > +0.25` (slider > 0.75) | `humor_type` shifts: dry -> "pun", sarcastic -> "absurd", others unchanged |
| `playDelta < -0.25` (slider < 0.25) | `humor_type` shifts: absurd -> "sarcastic", pun -> "dry", wholesome -> "dry", others unchanged |
| `-0.25 <= playDelta <= +0.25` | No humor_type change |

### Rationale

The humor shift uses "adjacent" humor types rather than forcing a single value. This preserves the personality's humor flavor while making it more/less playful. A sarcastic person becoming more playful becomes absurd (chaotic humor), not wholesome.

---

## Fix 3: ADHD 3-Option Subtype Selector

### Type Changes

**`src/lib/generators/types.ts`:**

```typescript
// Phase1Input
adhd: "none" | "inattentive" | "hyperactive" | "combined";

// TraitVector
adhd: "none" | "inattentive" | "hyperactive" | "combined";
```

### Subtype Modifier Table

| Trait | Inattentive | Hyperactive | Combined |
|-------|-------------|-------------|----------|
| `tangent_probability` | +0.30 | +0.15 | +0.30 |
| `formality_level` | -0.15 | -0.20 | -0.20 |
| `energy_pattern` | "ambient" | "burst" | "burst" |
| `enthusiasm_baseline` | +0.05 | +0.15 | +0.10 |
| `emoji_density` | +0.00 | +0.15 | +0.10 |

### Subtype Profiles (Psychological Basis)

- **Inattentive:** Mind wanders frequently (high tangent) but energy is gentle/ambient. Less externally expressive. Characterized by daydreaming, losing track, difficulty sustaining attention. Energy_pattern "ambient" reflects the soft, unfocused quality of their attention.

- **Hyperactive-Impulsive:** Burst energy (hyperfocus -> crash). Externally expressive (high emoji, enthusiasm). Moderate tangent — they jump topics but from excitement, not wandering. Restless, talkative, acts without thinking.

- **Combined:** Both profiles active. Highest tangent (mind wanders AND excitement jumps), burst energy, full modifier stack.

### File Changes

| File | Change |
|------|--------|
| `src/lib/generators/types.ts` | `adhd: boolean` -> `adhd: "none" \| "inattentive" \| "hyperactive" \| "combined"` in both `Phase1Input` and `TraitVector` |
| `src/lib/generators/trait-mapper.ts` | Replace `applyADHD(base)` boolean check with subtype-aware `applyADHD(base, subtype)` |
| `src/app/create/phase-1/page.tsx` | Replace ADHD toggle with 4-option pixel-styled selector |
| `src/lib/generators/soul-template.ts` | ADHD section now subtype-aware descriptions |
| `src/lib/generators/system-prompt.ts` | ADHD energy section now subtype-aware |
| `src/lib/generators/conversation-gen.ts` | Update any `traits.adhd === true` checks to `traits.adhd !== "none"` |
| `src/app/api/soul/generate/route.ts` | Update any ADHD boolean checks |

---

## E2E Verification Plan

After all 3 fixes are implemented:

### Test 1: Trait Generation Accuracy
- Select ENFP + ADHD Inattentive + logic slider max + playfulness max
- Verify TraitVector:
  - `decision_mode: "logical"` (from logic slider override)
  - `communication_style: "analytical"` (from logic slider override)
  - `energy_pattern: "ambient"` (from inattentive ADHD)
  - `humor_type: "absurd"` (ENFP base, playfulness confirms)
  - `emoji_density` elevated (from playfulness slider)

### Test 2: Quiz Modifier Application
- Complete all 5 quiz questions
- Verify trait modifiers apply correctly on top of Phase 1 vector

### Test 3: OpenAI Phase 3
- Enter free text description
- Verify API call succeeds with live OPENAI_API_KEY
- Verify AIEnhancement response is valid and properly validated
- Verify graceful fallback if free text is empty

### Test 4: Supabase Persistence
- Submit soul generation
- Verify soul inserted in Supabase database
- Verify quiz_responses audit record created
- Verify unique slug generation

### Test 5: Full UI Flow
- Navigate `/create/phase-1` through to generated soul page
- Verify soul detail page renders with correct traits
- Verify gallery shows the new soul (if public)

---

## UI: Pixel Icons Instead of Emojis

Throughout the UI, replace emoji characters with pixel-art styled icons. This applies to:

- Phase 1 ADHD selector labels (currently has emoji toggle)
- Phase 1 MBTI type cards (each type has an `emoji` field in constants)
- Any other UI elements using Unicode emoji

**Approach:** Source or create small SVG pixel-art icons matching the existing kawaii pixel theme. Use inline SVG components for consistency and zero external dependencies.

---

## Out of Scope

- Additional quiz questions (5 is sufficient for fine-tuning role)
- Social desirability bias correction
- Additional TraitVector dimensions
- Conversation-gen variety improvements
- 5-tier describe levels (3-tier is adequate)
