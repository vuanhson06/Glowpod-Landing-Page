import { describe, expect, it } from "vitest";
import { BASES, mixShade } from "./shade";

describe("mixShade", () => {
  it("always returns whole percentages that sum to 100", () => {
    for (let d = 0; d <= 100; d += 7) {
      for (let w = 0; w <= 100; w += 9) {
        const { parts } = mixShade(d, w);
        expect(parts.reduce((a, b) => a + b, 0)).toBe(100);
        parts.forEach((p) => expect(Number.isInteger(p) && p >= 0).toBe(true));
      }
    }
  });

  it("uses only the light base at the lightest, warmest end", () => {
    expect(mixShade(0, 100)).toMatchObject({ parts: [100, 0, 0, 0], hex: BASES[0].hex, label: "Fair · Warm" });
  });

  it("uses only the deep base at the deepest, warmest end", () => {
    expect(mixShade(100, 100)).toMatchObject({ parts: [0, 0, 100, 0], hex: BASES[2].hex, label: "Deep · Warm" });
  });

  it("adds the tone adjuster when cooler and clamps out-of-range input", () => {
    expect(mixShade(50, 0).parts[3]).toBe(30);
    expect(mixShade(-20, 250)).toEqual(mixShade(0, 100));
  });
});
