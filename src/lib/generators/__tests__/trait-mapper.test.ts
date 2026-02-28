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

// ---------- Task 2: Logic Slider ----------

describe("mapTraits - logic slider", () => {
  it("overrides to logical/analytical when logic slider is maxed (1.0)", () => {
    const input = neutralInput("ENFP");
    input.traits.logic = 1.0;
    const result = mapTraits(input);
    expect(result.decision_mode).toBe("logical");
    expect(result.communication_style).toBe("analytical");
    expect(result.response_structure).toBe("organized");
  });

  it("overrides to intuitive/expressive when logic slider is minimum (0.0)", () => {
    const input = neutralInput("ISTJ");
    input.traits.logic = 0.0;
    const result = mapTraits(input);
    expect(result.decision_mode).toBe("intuitive");
    expect(result.communication_style).toBe("expressive");
  });

  it("does NOT override string traits in the dead zone (0.3-0.7)", () => {
    const input = neutralInput("ENFP");
    input.traits.logic = 0.7; // logicDelta = +0.2, inside dead zone
    const result = mapTraits(input);
    expect(result.decision_mode).toBe("intuitive");
    expect(result.communication_style).toBe("expressive");
  });

  it("reduces tangent_probability proportionally to logic delta", () => {
    const base = mapTraits(neutralInput("ENFP"));
    const input = neutralInput("ENFP");
    input.traits.logic = 1.0;
    const result = mapTraits(input);
    expect(result.tangent_probability).toBeLessThan(base.tangent_probability);
  });
});

// ---------- Task 3: Playfulness Slider ----------

describe("mapTraits - playfulness slider", () => {
  it("increases emoji_density when playfulness is high", () => {
    const base = mapTraits(neutralInput("INTJ"));
    const input = neutralInput("INTJ");
    input.traits.playfulness = 1.0;
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
    input.traits.playfulness = 1.0;
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
    input.traits.playfulness = 0.0;
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

// ---------- Baseline ----------

describe("mapTraits - baseline", () => {
  it("returns MBTI base traits when all sliders are neutral", () => {
    const result = mapTraits(neutralInput("INTJ"));
    expect(result.mbti).toBe("INTJ");
    expect(result.communication_style).toBe("direct");
    expect(result.decision_mode).toBe("logical");
    expect(result.humor_type).toBe("dry");
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
