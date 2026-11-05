// Illustrative blend of the four base cartridges for the home page shade slider.
// Not the real matching model: the device's blend comes from the scan.

export const BASES = [
  { name: "Light base", hex: "#f1d6c2" },
  { name: "Medium base", hex: "#d4a17c" },
  { name: "Deep base", hex: "#8f5f42" },
  { name: "Tone adjuster", hex: "#c9949b" },
] as const;

export type ShadeMix = {
  /** Whole-number percentages for each base, in BASES order, summing to 100. */
  parts: [number, number, number, number];
  hex: string;
  label: string;
};

const DEPTH_NAMES = ["Fair", "Light", "Medium", "Tan", "Deep"];
const TONE_NAMES = ["Cool", "Neutral", "Warm"];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

/** Round shares to whole percentages that still sum to 100 (largest remainder). */
function toPercents(shares: number[]): number[] {
  const raw = shares.map((s) => s * 100);
  const out = raw.map(Math.floor);
  const order = raw.map((r, i) => [r - Math.floor(r), i]).sort((a, b) => b[0] - a[0]);
  const missing = 100 - out.reduce((a, b) => a + b, 0);
  for (let k = 0; k < missing; k++) out[order[k][1]]++;
  return out;
}

/**
 * depth and warmth run 0–100. Depth moves weight from light to deep (Bernstein curve),
 * and a cooler setting adds more of the rosy tone adjuster.
 */
export function mixShade(depth: number, warmth: number): ShadeMix {
  const d = clamp01(depth / 100);
  const t = clamp01(warmth / 100);
  const tone = 0.3 * (1 - t);
  const rest = 1 - tone;
  const shares = [rest * (1 - d) ** 2, rest * 2 * d * (1 - d), rest * d ** 2, tone];

  const rgb = [0, 1, 2].map((c) =>
    Math.round(shares.reduce((sum, s, i) => sum + s * parseInt(BASES[i].hex.slice(1 + c * 2, 3 + c * 2), 16), 0)),
  );
  const hex = "#" + rgb.map((v) => v.toString(16).padStart(2, "0")).join("");

  const depthName = DEPTH_NAMES[Math.min(4, Math.floor(d * 5))];
  const toneName = TONE_NAMES[Math.min(2, Math.floor(t * 3))];
  return { parts: toPercents(shares) as ShadeMix["parts"], hex, label: `${depthName} · ${toneName}` };
}
