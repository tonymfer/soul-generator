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
